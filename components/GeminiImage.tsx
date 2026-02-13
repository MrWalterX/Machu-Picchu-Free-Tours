
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";

// Persistent storage using IndexedDB for larger capacity than localStorage
const DB_NAME = 'MachuPicchuFreeToursDB';
const STORE_NAME = 'ImageCache';
const DB_VERSION = 1;

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getCachedImage = async (key: string): Promise<string | null> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (e) {
    return null;
  }
};

const setCachedImage = async (key: string, data: string): Promise<void> => {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    store.put(data, key);
  } catch (e) {
    console.warn("Failed to cache image in IndexedDB.");
  }
};

interface GeminiImageProps {
  prompt: string;
  alt: string;
  className?: string;
  aspectRatio?: "1:1" | "3:4" | "4:3" | "9:16" | "16:9";
}

class ImageRequestQueue {
  private queue: { key: string; action: () => Promise<void> }[] = [];
  private processing = false;
  private inFlight = new Set<string>();
  private backoffDelay = 2000; // Baseline delay between requests

  async add(key: string, request: () => Promise<void>) {
    // Prevent duplicate requests for the same key
    if (this.inFlight.has(key) || this.queue.some(q => q.key === key)) return;
    
    // Double check cache before adding to queue
    const cached = await getCachedImage(key);
    if (cached) return;

    this.queue.push({ key, action: request });
    this.process();
  }

  private async process() {
    if (this.processing || this.queue.length === 0) return;
    this.processing = true;
    
    const nextItem = this.queue[0]; // Peek at next item
    
    try {
      this.inFlight.add(nextItem.key);
      await nextItem.action();
      
      // Success: Remove from queue and reset backoff delay to baseline
      this.queue.shift();
      this.backoffDelay = 2000;
      await new Promise(resolve => setTimeout(resolve, this.backoffDelay));
    } catch (err: any) {
      const errorMsg = err?.message || JSON.stringify(err);
      
      if (errorMsg.includes('429') || errorMsg.includes('RESOURCE_EXHAUSTED')) {
        // Hit rate limit: Increase backoff exponentially (max 30s) and keep item in queue for retry
        console.warn(`Rate limit hit. Retrying in ${this.backoffDelay / 1000}s...`);
        this.backoffDelay = Math.min(this.backoffDelay * 2, 30000);
        await new Promise(resolve => setTimeout(resolve, this.backoffDelay));
      } else {
        // Other error: Remove from queue to prevent infinite failing loops
        this.queue.shift();
      }
    } finally {
      this.inFlight.delete(nextItem.key);
      this.processing = false;
      // Continue processing next in queue
      if (this.queue.length > 0) {
        this.process();
      }
    }
  }
}

const globalQueue = new ImageRequestQueue();

export const generateCacheKey = (prompt: string, aspectRatio: string) => {
  const safePrompt = prompt.replace(/[^a-z0-9]/gi, '_').substring(0, 64);
  return `img_${safePrompt}_${aspectRatio}`;
};

/**
 * Proactively fetch and cache an image if it doesn't exist.
 */
