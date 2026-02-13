
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TOURS } from '../constants';

const Calendar: React.FC<{ selectedDate: string, onSelect: (date: string) => void }> = ({ selectedDate, onSelect }) => {
  const [currentView, setCurrentView] = useState(new Date());
  
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    setCurrentView(new Date(currentView.getFullYear(), currentView.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentView(new Date(currentView.getFullYear(), currentView.getMonth() + 1, 1));
  };

  const year = currentView.getFullYear();
  const month = currentView.getMonth();
  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
  }

  for (let d = 1; d <= totalDays; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dateObj = new Date(year, month, d);
    const isSelected = selectedDate === dateStr;
    const isPast = dateObj < today;
    const isToday = dateObj.getTime() === today.getTime();

    days.push(
      <button
        key={d}
        type="button"
        disabled={isPast}
        onClick={() => onSelect(dateStr)}
        className={`h-10 w-10 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center relative
          ${isPast ? 'text-gray-200 cursor-not-allowed' : 'text-[#011A52] hover:bg-[#FFAF04]/20'}
          ${isSelected ? 'bg-[#FFAF04] text-[#011A52] shadow-md scale-110' : ''}
          ${isToday && !isSelected ? 'border border-[#011A52]/20' : ''}
        `}
      >
        {d}
        {isToday && !isSelected && <div className="absolute bottom-1 w-1 h-1 bg-[#FFAF04] rounded-full"></div>}
      </button>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 w-full max-w-[320px] mx-auto sm:mx-0">
      <div className="flex items-center justify-between mb-6">
        <button type="button" onClick={handlePrevMonth} className="p-2 hover:bg-gray-50 rounded-full transition text-[#011A52]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h3 className="font-bold text-[#011A52]">{monthNames[month]} {year}</h3>
        <button type="button" onClick={handleNextMonth} className="p-2 hover:bg-gray-50 rounded-full transition text-[#011A52]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
          <div key={d} className="h-10 w-10 flex items-center justify-center text-[10px] font-black text-gray-400 uppercase tracking-tighter">
            {d}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
      
      {selectedDate && (
        <div className="mt-4 pt-4 border-t border-gray-50 text-center">
          <p className="text-[10px] font-bold text-[#FFAF04] uppercase tracking-widest">Selected Date</p>
          <p className="text-sm font-bold text-[#011A52]">{new Date(selectedDate).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
        </div>
      )}
    </div>
  );
};

const InquiryForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const preSelectedTour = queryParams.get('tourId');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tour: 'Free Walking Tour (Cusco)',
    time: '',
    date: '',
    guests: '1',
    language: 'English',
    message: ''
  });

  const [totalPrice, setTotalPrice] = useState(5);

  useEffect(() => {
    if (preSelectedTour) {
      const tour = TOURS.find(t => t.id === preSelectedTour);
      if (tour) {
        setFormData(prev => ({ ...prev, tour: tour.name }));
      }
    }
  }, [preSelectedTour]);

  useEffect(() => {
    const tour = TOURS.find(t => t.name === formData.tour);
    const guests = parseInt(formData.guests) || 1;
    
    let basePrice = 5; // Default for free tour spot security
    if (tour && tour.category !== 'Free' && tour.price) {
      const match = tour.price.match(/\d+/);
      basePrice = match ? parseInt(match[0]) : 0;
    }
    
    setTotalPrice(basePrice * guests);
  }, [formData.tour, formData.guests]);

  const isFreeTour = formData.tour === 'Free Walking Tour (Cusco)';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Manual validation for interactive components
    if (!formData.date) {
      alert("Please select a preferred date for your expedition using the calendar.");
      return;
    }
    if (isFreeTour && !formData.time) {
      alert("Please select a time for your walking tour (10:00 AM, 1:00 PM or 3:30 PM).");
      return;
    }

    // Data to send via WhatsApp and Email
    const bookingSummary = 
      `New Booking Request:\n` +
      `-------------------\n` +
      `Tour: ${formData.tour}\n` +
      `Date: ${formData.date}\n` +
      `Time: ${formData.time || 'N/A'}\n` +
      `Language: ${formData.language}\n` +
      `Guests: ${formData.guests}\n` +
      `Total Price: $${totalPrice}.00\n\n` +
      `Customer Info:\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Notes: ${formData.message}`;

    const waMessage = encodeURIComponent(bookingSummary);
    const emailSubject = encodeURIComponent(`new booking for ${formData.date}`);
    const emailBody = waMessage;
    
    // 1. Trigger WhatsApp (New Tab)
    window.open(`https://wa.me/51946666444?text=${waMessage}`, '_blank');
    
    // 2. Trigger Email (Client software)
    window.location.href = `mailto:auquiadventures@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    // 3. Prepare PayPal Link
    const itemName = encodeURIComponent(`Booking: ${formData.tour} (${formData.guests} guests)`);
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=auquiadventures@gmail.com&item_name=${itemName}&amount=${totalPrice}.00&currency_code=USD&return=${window.location.origin}/#/success`;

    // 4. Redirect to PayPal after a small delay to ensure email/wa triggered
    setTimeout(() => {
      window.location.href = paypalUrl;
    }, 1000);
  };

  const handleTourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tourName = e.target.value;
    setFormData({
      ...formData,
      tour: tourName,
      time: tourName.includes('Free') ? formData.time : ''
    });
  };

  return (
    <div className="bg-gray-50 py-24 px-6 pt-32">
      <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-[#011A52] p-12 text-white text-center">
          <h1 className="text-4xl font-bold mb-4">{isFreeTour ? 'Book Your Free Tour' : 'Secure Your Expedition'}</h1>
          <p className="opacity-80">
            {isFreeTour 
              ? "Join us for the best local introduction to Cusco. Fast, easy, and authentic."
              : "Quality small-group treks and jungle tours. Book your spot now."
            }
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 sm:p-12 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#011A52]">Full Name *</label>
              <input 
                required
                type="text" 
                placeholder="John Doe"
                className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#FFAF04] outline-none transition"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#011A52]">Email Address *</label>
              <input 
                required
                type="email" 
                placeholder="john@example.com"
                className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#FFAF04] outline-none transition"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#011A52]">Phone Number *</label>
              <input 
                required
                type="tel" 
                placeholder="+1 (555) 000-0000"
                className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#FFAF04] outline-none transition"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#011A52]">Preferred Language *</label>
              <div className="flex gap-4">
                {['English', 'Spanish'].map(lang => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setFormData({...formData, language: lang})}
                    className={`flex-1 py-4 rounded-2xl font-bold transition-all border-2 text-sm
                      ${formData.language === lang 
                        ? 'bg-[#011A52] border-[#011A52] text-white shadow-lg' 
                        : 'bg-white border-gray-100 text-[#011A52] hover:border-[#FFAF04]/50'
                      }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#011A52]">Adventure *</label>
              <div className="relative">
                <select 
                  required
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#FFAF04] outline-none transition appearance-none"
                  value={formData.tour}
                  onChange={handleTourChange}
                >
                  {TOURS.map(t => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
                  <option value="Custom Itinerary">Custom Itinerary</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center px-2 text-[#011A52]">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#011A52]">Number of Guests *</label>
              <input 
                required
                type="number" 
                min="1"
                className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#FFAF04] outline-none transition"
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: e.target.value})}
              />
            </div>
          </div>

          {isFreeTour && (
            <div className="space-y-4 animate-fadeIn">
              <label className="text-xs font-bold uppercase tracking-widest text-[#011A52]">Select Tour Time *</label>
              <div className="flex gap-4">
                {['10:00 AM', '1:00 PM', '3:30 PM'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData({ ...formData, time: t })}
                    className={`flex-1 py-4 rounded-2xl font-bold transition-all border-2 text-sm shadow-sm
                      ${formData.time === t
                        ? 'bg-[#FFAF04] border-[#FFAF04] text-[#011A52] shadow-md scale-[1.02]'
                        : 'bg-white border-gray-100 text-[#011A52] hover:border-[#FFAF04]/50'
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#011A52]">Select Preferred Date *</label>
                <Calendar 
                  selectedDate={formData.date} 
                  onSelect={(date) => setFormData({...formData, date})} 
                />
              </div>
            </div>
            
            <div className="space-y-8">
               <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#011A52]">Price Summary</label>
                <div className="bg-[#011A52] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition duration-500">
                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
                  </div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <p className="text-[10px] uppercase font-black tracking-widest text-[#FFAF04] mb-1">Price per Person</p>
                        <p className="text-xl font-bold">${(totalPrice / parseInt(formData.guests || "1")).toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-black tracking-widest text-[#FFAF04] mb-1">Guests</p>
                        <p className="text-xl font-bold">x {formData.guests}</p>
                      </div>
                    </div>
                    <div className="border-t border-white/20 pt-4 mt-4 flex justify-between items-center">
                      <span className="text-sm font-bold opacity-60">Total to Pay:</span>
                      <span className="text-4xl font-black text-[#FFAF04]">${totalPrice}.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {isFreeTour && (
                <div className="p-6 bg-[#FFAF04]/10 rounded-[2rem] border-2 border-dashed border-[#FFAF04] flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 bg-[#FFAF04] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-[#011A52] text-sm">⭐</span>
                  </div>
                  <h4 className="text-[#011A52] font-black uppercase tracking-[0.2em] text-xs">SECURE YOUR SPOT:</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">Spot protection fee via PayPal</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-[#011A52]">Message / Special Requirements</label>
            <textarea 
              rows={4}
              placeholder="Allergies, fitness level, or specific interests..."
              className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#FFAF04] outline-none transition resize-none"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#FFAF04] text-[#011A52] py-6 rounded-[2rem] font-black text-2xl hover:shadow-2xl transition transform hover:-translate-y-1 shadow-[0_15px_40px_rgba(255,175,4,0.3)] flex items-center justify-center gap-4"
          >
            Book now 🚀
          </button>
          
          <p className="text-center text-[10px] text-gray-400 uppercase font-bold tracking-widest">
            By clicking Book now, details will be sent via WhatsApp/Email and you'll be redirected to PayPal for payment.
          </p>
        </form>
      </div>
    </div>
  );
};

export default InquiryForm;
