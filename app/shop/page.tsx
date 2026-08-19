"use client";

import { useState, useEffect, Suspense } from "react";
import { createClient } from '@supabase/supabase-js';
import { Montserrat, Poppins } from 'next/font/google';
import { useSearchParams } from 'next/navigation';

// Professional E-commerce Fonts
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Shop() {
  return (
    <Suspense fallback={<div className={`min-h-screen flex items-center justify-center tracking-widest text-sm uppercase text-stone-500 ${montserrat.className}`}>Loading Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get('category');

  const [cakes, setCakes] = useState<any[]>([]);
  const [filteredCakes, setFilteredCakes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState(urlCategory || "All Cakes");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEggless, setIsEggless] = useState(false);
  const [maxPrice, setMaxPrice] = useState(5000);

  const categories = [
    "All Cakes",
    "Birthday Cakes",
    "Wedding & Anniversary",
    "Kids Theme Cakes",
    "Premium Signature",
    "Dry & Tea Cakes",
    "Festive Specials"
  ];

  const customCakeMessage = "Hi Rupali! I would like to order a Custom Cake.%0A%0A*My Requirements:*%0A- Occasion: %0A- Flavor: %0A- Weight (kg): %0A- Date Needed: %0A- Reference Image: (I will attach below)";

  useEffect(() => {
    if (urlCategory) {
      setActiveCategory(urlCategory);
    }
  }, [urlCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*');
      if (data) {
        setCakes(data);
        setFilteredCakes(data);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = cakes;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(cake => 
        cake.name.toLowerCase().includes(query) || 
        (cake.description && cake.description.toLowerCase().includes(query))
      );
    }

    if (activeCategory !== "All Cakes") {
      result = result.filter(cake => {
        if (cake.category) {
          return cake.category.trim().toLowerCase() === activeCategory.trim().toLowerCase();
        }
        const text = `${cake.name} ${cake.description}`.toLowerCase();
        if (activeCategory === "Birthday Cakes") return text.includes('birthday') || text.includes('bday');
        if (activeCategory === "Wedding & Anniversary") return text.includes('wedding') || text.includes('anniversary') || text.includes('tier');
        if (activeCategory === "Kids Theme Cakes") return text.includes('kid') || text.includes('theme') || text.includes('cocomelon');
        if (activeCategory === "Premium Signature") return text.includes('truffle') || text.includes('premium') || text.includes('signature');
        if (activeCategory === "Dry & Tea Cakes") return text.includes('dry') || text.includes('tea') || text.includes('mawa');
        if (activeCategory === "Festive Specials") return text.includes('festive') || text.includes('hamper');
        return true;
      });
    }

    if (isEggless) {
      result = result.filter(cake => cake.is_eggless === true);
    }

    result = result.filter(cake => cake.price <= maxPrice);

    setFilteredCakes(result);
  }, [cakes, activeCategory, searchQuery, isEggless, maxPrice]);

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
              <button className="text-[#e70064] transition flex items-center gap-1 outline-none uppercase tracking-wide font-bold">
                Shop <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className="absolute left-0 top-full pt-4 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col transform group-hover:translate-y-1">
                <div className="bg-white border border-stone-200 shadow-xl flex flex-col py-2">
                  <a href="/shop" className="text-[#e70064] transition text-xs font-bold uppercase tracking-widest border-b border-stone-100 pb-2 px-6 py-3">All Cakes</a>
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

      {/* SHOP HEADER */}
      <div className="bg-stone-50 border-b border-stone-200 py-16 text-center px-6">
        <h1 className={`${montserrat.className} text-4xl md:text-5xl font-bold text-stone-900 mb-4`}>The Catalog</h1>
        <p className="text-stone-500 max-w-2xl mx-auto font-light text-sm tracking-wide">Explore our complete collection of freshly baked, handcrafted treats. Use the filters to find the perfect centerpiece for your celebration.</p>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-12">
        
        {/* LEFT SIDEBAR: CRISP FILTERS */}
        <aside className="w-full md:w-1/4 shrink-0 space-y-10">
          <div className="sticky top-40 bg-white p-6 rounded-sm shadow-sm border border-stone-200">
            
            <div className="mb-10">
              <label className={`${montserrat.className} text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4 block`}>Search</label>
              <input 
                type="text" 
                placeholder="Search catalog..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-[#e70064] text-sm bg-transparent transition-colors placeholder:text-stone-300"
              />
            </div>

            <div className="mb-10">
              <label className={`${montserrat.className} text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4 block`}>Collections</label>
              <ul className="space-y-4">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button 
                      onClick={() => setActiveCategory(cat)}
                      className={`${montserrat.className} text-sm w-full text-left transition tracking-wide ${activeCategory === cat ? 'text-[#e70064] font-bold' : 'text-stone-500 hover:text-stone-900 font-medium'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-10">
              <label className={`${montserrat.className} text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4 block`}>Dietary</label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${isEggless ? 'bg-[#e70064] border-[#e70064]' : 'border-stone-400 group-hover:border-[#e70064]'}`}>
                  {isEggless && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                </div>
                <input type="checkbox" className="hidden" checked={isEggless} onChange={() => setIsEggless(!isEggless)} />
                <span className={`${montserrat.className} text-sm font-semibold text-stone-600 tracking-wide group-hover:text-stone-900 transition`}>100% Eggless Only</span>
              </label>
            </div>

            <div className="mb-10">
              <label className={`${montserrat.className} text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4 flex justify-between`}>
                <span>Max Price</span>
                <span className="text-[#e70064]">₹{maxPrice}</span>
              </label>
              <input 
                type="range" 
                min="300" 
                max="5000" 
                step="100" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#e70064] h-1 bg-stone-200 rounded-none appearance-none cursor-pointer" 
              />
            </div>

            <button 
              onClick={() => {
                setActiveCategory("All Cakes");
                setSearchQuery("");
                setIsEggless(false);
                setMaxPrice(5000);
              }}
              className={`${montserrat.className} w-full py-3 text-[10px] font-bold tracking-[0.2em] uppercase text-stone-500 border border-stone-300 rounded-sm hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-colors`}
            >
              Clear Filters
            </button>

          </div>
        </aside>

        {/* RIGHT SIDE: PRODUCT GRID */}
        <div className="w-full md:w-3/4">
          <div className="mb-8 flex justify-between items-end border-b border-stone-200 pb-4">
            <h2 className={`${montserrat.className} text-3xl font-bold text-stone-900`}>{activeCategory}</h2>
            <span className={`${montserrat.className} text-xs text-stone-400 tracking-widest uppercase font-semibold`}>{filteredCakes.length} Results</span>
          </div>

          {loading ? (
            <div className={`${montserrat.className} py-32 text-center text-stone-400 text-sm tracking-widest uppercase font-bold`}>Loading catalog...</div>
          ) : filteredCakes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCakes.map((cake: any) => {
                
                // BACKWARD COMPATIBILITY LOGIC: Display "Starts at" only if there are multiple weights
                const hasMultiplePrices = cake.pricing && Array.isArray(cake.pricing) && cake.pricing.length > 1;

                return (
                  <div key={cake.id} className="group flex flex-col bg-white border border-stone-200 p-4 rounded-sm shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="w-full h-64 bg-stone-50 overflow-hidden mb-5 relative rounded-sm">
                      {cake.image_url ? (
                        <img src={cake.image_url} alt={cake.name} className="object-cover w-full h-full group-hover:scale-105 transition duration-700 ease-out" />
                      ) : (
                        <div className={`${montserrat.className} w-full h-full flex items-center justify-center text-stone-300 font-semibold text-xs tracking-widest uppercase`}>Image Pending</div>
                      )}
                      {cake.is_eggless && (
                        <div className={`${montserrat.className} absolute top-3 right-3 bg-white/95 backdrop-blur border border-stone-200 text-[#e70064] text-[9px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm shadow-sm`}>
                          Eggless
                        </div>
                      )}
                    </div>
                    
                    <div className="px-1 flex-grow flex flex-col">
                      <h4 className={`${montserrat.className} text-lg font-bold text-stone-900 mb-2 leading-tight`}>{cake.name}</h4>
                      <p className="text-stone-500 text-sm mb-6 flex-grow line-clamp-2 leading-relaxed font-light">{cake.description}</p>
                      
                      <div className="flex justify-between items-center pt-4 border-t border-stone-100 mt-auto">
                        <div className="flex flex-col">
                          {hasMultiplePrices && <span className={`${montserrat.className} text-[9px] font-bold text-stone-400 uppercase tracking-widest`}>Starts at</span>}
                          <span className={`${montserrat.className} font-bold text-lg text-stone-900`}>₹{cake.price}</span>
                        </div>
                        
                        {/* CHANGED FROM "ORDER NOW" TO "VIEW DETAILS" AND ROUTED TO UPCOMING PRODUCT DETAIL PAGE */}
                        <a href={`/shop/${cake.id}`} className={`${montserrat.className} bg-stone-900 text-white px-5 py-2.5 rounded-sm font-bold text-[10px] tracking-widest uppercase hover:bg-[#e70064] transition-colors shadow-sm`}>
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-32 text-center bg-stone-50 border border-stone-200 rounded-sm">
              <p className={`${montserrat.className} text-stone-500 font-bold text-sm tracking-widest uppercase mb-4`}>No creations found matching your criteria.</p>
              <button onClick={() => setActiveCategory("All Cakes")} className={`${montserrat.className} text-xs font-bold tracking-widest uppercase text-[#e70064] border-b border-[#e70064] pb-1 hover:text-stone-900 hover:border-stone-900 transition-colors`}>
                View All Collections
              </button>
            </div>
          )}
        </div>

      </main>

      {/* --- UNIFIED GLOBAL FOOTER START --- */}
      <footer className="bg-stone-900 text-white pt-20 pb-8 mt-12">
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