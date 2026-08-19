"use client";

import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import { Montserrat, Poppins } from 'next/font/google';

// Professional E-commerce Fonts
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

// Connect to Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [cakes, setCakes] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Pre-written WhatsApp message
  const customCakeMessage = "Hi Rupali! I would like to order a Custom Cake.%0A%0A*My Requirements:*%0A- Occasion: %0A- Flavor: %0A- Weight (kg): %0A- Date Needed: %0A- Reference Image: (I will attach below)";

  // UPDATED: 4 Highly reliable, high-resolution cake images suitable for right-alignment
  const heroImages = [
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1563716113315-769502b748cb?auto=format&fit=crop&w=1920&q=80"
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*');
      if (data) setCakes(data);
    };
    fetchProducts();

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);

    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`min-h-screen bg-[#FAF9F6] text-stone-800 scroll-smooth ${poppins.className}`} id="home">
      
      {/* CRISP EDGE-TO-EDGE NAVBAR */}
      <header className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${scrolled ? "bg-white shadow-sm border-b border-stone-200" : "bg-gradient-to-b from-black/60 to-transparent"}`}>
        <div className={`max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center transition-all duration-300 ${scrolled ? "py-4" : "py-6"}`}>
          
          <h1 className={`${montserrat.className} text-2xl font-bold tracking-tight ${scrolled ? "text-stone-900" : "text-white"}`}>
            Cake By Rupali
          </h1>
          
          <nav className={`hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide uppercase ${montserrat.className} ${scrolled ? "text-stone-700" : "text-white"}`}>
            <a href="#home" className="hover:text-[#e70064] transition-colors">Home</a>
            
            <div className="group relative py-4">
              <button className="hover:text-[#e70064] transition flex items-center gap-1 outline-none uppercase tracking-wide font-semibold">
                Shop <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              <div className="absolute left-0 top-full w-60 bg-white border border-stone-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col transform group-hover:translate-y-1">
                <div className="p-4 text-stone-700 flex flex-col gap-3">
                  <a href="/shop" className="hover:text-[#e70064] transition text-xs font-bold uppercase tracking-widest border-b border-stone-100 pb-2">All Cakes</a>
                  <a href="/shop?category=Birthday+Cakes" className="hover:text-[#e70064] transition text-sm capitalize">Birthday Cakes</a>
                  <a href="/shop?category=Wedding+%26+Anniversary" className="hover:text-[#e70064] transition text-sm capitalize">Wedding & Anniversary</a>
                  <a href="/shop?category=Kids+Theme+Cakes" className="hover:text-[#e70064] transition text-sm capitalize">Kids & Theme Cakes</a>
                  <a href="/shop?category=Premium+Signature" className="hover:text-[#e70064] transition text-sm capitalize">Premium Signature</a>
                  <a href="/shop?category=Dry+%26+Tea+Cakes" className="hover:text-[#e70064] transition text-sm capitalize">Dry & Tea Cakes</a>
                </div>
                <div className="bg-stone-50 p-4 border-t border-stone-100">
                  <a href="/shop?category=Festive+Specials" className="text-[#e70064] font-semibold text-sm hover:text-pink-800 transition capitalize block">🎉 Festive Specials</a>
                </div>
              </div>
            </div>

            <a href="/custom-cake" className="hover:text-[#e70064] transition uppercase tracking-wide font-semibold">Custom Cake</a>
            <a href="/about" className="hover:text-[#e70064] transition uppercase tracking-wide font-semibold">About Us</a>
            <a href="/admin" className="hover:text-[#e70064] transition uppercase tracking-wide font-semibold text-stone-400">Admin</a>
          </nav>

          <a href="https://wa.me/917666660036" target="_blank" rel="noopener noreferrer" className={`${montserrat.className} px-6 py-3 text-xs font-bold tracking-wider uppercase transition-all duration-300 rounded-sm border ${scrolled ? "bg-stone-900 text-white border-stone-900 hover:bg-[#e70064] hover:border-[#e70064]" : "bg-white text-stone-900 border-white hover:bg-transparent hover:text-white"}`}>
            Order on WhatsApp
          </a>
        </div>
      </header>

      {/* FULL WIDTH HERO SECTION */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center justify-start pt-16">
        
        {/* Background Image Slider - Shifted right naturally with object-position */}
        <div className="absolute inset-0 z-0 bg-stone-900">
          {heroImages.map((img, index) => (
            <img 
              key={index} 
              src={img} 
              alt="Fresh Cake" 
              className={`absolute inset-0 w-full h-full object-cover object-[85%_center] md:object-right transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`} 
            />
          ))}
        </div>

        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 md:via-black/40 to-transparent z-10"></div>

        {/* Left-Aligned Text Content (Local wording) */}
        <div className="relative z-20 px-6 md:px-10 max-w-7xl mx-auto w-full flex flex-col items-start mt-10">
          <div className={`${montserrat.className} inline-flex items-center gap-2 px-6 py-2 border border-white/30 text-white text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-sm rounded-sm`}>
            <span className="text-[#e70064]">VIRAR'S FAVORITE CAKE SHOP</span>
          </div>
          
          <h2 className={`${montserrat.className} text-4xl md:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg text-left`}>
            Fresh Cakes,<br/> Baked with Love in <span className="text-[#e70064]">Virar.</span>
          </h2>
          
          <p className="text-base md:text-lg text-white/90 font-light max-w-xl mb-10 drop-shadow-md text-left">
            Birthday ho, anniversary ho, ya bas kuch meetha khane ka mann ho — we bake fresh cakes for every special moment.
          </p>
          
          <div className={`${montserrat.className} flex flex-col sm:flex-row gap-4`}>
            <a href="/shop" className="bg-[#e70064] text-white px-10 py-4 font-bold text-sm tracking-wider uppercase hover:bg-white hover:text-stone-900 transition-all rounded-sm border border-[#e70064] hover:border-white text-center">
              Shop Now
            </a>
            <a href="/custom-cake" className="bg-transparent text-white border border-white px-10 py-4 font-bold text-sm tracking-wider uppercase hover:bg-white hover:text-stone-900 transition-all rounded-sm backdrop-blur-sm text-center">
              Custom Order
            </a>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-12 w-full flex justify-center gap-3 z-20">
          {heroImages.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentSlide(idx)} className={`h-1.5 transition-all duration-500 rounded-sm ${idx === currentSlide ? "bg-[#e70064] w-8" : "bg-white/50 w-4 hover:bg-white"}`}></button>
          ))}
        </div>
      </section>

      {/* OVERLAPPING TRUST FACTORS */}
      <section className="relative -mt-10 z-30 max-w-6xl mx-auto px-6 mb-24">
        <div className="bg-white rounded-md p-6 md:p-10 shadow-lg border border-stone-100 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x divide-stone-100">
          {[ 
            { icon: "✨", title: "100% Fresh & Pure" }, 
            { icon: "🌿", title: "Eggless Options" }, 
            { icon: "🎨", title: "Perfect Finishing" }, 
            { icon: "🛵", title: "Safe Local Delivery" } 
          ].map((item, i) => (
            <div key={i} className={`group flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 cursor-default ${i === 0 || i === 2 ? 'pl-0' : ''}`}>
              <div className="text-[#e70064] text-2xl mb-3 transform transition-transform duration-300 group-hover:-translate-y-1">{item.icon}</div>
              <h4 className={`${montserrat.className} font-bold text-stone-800 text-xs tracking-wider uppercase`}>{item.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP BY CATEGORY SECTION */}
      <section id="categories" className="py-16 max-w-7xl mx-auto px-6 scroll-mt-28">
        <div className="flex flex-col items-center mb-12">
          <h3 className={`${montserrat.className} text-4xl font-bold text-stone-900 mb-3`}>Shop by Category</h3>
          <p className="text-stone-500 font-light">Har celebration ke liye perfect cake.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Birthday", img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80", link: "/shop?category=Birthday+Cakes" },
            { title: "Wedding", img: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80", link: "/shop?category=Wedding+%26+Anniversary" },
            { title: "Custom Cakes", img: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&q=80", link: "/custom-cake", text: "Custom Order ➔" },
            { title: "Tea Cakes", img: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80", link: "/shop?category=Dry+%26+Tea+Cakes" }
          ].map((cat, index) => (
            <a key={index} href={cat.link} className="group relative h-[350px] rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all block border border-stone-200">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition z-10"></div>
              <img src={cat.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={cat.title} />
              <div className="absolute bottom-6 left-6 z-20">
                <h4 className={`${montserrat.className} text-white text-2xl font-bold mb-1`}>{cat.title}</h4>
                <p className={`${montserrat.className} text-white/80 text-xs tracking-widest uppercase font-semibold group-hover:text-[#e70064] transition-colors`}>
                  {cat.text || "Shop Now ➔"}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section id="bestsellers" className="py-24 bg-stone-50 scroll-mt-28 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h3 className={`${montserrat.className} text-4xl font-bold text-stone-900 mb-2`}>Our Best Sellers</h3>
              <p className="text-stone-500 font-light">Virar's all-time favorites, loved by everyone.</p>
            </div>
            <a href="/shop" className={`${montserrat.className} text-xs font-bold uppercase tracking-widest text-[#e70064] hover:text-stone-900 transition border-b border-[#e70064] hover:border-stone-900 pb-1`}>
              View Entire Menu
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {cakes.length > 0 ? (
              cakes.slice(0, 4).map((cake: any) => (
                <a href={`/shop/${cake.id}`} key={cake.id} className="group flex flex-col bg-white border border-stone-200 p-3 rounded-sm shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-full aspect-square bg-stone-50 overflow-hidden mb-4 relative rounded-sm">
                    {cake.image_url ? (
                      <img src={cake.image_url} alt={cake.name} className="object-cover w-full h-full group-hover:scale-105 transition duration-700 ease-out" />
                    ) : (
                      <div className={`${montserrat.className} w-full h-full flex items-center justify-center text-stone-300 font-semibold text-[10px] tracking-widest uppercase`}>No Image</div>
                    )}
                    {cake.is_eggless && (
                      <div className={`${montserrat.className} absolute top-2 right-2 bg-white/95 backdrop-blur border border-stone-200 text-[#e70064] text-[8px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm shadow-sm`}>
                        Eggless
                      </div>
                    )}
                  </div>
                  <div className="flex-grow flex flex-col px-1">
                    <h4 className={`${montserrat.className} text-sm font-bold text-stone-900 mb-1 leading-tight line-clamp-1`}>{cake.name}</h4>
                    <p className="text-stone-500 text-xs mb-4 line-clamp-2 font-light min-h-[32px]">{cake.description}</p>
                    
                    <div className="flex justify-between items-center border-t border-stone-100 pt-3 mt-auto">
                      <div className="flex flex-col">
                        <span className={`${montserrat.className} text-[8px] font-bold text-stone-400 uppercase tracking-widest`}>Starts at</span>
                        <span className={`${montserrat.className} font-bold text-sm text-stone-900`}>₹{cake.price}</span>
                      </div>
                      <span className={`${montserrat.className} bg-stone-900 text-white px-3 md:px-4 py-2 rounded-sm font-semibold text-[9px] tracking-widest uppercase hover:bg-[#e70064] transition-colors shadow-sm`}>
                        View Details
                      </span>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div className="col-span-4 py-16 text-center bg-white border border-stone-200 rounded-md">
                <p className="text-stone-500 font-medium">Menu is currently empty. Add products in the Admin panel.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WHY US SECTION */}
      <section id="about" className="py-24 bg-white scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <img src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80" alt="Baking Process" className="rounded-md shadow-lg w-full h-[600px] object-cover border border-stone-100" />
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <h3 className={`${montserrat.className} text-4xl md:text-6xl font-bold text-stone-900 leading-tight`}>Why order from<br/><span className="text-[#e70064]">Cake By Rupali?</span></h3>
            <p className="text-stone-600 leading-relaxed font-light text-lg">
              We are based right here in Virar (East). Hum sirf cake nahi banate, memories banate hain. Every cake is baked fresh to make your celebration extra special.
            </p>
            <div className="space-y-6 mt-8 border-t border-stone-100 pt-8">
              <div className="flex items-start gap-4">
                <span className="text-[#e70064] font-bold text-xl mt-1">01.</span>
                <div>
                  <h5 className={`${montserrat.className} font-bold text-stone-900 text-sm tracking-wide uppercase mb-1`}>100% Fresh & Pure</h5>
                  <p className="text-stone-500 text-sm font-light">No stale cakes. Baked fresh to order with pure ingredients.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-[#e70064] font-bold text-xl mt-1">02.</span>
                <div>
                  <h5 className={`${montserrat.className} font-bold text-stone-900 text-sm tracking-wide uppercase mb-1`}>Perfect Finishing</h5>
                  <p className="text-stone-500 text-sm font-light">Beautiful designs that look great and taste even better.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-[#e70064] font-bold text-xl mt-1">03.</span>
                <div>
                  <h5 className={`${montserrat.className} font-bold text-stone-900 text-sm tracking-wide uppercase mb-1`}>Easy WhatsApp Ordering</h5>
                  <p className="text-stone-500 text-sm font-light">No complicated apps. Just message us on WhatsApp to discuss your order.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM TESTIMONIALS */}
      <section className="py-24 bg-stone-100 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className={`${montserrat.className} text-4xl font-bold text-center text-stone-900 mb-16`}>Virar Loves Our Cakes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "The Black Forest cake was absolutely divine! The finishing was so professional, it looked like it came from a 5-star hotel. Highly recommended.", name: "Priya M.", initials: "PM" },
              { text: "Ordered a custom Cocomelon theme cake for my son's 1st birthday. Rupali nailed the design perfectly and the eggless chocolate flavor was a hit!", name: "Rahul D.", initials: "RD" },
              { text: "Best tea cakes in Virar! The mawa cake brings back so many memories. Ordering through WhatsApp was also super easy and convenient.", name: "Sneha S.", initials: "SS" }
            ].map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-sm shadow-sm hover:shadow-lg transition-all duration-300 border border-stone-200 relative group hover:-translate-y-1 flex flex-col">
                <div className="text-[#e70064] text-5xl font-serif absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">"</div>
                <div className="flex text-yellow-500 mb-6 text-xs gap-0.5">★★★★★</div>
                <p className="text-stone-600 mb-8 font-light text-sm leading-relaxed flex-grow italic z-10">"{t.text}"</p>
                
                <div className="flex items-center gap-4 mt-auto border-t border-stone-100 pt-6">
                  <div className={`${montserrat.className} w-10 h-10 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center text-xs font-bold`}>
                    {t.initials}
                  </div>
                  <div>
                    <h5 className={`${montserrat.className} font-bold text-stone-900 text-[10px] tracking-widest uppercase mb-1`}>{t.name}</h5>
                    <p className={`${montserrat.className} text-stone-400 text-[8px] uppercase tracking-widest`}>Verified Review</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h3 className={`${montserrat.className} text-3xl md:text-4xl font-bold text-stone-900 mb-2`}>Follow the Journey</h3>
            <p className="text-stone-500 font-light">Fresh bakes delivered daily on our feed.</p>
          </div>
          <a href="#" className={`${montserrat.className} text-xs font-bold tracking-widest uppercase text-[#e70064] hover:text-stone-900 transition`}>
            @CakeByRupali
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80" alt="IG Post" className="aspect-square w-full object-cover rounded-md hover:opacity-80 transition cursor-pointer shadow-sm border border-stone-100" />
          <img src="https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&q=80" alt="IG Post" className="aspect-square w-full object-cover rounded-md hover:opacity-80 transition cursor-pointer shadow-sm border border-stone-100" />
          <img src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80" alt="IG Post" className="aspect-square w-full object-cover rounded-md hover:opacity-80 transition cursor-pointer shadow-sm border border-stone-100" />
          <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80" alt="IG Post" className="aspect-square w-full object-cover rounded-md hover:opacity-80 transition cursor-pointer shadow-sm border border-stone-100" />
        </div>
      </section>

      {/* VIBRANT CTA BANNER */}
      <section className="bg-[#e70064] text-white py-24 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className={`${montserrat.className} text-4xl md:text-5xl font-bold mb-6`}>Koi special celebration aane wala hai?</h2>
          <p className="text-pink-100 text-lg mb-10 font-light max-w-2xl mx-auto">Chhota sa birthday ho ya grand wedding, let's make it extra sweet.</p>
          <a href="/custom-cake" className={`${montserrat.className} bg-white text-[#e70064] px-10 py-4 rounded-sm font-bold text-xs tracking-widest uppercase hover:bg-stone-900 hover:text-white transition-colors duration-300 shadow-md inline-block border border-white hover:border-stone-900`}>
            Order Your Custom Cake
          </a>
        </div>
      </section>

      {/* EDGE-TO-EDGE E-COMMERCE FOOTER */}
      <footer className="bg-stone-900 text-white pt-20 pb-8 mt-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          <div className="md:col-span-4">
            <h2 className={`${montserrat.className} text-2xl font-bold tracking-tight mb-4`}>Cake By Rupali.</h2>
            <p className="text-stone-400 text-sm font-light leading-relaxed mb-8 max-w-sm">
              Freshly baked, delicious cakes made with love in Virar. Making your everyday celebrations extra sweet.
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
              <li><a href="#about" className="hover:text-white transition">Our Story</a></li>
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

    </div>
  );
}
