
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GeminiImage from '../components/GeminiImage';

const AboutUs: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const values = [
    {
      title: "Radical Authenticity",
      icon: "🏺",
      description: "We don't follow scripts. Our guides share the lived history of their ancestors, including the myths, the struggles, and the triumphs."
    },
    {
      title: "Community First",
      icon: "🤝",
      description: "100% of our 'Free' tour tips stay with the Team and their families. We support local projects in the sacred valley."
    },
    {
      title: "Eco-Responsibility",
      icon: "🌿",
      description: "We are committed to carbon-neutral trekking and zero-waste expeditions to preserve our sacred Apus (mountains)."
    }
  ];

  const guides = [
    { name: "Yuri", role: "Lead Culture Guide", bio: "Born in the highlands, Yuri is a master of Incan astronomy and Quechua traditions." },
    { name: "Maria", role: "Adventure Specialist", bio: "A marathon runner and history buff, Maria leads our toughest treks with a smile." },
    { name: "Daniel", role: "Amazon Naturalist", bio: "Raised near Manu, Daniel has an uncanny ability to spot wildlife before anyone else." }
  ];

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const summary = `About Us Inquiry:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const waLink = `https://wa.me/51946666444?text=${encodeURIComponent(summary)}`;
    window.open(waLink, '_blank');
    navigate('/success', { state: { tour: "General Inquiry" } });
  };

  return (
    <div className="animate-fadeIn font-['Quicksand']">
      {/* Hero Header */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <GeminiImage 
            prompt="A group of cheerful Peruvian tour guides wearing traditional colorful vests and holding bright yellow umbrellas, standing in the middle of the cobbled Plaza de Armas of Cusco, smiling warmly at the camera, golden hour light"
            alt="The Machu Picchu Free Tours Team"
            className="w-full h-full object-cover"
            aspectRatio="16:9"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#011A52] via-[#011A52]/40 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">The Heart of <span className="text-[#FFAF04]">Auqui Adventure</span></h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">More than just tours. We are a community of storytellers, explorers, and proud locals.</p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="text-[#FFAF04] font-black uppercase tracking-[0.3em] text-sm">Our Origin</span>
            <h2 className="text-4xl font-bold text-[#011A52] leading-tight">Changing the way you see the Andes.</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              Founded by local experts in Cusco, Auqui Adventure began with a simple observation: most tours were sanitized for tourists and detached from the real people of Peru.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              We created <span className="font-bold text-[#011A52]">Machu Picchu Free Tours</span> to bridge that gap. By offering high-quality walking tours on a gratuity-only basis, we made cultural education accessible to everyone, while ensuring our guides were rewarded directly for their passion and knowledge.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="bg-[#011A52]/5 p-6 rounded-3xl border border-gray-100 flex-1">
                <p className="text-3xl font-black text-[#011A52]">12k+</p>
                <p className="text-xs uppercase font-bold text-gray-400 tracking-widest mt-1">Happy Travelers</p>
              </div>
              <div className="bg-[#011A52]/5 p-6 rounded-3xl border border-gray-100 flex-1">
                <p className="text-3xl font-black text-[#011A52]">15</p>
                <p className="text-xs uppercase font-bold text-gray-400 tracking-widest mt-1">Local Guides</p>
              </div>
            </div>
          </div>
          <div className="rounded-[3rem] overflow-hidden shadow-2xl rotate-2">
            <GeminiImage 
              prompt="A close up of a beautiful handmade colorful Peruvian textile being woven by an elderly indigenous woman in a rural mountain village, sharp focus on the threads"
              alt="Local craftsmanship"
              className="w-full h-full object-cover"
              aspectRatio="4:3"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-[#f8f7f5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#011A52] mb-4">What We Stand For</h2>
            <div className="w-20 h-1 bg-[#FFAF04] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="w-16 h-16 bg-[#011A52]/5 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition duration-300">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold text-[#011A52] mb-4">{val.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guide Spotlights */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-[#011A52] mb-4">Meet Your Local Hosts</h2>
              <p className="text-gray-500">Our guides are not just experts; they are the heart and soul of the experience.</p>
            </div>
            <button onClick={() => navigate('/treks')} className="text-[#011A52] font-bold border-b-2 border-[#FFAF04] pb-1">See All Tours →</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {guides.map((guide, idx) => (
              <div key={idx} className="relative group">
                <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6 shadow-lg">
                  <GeminiImage 
                    prompt={`A realistic portrait of a friendly Peruvian tour guide named ${guide.name}, ${guide.role === 'Adventure Specialist' ? 'wearing hiking gear' : 'wearing a traditional colorful scarf'}, blurred background of the Andes, professional photography`}
                    alt={guide.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    aspectRatio="3:4"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#011A52] mb-1">{guide.name}</h3>
                <span className="text-[#FFAF04] font-bold text-xs uppercase tracking-widest block mb-4">{guide.role}</span>
                <p className="text-sm text-gray-500 leading-relaxed italic">"{guide.bio}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-[#011A52] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <GeminiImage 
              prompt="Panoramic night view of Cusco city from a high viewpoint, thousands of tiny lights in the valley, deep blue sky"
              alt="Cusco at night"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to start your adventure?</h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button onClick={() => navigate('/treks')} className="bg-[#FFAF04] text-[#011A52] px-10 py-5 rounded-full font-black text-lg hover:scale-105 transition shadow-xl uppercase tracking-tighter">
                Browse All Tours
              </button>
              <button onClick={scrollToForm} className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-black text-lg hover:bg-white/20 transition uppercase tracking-tighter">
                Contact the Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Inquiry Form Section */}
      <section ref={formRef} className="py-24 px-6 bg-[#f8f7f5]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#FFAF04] font-black uppercase tracking-[0.4em] text-sm mb-4 block">Get In Touch</span>
            <h2 className="text-4xl font-bold text-[#011A52]">Direct Inquiry</h2>
            <p className="text-gray-500 mt-4">Have a special request or just want to say hi? Fill out the form below and our team will get back to you shortly.</p>
          </div>
          
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-gray-100">
            <form onSubmit={handleFormSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#011A52] ml-2">Your Name</label>
                  <input 
                    required 
                    name="name"
                    type="text" 
                    placeholder="E.g. Alexander von Humboldt"
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#FFAF04] transition outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#011A52] ml-2">Email Address</label>
                  <input 
                    required 
                    name="email"
                    type="email" 
                    placeholder="alex@example.com"
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#FFAF04] transition outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#011A52] ml-2">How can we help you?</label>
                <textarea 
                  required 
                  name="message"
                  rows={5} 
                  placeholder="Tell us about your travel plans, dates, or questions..."
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#FFAF04] transition outline-none resize-none"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-[#011A52] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#022574] transition shadow-lg transform active:scale-95"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
