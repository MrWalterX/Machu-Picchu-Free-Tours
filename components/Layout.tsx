
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { COLORS } from '../constants';
import Logo from './Logo';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Last Minute', path: '/last-minute' },
    { name: 'Backpackers', path: '/backpackers' },
    { name: 'Treks', path: '/treks' },
    { name: 'Amazon', path: '/amazon' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
  ];

  const WHATSAPP_NUMBER = "51946666444";
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hola!%20I%27m%20interested%20in%20booking%20a%20tour%20with%20Machu%20Picchu%20Free%20Tours.`;

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfd]">
      <header 
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 px-4 py-4 ${
          scrolled ? 'pt-2 pb-2' : 'pt-6 pb-4'
        }`}
      >
        <nav 
          className={`max-w-7xl mx-auto transition-all duration-500 rounded-[2rem] border border-white/20 shadow-[0_8px_32px_0_rgba(1,26,82,0.37)] ${
            scrolled 
              ? 'bg-[#011A52]/85 backdrop-blur-xl py-3 px-6 border-white/10' 
              : 'bg-[#011A52]/60 backdrop-blur-md py-4 px-8 border-white/20'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="group">
                <Logo 
                  variant="inverted" 
                  showText={true} 
                  className="h-10 group-hover:scale-105 transition duration-300 drop-shadow-lg" 
                />
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center space-x-1 font-['Quicksand']">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    to={link.path} 
                    className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-full hover:bg-white/10 ${
                      location.pathname === link.path ? 'text-[#FFAF04]' : 'text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <button 
                  onClick={() => navigate('/inquiry')}
                  className="ml-4 bg-[#FFAF04] text-[#011A52] px-6 py-2.5 rounded-full font-bold text-sm shadow-[0_4px_14px_0_rgba(255,175,4,0.39)] hover:shadow-[0_6px_20px_rgba(255,175,4,0.23)] hover:scale-105 active:scale-95 transition transform"
                >
                  Book Now
                </button>
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <div className="w-6 h-5 relative flex flex-col justify-between items-center overflow-hidden">
                  <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </nav>

        <div 
          className={`md:hidden absolute top-24 left-4 right-4 transition-all duration-500 transform ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'
          }`}
        >
          <div className="bg-[#011A52]/95 backdrop-blur-2xl rounded-[2.5rem] p-8 border border-white/10 shadow-2xl flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                onClick={() => setIsMenuOpen(false)}
                className={`text-xl font-bold transition ${
                  location.pathname === link.path ? 'text-[#FFAF04]' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button 
              onClick={() => { navigate('/inquiry'); setIsMenuOpen(false); }}
              className="mt-6 w-full bg-[#FFAF04] text-[#011A52] px-8 py-4 rounded-full font-bold text-lg"
            >
              Book Now
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      {/* Floating WhatsApp Button */}
      <a 
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[150] group flex items-center"
      >
        <div className="absolute right-full mr-4 bg-[#011A52] text-white px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 shadow-2xl border border-white/10 pointer-events-none">
          Need help? Chat with us! 🏔️
        </div>
        <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 border-4 border-white">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .01 5.403.007 12.04c0 2.123.554 4.197 1.606 6.04L0 24l6.117-1.605a11.837 11.837 0 005.925 1.586h.005c6.635 0 12.04-5.405 12.043-12.041a11.79 11.79 0 00-3.578-8.525z"/>
          </svg>
        </div>
      </a>

      <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FFAF04]/5 blur-[120px] -z-10 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#011A52]/5 blur-[100px] -z-10 rounded-full"></div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Column 1: Brand */}
            <div className="space-y-6">
              <Logo variant="standard" showText={true} className="h-12" />
              <p className="text-sm text-gray-500 leading-relaxed">
                The leading community-based travel operator in Cusco. Empowering local guides and providing authentic Andean experiences since 2018.
              </p>
              <div className="flex gap-4">
                {['facebook', 'instagram', 'tripadvisor', 'whatsapp'].map((social) => (
                  <button key={social} className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[#011A52] hover:bg-[#FFAF04] hover:text-white transition duration-300">
                    <span className="text-xs font-black uppercase tracking-tighter">{social.slice(0, 2)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Column 2: Expeditions */}
            <div>
              <h4 className="text-[#011A52] font-black uppercase tracking-widest text-xs mb-8">Our Expeditions</h4>
              <ul className="space-y-4">
                {['Free Walking Tour', 'Inca Trail Classic', 'Salkantay Trek', 'Amazon Manu Park', 'Rainbow Mountain'].map((item) => (
                  <li key={item}>
                    <Link to="/treks" className="text-sm text-gray-500 hover:text-[#FFAF04] transition flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFAF04]/30"></span>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h4 className="text-[#011A52] font-black uppercase tracking-widest text-xs mb-8">Contact Us</h4>
              <div className="space-y-4">
                <a href={WHATSAPP_LINK} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition">
                    📱
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">WhatsApp 24/7</p>
                    <p className="text-sm font-bold text-[#011A52]">+51 946 666 444</p>
                  </div>
                </a>
                <a href="mailto:auquiadventures@gmail.com" className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-[#011A52] group-hover:text-white transition">
                    📧
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Inquiry</p>
                    <p className="text-sm font-bold text-[#011A52]">hello@machupicchufreetours.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                    📍
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Office</p>
                    <p className="text-sm font-bold text-[#011A52]">Plaza de Armas, Cusco, Peru</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Trust */}
            <div>
              <h4 className="text-[#011A52] font-black uppercase tracking-widest text-xs mb-8">Newsletter</h4>
              <p className="text-xs text-gray-500 mb-6 leading-relaxed">Join 5,000+ adventurers for exclusive deals and mountain updates.</p>
              <form className="relative mb-8" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 text-xs focus:ring-2 focus:ring-[#FFAF04] transition"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-[#011A52] text-white px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest">
                  Join
                </button>
              </form>
              <div className="flex gap-4 opacity-40 grayscale hover:grayscale-0 transition duration-500">
                <span className="text-[10px] font-black text-[#011A52] border border-[#011A52] px-2 py-1 rounded">SAFE TRAVELS</span>
                <span className="text-[10px] font-black text-[#011A52] border border-[#011A52] px-2 py-1 rounded">DIRCETUR</span>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} Auqui Adventure • Machu Picchu Free Tours. Licensed Operator.
            </p>
            <div className="flex gap-8">
              {['About', 'Blog', 'Privacy', 'Terms'].map(link => (
                <Link key={link} to={`/${link.toLowerCase()}`} className="text-[10px] text-gray-300 uppercase font-black hover:text-[#FFAF04] transition tracking-widest">
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
