
import React from 'react';
import { TOURS } from '../constants';
import { TourCard } from '../App';

const Amazon: React.FC = () => {
  const jungleTours = TOURS.filter(t => 
    t.category === 'Amazon' && 
    t.id !== 'mountains-rainforest-11d'
  );
  return (
    <div className="py-32 px-6 max-w-7xl mx-auto animate-fadeIn">
      <div className="mb-16">
        <span className="text-[#FFAF04] font-black uppercase tracking-[0.4em] text-sm mb-4 block">The Lung of the World</span>
        <h1 className="text-4xl md:text-5xl font-bold text-[#011A52] mb-4">Amazon Jungle Expeditions</h1>
        <p className="text-lg text-[#666666] max-w-2xl">Discover the world's most biodiverse ecosystems with our Team of certified naturalist guides. Venture deep into Manu or explore Sandoval Lake.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {jungleTours.map(tour => <TourCard key={tour.id} tour={tour} />)}
      </div>
    </div>
  );
};

export default Amazon;
