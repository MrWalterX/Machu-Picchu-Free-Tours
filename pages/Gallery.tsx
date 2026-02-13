
import React, { useState, useEffect } from 'react';
import { getCachedImage } from '../components/GeminiImage';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<{ key: string, data: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fetchAllImages = async () => {
    setLoading(true);
    try {
      const DB_NAME = 'MachuPicchuFreeToursDB';
      const STORE_NAME = 'ImageCache';
      
      const openDB = (): Promise<IDBDatabase> => {
        return new Promise((resolve, reject) => {
          const request = indexedDB.open(DB_NAME, 1);
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
      };

      const db = await openDB();
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      const keysRequest = store.getAllKeys();

      request.onsuccess = () => {
        keysRequest.onsuccess = () => {
          const data = request.result;
          const keys = keysRequest.result;
          const combined = keys.map((key, i) => ({ 
            key: key as string, 
            data: data[i] as string 
          })).filter(img => img.data.startsWith('data:image'));
          
          setImages(combined.reverse());
          setLoading(false);
        };
      };
    } catch (e) {
      console.error("Gallery fetch failed", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllImages();
  }, []);

  const clearGallery = async () => {
    if (!confirm("Are you sure you want to clear your saved photos? This action cannot be undone.")) return;
    
    const DB_NAME = 'MachuPicchuFreeToursDB';
    const STORE_NAME = 'ImageCache';
    const request = indexedDB.open(DB_NAME, 1);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      store.clear();
      setImages([]);
    };
  };

  const downloadImage = (data: string, name: string) => {
    const link = document.createElement('a');
    link.href = data;
    link.download = `mp-adventure-${name.slice(-8)}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd] pt-32 pb-24 px-6 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#FFAF04] font-black uppercase tracking-[0.3em] text-sm mb-4 block">Your Collection</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#011A52] mb-4">AI Travel <span className="text-[#FFAF04]">Vision</span></h1>
            <p className="text-lg text-gray-500">
              A private gallery of every high-fidelity scene generated during your journey. 
              These photos are stored locally in your browser.
            </p>
          </div>
          
          {images.length > 0 && (
            <button 
              onClick={clearGallery}
              className="text-red-400 hover:text-red-600 font-bold text-sm border-b-2 border-transparent hover:border-red-600 transition pb-1"
            >
              Clear Gallery
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-12 h-12 border-4 border-[#011A52] border-t-[#FFAF04] rounded-full animate-spin"></div>
            <p className="font-bold text-[#011A52] opacity-40 uppercase tracking-widest text-xs">Retrieving your memories...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-32 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <div className="text-6xl mb-6">📸</div>
            <h3 className="text-2xl font-bold text-[#011A52] mb-2">No photos saved yet</h3>
            <p className="text-gray-400 max-w-sm mx-auto">Explore our tours and treks to generate stunning AI photography of your future adventures.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {images.map((img) => (
              <div 
                key={img.key} 
                className="relative group rounded-3xl overflow-hidden shadow-lg border border-gray-100 break-inside-avoid bg-white"
              >
                <img 
                  src={img.data} 
                  alt="Saved Adventure" 
                  className="w-full h-auto cursor-zoom-in transition-transform duration-700 group-hover:scale-105"
                  onClick={() => setSelectedImage(img.data)}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button 
                    onClick={() => downloadImage(img.data, img.key)}
                    className="bg-[#FFAF04] text-[#011A52] p-4 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 z-[200] bg-[#011A52]/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
            <img 
              src={selectedImage} 
              alt="Fullscreen view" 
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
            />
            <button 
              className="absolute top-0 right-0 p-4 text-white hover:text-[#FFAF04] transition"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
