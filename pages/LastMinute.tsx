
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GeminiImage from '../components/GeminiImage';
import { TOURS } from '../constants';

const LastMinute: React.FC = () => {
  const navigate = useNavigate();
  const tour = TOURS.find(t => t.id === 'machu-picchu-last-minute');
  const [showItinerary, setShowItinerary] = useState(true);

  if (!tour) return null;

  return (
    <div className="bg-[#fdfdfd] pt-32 pb-24 px-6 animate-fadeIn">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Visual Content */}
        <div className="space-y-8">
          <div className="rounded-[3rem] overflow-hidden shadow-2xl bg-gray-100 aspect-video lg:aspect-square relative">
            <GeminiImage 
              prompt="A beautiful wide shot of the Machu Picchu citadel on a clear day, with very few tourists around, golden lighting, sharp details of the stone terraces"
              alt="Machu Picchu Citadel"
              className="w-full h-full object-cover"
              aspectRatio="1:1"
            />
            <div className="absolute top-8 left-8 bg-[#FFAF04] text-[#011A52] px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-lg">
              Guaranteed Entry
            </div>
          </div>
          
          <div className="bg-[#011A52] rounded-[2.5rem] p-10 text-white shadow-xl">
            <h3 className="text-xl font-bold text-[#FFAF04] mb-6 flex items-center gap-3">
              <span>🌟</span> Why Choose Last Minute?
            </h3>
            <ul className="space-y-4 text-sm opacity-90 leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-[#FFAF04] font-bold">✓</span>
                <span>We handle the difficult task of obtaining permits when online portals show zero availability.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFAF04] font-bold">✓</span>
                <span>Full door-to-door logistics: we pick you up at your hotel and drop you back.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFAF04] font-bold">✓</span>
                <span>Includes a night in Aguas Calientes to ensure an early start at the sanctuary.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Informational Content */}
        <div className="space-y-10">
          <div>
            <span className="text-[#FFAF04] font-black uppercase tracking-[0.3em] text-sm mb-4 block">Limited Availability</span>
            <h1 className="text-5xl font-bold text-[#011A52] mb-6 leading-tight">Machu Picchu <br/><span className="text-[#FFAF04]">Last Minute</span></h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Sold out online? Don't leave Cusco without seeing the wonder of the world. Our 2-day express program guarantees your entrance and handles every single detail.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 py-6 border-y border-gray-100">
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Duration</p>
              <p className="text-lg font-bold text-[#011A52]">2 Days / 1 Night</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Investment</p>
              <p className="text-lg font-bold text-[#011A52]">$385 USD</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Difficulty</p>
              <p className="text-lg font-bold text-[#011A52]">Easy</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#011A52]">Itinerary Overview</h2>
            </div>
            
            <div className="space-y-8">
              {tour.itinerary.map(day => (
                <div key={day.day} className="flex gap-6">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#011A52]/5 flex items-center justify-center font-bold text-[#011A52]">
                    {day.day}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#011A52] text-lg mb-2">{day.title}</h4>
                    <p className="text-sm text-gray-500 mb-4">{day.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {day.activities.map((act, i) => (
                        <span key={i} className="text-[10px] font-bold bg-gray-50 text-gray-400 px-3 py-1 rounded-full border border-gray-100">
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t">
            <div>
              <h4 className="font-bold text-[#011A52] text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="text-green-500">✓</span> What's Included
              </h4>
              <ul className="space-y-2">
                {tour.inclusions.map((inc, i) => (
                  <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="text-[#FFAF04] mt-1">•</span> {inc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#FFAF04]/5 p-8 rounded-[2rem] border border-[#FFAF04]/20">
              <p className="text-[10px] font-black uppercase text-[#011A52] mb-2 tracking-widest">Instant Action</p>
              <p className="text-xs text-[#011A52]/70 mb-6">Permits are dynamic. We recommend booking immediately to secure your specific date.</p>
              <button 
                onClick={() => navigate(`/inquiry?tourId=${tour.id}`)}
                className="w-full bg-[#011A52] text-white py-4 rounded-2xl font-bold shadow-xl hover:scale-[1.02] transition active:scale-95"
              >
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastMinute;
