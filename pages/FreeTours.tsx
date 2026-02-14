
import React from 'react';
import { TOURS } from '../constants';
import { TourCard } from '../App'; // Assuming we export it or we define it here

const FreeTours: React.FC = () => {
  const freeTours = TOURS.filter(t => t.category === 'Free');
  return (
    <div className="py-32 px-6 max-w-7xl mx-auto animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <span className="text-[#FFAF04] font-black uppercase tracking-[0.4em] text-sm mb-4 block">Cultural Immersion</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#011A52] mb-4">Free Walking & Food Tours</h1>
          <p className="text-lg text-[#666666]">Discover the heart of Cusco with our expert local Team. From the empire's history to the vibrant night food stalls of the imperial city.</p>
        </div>
        <div className="bg-[#FFAF04]/10 border border-[#FFAF04] px-6 py-3 rounded-2xl flex items-center gap-3">
           <span className="text-[#011A52] font-bold text-sm uppercase tracking-tighter">Departing Daily • Yellow Umbrellas</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {freeTours.map(tour => <TourCard key={tour.id} tour={tour} />)}
      </div>
    </div>
  );
};

export default FreeTours;
