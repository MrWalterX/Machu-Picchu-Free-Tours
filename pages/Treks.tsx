
import React from 'react';
import { TOURS } from '../constants';
import { TourCard } from '../App';

const Treks: React.FC = () => {
  // Exclude backpacker bundles and last-minute specialized tours for the general treks page
  const treks = TOURS.filter(t => 
    t.category === 'Trek' && 
    t.id !== 'salkantay-adventure-9d' && 
    t.id !== 'mountains-rainforest-11d' &&
    t.id !== 'machu-picchu-last-minute'
  );
  return (
    <div className="py-32 px-6 max-w-7xl mx-auto animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <span className="text-[#FFAF04] font-black uppercase tracking-[0.4em] text-sm mb-4 block">Mountain Highs</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#011A52] mb-4">Andean Trek Expeditions</h1>
          <p className="text-lg text-[#666666]">From the iconic Inca Trail to the remote peaks of Ausangate, our small-group expeditions offer an authentic connection to the Andes.</p>
        </div>
        <div className="bg-[#FFAF04]/10 border border-[#FFAF04] px-6 py-3 rounded-2xl flex items-center gap-3">
          <span className="text-[#011A52] font-bold text-sm uppercase tracking-tighter">Certified Local Team Guides</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {treks.map(trek => <TourCard key={trek.id} tour={trek} />)}
      </div>
    </div>
  );
};

export default Treks;
