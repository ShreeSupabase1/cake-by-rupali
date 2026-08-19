"use client";

import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import { Montserrat, Poppins } from 'next/font/google';

// 1. Professional E-commerce Fonts
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

  const heroImages = [
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80"
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
      if (window.scrollY > 20) setScrolled(true);
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
      
      {/* CRISP EDGE-TO-EDGE NAVBAR (Updated for Light Theme Hero) */}
      <header className={`fixed w-full z-50 transition-all duration-300 ease-in-out bg-white/95 backdrop-blur-md ${scrolled ? "shadow-sm border-b border-stone-200 py-3" : "py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
          
          <h1 className={`${montserrat.className} text-2xl font-bold tracking-tight text-stone-900`}>
            Cake By Rupali
          </h1>
          
          <nav className={`hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide uppercase ${montserrat.className} text-stone-700`}>
            <a href="#home" className="hover:text-[#e70064] transition-colors">Home</a>
            
            {/* Shop Dropdown Routing to Shop Page */}
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

            {/* Routes to Custom Cake Page */}
            <a href="/custom-cake" className="hover:text-[#e70064] transition uppercase tracking-wide font-semibold">Custom Cake</a>
            <a href="/about" className="hover:text-[#e70064] transition uppercase tracking-wide font-semibold">About Us</a>
            <a href="/admin" className="hover:text-[#e70064] transition uppercase tracking-wide font-semibold text-stone-400">Admin</a>
          </nav>

          <a href="https://wa.me/917666660036" target="_blank" rel="noopener noreferrer" className={`${montserrat.className} px-6 py-3 text-xs font-bold tracking-wider uppercase transition-all duration-300 rounded-sm border bg-stone-900 text-white border-stone-900 hover:bg-[#e70064] hover:border-[#e70064]`}>
            Order on WhatsApp
          </a>
        </div>
      </header>

      {/* NEW PREMIUM HERO SECTION (Split Layout) */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FAF9F6] -z-10 rounded-bl-[200px] hidden md:block"></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left: Typography & CTA */}
          <div className="w-full md:w-1/2 z-10 text-center md:text-left pt-10 md:pt-0">
            <div className={`${montserrat.className} inline-flex items-center gap-2 px-4 py-1.5 bg-pink-50 text-[#e70064] text-[10px] font-bold tracking-[0.2em] uppercase mb-6 rounded-sm border border-pink-100`}>
              <span className="w-2 h-2 rounded-full bg-[#e70064] animate-pulse"></span>
              Virar's Premium Bakery
            </div>
            
            <h2 className={`${montserrat.className} text-4xl md:text-5xl lg:text-6xl font-extrabold text-stone-900 leading-[1.1] mb-6`}>
              Handcrafted Happiness,<br/> Baked Fresh in <span className="text-[#e70064]">Virar.</span>
            </h2>
            
            <p className="text-base lg:text-lg text-stone-500 font-light max-w-lg mx-auto md:mx-0 mb-10 leading-relaxed">
              Experience the perfect blend of premium ingredients and professional finishing. Elevate your most special moments with our bespoke creations.
            </p>
            
            <div className={`${montserrat.className} flex flex-col sm:flex-row justify-center md:justify-start gap-4`}>
              <a href="/shop" className="bg-[#e70064] text-white px-10 py-4 font-bold text-xs tracking-widest uppercase hover:bg-stone-900 transition-all rounded-sm shadow-md border border-[#e70064] hover:border-stone-900">
                Shop Our Menu
              </a>
              <a href="/custom-cake" className="bg-white text-stone-900 border border-stone-200 px-10 py-4 font-bold text-xs tracking-widest uppercase hover:border-stone-900 transition-all rounded-sm hover:shadow-sm">
                Request Custom Cake
              </a>
            </div>
          </div>

          {/* Right: Elegant Image Carousel */}
          <div className="w-full md:w-1/2 relative h-[400px] md:h-[550px] z-10 w-full max-w-md md:max-w-none mx-auto">
            <div className="absolute inset-0 rounded-[40px] md:rounded-[80px] overflow-hidden shadow-2xl border-4 border-white/50 bg-stone-100">
              {heroImages.map((img, index) => (
                <img key={index} src={img} alt="Premium Cake Carousel" className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`} />
              ))}
              
              {/* Carousel Indicators */}
              <div className="absolute bottom-6 w-full flex justify-center gap-2 z-20">
                {heroImages.map((_, idx) => (
                  <button key={idx} onClick={() => setCurrentSlide(idx)} className={`h-1.5 transition-all duration-500 rounded-full ${idx === currentSlide ? "bg-white w-8 shadow-sm" : "bg-white/50 w-2 hover:bg-white/80"}`}></button>
                ))}
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink-100 rounded-full -z-10 mix-blend-multiply blur-xl"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-yellow-100 rounded-full -z-10 mix-blend-multiply blur-xl"></div>
          </div>
        </div>
      </section>

      {/* NEW PREMIUM FLOATING TRUST FACTORS */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 -mt-8 mb-24 hidden md:block">
        <div className="bg-white rounded-xl shadow-xl border border-stone-100 p-8 grid grid-cols-4 gap-8 divide-x divide-stone-100">
          {[ 
            { icon: <svg className="w-6 h-6 text-[#e70064]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>, title: "Premium Ingredients", desc: "No compromises on quality" }, 
            { icon: <svg className="w-6 h-6 text-[#e70064]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>, title: "100% Eggless Option", desc: "Available for all flavors" }, 
            { icon: <svg className="w-6 h-6 text-[#e70064]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>, title: "Professional Finish", desc: "Crisp and elegant designs" }, 
            { icon: <svg className="w-6 h-6 text-[#e70064]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>, title: "Fresh Delivery", desc: "Safely delivered in Virar" } 
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center px-4">
              <div className="bg-pink-50 p-4 rounded-full mb-4">{item.icon}</div>
              <h4 className={`${montserrat.className} font-bold text-stone-900 text-xs tracking-wider uppercase mb-1`}>{item.title}</h4>
              <p className="text-[10px] text-stone-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP BY CATEGORY SECTION (Standardized Card Styling) */}
      <section id="categories" className="py-16 md:pt-8 md:pb-24 max-w-7xl mx-auto px-6 scroll-mt-28">
        <div className="flex flex-col items-center mb-12 text-center">
          <h3 className={`${montserrat.className} text-3xl md:text-4xl font-bold text-stone-900 mb-3`}>Explore Our Collections</h3>
          <p className="text-stone-500 font-light">Find the perfect handcrafted treat for your next occasion.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <a href="/shop?category=Birthday+Cakes" className="group relative h-[320px] rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all block border border-stone-200">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition z-10"></div>
            <img src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="Birthday" />
            <div className="absolute bottom-6 left-6 z-20">
              <h4 className={`${montserrat.className} text-white text-2xl font-bold mb-1`}>Birthday</h4>
              <p className={`${montserrat.className} text-stone-300 text-[10px] tracking-widest uppercase font-bold group-hover:text-[#e70064] transition-colors`}>Shop Now ➔</p>
            </div>
          </a>
          <a href="/shop?category=Wedding+%26+Anniversary" className="group relative h-[320px] rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all block border border-stone-200">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition z-10"></div>
            <img src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="Wedding" />
            <div className="absolute bottom-6 left-6 z-20">
              <h4 className={`${montserrat.className} text-white text-2xl font-bold mb-1`}>Wedding</h4>
              <p className={`${montserrat.className} text-stone-300 text-[10px] tracking-widest uppercase font-bold group-hover:text-[#e70064] transition-colors`}>Shop Now ➔</p>
            </div>
          </a>
          <a href="/custom-cake" className="group relative h-[320px] rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all block border border-stone-200">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition z-10"></div>
            <img src="https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&q=80" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="Custom" />
            <div className="absolute bottom-6 left-6 z-20">
              <h4 className={`${montserrat.className} text-white text-2xl font-bold mb-1`}>Bespoke</h4>
              <p className={`${montserrat.className} text-stone-300 text-[10px] tracking-widest uppercase font-bold group-hover:text-[#e70064] transition-colors`}>Custom Order ➔</p>
            </div>
          </a>
          <a href="/shop?category=Dry+%26+Tea+Cakes" className="group relative h-[320px] rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all block border border-stone-200">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition z-10"></div>
            <img src="https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt="Dry Cakes" />
            <div className="absolute bottom-6 left-6 z-20">
              <h4 className={`${montserrat.className} text-white text-2xl font-bold mb-1`}>Tea Cakes</h4>
              <p className={`${montserrat.className} text-stone-300 text-[10px] tracking-widest uppercase font-bold group-hover:text-[#e70064] transition-colors`}>Shop Now ➔</p>
            </div>
          </a>
        </div>
      </section>

      {/* BEST SELLERS (Updated to Compact Shop UI) */}
      <section id="bestsellers" className="py-24 bg-stone-50 scroll-mt-28 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h3 className={`${montserrat.className} text-3xl md:text-4xl font-bold text-stone-900 mb-2`}>Our Best Sellers</h3>
              <p className="text-stone-500 font-light">The most loved flavors chosen by our customers.</p>
            </div>
            <a href="/shop" className={`${montserrat.className} text-[10px] font-bold uppercase tracking-[0.2em] text-[#e70064] hover:text-stone-900 transition flex items-center gap-2 group`}>
              View Entire Menu <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cakes.length > 0 ? (
              cakes.slice(0, 4).map((cake: any) => (
                <div key={cake.id} className="group flex flex-col bg-white border border-stone-200 p-3 rounded-sm shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-full aspect-square bg-stone-100 overflow-hidden mb-4 relative rounded-sm">
                    {cake.image_url ? (
                      <img src={cake.image_url} alt={cake.name} className="object-cover w-full h-full group-hover:scale-105 transition duration-700 ease-out" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-300 text-xs">No Image</div>
                    )}
                    {cake.is_eggless && (
                      <div className={`${montserrat.className} absolute top-2 right-2 bg-white/95 backdrop-blur border border-stone-200 text-[#e70064] text-[8px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm shadow-sm`}>
                        Eggless
                      </div>
                    )}
                  </div>
                  <div className="flex-grow flex flex-col">
                    <h4 className={`${montserrat.className} text-sm font-bold text-stone-900 mb-1 leading-tight line-clamp-1`}>{cake.name}</h4>
                    <p className="text-stone-500 text-xs mb-4 line-clamp-2 font-light min-h-[32px]">{cake.description}</p>
                    
                    <div className="flex justify-between items-center border-t border-stone-100 pt-3 mt-auto">
                      <div className="flex flex-col">
                        <span className={`${montserrat.className} text-[8px] font-bold text-stone-400 uppercase tracking-widest`}>Starts at</span>
                        <span className={`${montserrat.className} font-bold text-sm text-stone-900`}>₹{cake.price}</span>
                      </div>
                      <a href={`/shop/${cake.id}`} className={`${montserrat.className} bg-stone-50 border border-stone-200 text-stone-900 px-4 py-2 rounded-sm font-semibold text-[9px] tracking-widest uppercase hover:bg-[#e70064] hover:text-white hover:border-[#e70064] transition-colors`}>
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-4 py-16 text-center bg-white border border-stone-200 rounded-sm">
                <p className="text-stone-500 font-medium text-sm">Menu is currently empty. Add products in the Admin panel.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CRISP EDITORIAL 'WHY US' SECTION */}
      <section id="about" className="py-24 bg-white scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-0 bg-[#e70064]/5 -translate-x-4 -translate-y-4 rounded-sm -z-10"></div>
            <img src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80" alt="Baking Process" className="rounded-sm shadow-xl w-full h-[500px] md:h-[600px] object-cover border border-stone-100" />
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <h3 className={`${montserrat.className} text-4xl md:text-5xl lg:text-6xl font-extrabold text-stone-900 leading-tight`}>Why choose<br/><span className="text-[#e70064]">Cake By Rupali?</span></h3>
            <p className="text-stone-500 leading-relaxed font-light text-base lg:text-lg">
              Based in Virar (East), we don't just bake cakes; we craft memories. Every single order is treated with the utmost care, ensuring a stunning visual finish and an unforgettable taste.
            </p>
            <div className="space-y-6 mt-8 border-t border-stone-100 pt-8">
              <div className="flex items-start gap-5">
                <span className={`${montserrat.className} text-[#e70064] font-extrabold text-xl mt-0.5 opacity-50`}>01</span>
                <div>
                  <h5 className={`${montserrat.className} font-bold text-stone-900 text-sm tracking-wide uppercase mb-1.5`}>No Preservatives</h5>
                  <p className="text-stone-500 text-sm font-light leading-relaxed">Baked fresh to order with zero chemical preservatives or artificial enhancers.</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <span className={`${montserrat.className} text-[#e70064] font-extrabold text-xl mt-0.5 opacity-50`}>02</span>
                <div>
                  <h5 className={`${montserrat.className} font-bold text-stone-900 text-sm tracking-wide uppercase mb-1.5`}>Attention to Detail</h5>
                  <p className="text-stone-500 text-sm font-light leading-relaxed">Professional icing and fondant work guaranteeing a crisp, high-end look.</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <span className={`${montserrat.className} text-[#e70064] font-extrabold text-xl mt-0.5 opacity-50`}>03</span>
                <div>
                  <h5 className={`${montserrat.className} font-bold text-stone-900 text-sm tracking-wide uppercase mb-1.5`}>Hassle-Free Ordering</h5>
                  <p className="text-stone-500 text-sm font-light leading-relaxed">Discuss and finalize your customizations directly through our WhatsApp portal.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM TESTIMONIALS */}
      <section className="py-24 bg-[#FAF9F6] border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className={`${montserrat.className} text-3xl md:text-4xl font-bold text-stone-900 mb-3`}>Loved by Virar</h3>
            <p className="text-stone-500 font-light">Real experiences from our sweet community.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "The Black Forest cake was absolutely divine! The finishing was so professional, it looked like it came from a 5-star hotel. Highly recommended.", name: "Priya M.", initials: "PM" },
              { text: "Ordered a custom Cocomelon theme cake for my son's 1st birthday. Rupali nailed the design perfectly and the eggless chocolate flavor was a hit!", name: "Rahul D.", initials: "RD" },
              { text: "Best tea cakes in Virar! The mawa cake brings back so many memories. Ordering through WhatsApp was also super easy and convenient.", name: "Sneha S.", initials: "SS" }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-8 rounded-sm shadow-sm hover:shadow-md transition-shadow border border-stone-100 flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-pink-50 rounded-bl-full -z-10 group-hover:bg-pink-100 transition-colors"></div>
                <svg className="w-8 h-8 text-[#e70064] opacity-20 mb-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                
                <p className="text-stone-600 mb-8 font-light text-sm leading-relaxed flex-grow italic">"{testimonial.text}"</p>
                
                <div className="flex items-center gap-4 mt-auto border-t border-stone-100 pt-6">
                  <div className={`${montserrat.className} w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <h5 className={`${montserrat.className} font-bold text-stone-900 text-[10px] tracking-widest uppercase mb-1`}>{testimonial.name}</h5>
                    <div className="flex text-[#e70064] text-[10px] gap-0.5">
                      ★★★★★
                    </div>
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
          <a href="#" className={`${montserrat.className} text-[10px] font-bold tracking-[0.2em] uppercase text-[#e70064] hover:text-stone-900 transition flex items-center gap-2`}>
            @CakeByRupali <span>↗</span>
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <img src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80" alt="IG Post" className="aspect-square w-full object-cover rounded-sm hover:opacity-80 transition cursor-pointer shadow-sm border border-stone-100" />
          <img src="https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&q=80" alt="IG Post" className="aspect-square w-full object-cover rounded-sm hover:opacity-80 transition cursor-pointer shadow-sm border border-stone-100" />
          <img src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80" alt="IG Post" className="aspect-square w-full object-cover rounded-sm hover:opacity-80 transition cursor-pointer shadow-sm border border-stone-100" />
          <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80" alt="IG Post" className="aspect-square w-full object-cover rounded-sm hover:opacity-80 transition cursor-pointer shadow-sm border border-stone-100" />
        </div>
      </section>

      {/* VIBRANT CTA BANNER */}
      <section className="bg-[#e70064] text-white py-24 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className={`${montserrat.className} text-4xl md:text-5xl font-extrabold mb-6`}>Have a special event coming up?</h2>
          <p className="text-pink-100 text-base md:text-lg mb-10 font-light max-w-2xl mx-auto">From intimate birthdays to grand weddings, let us add the perfect touch of sweetness to your celebration.</p>
          <a href="/custom-cake" className={`${montserrat.className} bg-white text-[#e70064] px-10 py-4 rounded-sm font-bold text-xs tracking-widest uppercase hover:bg-stone-900 hover:text-white transition-colors duration-300 shadow-xl inline-block border border-white hover:border-stone-900`}>
            Discuss Your Custom Order
          </a>
        </div>
      </section>

      {/* EDGE-TO-EDGE E-COMMERCE FOOTER */}
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
      {/* --- GLOBAL FOOTER END --- */}

    </div>
  );
}
