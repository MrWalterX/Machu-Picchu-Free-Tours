
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Success: React.FC = () => {
  const location = useLocation();
  const tourName = location.state?.tour || "";
  const isFreeTour = tourName.includes("Free Walking Tour");

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-gray-50 pt-32 pb-24">
      <div className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl text-center animate-scaleUp border border-gray-100">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">
          ✓
        </div>
        <h1 className="text-3xl font-bold text-[#011A52] mb-4">
          {isFreeTour ? 'Booking Confirmed!' : 'Inquiry Received!'}
        </h1>
        <p className="text-gray-600 mb-10 leading-relaxed font-medium">
          {isFreeTour 
            ? "Your spot is reserved. We've sent the details to our guides. See you in the Plaza de Armas!"
            : "Our specialists are currently reviewing your request to craft the perfect itinerary. We'll get back to you within 12-24 hours."
          }
        </p>
        
        {isFreeTour && (
          <div className="bg-[#FFAF04]/10 p-6 rounded-3xl border border-[#FFAF04]/40 mb-10 text-left">
            <h3 className="text-[#011A52] font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="text-lg">🎁</span> Optional Secure Tip
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4 italic">
              "Secure your spot with a direct tip of $5USD payment made through PayPal to the account auquiadventures@gmail.com"
            </p>
            <a 
              href="https://www.paypal.com/paypalme/auquiadventures/5" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#011A52] text-white py-3 rounded-xl font-bold text-sm shadow-md hover:scale-[1.02] transition"
            >
              Pay via PayPal
            </a>
          </div>
        )}

        <div className="space-y-4 mb-10">
          <div className="flex items-start gap-4 text-left bg-gray-50 p-4 rounded-2xl">
            <span className="text-xl">📅</span>
            <div>
              <p className="text-sm font-bold text-[#011A52]">Information Logged</p>
              <p className="text-xs text-gray-500">Details sent via WhatsApp & Email.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 text-left bg-gray-50 p-4 rounded-2xl">
            <span className="text-xl">🏔️</span>
            <div>
              <p className="text-sm font-bold text-[#011A52]">Guide Alerted</p>
              <p className="text-xs text-gray-500">A local expert is now assigned to your date.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Link to="/" className="w-full bg-[#011A52] text-white py-4 rounded-2xl font-bold hover:bg-[#022574] transition">
            Back to Home
          </Link>
          <a href="https://wa.me/51946666444" className="w-full border-2 border-[#011A52] text-[#011A52] py-4 rounded-2xl font-bold hover:bg-gray-50 transition">
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default Success;
