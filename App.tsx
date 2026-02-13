
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Backpackers from './pages/Backpackers';
import InquiryForm from './pages/InquiryForm';
import Success from './pages/Success';
import AboutUs from './pages/AboutUs';
import LastMinute from './pages/LastMinute';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import GeminiImage, { prefetchImage } from './components/GeminiImage';
import Logo from './components/Logo';
import { TOURS } from './constants';
import { TourDetail } from './types';

// Declare global for TypeScript
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    aistudio?: AIStudio;
  }
}

const getTourPrompt = (tour: TourDetail) => {
  switch (tour.id) {
    case 'free-walking-tour-cusco': return "A friendly local guide holding a bright yellow umbrella explaining history to travelers in the beautiful Plaza de Armas of Cusco, sunny day, colonial architecture";
    case 'machu-picchu-last-minute': return "A stunning close-up of the Machu Picchu stone structures with the iconic Huayna Picchu mountain in the background, very clear sky, professional travel photography";
    case 'inka-jungle-trek-4-day': return "Action shot of travelers mountain biking down a lush green mountain road in the Peruvian Andes, surrounded by tropical cloud forest, cinematic action photography";
    case 'salkantay-adventure-9d': return "A panoramic view of the Salkantay glacier peak with a line of colorful tents in the mountain valley foreground";
    case 'mountains-rainforest-11d': return "A narrow river boat moving through the thick green Amazon jungle at dawn with morning mist rising from the water";
    case 'inka-trail-2-day': return "A stunning view of Machu Picchu from the Sun Gate (Inti Punku) during late afternoon with a group of happy hikers looking down at the citadel";
    case 'inka-trail-4-day': return "Happy hikers walking through the Sun Gate at Machu Picchu, golden sunrise, ruins in background";
    case 'salkantay-4-day': return "Diverse group of hikers at the turquoise Humantay Lake with the giant Salkantay glacier peak behind them";
    case 'ausangate-trek-5-day': return "Adventurous tourists trekking through a valley with herds of alpacas and the colorful Rainbow Mountain in the background";
    case 'choquequirao-trek-4-day': return "People exploring the dramatic stone 'Llama terraces' of the remote Choquequirao ruins, deep canyon scenery";
    case 'manu-national-park': return "Travelers on a long wooden boat navigating a winding Amazon river, lush rainforest walls, spotting exotic birds";
    case 'tambopata-reserve-3-day': return "Travelers walking on a suspension canopy bridge high above the Amazon jungle floor, vibrant green trees";
    default: return `A realistic travel photo of people enjoying the ${tour.name} in Peru`;
  }
};

const ApiKeyGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      } else {
        setHasKey(true);
      }
    };
    checkKey();
  }, []);

  useEffect(() => {
    if (hasKey) {
      // Only prefetch the most essential hero and first featured images to avoid hitting quota
      prefetchImage("Wide-angle panoramic view of Machu Picchu ruins, featuring iconic stone terraces and the Huayna Picchu mountain peak under a vast, vibrant blue sky filled with scattered white puffy cumulus clouds, clear mountain sunlight, high-resolution professional travel photography, group of travelers on a grassy ridge in the bottom left", "16:9");
      
      // Prefetch the "Free Walking Tour" as it's the most common entry point
      const freeTour = TOURS.find(t => t.id === 'free-walking-tour-cusco');
      if (freeTour) prefetchImage(getTourPrompt(freeTour), "16:9");

      // Prefetch one secondary banner to improve perceived performance
      prefetchImage("A group of diverse young backpackers with large packs laughing together in a colorful Cusco street during sunset, cinematic lighting", "16:9");
    }
  }, [hasKey]);

  const handleOpenKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  if (hasKey === null) return null;

  if (!hasKey) {
    return (
      <div className="min-h-screen bg-[#011A52] flex items-center justify-center p-6 font-['Quicksand']">
        <div className="max-w-md w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#FFAF04]"></div>
          <div className="w-20 h-20 mx-auto mb-8">
            <Logo variant="standard" className="w-full h-full" />
          </div>
          <h1 className="text-3xl font-bold text-[#011A52] mb-4">Unlock Premium AI Experience</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            To generate high-fidelity travel photography for your Peruvian adventure, please connect your 
            <span className="font-bold text-[#011A52]"> Google AI Studio API Key</span>.
          </p>
          <div className="space-y-4">
            <button 
              onClick={handleOpenKey}
              className="w-full bg-[#011A52] text-white py-4 rounded-2xl font-bold hover:bg-[#022574] transition transform hover:scale-[1.02] shadow-xl"
            >
              Connect API Key
            </button>
            <a 
              href="https://ai.google.dev/gemini-api/docs/billing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-xs text-gray-400 hover:text-[#011A52] transition underline decoration-[#FFAF04] underline-offset-4"
            >
              Mandatory: Use a key from a paid GCP project
            </a>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.2em]">Powered by Gemini 3 Pro</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

const TourCard: React.FC<{ tour: TourDetail }> = ({ tour }) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate(`/inquiry?tourId=${tour.id}`);
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 overflow-hidden flex flex-col h-fit transition-all duration-300 hover:shadow-xl">
      <div className="h-64 overflow-hidden relative group">
        <GeminiImage 
          prompt={getTourPrompt(tour)}
          alt={tour.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          aspectRatio="16:9"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#011A52] shadow-sm">
          {tour.duration}
        </div>
        <div className="absolute top-4 left-4 bg-[#FFAF04] px-3 py-1 rounded-full text-xs font-bold text-[#011A52] shadow-sm">
          {tour.difficulty}
        </div>
      </div>
      
      <div className="p-8">
        <h2 className="text-2xl font-bold text-[#011A52] mb-3">{tour.name}</h2>
        <p className="text-sm text-[#666666] mb-6 leading-relaxed">{tour.description}</p>
        
        <div className="flex flex-col mb-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 uppercase font-bold tracking-widest block mb-1">
                {tour.category === 'Free' ? 'Investment' : 'Starting from'}
              </span>
              <span className="text-2xl font-bold text-[#011A52]">{tour.price}</span>
            </div>
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-[#011A52] font-bold text-sm border-b-2 border-[#FFAF04] pb-1 hover:border-[#011A52] transition"
            >
              {showDetails ? 'Hide Details' : 'View Details'}
            </button>
          </div>
          {tour.priceDisclaimer && (
            <p className="text-[11px] text-gray-500 mt-4 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100 italic whitespace-pre-wrap">
              {tour.priceDisclaimer}
            </p>
          )}
        </div>

        {showDetails && (
          <div className="mt-6 space-y-8 animate-fadeIn border-t pt-8">
            {tour.category === 'Free' && (
              <div className="space-y-4">
                <h3 className="font-bold text-[#011A52] text-lg flex items-center gap-2">
                  <span className="text-[#FFAF04]">📍</span> Meeting Point: McDonald's
                </h3>
                <p className="text-xs text-gray-500">
                  Our Team gathers right at the entrance of McDonald's in the Plaza de Armas (Main Square). Look for the yellow umbrellas.
                </p>
                <div className="w-full h-48 rounded-2xl overflow-hidden shadow-inner border border-gray-200">
                  <iframe 
                    title="Meeting Point Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1939.882417757375!2d-71.9794351!3d-13.5161474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916dd671399435b7%3A0xc3f83794a0d944e7!2sMcDonald&#39;s!5e0!3m2!1sen!2spe!4v1700000000000!5m2!1sen!2spe" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <h3 className="font-bold text-[#011A52] text-lg flex items-center gap-2">
                <span className="text-[#FFAF04]">📅</span> {tour.category === 'Free' ? 'What we\'ll see' : 'Day-by-Day Itinerary'}
              </h3>
              {tour.itinerary.map((item) => (
                <div key={item.day} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#011A52] text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {item.day}
                    </div>
                    <div className="w-0.5 h-full bg-gray-100 mt-2"></div>
                  </div>
                  <div className="pb-6">
                    <h4 className="font-bold text-[#011A52] mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500 mb-2">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.activities.map((act, i) => (
                        <span key={i} className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-md">{act}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t">
              <div>
                <h3 className="font-bold text-[#011A52] mb-4 text-sm uppercase tracking-widest flex items-center gap-2">
                  <span className="text-green-500">✓</span> Inclusions
                </h3>
                <ul className="space-y-2">
                  {tour.inclusions.map((item, i) => (
                    <li key={i} className="text-xs flex items-start gap-2 text-gray-600">
                      <span className="text-green-400 text-[8px] mt-1">●</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-[#011A52] mb-4 text-sm uppercase tracking-widest flex items-center gap-2">
                  <span className="text-red-500">✕</span> Exclusions
                </h3>
                <ul className="space-y-2">
                  {tour.exclusions.map((item, i) => (
                    <li key={i} className="text-xs flex items-start gap-2 text-gray-400 italic">
                      <span className="text-gray-300 text-[8px] mt-1">●</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <button 
              onClick={handleBookingClick}
              className="w-full bg-[#011A52] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-[#022574] flex items-center justify-center gap-3 transition group"
            >
              <span>{tour.category === 'Free' ? 'Book Now & Secure Spot' : `Continue to Booking (${tour.price})`}</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const FreeToursHub = () => {
  const freeTours = TOURS.filter(t => t.category === 'Free');
  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#011A52] mb-4">Free Walking Tours</h1>
          <p className="text-lg text-[#666666]">Discover the heart of Cusco with our expert local Team. Experience the culture and history of the Incas with no upfront cost.</p>
        </div>
        <div className="bg-[#FFAF04]/10 border border-[#FFAF04] px-6 py-3 rounded-2xl flex items-center gap-3">
           <span className="text-[#011A52] font-bold text-sm uppercase tracking-tighter">Departing Daily: 10AM, 1PM & 3:30PM</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {freeTours.map(tour => <TourCard key={tour.id} tour={tour} />)}
      </div>
    </div>
  );
};

const TrekHub = () => {
  const treks = TOURS.filter(t => t.category === 'Trek' || t.id === 'mountains-rainforest-11d');
  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#011A52] mb-4">Andean Trek Expeditions</h1>
          <p className="text-lg text-[#666666]">From the iconic Inca Trail to the remote peaks of Ausangate, our small-group expeditions offer an authentic connection to the Andes led by our Team.</p>
        </div>
        <div className="bg-[#FFAF04]/10 border border-[#FFAF04] px-6 py-3 rounded-2xl flex items-center gap-3">
          <span className="text-[#011A52] font-bold text-sm uppercase tracking-tighter">2026 Permits Now Open</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {treks.map(trek => <TourCard key={trek.id} tour={trek} />)}
      </div>
    </div>
  );
};

const AmazonHub = () => {
  const jungleTours = TOURS.filter(t => t.category === 'Amazon');
  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#011A52] mb-4">Amazon Jungle Expeditions</h1>
        <p className="text-lg text-[#666666] max-w-2xl">Discover the world's most biodiverse ecosystems with our Team of certified naturalist guides.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {jungleTours.map(tour => <TourCard key={tour.id} tour={tour} />)}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ApiKeyGate>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/backpackers" element={<Layout><Backpackers /></Layout>} />
          <Route path="/free-tours" element={<Layout><FreeToursHub /></Layout>} />
          <Route path="/treks" element={<Layout><TrekHub /></Layout>} />
          <Route path="/amazon" element={<Layout><AmazonHub /></Layout>} />
          <Route path="/inquiry" element={<Layout><InquiryForm /></Layout>} />
          <Route path="/success" element={<Layout><Success /></Layout>} />
          <Route path="/about" element={<Layout><AboutUs /></Layout>} />
          <Route path="/last-minute" element={<Layout><LastMinute /></Layout>} />
          <Route path="/blog" element={<Layout><Blog /></Layout>} />
          <Route path="/faq" element={<Layout><FAQ /></Layout>} />
        </Routes>
      </Router>
    </ApiKeyGate>
  );
};

export default App;
