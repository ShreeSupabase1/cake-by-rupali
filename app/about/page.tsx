"use client";

import { Montserrat, Poppins } from 'next/font/google';

// Professional E-commerce Fonts
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export default function AboutPage() {
  const customCakeMessage = "Hi Rupali! I would like to order a Custom Cake.%0A%0A*My Requirements:*%0A- Occasion: %0A- Flavor: %0A- Weight (kg): %0A- Date Needed: %0A- Reference Image: (I will attach below)";

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

            <a href="/custom-cake" className="hover:text-[#e70064] transition uppercase tracking-wide font-semibold">Custom Cake</a>
            <a href="/about" className="text-[#e70064] transition uppercase tracking-wide font-bold">About Us</a>
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

      {/* PAGE HEADER BANNER */}
      <div className="bg-stone-50 border-b border-stone-200 py-16 text-center px-6">
        <span className={`${montserrat.className} text-[#e70064] font-bold tracking-[0.2em] uppercase text-[10px] mb-4 block`}>Our Heritage & Passion</span>
        <h1 className={`${montserrat.className} text-4xl md:text-5xl font-bold text-stone-900 mb-4`}>Baked with Love in Virar</h1>
        <p className="text-stone-500 max-w-2xl mx-auto font-light text-sm tracking-wide">
          Discover the story behind Cake By Rupali—where homemade warmth meets professional confectionery artistry.
        </p>
      </div>

      {/* MAIN STORY SECTION */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row gap-16 items-center mb-24">
          <div className="w-full md:w-1/2 relative">
            {/* Crisp Square/Slightly Rounded Image */}
            <div className="absolute -inset-4 bg-stone-100 rounded-sm transform -rotate-1 -z-10 border border-stone-200"></div>
            <img 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80" 
              alt="Baking in Kitchen" 
              className="rounded-sm shadow-md w-full h-[450px] object-cover border border-stone-200"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className={`${montserrat.className} text-3xl md:text-4xl font-bold text-stone-900 leading-tight`}>
              From a Home Kitchen to <br/><span className="text-[#e70064]">Virar's Favorite Bakery.</span>
            </h2>
            <p className="text-stone-600 leading-relaxed font-light">
              Cake By Rupali began with a simple belief: that commercial bakeries could never replicate the soul, care, and quality of a truly homemade bake. Founded in Virar (East), Maharashtra, what started as a passion for experimenting with rich chocolates and fluffy sponges has blossomed into a trusted name for local celebrations.
            </p>
            <p className="text-stone-600 leading-relaxed font-light">
              We specialize in delivering a professional, crisp finish that rivals high-end luxury hotels, while retaining the comforting, wholesome goodness of home baking.
            </p>
          </div>
        </div>

        {/* OUR CORE PROMISES */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className={`${montserrat.className} text-3xl md:text-4xl font-bold text-stone-900 mb-4`}>The Rupali Standard</h2>
            <p className="text-stone-500 font-light text-sm tracking-wide">Every cake that leaves our kitchen is bound by four non-negotiable promises to you and your family.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-sm shadow-sm border border-stone-200 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-stone-50 text-[#e70064] border border-stone-100 rounded-sm flex items-center justify-center text-2xl mx-auto mb-6">🌿</div>
              <h3 className={`${montserrat.className} text-lg font-bold text-stone-900 mb-3 uppercase tracking-wide`}>100% Fresh & Pure</h3>
              <p className="text-stone-500 text-sm font-light leading-relaxed">Dedicated eggless options and premium vegetarian ingredients tailored for the Mumbai palate.</p>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-sm border border-stone-200 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-stone-50 text-[#e70064] border border-stone-100 rounded-sm flex items-center justify-center text-2xl mx-auto mb-6">✨</div>
              <h3 className={`${montserrat.className} text-lg font-bold text-stone-900 mb-3 uppercase tracking-wide`}>Zero Preservatives</h3>
              <p className="text-stone-500 text-sm font-light leading-relaxed">Baked strictly to order. No shelf-sitting sponges, no artificial chemicals—just pure ingredients.</p>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-sm border border-stone-200 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-stone-50 text-[#e70064] border border-stone-100 rounded-sm flex items-center justify-center text-2xl mx-auto mb-6">🎨</div>
              <h3 className={`${montserrat.className} text-lg font-bold text-stone-900 mb-3 uppercase tracking-wide`}>Crisp Artistry</h3>
              <p className="text-stone-500 text-sm font-light leading-relaxed">Meticulous icing, sharp fondant edges, and custom themes designed to make your jaws drop.</p>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-sm border border-stone-200 text-center hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 bg-stone-50 text-[#e70064] border border-stone-100 rounded-sm flex items-center justify-center text-2xl mx-auto mb-6">🤝</div>
              <h3 className={`${montserrat.className} text-lg font-bold text-stone-900 mb-3 uppercase tracking-wide`}>Personal Touch</h3>
              <p className="text-stone-500 text-sm font-light leading-relaxed">Direct communication over WhatsApp to customize flavor profiles, weights, and delivery times.</p>
            </div>
          </div>
        </div>

        {/* COMMUNITY & LOCATION CALLOUT */}
        <div className="bg-white rounded-sm p-10 md:p-16 shadow-md border border-stone-200 text-center max-w-4xl mx-auto mb-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#e70064]"></div>
          <h3 className={`${montserrat.className} text-3xl font-bold text-stone-900 mb-6`}>Proudly Serving Virar & Beyond</h3>
          <p className="text-stone-600 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you are planning an intimate family birthday in Virar East, a grand anniversary milestone, or a festive celebration across Mumbai, we ensure your cake arrives pristine and fresh.
          </p>
          <div className={`${montserrat.className} flex flex-col sm:flex-row justify-center gap-4`}>
            <a href="/shop" className="bg-[#e70064] text-white px-8 py-4 rounded-sm font-bold text-xs tracking-widest uppercase hover:bg-pink-700 transition shadow-sm border border-[#e70064]">
              Browse Collections
            </a>
            <a href="/custom-cake" className="bg-transparent text-stone-900 border border-stone-900 px-8 py-4 rounded-sm font-bold text-xs tracking-widest uppercase hover:bg-stone-900 hover:text-white transition shadow-sm">
              Design Custom Cake
            </a>
          </div>
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
              <li><a href="/custom-cake" className="hover:text-white transition">Custom Orders</a></li>
              <li><a href="/about" className="hover:text-white transition">Our Story</a></li>
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