export const prefetchImage = async (prompt: string, aspectRatio: string = "16:9") => {
  const cacheKey = generateCacheKey(prompt, aspectRatio);
  
  globalQueue.add(cacheKey, async () => {
    let isUserKey = false;
    if (window.aistudio) {
      isUserKey = await window.aistudio.hasSelectedApiKey();
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const selectedModel = isUserKey ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: {
        parts: [{ text: `High-end travel photography: ${prompt}. Cinematic lighting, 4k, vivid natural colors.` }],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
          imageSize: isUserKey ? '1K' : undefined
        }
      }
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          await setCachedImage(cacheKey, `data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    }
  });
};

const GeminiImage: React.FC<GeminiImageProps> = ({ prompt, alt, className, aspectRatio = "16:9" }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorType, setErrorType] = useState<'none' | 'quota' | 'key' | 'generic'>('none');
  const [retryCount, setRetryCount] = useState(0);

  const cacheKey = useMemo(() => generateCacheKey(prompt, aspectRatio), [prompt, aspectRatio]);

  const downloadImage = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${alt.toLowerCase().replace(/\s+/g, '-')}-ai-vision.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchImage = useCallback(async (isMounted: boolean) => {
    // Step 1: Check cache FIRST
    const cached = await getCachedImage(cacheKey);
    if (cached) {
      if (isMounted) {
        setImageUrl(cached);
        setLoading(false);
      }
      return;
    }

    // Step 2: If not in cache, trigger queue
    if (isMounted) setLoading(true);

    globalQueue.add(cacheKey, async () => {
      if (!isMounted) return;

      try {
        setErrorType('none');
        
        // Final check before hitting API
        const lateCache = await getCachedImage(cacheKey);
        if (lateCache) {
          if (isMounted) {
            setImageUrl(lateCache);
            setLoading(false);
          }
          return;
        }

        let isUserKey = false;
        if (window.aistudio) {
          isUserKey = await window.aistudio.hasSelectedApiKey();
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const selectedModel = isUserKey ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';

        const response = await ai.models.generateContent({
          model: selectedModel,
          contents: {
            parts: [{ text: `High-end travel photography, professional grade, cinematic lighting: ${prompt}. Authentic Peruvian atmosphere, 4k, vivid natural colors.` }],
          },
          config: {
            imageConfig: {
              aspectRatio: aspectRatio,
              imageSize: isUserKey ? '1K' : undefined
            }
          }
        });

        if (!isMounted) return;

        let foundImage = false;
        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              const base64Data = part.inlineData.data;
              const fullUrl = `data:image/png;base64,${base64Data}`;
              await setCachedImage(cacheKey, fullUrl);
              setImageUrl(fullUrl);
              foundImage = true;
              break;
            }
          }
        }

        if (!foundImage) throw new Error("No image data found in response");

      } catch (err: any) {
        const errorMsg = err?.message || JSON.stringify(err);
        
        if (errorMsg.includes('429') || errorMsg.includes('RESOURCE_EXHAUSTED')) {
          if (isMounted) setErrorType('quota');
          // Important: Re-throw to trigger backoff in the globalQueue if this was a prefetch
          throw err; 
        }

        if (!isMounted) return;
        if (errorMsg.includes('403') || errorMsg.includes('PERMISSION_DENIED') || errorMsg.includes('entity was not found')) {
          setErrorType('key');
        } else {
          setErrorType('generic');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    });
  }, [prompt, aspectRatio, cacheKey]);

  useEffect(() => {
    let isMounted = true;
    fetchImage(isMounted);
    return () => { isMounted = false; };
  }, [fetchImage, retryCount]);

  // Initial fast check for UI flickering reduction
  useEffect(() => {
    let isMounted = true;
    const fastCheck = async () => {
      const cached = await getCachedImage(cacheKey);
      if (cached && isMounted) {
        setImageUrl(cached);
        setLoading(false);
      }
    };
    fastCheck();
    return () => { isMounted = false; };
  }, [cacheKey]);

  if (loading) {
    return (
      <div className={`bg-[#011A52]/5 animate-pulse flex flex-col items-center justify-center gap-2 ${className}`}>
        <div className="w-6 h-6 border-2 border-[#FFAF04] border-t-transparent rounded-full animate-spin"></div>
        <span className="text-[#011A52]/40 font-bold text-[9px] uppercase tracking-widest text-center px-4 leading-tight">Syncing Local Memory...</span>
      </div>
    );
  }

  if (errorType !== 'none' || !imageUrl) {
    const fallbackUrl = `https://images.unsplash.com/photo-1518132714207-6c8a706b4d45?auto=format&fit=crop&w=1200&q=80`;

    return (
      <div className="relative group overflow-hidden bg-gray-200">
        <img src={fallbackUrl} alt={alt} className={`${className} grayscale opacity-40`} />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-[#011A52]/80 backdrop-blur-sm text-center">
          {errorType === 'key' ? (
            <div className="animate-fadeIn">
              <span className="text-[#FFAF04] font-black text-[10px] uppercase tracking-widest mb-2 block text-center">Connection Required</span>
              <p className="text-white text-[11px] mb-4 opacity-90 leading-tight">Paid API key required for premium renders.</p>
              <button 
                onClick={() => window.aistudio?.openSelectKey().then(() => setRetryCount(r => r + 1))}
                className="bg-[#FFAF04] text-[#011A52] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-tight hover:scale-105 transition shadow-lg"
              >
                Connect Key
              </button>
            </div>
          ) : errorType === 'quota' ? (
            <div className="animate-fadeIn">
              <span className="text-[#FFAF04] font-black text-[10px] uppercase tracking-widest mb-2 block">Limit Reached</span>
              <p className="text-white text-[11px] mb-4 opacity-90">Daily quota exceeded. Retrying shortly...</p>
              <button 
                onClick={() => setRetryCount(prev => prev + 1)}
                className="text-[#FFAF04] text-[10px] font-bold underline decoration-white underline-offset-4"
              >
                Force Retry
              </button>
            </div>
          ) : (
            <div className="animate-fadeIn">
              <span className="text-white/60 font-bold text-[10px] uppercase tracking-widest mb-2 block text-center">Generation Paused</span>
              <button 
                onClick={() => setRetryCount(prev => prev + 1)}
                className="text-white text-xs font-bold underline decoration-[#FFAF04] underline-offset-4 hover:text-[#FFAF04] transition"
              >
                Retry Render
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative group w-full h-full overflow-hidden bg-gray-100">
      <img 
        src={imageUrl} 
        alt={alt} 
        className={`${className} transition-opacity duration-1000 opacity-100`} 
        loading="lazy"
      />
      
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          downloadImage();
        }}
        title="Save this AI image"
        className="absolute top-4 right-4 bg-black/40 backdrop-blur-md hover:bg-[#FFAF04] hover:text-[#011A52] text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg border border-white/20"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
      </button>

      <div className="absolute bottom-4 right-4 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300 bg-black/30 px-2 py-1 rounded backdrop-blur-sm">
         <span className="text-[8px] font-black text-white uppercase tracking-[0.2em]">Stored Locally</span>
      </div>
    </div>
  );
};

export default GeminiImage;
