
import React, { useState } from 'react';
import { FAQS } from '../constants';

const FAQItem: React.FC<{ item: typeof FAQS[0] }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between gap-6 text-left group"
      >
        <div className="flex flex-col gap-2">
           <span className="text-[10px] font-black text-[#FFAF04] uppercase tracking-[0.2em]">{item.category}</span>
           <h3 className={`text-xl font-bold transition-colors ${isOpen ? 'text-[#FFAF04]' : 'text-[#011A52] group-hover:text-[#FFAF04]'}`}>
             {item.question}
           </h3>
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#011A52] text-white rotate-45' : 'bg-gray-50 text-[#011A52]'}`}>
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/>
           </svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-500 leading-relaxed text-lg max-w-3xl">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const categories = Array.from(new Set(FAQS.map(f => f.category)));
  const [activeTab, setActiveTab] = useState<string | 'All'>('All');

  const filteredFaqs = activeTab === 'All' 
    ? FAQS 
    : FAQS.filter(f => f.category === activeTab);

  const WHATSAPP_LINK = "https://wa.me/51946666444?text=Hola!%20I%20have%20some%20questions%20about%20your%20tours.";

  return (
    <div className="bg-[#fdfdfd] pt-32 pb-24 px-6 animate-fadeIn">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#FFAF04] font-black uppercase tracking-[0.4em] text-sm mb-4 block">Traveler Support</span>
          <h1 className="text-5xl md:text-6xl font-bold text-[#011A52] mb-6">Common <span className="text-[#FFAF04]">Questions</span></h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Everything you need to know about trekking, booking, and local life in the imperial city of Cusco.</p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <button 
            onClick={() => setActiveTab('All')}
            className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${activeTab === 'All' ? 'bg-[#011A52] text-white shadow-xl' : 'bg-gray-100 text-[#011A52] hover:bg-gray-200'}`}
          >
            All Questions
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${activeTab === cat ? 'bg-[#011A52] text-white shadow-xl' : 'bg-gray-100 text-[#011A52] hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-sm border border-gray-100">
          {filteredFaqs.map((faq, idx) => (
            <FAQItem key={idx} item={faq} />
          ))}
        </div>

        {/* Still Have Questions? */}
        <div className="mt-20 text-center bg-[#FFAF04]/5 rounded-[3rem] p-12 border border-[#FFAF04]/20">
          <h2 className="text-2xl font-bold text-[#011A52] mb-4">Still have questions?</h2>
          <p className="text-gray-500 mb-8">Our local experts are available 24/7 on WhatsApp to help you plan your perfect trip.</p>
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#011A52] text-white px-10 py-5 rounded-full font-black uppercase tracking-tighter text-lg hover:scale-105 transition shadow-2xl"
          >
            <span>Chat with an Expert</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
