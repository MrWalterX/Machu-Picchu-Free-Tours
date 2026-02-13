
import React from 'react';
import { Link } from 'react-router-dom';
import GeminiImage from '../components/GeminiImage';

const Home: React.FC = () => {
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center text-center overflow-hidden">
        {/* Background AI Image - Describing the user-provided photo precisely */}
        <div className="absolute inset-0 z-0">
          <GeminiImage 
            prompt="Wide-angle panoramic view of Machu Picchu ruins, featuring iconic stone terraces and the Huayna Picchu mountain peak under a vast, vibrant blue sky filled with scattered white puffy cumulus clouds, clear mountain sunlight, high-resolution professional travel photography, group of travelers on a grassy ridge in the bottom left"
            alt="Machu Picchu Panorama"
            className="w-full h-full object-cover"
            aspectRatio="16:9"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#011A52]/60 via-[#011A52]/20 to-[#011A52]/90"></div>
        </div>

        <div className="relative z-10 max-w-5xl px-6 text-white">
          <div className="inline-block bg-[#FFAF04] text-[#011A52] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-xl animate-bounce">
            Voted #1 Local Operator 2025
          </div>
          <h1 className="text-5xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tight">
            Discover The Soul of <br/>
            <span className="text-[#FFAF04]">The Andes</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-gray-100 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Authentic Cusco walking tours, sacred treks, and Amazon expeditions led by the Team who call this land home.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/treks" className="w-full sm:w-auto bg-[#FFAF04] text-[#011A52] px-12 py-5 rounded-full font-black text-xl hover:scale-105 transition shadow-[0_20px_50px_rgba(255,175,4,0.4)] uppercase tracking-tighter">
              Explore Treks
            </Link>
            <Link to="/free-tours" className="w-full sm:w-auto bg-white/10 backdrop-blur-xl border border-white/30 px-12 py-5 rounded-full font-black text-xl hover:bg-white/20 transition text-white uppercase tracking-tighter">
              Free Walking Tour
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] font-bold text-white uppercase tracking-widest">Discover More</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Stats/Badges Section */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl font-black text-[#011A52]">4.9/5</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">TripAdvisor Rating</p>
          </div>
          <div>
            <p className="text-3xl font-black text-[#011A52]">100%</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Local Ownership</p>
          </div>
          <div>
            <p className="text-3xl font-black text-[#011A52]">24/7</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Support on Trail</p>
          </div>
          <div>
            <p className="text-3xl font-black text-[#011A52]">5k+</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Happy Explorers</p>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[#FFAF04] font-black uppercase tracking-[0.4em] text-sm mb-4 block">Our Specialties</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#011A52] mb-6">Choose Your Path</h2>
            <div className="w-24 h-1.5 bg-[#FFAF04] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Free Tours */}
            <div className="group rounded-[3rem] overflow-hidden shadow-xl border border-gray-50 transition-all duration-500 hover:-translate-y-3 flex flex-col h-full bg-white hover:shadow-2xl">
              <div className="h-72 overflow-hidden relative">
                <GeminiImage 
                  prompt="A friendly Peruvian local guide holding a bright yellow umbrella and pointing out Inca stonework in a narrow Cusco street to a small group of fascinated tourists, sunny day"
                  alt="Free Walking Tour"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  aspectRatio="4:3"
                />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black text-[#011A52] uppercase tracking-widest">
                  Daily Departure
                </div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-[#011A52] mb-4">Free Walking Tours</h3>
                <p className="text-sm text-gray-500 mb-8 flex-grow leading-relaxed">The best introduction to the imperial city. Discover hidden Inca secrets and colonial history with our expert local Team.</p>
                <Link to="/free-tours" className="inline-block text-[#011A52] font-black text-xs uppercase tracking-widest border-b-2 border-[#FFAF04] pb-1 hover:border-[#011A52] transition w-fit">Book My Spot →</Link>
              </div>
            </div>

            {/* Treks */}
            <div className="group rounded-[3rem] overflow-hidden shadow-xl border border-gray-50 transition-all duration-500 hover:-translate-y-3 flex flex-col h-full bg-white hover:shadow-2xl">
              <div className="h-72 overflow-hidden relative">
                <GeminiImage 
                  prompt="Trek hikers with backpacks walking along a high Andean ridge with snow-capped mountains in the background, Salkantay trail style"
                  alt="Andean Treks"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  aspectRatio="4:3"
                />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black text-[#011A52] uppercase tracking-widest">
                  Best Seller
                </div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-[#011A52] mb-4">High Altitude Treks</h3>
                <p className="text-sm text-gray-500 mb-8 flex-grow leading-relaxed">Classic Inca Trail and Salkantay expeditions. Small groups, premium gear, and gourmet mountain meals prepared by our Team chefs.</p>
                <Link to="/treks" className="inline-block text-[#011A52] font-black text-xs uppercase tracking-widest border-b-2 border-[#FFAF04] pb-1 hover:border-[#011A52] transition w-fit">Explore Treks →</Link>
              </div>
            </div>

            {/* Amazon */}
            <div className="group rounded-[3rem] overflow-hidden shadow-xl border border-gray-50 transition-all duration-500 hover:-translate-y-3 flex flex-col h-full bg-white hover:shadow-2xl">
              <div className="h-72 overflow-hidden relative">
                <GeminiImage 
                  prompt="Travelers in a wooden boat on a river deep in the Amazon rainforest, lush green jungle background, exotic birds visible"
                  alt="Amazon Expeditions"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  aspectRatio="4:3"
                />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black text-[#011A52] uppercase tracking-widest">
                  Expert Guides
                </div>
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-[#011A52] mb-4">Amazon Expeditions</h3>
                <p className="text-sm text-gray-500 mb-8 flex-grow leading-relaxed">Venture into the heart of Manu or Tambopata. Discover the world's most biodiverse ecosystem with certified naturalists.</p>
                <Link to="/amazon" className="inline-block text-[#011A52] font-black text-xs uppercase tracking-widest border-b-2 border-[#FFAF04] pb-1 hover:border-[#011A52] transition w-fit">Discover Jungle →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Difference Section */}
      <section className="py-24 bg-[#011A52] text-white overflow-hidden relative">
        <div className="absolute left-0 top-0 w-full h-full opacity-5 pointer-events-none">
          <GeminiImage 
             prompt="Close up of an intricate ancient Inca stone wall with large blocks carved with precision, earthy textures"
             alt="Inca Stone Pattern"
             className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12">The <span className="text-[#FFAF04]">Auqui Adventure</span> Difference</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition duration-300">
              <div className="text-4xl mb-6">🏘️</div>
              <h4 className="text-xl font-bold mb-4">100% Local Team</h4>
              <p className="text-sm opacity-70 leading-relaxed">We don't hire external contractors. Every guide and porter is a local expert from the Cusco region, ensuring your money stays in the community.</p>
            </div>
            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition duration-300">
              <div className="text-4xl mb-6">🍲</div>
              <h4 className="text-xl font-bold mb-4">Gourmet On Trail</h4>
              <p className="text-sm opacity-70 leading-relaxed">Forget basic rations. Our mountain chefs prepare fresh, local meals even at 4,000 meters altitude using organic local ingredients.</p>
            </div>
            <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition duration-300">
              <div className="text-4xl mb-6">🛡️</div>
              <h4 className="text-xl font-bold mb-4">Safety First</h4>
              <p className="text-sm opacity-70 leading-relaxed">Oxygen tanks and first-aid kits accompany every trek. Your health and successful summit are our Team's absolute priority.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
