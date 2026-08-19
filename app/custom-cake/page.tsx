"use client";

import { useState } from "react";
import { Montserrat, Poppins } from 'next/font/google';

// Professional E-commerce Fonts
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export default function CustomCakePage() {
  const [occasion, setOccasion] = useState("Birthday");
  const [flavor, setFlavor] = useState("Chocolate Truffle");
  const [weight, setWeight] = useState("1 kg");
  const [dietary, setDietary] = useState("Eggless");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct pre-written WhatsApp message
    const message = `Hi Rupali! I would like to order a Custom Cake.%0A%0A*My Requirements:*%0A- Occasion: ${occasion}%0A- Flavor/Theme: ${flavor}%0A- Weight: ${weight}%0A- Dietary: ${dietary}%0A- Date Needed: ${date || "Not specified"}%0A- Special Notes: ${notes || "None"}%0A%0A*(I will attach my reference image below)*`;

    window.open(`https://wa.me/917666660036?text=${message}`, '_blank');
  };

  return (
    <div className={`min-h-screen bg-[#FAF9F6] text-stone-800 ${poppins.className}`}>
      
      {/* --- UNIFIED GLOBAL HEADER START --- */}
      <header className="sticky top-0 w-full z-50 bg-white shadow-sm border-b border-stone-200">
        <div className={`bg-stone-900 text-white text-[10px] md:text-xs font-light tracking-[0.2em] uppercase text-center py-2.5 ${montserrat.className}`}>
          Delivering Premium Freshness Across Virar & Mumbai
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center py-4">
          <a href="/" className={`${montserrat.className} text-2xl font-bold tracking-tight text-stone-900`}>
            Cake By Rupali.
          </a>
          
          <nav className={`hidden md:flex items-center gap-10 text-xs font-semibold tracking-wide uppercase ${montserrat.className} text-stone-700`}>
            <a href="/" className="hover:text-[#e70064] transition-colors">Home</a>
            
            <div className="group relative py-2">
              <button className="hover:text-[#e70064] transition flex items-center gap-1 outline-none uppercase tracking-wide font-semibold">
                Shop <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className="absolute left-0 top-full pt-4 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col transform group-hover:translate-y-1">
                <div className="bg-white border border-stone-200 shadow-xl flex flex-col py-2">
                  <a href="/shop" className="hover:text-[#e70064] transition text-xs font-bold uppercase tracking-widest border-b border-stone-100 pb-2 px-6 py-3">All Cakes</a>
                  <a href="/shop?category=Birthday+Cakes" className="hover:text-[#e70064] transition text-sm capitalize px-6 py-3">Birthday Cakes</a>
                  <a href="/shop?category=Wedding+%26+Anniversary" className="hover:text-[#e70064] transition text-sm capitalize px-6 py-3">Wedding & Anniversary</a>
                  <a href="/shop?category=Kids+Theme+Cakes" className="hover:text-[#e70064] transition text-sm capitalize px-6 py-3">Kids & Theme Cakes</a>
                  <a href="/shop?category=Premium+Signature" className="hover:text-[#e70064] transition text-sm capitalize px-6 py-3">Premium Signature</a>
                  <a href="/shop?category=Dry+%26+Tea+Cakes" className="hover:text-[#e70064] transition text-sm capitalize px-6 py-3">Dry & Tea Cakes</a>
                </div>
                <div className="bg-stone-50 p-4 border-t border-stone-100">
                  <a href="/shop?category=Festive+Specials" className="text-[#e70064] font-semibold text-sm hover:text-pink-800 transition capitalize block">🎉 Festive Specials</a>
                </div>
              </div>
            </div>

            <a href="/custom-cake" className="text-[#e70064] transition uppercase tracking-wide font-bold">Custom Cake</a>
            <a href="/about" className="hover:text-[#e70064] transition uppercase tracking-wide font-semibold">About Us</a>
          </nav>

          <div className="flex items-center gap-6">
            <a href="/admin" className={`${montserrat.className} hidden md:block text-xs font-bold tracking-widest uppercase text-stone-400 hover:text-stone-900 transition`}>Admin</a>
            <a href="https://wa.me/917666660036" target="_blank" rel="noopener noreferrer" className={`${montserrat.className} bg-stone-900 text-white px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#e70064] transition-colors duration-300 rounded-sm`}>
              Order on WhatsApp
            </a>
          </div>
        </div>
      </header>
      {/* --- UNIFIED GLOBAL HEADER END --- */}

      {/* PAGE HEADER */}
      <div className="bg-stone-50 border-b border-stone-200 py-16 text-center px-6">
        <h1 className={`${montserrat.className} text-4xl md:text-5xl font-bold text-stone-900 mb-4`}>Bespoke Creations</h1>
        <p className="text-stone-500 max-w-2xl mx-auto font-light text-sm tracking-wide">Fill out your celebration details below. Clicking submit will securely package your request directly to Rupali via WhatsApp.</p>
      </div>

      {/* CUSTOM FORM CONTAINER */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="bg-white p-8 md:p-12 rounded-sm shadow-sm border border-stone-200">
          
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Occasion */}
            <div>
              <label className={`${montserrat.className} block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-3`}>Select Occasion *</label>
              <select 
                value={occasion} 
                onChange={(e) => setOccasion(e.target.value)}
                className="w-full border border-stone-200 p-3.5 rounded-sm focus:outline-none focus:border-[#e70064] bg-stone-50 text-sm font-medium transition-colors"
              >
                <option value="Birthday">Birthday</option>
                <option value="Wedding">Wedding</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Baby Shower">Baby Shower</option>
                <option value="Kids Theme Party">Kids Theme Party</option>
                <option value="Festive Celebration">Festive Celebration</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Flavor / Theme Description */}
            <div>
              <label className={`${montserrat.className} block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-3`}>Flavor or Theme Details *</label>
              <input 
                type="text" 
                required
                value={flavor}
                onChange={(e) => setFlavor(e.target.value)}
                placeholder="e.g. Chocolate Truffle or Cocomelon Theme"
                className="w-full border border-stone-200 p-3.5 rounded-sm focus:outline-none focus:border-[#e70064] bg-stone-50 text-sm transition-colors placeholder:text-stone-400"
              />
            </div>

            {/* Weight & Dietary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className={`${montserrat.className} block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-3`}>Approximate Weight *</label>
                <select 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full border border-stone-200 p-3.5 rounded-sm focus:outline-none focus:border-[#e70064] bg-stone-50 text-sm font-medium transition-colors"
                >
                  <option value="0.5 kg">0.5 kg (Half Kg)</option>
                  <option value="1.0 kg">1.0 kg (One Kg)</option>
                  <option value="1.5 kg">1.5 kg</option>
                  <option value="2.0 kg">2.0 kg</option>
                  <option value="3+ kg">3+ kg (Grand Celebration)</option>
                </select>
              </div>

              <div>
                <label className={`${montserrat.className} block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-3`}>Dietary Preference *</label>
                <select 
                  value={dietary} 
                  onChange={(e) => setDietary(e.target.value)}
                  className="w-full border border-stone-200 p-3.5 rounded-sm focus:outline-none focus:border-[#e70064] bg-stone-50 text-sm font-medium transition-colors"
                >
                  <option value="100% Eggless">100% Eggless</option>
                  <option value="Regular (Contains Egg)">Regular (Contains Egg)</option>
                  <option value="Jain Friendly">Jain Friendly</option>
                </select>
              </div>
            </div>

            {/* Date Needed */}
            <div>
              <label className={`${montserrat.className} block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-3`}>Date Needed By *</label>
              <input 
                type="date" 
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-stone-200 p-3.5 rounded-sm focus:outline-none focus:border-[#e70064] bg-stone-50 text-sm transition-colors"
              />
            </div>

            {/* Special Notes */}
            <div>
              <label className={`${montserrat.className} block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-3`}>Special Instructions</label>
              <textarea 
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention any specific color themes, writing on cake, or allergen concerns..."
                className="w-full border border-stone-200 p-3.5 rounded-sm focus:outline-none focus:border-[#e70064] bg-stone-50 text-sm transition-colors placeholder:text-stone-400"
              ></textarea>
            </div>

            {/* Notice about Image */}
            <div className="bg-stone-50 p-4 rounded-sm border border-stone-200 text-xs text-stone-600 font-light leading-relaxed">
              <span className="font-bold text-stone-900">Note:</span> Once WhatsApp opens with your pre-written details, feel free to attach any reference photo or design inspiration image directly in the chat.
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`${montserrat.className} w-full bg-stone-900 text-white p-4 rounded-sm font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#e70064] transition-colors duration-300 shadow-md flex items-center justify-center gap-3 mt-4`}
            >
              Send Request via WhatsApp ➔
            </button>

          </form>

        </div>
      </main>

      {/* --- UNIFIED GLOBAL FOOTER START --- */}
      <footer className="bg-stone-900 text-white pt-20 pb-8 mt-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          <div className="md:col-span-4">
            <h2 className={`${montserrat.className} text-2xl font-bold tracking-tight mb-4`}>Cake By Rupali.</h2>
            <p className="text-stone-400 text-sm font-light leading-relaxed mb-8 max-w-sm">
              Premium handcrafted cakes designed with professional perfection in Virar. Elevating everyday celebrations into unforgettable memories.
            </p>
            <div className="flex gap-4">
              <a href="#" className={`${montserrat.className} w-10 h-10 border border-stone-700 rounded-sm flex items-center justify-center text-xs font-bold hover:bg-[#e70064] hover:border-[#e70064] transition-colors cursor-pointer text-stone-300 hover:text-white`}>IG</a>
              <a href="#" className={`${montserrat.className} w-10 h-10 border border-stone-700 rounded-sm flex items-center justify-center text-xs font-bold hover:bg-[#e70064] hover:border-[#e70064] transition-colors cursor-pointer text-stone-300 hover:text-white`}>FB</a>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <h4 className={`${montserrat.className} font-bold text-xs uppercase tracking-widest mb-6 text-stone-100`}>Quick Links</h4>
            <ul className="space-y-4 text-sm font-light text-stone-400">
              <li><a href="/shop" className="hover:text-white transition">Shop Cakes</a></li>
              <li><a href="/custom-cake" className="hover:text-white transition">Custom Cake</a></li>
              <li><a href="/about" className="hover:text-white transition">About Us</a></li>
              <li><a href="/admin" className="hover:text-white transition">Admin Portal</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className={`${montserrat.className} font-bold text-xs uppercase tracking-widest mb-6 text-stone-100`}>Contact Us</h4>
            <ul className="space-y-4 text-sm font-light text-stone-400">
              <li className="flex gap-3 items-center"><span className="text-[#e70064]">📍</span> Virar (East), Maharashtra</li>
              <li className="flex gap-3 items-center"><span className="text-[#e70064]">📞</span> +91 76666 60036</li>
            </ul>
            <div className="mt-8 p-4 bg-stone-800/50 rounded-sm border border-stone-800">
              <p className={`${montserrat.className} text-[10px] text-stone-500 mb-1 uppercase tracking-widest font-semibold`}>FSSAI Registration</p>
              <p className="text-sm text-stone-300 font-light">(Update in Admin)</p>
            </div>
          </div>

        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-stone-500 tracking-wide">
          <p>&copy; {new Date().getFullYear()} Cake By Rupali. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/admin" className="hover:text-white transition">Admin Portal</a>
            <span>Designed for the modern web.</span>
          </div>
        </div>
      </footer>
      {/* --- UNIFIED GLOBAL FOOTER END --- */}

    </div>
  );
}