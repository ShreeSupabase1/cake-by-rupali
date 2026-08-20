"use client";

import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import { Montserrat, Poppins, Playfair_Display } from 'next/font/google';

// Professional E-commerce & Premium Editorial Fonts
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], style: ['normal', 'italic'] });

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

  // The 4 attached cake images for the Hero slider
  const heroImages = [
    "/hero-1.jpg", 
    "/hero-2.jpg", 
    "/hero-3.jpg", 
    "/hero-4.jpg"  
  ];

  const handleNext = () => setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  const handlePrev = () => setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*');
      if (data) setCakes(data);
    };
    fetchProducts();

    const timer = setInterval(() => {
      handleNext();
    }, 6000);

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
    <div className={`min-h-screen bg-[#FAF9F6] text-[#3E2723] scroll-smooth ${poppins.className}`} id="home">
      
      {/* ========================================================= */}
      {/* 1. EXACT EXISTING HEADER (UNTOUCHED AS REQUESTED)         */}
      {/* ========================================================= */}
      <header className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${scrolled ? "bg-white shadow-sm border-b border-stone-200" : "bg-gradient-to-b from-black/80 to-transparent"}`}>
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

      {/* ========================================================= */}
      {/* SECTION 1: DARK FULL-WIDTH HERO (REVERTED TO PREVIOUS)    */}
      {/* ========================================================= */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center justify-start bg-[#0d0907]">
        
        {/* Background Image Slider */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, index) => (
            <img 
              key={index} 
              src={img} 
              alt="Fresh Cake" 
              className={`absolute inset-0 w-full h-full object-cover object-[75%_center] transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`} 
            />
          ))}
        </div>

        {/* Elegant Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0907]/95 via-[#0d0907]/60 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0907]/90 via-transparent to-transparent z-10 md:hidden"></div>

        {/* Left-Aligned Text Content */}
        <div className="relative z-20 px-6 md:px-10 max-w-7xl mx-auto w-full flex flex-col items-start mt-8 md:mt-16">
          
          <div className="flex items-center gap-2 mb-4">
            <span className={`${montserrat.className} text-[#dcb562] text-sm md:text-base italic tracking-wide`}>Made Fresh. Made Happy.</span>
            <svg className="w-5 h-5 text-[#e70064]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
          </div>
          
          <h2 className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 drop-shadow-2xl text-left tracking-tight`}>
            Fresh Cakes,<br/> Baked with Love<br/> in <span className="text-[#e70064]">Virar.</span>
          </h2>

          <div className="flex items-center gap-4 mb-6 opacity-80">
            <div className="h-[1px] bg-[#e70064] w-12"></div>
            <svg className="w-3 h-3 text-[#e70064]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            <div className="h-[1px] bg-[#e70064] w-12"></div>
          </div>
          
          <p className="text-base md:text-lg text-white/90 font-light max-w-md mb-10 drop-shadow-md text-left leading-relaxed">
            Birthday ho, anniversary ho, ya bas kuch meetha khane ka mann ho — we bake fresh cakes for every special moment.
          </p>
          
          <div className={`${montserrat.className} flex flex-col sm:flex-row gap-4`}>
            <a href="/shop" className="bg-[#e70064] text-white px-8 py-3.5 font-bold text-xs tracking-wider uppercase hover:bg-white hover:text-stone-900 transition-all rounded-sm shadow-lg text-center">
              Shop Now
            </a>
            <a href="/custom-cake" className="bg-transparent text-white border border-white/50 px-8 py-3.5 font-bold text-xs tracking-wider uppercase hover:bg-white/10 transition-all rounded-sm backdrop-blur-sm text-center">
              Custom Order
            </a>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8 z-20 pointer-events-none">
          <button onClick={handlePrev} className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full border border-white/30 bg-black/20 text-white hover:bg-[#e70064] hover:border-[#e70064] transition-all backdrop-blur-sm hidden md:flex">
            <svg className="w-5 h-5 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button onClick={handleNext} className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full border border-white/30 bg-black/20 text-white hover:bg-[#e70064] hover:border-[#e70064] transition-all backdrop-blur-sm hidden md:flex">
            <svg className="w-5 h-5 pl-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>

        <div className="absolute bottom-16 md:bottom-24 w-full flex justify-center gap-3 z-20">
          {heroImages.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentSlide(idx)} className={`w-2 h-2 transition-all duration-500 rounded-full ${idx === currentSlide ? "bg-[#e70064]" : "bg-white/70 hover:bg-white"}`}></button>
          ))}
        </div>

        {/* Premium Multi-Layer Wave Transition */}
        <div className="absolute bottom-0 left-0 w-full z-20 overflow-hidden leading-none pointer-events-none transform translate-y-[1px]">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[80px] md:h-[160px] block">
            <path fill="#FAF9F6" fillOpacity="0.4" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            <path fill="#FAF9F6" fillOpacity="1" d="M0,192L48,181.3C96,171,192,149,288,149.3C384,149,480,171,576,192C672,213,768,235,864,218.7C960,203,1056,149,1152,133.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: QUICK TRUST STRIP                              */}
      {/* ========================================================= */}
      <section className="relative z-30 max-w-6xl mx-auto px-6 mb-24 mt-4 md:mt-8">
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

      {/* ========================================================= */}
      {/* SECTION 3: SHOP BY CATEGORY (Fixed images)                */}
      {/* ========================================================= */}
      <section id="categories" className="py-16 max-w-7xl mx-auto px-6 scroll-mt-28">
        <div className="flex flex-col items-center mb-12 text-center">
          <h3 className={`${playfair.className} text-4xl md:text-5xl font-bold text-[#3E2723] mb-4`}>Find a Cake for Every Celebration</h3>
          <p className="text-stone-500 font-light text-lg">Har celebration ke liye kuch special.</p>
        </div>
        
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-visible no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
          {[
            { title: "Birthday Cakes", sub: "For the special day", img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80", link: "/shop?category=Birthday+Cakes" },
            { title: "Wedding & Anniversary", sub: "For your forever moments", img: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80", link: "/shop?category=Wedding+%26+Anniversary" },
            { title: "Kids & Theme Cakes", sub: "Made for little smiles", img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80", link: "/shop?category=Kids+Theme+Cakes" },
            { title: "Premium Signature", sub: "For something extra special", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80", link: "/shop?category=Premium+Signature" },
            { title: "Dry & Tea Cakes", sub: "Perfect with your chai", img: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80", link: "/shop?category=Dry+%26+Tea+Cakes" },
            { title: "Festive Specials", sub: "Made for the season", img: "https://images.unsplash.com/photo-1602351447937-745cb720612f?auto=format&fit=crop&q=80", link: "/shop?category=Festive+Specials" },
            { title: "Custom Cakes", sub: "Your idea. Your cake.", img: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&q=80", link: "/custom-cake" }
          ].map((cat, index) => (
            <a key={index} href={cat.link} className="group relative min-w-[260px] md:min-w-0 h-[320px] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all block border border-stone-100 snap-center">
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A1B18]/90 via-[#2A1B18]/20 to-transparent transition z-10"></div>
              <img src={cat.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={cat.title} />
              <div className="absolute bottom-6 left-6 z-20 pr-4">
                <h4 className={`${playfair.className} text-white text-2xl font-bold mb-1`}>{cat.title}</h4>
                <p className="text-white/80 text-[11px] font-light mb-3">{cat.sub}</p>
                <div className={`${montserrat.className} text-[#FFF0F5] text-[10px] tracking-widest uppercase font-bold group-hover:text-[#e70064] transition-colors flex items-center gap-2`}>
                  Shop Now <span className="text-lg leading-none">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ORGANIC WAVE TRANSITION 2 */}
      <div className="w-full -mt-1 z-20 relative pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[40px] md:h-[60px] block text-white">
          <path fill="currentColor" d="M0,32L120,37.3C240,43,480,53,720,48C960,43,1200,21,1320,10.7L1440,0L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"></path>
        </svg>
      </div>

      {/* ========================================================= */}
      {/* SECTION 4: BEST SELLERS                                   */}
      {/* ========================================================= */}
      <section id="bestsellers" className="py-24 bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h3 className={`${playfair.className} text-4xl md:text-5xl font-bold text-[#3E2723] mb-3`}>Our Best Sellers</h3>
              <p className="text-stone-500 font-light text-lg">Virar's favourites, freshly baked and loved by our customers.</p>
            </div>
            <a href="/shop" className={`${montserrat.className} text-[10px] font-bold uppercase tracking-[0.2em] text-[#e70064] hover:text-[#3E2723] transition pb-1`}>
              View Entire Menu →
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {cakes.length > 0 ? (
              cakes.slice(0, 4).map((cake: any) => (
                <a href={`/shop/${cake.id}`} key={cake.id} className="group flex flex-col bg-white border border-stone-100 p-4 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-full aspect-square bg-[#FAF9F6] overflow-hidden mb-5 relative rounded-3xl">
                    {cake.image_url ? (
                      <img src={cake.image_url} alt={cake.name} className="object-cover w-full h-full group-hover:scale-105 transition duration-700 ease-out" />
                    ) : (
                      <div className={`${montserrat.className} w-full h-full flex items-center justify-center text-stone-300 font-semibold text-[10px] tracking-widest uppercase`}>No Image</div>
                    )}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <div className={`${montserrat.className} bg-white/95 backdrop-blur text-[#3E2723] text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full shadow-sm`}>
                        Bestseller
                      </div>
                      {cake.is_eggless && (
                        <div className={`${montserrat.className} bg-[#e70064]/90 backdrop-blur text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full shadow-sm`}>
                          Eggless
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-grow flex flex-col px-2">
                    <h4 className={`${playfair.className} text-xl font-bold text-[#3E2723] mb-2 leading-tight line-clamp-1`}>{cake.name}</h4>
                    <p className="text-stone-500 text-xs mb-5 line-clamp-2 font-light min-h-[32px] leading-relaxed">{cake.description}</p>
                    
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex flex-col">
                        <span className={`${montserrat.className} text-[9px] font-bold text-stone-400 uppercase tracking-widest`}>Starts at</span>
                        <span className={`${montserrat.className} font-bold text-lg text-[#3E2723]`}>₹{cake.price}</span>
                      </div>
                      <span className={`${montserrat.className} bg-[#FFF0F5] text-[#e70064] px-4 py-2.5 rounded-full font-bold text-[10px] tracking-widest uppercase hover:bg-[#e70064] hover:text-white transition-colors`}>
                        Details
                      </span>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div className="col-span-1 lg:col-span-4 py-20 text-center bg-[#FAF9F6] border border-stone-100 rounded-[2rem]">
                <div className="text-4xl mb-4">🍰</div>
                <h4 className={`${playfair.className} text-2xl font-bold text-[#3E2723] mb-2`}>Menu is currently updating</h4>
                <p className="text-stone-500 font-light">Please check back shortly or visit our admin panel to add products.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5: CAKE DISCOVERY                                 */}
      {/* ========================================================= */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <h3 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#3E2723] mb-4`}>Not Sure Which Cake to Choose?</h3>
          <p className="text-stone-500 font-light text-lg mb-12">Tell us what you're celebrating — we'll help you pick.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { label: "Birthday", icon: "🎂", link: "/shop?category=Birthday+Cakes" },
              { label: "Anniversary", icon: "💍", link: "/shop?category=Wedding+%26+Anniversary" },
              { label: "Kids", icon: "🎈", link: "/shop?category=Kids+Theme+Cakes" },
              { label: "Just Because", icon: "❤️", link: "/shop" }
            ].map((item, i) => (
              <a key={i} href={item.link} className="flex flex-col items-center justify-center bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <span className="text-4xl md:text-5xl mb-4">{item.icon}</span>
                <span className={`${montserrat.className} font-bold text-[#3E2723] text-[11px] uppercase tracking-widest`}>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 6: WHY CHOOSE CAKE BY RUPALI                      */}
      {/* ========================================================= */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <img src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80" alt="Baking Process" className="rounded-[3rem] shadow-xl w-full h-[500px] md:h-[650px] object-cover" />
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <span className={`${montserrat.className} text-[#e70064] font-bold tracking-[0.2em] text-[10px] uppercase block`}>WHY CHOOSE US</span>
            <h3 className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#3E2723] leading-tight`}>
              Homemade<br/>Tastes Different.
            </h3>
            <p className="text-stone-600 leading-relaxed font-light text-lg">
              We are based right here in Virar (East). Hum sirf cake nahi banate, memories banate hain. Every cake is prepared in small batches with attention to flavour, freshness and detail.
            </p>
            <div className="space-y-6 mt-8 pt-8">
              {[
                { title: "100% Fresh & Pure", desc: "No stale cakes. Baked fresh to order with pure ingredients." },
                { title: "Perfect Finishing", desc: "Beautiful designs that look great and taste even better." },
                { title: "Easy WhatsApp Ordering", desc: "No complicated apps. Just message us directly to discuss." },
                { title: "Made for Your Occasion", desc: "Every detail customized exactly how you want it." }
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-5">
                  <span className={`${montserrat.className} text-pink-200 font-extrabold text-2xl mt-0.5`}>0{idx + 1}</span>
                  <div>
                    <h5 className={`${montserrat.className} font-bold text-[#3E2723] text-xs tracking-widest uppercase mb-1.5`}>{point.title}</h5>
                    <p className="text-stone-500 text-sm font-light leading-relaxed">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 7: FROM OUR KITCHEN (Fixed large photography)     */}
      {/* ========================================================= */}
      <section className="py-24 bg-[#FAF9F6] border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <h3 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#3E2723] mb-4`}>Made Fresh in Our Kitchen</h3>
          <p className="text-stone-500 font-light text-lg mb-16 max-w-2xl mx-auto">Every cake starts with fresh ingredients, careful preparation and a lot of attention to detail.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Mix", img: "https://images.unsplash.com/photo-1556910103-1c02745a872e?auto=format&fit=crop&w=800&q=80" },
              { step: "02", title: "Bake", img: "https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&w=800&q=80" },
              { step: "03", title: "Decorate", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80" },
              { step: "04", title: "Pack", img: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80" }
            ].map((process, i) => (
              <div key={i} className="flex flex-col items-center group">
                {/* Replaced tiny circles with large, stunning vertical cards */}
                <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 relative shadow-md">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10"></div>
                  <img src={process.img} alt={process.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  <div className="absolute bottom-4 right-4 z-20 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg text-[#e70064] font-bold">
                    {process.step}
                  </div>
                </div>
                <h4 className={`${playfair.className} font-bold text-2xl text-[#3E2723]`}>{process.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORGANIC WAVE TRANSITION 3 */}
      <div className="w-full -mt-1 z-20 relative pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[40px] md:h-[80px] block text-[#FFF0F5]">
          <path fill="currentColor" d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>

      {/* ========================================================= */}
      {/* SECTION 8: CUSTOM CAKES                                   */}
      {/* ========================================================= */}
      <section className="py-24 bg-[#FFF0F5] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/40 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2 space-y-8 z-10 text-center md:text-left">
            <h3 className={`${playfair.className} text-5xl md:text-6xl font-extrabold text-[#3E2723] leading-[1.1]`}>
              You Imagine It.<br/>We Bake It.
            </h3>
            <p className="text-[#3E2723]/80 leading-relaxed font-light text-lg">
              Birthday, anniversary, baby shower or a special surprise — share your idea and let us create a cake around your celebration.
            </p>
            
            <a href="/custom-cake" className={`${montserrat.className} inline-block bg-[#e70064] text-white px-10 py-4 font-bold text-xs tracking-widest uppercase hover:bg-[#3E2723] transition-colors rounded-full shadow-lg`}>
              Create My Custom Cake →
            </a>
            
            <div className="pt-10 mt-10 border-t border-pink-200/50 text-left">
              <ul className="space-y-4">
                {[
                  "Share Your Idea",
                  "Choose Your Flavour",
                  "Choose Your Size",
                  "Confirm on WhatsApp"
                ].map((step, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <span className={`${montserrat.className} flex items-center justify-center w-6 h-6 rounded-full bg-white text-[#e70064] text-[10px] font-bold shadow-sm`}>
                      {idx + 1}
                    </span>
                    <span className={`${montserrat.className} text-xs font-bold uppercase tracking-widest text-[#3E2723]`}>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 relative">
            <img src="https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&q=80" alt="Custom Designer Cake" className="rounded-t-full rounded-b-[4rem] shadow-2xl border-8 border-white w-full h-[500px] md:h-[700px] object-cover" />
          </div>
        </div>
      </section>

      {/* ORGANIC WAVE TRANSITION 4 */}
      <div className="w-full -mt-1 z-20 relative pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[40px] md:h-[80px] block text-white">
          <path fill="currentColor" d="M0,32L120,37.3C240,43,480,53,720,48C960,43,1200,21,1320,10.7L1440,0L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"></path>
        </svg>
      </div>

      {/* ========================================================= */}
      {/* SECTION 9: CAKE SIZE GUIDE                                */}
      {/* ========================================================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <h3 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#3E2723] mb-12`}>How Much Cake Do You Need?</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { size: "0.5 KG", people: "2–4 People" },
              { size: "1.0 KG", people: "6–10 People" },
              { size: "1.5 KG", people: "10–14 People" },
              { size: "2.0 KG", people: "14–20 People" }
            ].map((item, i) => (
              <div key={i} className="bg-[#FAF9F6] border border-stone-100 p-8 rounded-3xl flex flex-col items-center justify-center hover:border-pink-200 transition-colors">
                <span className={`${montserrat.className} text-3xl md:text-4xl font-extrabold text-[#3E2723] mb-2`}>{item.size}</span>
                <div className="h-[1px] w-8 bg-[#e70064] mb-3"></div>
                <span className="text-stone-500 text-sm font-medium">{item.people}</span>
              </div>
            ))}
          </div>
          <p className="text-stone-400 text-xs mt-8 font-light">* Serving sizes are approximate. Contact us for multi-tier or larger party sizes.</p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 10: CUSTOMER REVIEWS                              */}
      {/* ========================================================= */}
      <section className="py-24 bg-[#FAF9F6] border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h3 className={`${playfair.className} text-4xl md:text-5xl font-bold text-[#3E2723] mb-4`}>Virar Loves Our Cakes ❤️</h3>
            <p className="text-stone-500 font-light text-lg">Real celebrations. Real customers. Real cake love.</p>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 md:grid md:grid-cols-3 md:overflow-visible no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
            {[
              { text: "The Black Forest cake was absolutely divine! The finishing was so professional, it looked like it came from a 5-star hotel. Highly recommended.", name: "Priya M.", cake: "Black Forest" },
              { text: "Ordered a custom Cocomelon theme cake for my son's 1st birthday. Rupali nailed the design perfectly and the eggless chocolate flavor was a hit!", name: "Rahul D.", cake: "Custom Theme Cake" },
              { text: "Best tea cakes in Virar! The mawa cake brings back so many memories. Ordering through WhatsApp was also super easy and convenient.", name: "Sneha S.", cake: "Mawa Tea Cake" }
            ].map((t, i) => (
              <div key={i} className="min-w-[300px] md:min-w-0 bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 flex flex-col snap-center relative">
                <div className="text-pink-100 text-6xl font-serif absolute top-6 right-8 leading-none">"</div>
                <div className="flex text-yellow-400 mb-6 text-sm gap-1">★★★★★</div>
                <p className="text-stone-600 mb-8 font-light text-sm leading-relaxed flex-grow italic relative z-10">"{t.text}"</p>
                
                <div className="mt-auto border-t border-stone-50 pt-6">
                  <h5 className={`${montserrat.className} font-bold text-[#3E2723] text-xs tracking-widest uppercase mb-1`}>{t.name}</h5>
                  <p className="text-stone-400 text-[10px] uppercase tracking-wider">Ordered: {t.cake}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 11: CELEBRATION GALLERY                           */}
      {/* ========================================================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
          <h3 className={`${playfair.className} text-4xl font-bold text-[#3E2723] mb-12`}>Made for Moments Like These</h3>
          
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            <img src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80" className="w-full rounded-2xl object-cover hover:opacity-90 transition" alt="Gallery" />
            <img src="https://images.unsplash.com/photo-1563716113315-769502b748cb?auto=format&fit=crop&q=80" className="w-full rounded-2xl object-cover hover:opacity-90 transition" alt="Gallery" />
            <img src="https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&q=80" className="w-full rounded-2xl object-cover hover:opacity-90 transition" alt="Gallery" />
            <img src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80" className="w-full rounded-2xl object-cover hover:opacity-90 transition" alt="Gallery" />
            <img src="https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&q=80" className="w-full rounded-2xl object-cover hover:opacity-90 transition" alt="Gallery" />
            <img src="https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80" className="w-full rounded-2xl object-cover hover:opacity-90 transition" alt="Gallery" />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 12: INSTAGRAM                                     */}
      {/* ========================================================= */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-4 text-center md:text-left">
            <div>
              <h3 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#3E2723] mb-2`}>Fresh From Our Kitchen</h3>
              <p className="text-stone-500 font-light">See what we're baking, decorating and delivering.</p>
            </div>
            <a href="#" className={`${montserrat.className} text-xs font-bold tracking-widest uppercase text-[#e70064] hover:text-[#3E2723] transition flex items-center gap-2`}>
              Follow @CakeByRupali <span className="text-lg leading-none">→</span>
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <img src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80" alt="IG Post" className="aspect-square w-full object-cover rounded-2xl hover:opacity-80 transition cursor-pointer shadow-sm" />
            <img src="https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&q=80" alt="IG Post" className="aspect-square w-full object-cover rounded-2xl hover:opacity-80 transition cursor-pointer shadow-sm" />
            <img src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80" alt="IG Post" className="aspect-square w-full object-cover rounded-2xl hover:opacity-80 transition cursor-pointer shadow-sm hidden md:block" />
            <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80" alt="IG Post" className="aspect-square w-full object-cover rounded-2xl hover:opacity-80 transition cursor-pointer shadow-sm" />
            <img src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80" alt="IG Post" className="aspect-square w-full object-cover rounded-2xl hover:opacity-80 transition cursor-pointer shadow-sm" />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 13: ORDERING PROCESS                              */}
      {/* ========================================================= */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#3E2723] mb-16`}>Ordering Your Cake is Easy</h3>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 relative">
            {/* Connecting line desktop */}
            <div className="hidden md:block absolute top-6 left-10 right-10 h-[1px] bg-pink-200 -z-10 border-dashed border-t border-pink-300"></div>
            
            {[
              { step: "01", title: "Choose Your Cake" },
              { step: "02", title: "Message Us on WhatsApp" },
              { step: "03", title: "Confirm & Celebrate" }
            ].map((p, i) => (
              <div key={i} className="flex flex-col items-center bg-white px-4">
                <div className={`${montserrat.className} w-12 h-12 rounded-full bg-[#FFF0F5] text-[#e70064] flex items-center justify-center font-bold text-lg mb-4 shadow-sm`}>
                  {p.step}
                </div>
                <h4 className={`${montserrat.className} font-bold text-xs uppercase tracking-widest text-[#3E2723]`}>{p.title}</h4>
              </div>
            ))}
          </div>

          <p className="text-stone-500 font-light text-sm mb-8">Need help choosing? Just message us — we'll help you find the right cake.</p>
          <a href="https://wa.me/917666660036" target="_blank" rel="noopener noreferrer" className={`${montserrat.className} inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-[#128C7E] transition-colors shadow-lg`}>
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 14: FINAL CTA (Blush Pink)                        */}
      {/* ========================================================= */}
      <section className="py-0 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
          <div className="bg-[#FFF0F5] rounded-[3rem] overflow-hidden flex flex-col md:flex-row items-center shadow-sm">
            <div className="w-full md:w-1/2 h-[300px] md:h-[450px]">
              <img src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80" alt="Celebration" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 p-12 md:p-16 text-center md:text-left">
              <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-[#3E2723] mb-6 leading-tight`}>Koi Special Celebration<br/>Aane Wala Hai?</h2>
              <p className="text-[#3E2723]/80 text-lg mb-10 font-light">Chhota sa birthday ho ya grand celebration, let's make it extra sweet.</p>
              <div className={`${montserrat.className} flex flex-col sm:flex-row gap-4 justify-center md:justify-start`}>
                <a href="/shop" className="bg-[#e70064] text-white px-8 py-4 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-[#3E2723] transition-colors shadow-md text-center">
                  Order Your Cake
                </a>
                <a href="/custom-cake" className="bg-white text-[#3E2723] px-8 py-4 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-stone-50 transition-colors shadow-sm border border-pink-100 text-center">
                  Create Custom Cake
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ORGANIC WAVE TRANSITION 5 (To Footer) */}
      <div className="w-full -mt-24 z-20 relative pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-[40px] md:h-[80px] block text-stone-900">
          <path fill="currentColor" d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>

      {/* ========================================================= */}
      {/* 15. EXACT EXISTING FOOTER (UNTOUCHED LOGIC)               */}
      {/* ========================================================= */}
      <footer className="bg-stone-900 text-white pt-20 pb-8 mt-0">
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
