
import React from 'react';
import GeminiImage from '../components/GeminiImage';
import { TOURS } from '../constants';
import { useNavigate } from 'react-router-dom';

const Backpackers: React.FC = () => {
  const navigate = useNavigate();
  const packages = TOURS.filter(t => t.id === 'salkantay-adventure-9d' || t.id === 'mountains-rainforest-11d');

  return (
    <div className="bg-[#fdfdfd] animate-fadeIn">
      {/* Hero Header */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <GeminiImage 
            prompt="A group of diverse young backpackers with large packs laughing together in a colorful Cusco street during sunset, cinematic lighting"
            alt="Backpacker Life in Cusco"
            className="w-full h-full object-cover"
            aspectRatio="16:9"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#011A52] via-[#011A52]/40 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <span className="text-[#FFAF04] font-black uppercase tracking-[0.4em] text-sm mb-4 block">The Ultimate Hub</span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Backpacker <span className="text-[#FFAF04]">Packages</span></h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-medium">All-inclusive expeditions designed for the budget-savvy, social, and adventurous soul.</p>
        </div>
      </section>

      {/* Package Selection */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {packages.map(pkg => (
            <div key={pkg.id} className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col group hover:-translate-y-2 transition-transform duration-500">
              <div className="h-[400px] overflow-hidden relative">
                <GeminiImage 
                  prompt={pkg.id === 'salkantay-adventure-9d' 
                    ? "A panoramic view of the Salkantay glacier peak with a line of colorful tents in the mountain valley foreground"
                    : "A narrow river boat moving through the thick green Amazon jungle at dawn with morning mist rising from the water"}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  aspectRatio="4:3"
                />
                <div className="absolute top-8 left-8 bg-[#FFAF04] text-[#011A52] px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-lg">
                  {pkg.duration}
                </div>
                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-[2rem] shadow-xl">
                   <div className="flex justify-between items-center">
                     <div>
                       <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">Total Package Price</p>
                       <p className="text-3xl font-black text-[#011A52]">{pkg.price}</p>
                     </div>
                     <button 
                       onClick={() => navigate(`/inquiry?tourId=${pkg.id}`)}
                       className="bg-[#011A52] text-white px-8 py-4 rounded-2xl font-bold text-sm hover:scale-105 transition shadow-lg"
                     >
                       Book Spot
                     </button>
                   </div>
                </div>
              </div>

              <div className="p-10 flex-grow flex flex-col">
                <h2 className="text-3xl font-bold text-[#011A52] mb-4">{pkg.name}</h2>
                <p className="text-gray-500 mb-10 leading-relaxed">{pkg.longDescription}</p>

                <div className="space-y-6 mb-10">
                  <h3 className="text-xs font-black uppercase text-[#FFAF04] tracking-[0.3em]">The Itinerary Flow</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {pkg.itinerary.map(day => (
                      <div key={day.day} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <div className="w-8 h-8 rounded-full bg-[#011A52] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {day.day}
                        </div>
                        <div>
                          <p className="font-bold text-[#011A52] text-sm">{day.title}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-none mt-1">{day.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-10 border-t border-gray-100 grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-[10px] font-black text-[#011A52] uppercase tracking-widest mb-4">Included</h4>
                    <ul className="space-y-2">
                      {pkg.inclusions.slice(0, 4).map((inc, i) => (
                        <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                          <span className="text-[#FFAF04]">•</span> {inc}
                        </li>
                      ))}
                      {pkg.inclusions.length > 4 && <li className="text-xs text-[#FFAF04] font-bold">+ More</li>}
                    </ul>
                  </div>
                  <div className="bg-[#FFAF04]/5 rounded-3xl p-6 border border-[#FFAF04]/20">
                    <p className="text-[10px] font-black text-[#011A52] uppercase tracking-widest mb-2">Social Hub</p>
                    <p className="text-[11px] text-gray-500 leading-tight">Stay at Cusco's top-rated social hostels. Perfect for meeting like-minded explorers.</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 bg-[#011A52] text-white overflow-hidden relative">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#FFAF04]/10 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-[#FFAF04] font-black uppercase tracking-[0.4em] text-sm mb-6 block">Don't Trek Alone</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Join the <span className="text-[#FFAF04]">Backpacker</span> Collective</h2>
            <p className="text-lg opacity-80 leading-relaxed mb-10">
              Our packages aren't just about the places you go, but the people you meet. We prioritize communal dining, hostel stays with vibrant common areas, and small-group treks that foster lifelong friendships.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                <p className="text-2xl font-bold text-[#FFAF04]">Solo-Friendly</p>
                <p className="text-xs opacity-60 uppercase mt-1">No single supplements</p>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                <p className="text-2xl font-bold text-[#FFAF04]">Expert-Led</p>
                <p className="text-xs opacity-60 uppercase mt-1">100% Local guides</p>
              </div>
            </div>
          </div>
          <div className="rounded-[3rem] overflow-hidden border-8 border-white/10 shadow-2xl">
            <GeminiImage 
               prompt="Young travelers sharing a large communal meal at a rustic wooden table in a high-end hostel in Cusco, laughing and toasting with glasses"
               alt="Social Dining"
               className="w-full h-full object-cover"
               aspectRatio="4:3"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Backpackers;
