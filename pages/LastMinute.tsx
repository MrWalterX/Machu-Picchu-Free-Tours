
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GeminiImage from '../components/GeminiImage';
import { TOURS } from '../constants';
import { TourDetail } from '../types';

const LastMinuteTourCard: React.FC<{ tour: TourDetail }> = ({ tour }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col group transition-all duration-500 hover:shadow-2xl">
      <div className="h-[350px] overflow-hidden relative">
        <GeminiImage 
          prompt={tour.id === 'machu-picchu-last-minute' 
            ? "A beautiful wide shot of the Machu Picchu citadel on a clear day, with very few tourists around, golden lighting, sharp details of the stone terraces"
            : "A vibrant nighttime street food stall in Cusco with warm glowing lights, steam rising from grilled food, and colorful traditional textiles in the background"}
          alt={tour.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          aspectRatio="16:9"
        />
        <div className="absolute top-8 left-8 bg-[#FFAF04] text-[#011A52] px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-lg">
          {tour.id === 'machu-picchu-last-minute' ? 'Guaranteed Entry' : 'Starts at 6:30 PM'}
        </div>
        <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-xl">
           <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">Price</p>
           <p className="text-2xl font-black text-[#011A52]">{tour.price}</p>
        </div>
      </div>

      <div className="p-10 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-3xl font-bold text-[#011A52]">{tour.name}</h2>
          <span className="text-[10px] font-black uppercase text-[#FFAF04] tracking-widest mt-2">{tour.duration}</span>
        </div>
        
        <p className="text-gray-500 mb-8 leading-relaxed line-clamp-2">
          {tour.description}
        </p>

        <div className="space-y-4 mb-8">
           <div className="flex items-center gap-3 text-sm text-gray-600">
             <span className="text-[#FFAF04]">⚡</span>
             <span className="font-bold">Last Minute Availability Guaranteed</span>
           </div>
           <div className="flex items-center gap-3 text-sm text-gray-600">
             <span className="text-[#FFAF04]">📍</span>
             <span>Cusco & Surrounding Areas</span>
           </div>
        </div>

        <div className="mt-auto pt-8 border-t border-gray-50 flex gap-4">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex-1 border-2 border-[#011A52] text-[#011A52] py-4 rounded-2xl font-bold text-sm hover:bg-gray-50 transition"
          >
            {isOpen ? 'Close Plan' : 'View Itinerary'}
          </button>
          <button 
            onClick={() => navigate(`/inquiry?tourId=${tour.id}`)}
            className="flex-1 bg-[#011A52] text-white py-4 rounded-2xl font-bold text-sm hover:bg-[#022574] transition shadow-lg"
          >
            Book Now
          </button>
        </div>

        {isOpen && (
          <div className="mt-8 pt-8 border-t border-gray-50 animate-fadeIn space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#FFAF04]">The Experience</h3>
            <div className="space-y-6">
              {tour.itinerary.map(day => (
                <div key={day.day} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#011A52]/5 flex items-center justify-center font-bold text-[#011A52] text-xs shrink-0">
                    {day.day}
                  </div>
                  <div>
                    <p className="font-bold text-[#011A52] text-sm">{day.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{day.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const LastMinute: React.FC = () => {
  const lastMinuteTours = TOURS.filter(t => 
    t.id === 'machu-picchu-last-minute' || 
    t.id === 'food-tour-cusco'
  );

  return (
    <div className="bg-[#fdfdfd] pt-32 pb-24 px-6 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[#FFAF04] font-black uppercase tracking-[0.4em] text-sm mb-4 block">Quick Planning</span>
          <h1 className="text-5xl md:text-7xl font-bold text-[#011A52] mb-6">Last Minute <span className="text-[#FFAF04]">Adventures</span></h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">Don't miss out on the best of Cusco just because you're short on time. These guaranteed programs handle every detail for you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {lastMinuteTours.map(tour => (
            <LastMinuteTourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {/* Special Notice Section */}
        <div className="mt-24 bg-[#011A52] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <GeminiImage 
               prompt="A close up of an antique pocket watch held in a hand with a blurry background of a crowded Cusco train station"
               alt="Time is precious"
               className="w-full h-full object-cover"
             />
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Need something even <span className="text-[#FFAF04]">faster?</span></h2>
              <p className="text-lg opacity-80 leading-relaxed mb-8">
                If you have less than 24 hours to book, skip the form and contact our 24/7 hotline directly. We can often secure spots for the very next morning.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://wa.me/51946666444?text=URGENT:%20I%20need%20a%20last%20minute%20booking%20help!"
                  className="bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .01 5.403.007 12.04c0 2.123.554 4.197 1.606 6.04L0 24l6.117-1.605a11.837 11.837 0 005.925 1.586h.005c6.635 0 12.04-5.405 12.043-12.041a11.79 11.79 0 00-3.578-8.525z"/></svg>
                  <span>URGENT WhatsApp</span>
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-10 border border-white/20">
                 <h4 className="text-[#FFAF04] font-black uppercase tracking-widest text-xs mb-6">Availability Counter</h4>
                 <div className="space-y-6">
                   <div className="flex justify-between items-center">
                     <span className="text-sm font-bold">Machu Picchu Entry</span>
                     <span className="bg-red-500 text-white text-[10px] px-2 py-1 rounded font-black">2 SPOTS LEFT</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-sm font-bold">Inca Eats (Night)</span>
                     <span className="bg-[#FFAF04] text-[#011A52] text-[10px] px-2 py-1 rounded font-black">12 SPOTS LEFT</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-sm font-bold">Inca Trail Permits</span>
                     <span className="bg-gray-500 text-white text-[10px] px-2 py-1 rounded font-black">LIMITED</span>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastMinute;
