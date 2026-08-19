"use client";

import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import { Montserrat, Poppins } from 'next/font/google';
import { useParams } from 'next/navigation';

// Professional E-commerce Fonts
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

// Connect to Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id as string;

  const [cake, setCake] = useState<any>(null);
  const [recommendedCakes, setRecommendedCakes] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true);
  
  // Selection states
  const [selectedWeight, setSelectedWeight] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [cakeMessage, setCakeMessage] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState(""); 
  const [deliveryStatus, setDeliveryStatus] = useState<string | null>(null); 

  // NEW: Interactive Image Gallery State
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const { data } = await supabase.from('products').select('*').eq('id', id).single();
      
      if (data) {
        setCake(data);
        
        // Ensure the main image loads on first fetch
        setActiveImage(data.image_url || "");
        
        // Initialize default weight & price seamlessly for backward compatibility
        if (data.pricing && Array.isArray(data.pricing) && data.pricing.length > 0) {
          setSelectedWeight(data.pricing[0].weight);
          setSelectedPrice(data.pricing[0].price);
        } else {
          // Legacy product fallback
          setSelectedWeight("1.0 KG");
          setSelectedPrice(data.price);
        }

        // --- FETCH RECOMMENDED CAKES LOGIC ---
        let recs: any[] = [];
        if (data.category) {
          const { data: catData } = await supabase.from('products')
            .select('*').eq('category', data.category).neq('id', id).limit(4);
          if (catData) recs = [...catData];
        }
        if (recs.length < 4) {
          const { data: extraData } = await supabase.from('products')
            .select('*').neq('category', data.category || '').neq('id', id).limit(4 - recs.length);
          if (extraData) recs = [...recs, ...extraData];
        }
        setRecommendedCakes(recs);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleWeightSelect = (weightObj: any) => {
    setSelectedWeight(weightObj.weight);
    setSelectedPrice(weightObj.price);
  };

  // STRICT PINCODE VALIDATION LOGIC
  const handleCheckPincode = () => {
    const trimmedPin = pincode.trim();
    const pinNumber = parseInt(trimmedPin, 10);

    if (!trimmedPin || isNaN(pinNumber) || trimmedPin.length !== 6) {
      setDeliveryStatus("⚠️ Please enter a valid 6-digit pincode.");
      return;
    }

    let isDeliverable = false;

    // 1. Mumbai City and Suburban Area
    if (
      (pinNumber >= 400001 && pinNumber <= 400099) || 
      (pinNumber >= 400601 && pinNumber <= 400615) || 
      (pinNumber >= 400701 && pinNumber <= 400708)
    ) {
      isDeliverable = true;
    }
    // 2. Thane, Palghar, and Vasai-Virar 
    else if ((pinNumber >= 401101 && pinNumber <= 401107) || (pinNumber >= 401201 && pinNumber <= 401503)) {
      isDeliverable = true;
    }
    // 3. Raigad and Extended Metro Outskirts 
    else if ((pinNumber >= 410201 && pinNumber <= 410221) || (pinNumber >= 410301 && pinNumber <= 410501)) {
      isDeliverable = true;
    }
    // 4. Kalyan, Dombivli, and Bhiwandi Belt 
    else if (pinNumber >= 421001 && pinNumber <= 421605) {
      isDeliverable = true;
    }

    if (isDeliverable) {
      setDeliveryStatus("✅ Delivery is available in your area!");
    } else {
      setDeliveryStatus("❌ Sorry, we do not deliver to this area yet.");
    }
  };

  const handleCheckout = () => {
    if (!address.trim()) {
      alert("Please enter your Complete Delivery Address before placing the order.");
      return;
    }

    const message = `Hi Rupali! I would like to order:%0A%0A*${cake.name}*%0A- Weight: ${selectedWeight}%0A- Price: ₹${selectedPrice}%0A- Cake Message: ${cakeMessage || "None"}%0A- Delivery Pincode: ${pincode || "Not specified"}%0A- Complete Address: ${address}%0A%0AIs this available?`;
    window.open(`https://wa.me/917666660036?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <div className={`min-h-screen bg-[#FAF9F6] flex items-center justify-center tracking-widest text-sm uppercase text-stone-500 font-bold ${montserrat.className}`}>
        Loading Product...
      </div>
    );
  }

  if (!cake) {
    return (
      <div className={`min-h-screen bg-[#FAF9F6] flex items-center justify-center tracking-widest text-sm uppercase text-stone-500 font-bold ${montserrat.className}`}>
        Product Not Found.
      </div>
    );
  }

  // NEW: Construct the gallery array. Safely fallback to single image if multiple aren't available.
  const gallery = cake.gallery_images && Array.isArray(cake.gallery_images) && cake.gallery_images.length > 0 
    ? cake.gallery_images 
    : (cake.image_url ? [cake.image_url] : []);

  return (
    <div className={`min-h-screen bg-[#FAF9F6] text-stone-800 flex flex-col ${poppins.className}`}>
      
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
            <a href="/admin" className={`${montserrat.className} hidden md:block text-xs font-bold tracking-widest uppercase text-stone-400 hover:text-[#e70064] transition`}>Admin</a>
            <a href="https://wa.me/917666660036" target="_blank" rel="noopener noreferrer" className={`${montserrat.className} bg-stone-900 text-white px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#e70064] transition-colors duration-300 rounded-sm`}>
              Order on WhatsApp
            </a>
          </div>
        </div>
      </header>
      {/* --- UNIFIED GLOBAL HEADER END --- */}

      {/* PRODUCT BREADCRUMB */}
      <div className="max-w-6xl mx-auto w-full px-6 pt-10 pb-4">
        <p className={`${montserrat.className} text-[10px] font-bold uppercase tracking-widest text-stone-400`}>
          <a href="/shop" className="hover:text-stone-900 transition-colors">Shop</a> 
          <span className="mx-2">/</span> 
          <span className="text-stone-900">{cake.name}</span>
        </p>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-6 flex-grow flex flex-col">
        
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* LEFT: IMAGE GALLERY (Perfect Full Square) */}
          <div className="w-full md:w-1/2 flex flex-col-reverse md:flex-row gap-4">
            
            {/* THUMBNAIL STRIP */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24 shrink-0 no-scrollbar">
               {gallery.map((imgUrl: string, idx: number) => (
                 <img 
                   key={idx} 
                   src={imgUrl} 
                   onClick={() => setActiveImage(imgUrl)}
                   className={`w-20 h-20 md:w-full md:h-24 object-cover rounded-sm cursor-pointer transition-all duration-200 border-2 ${activeImage === imgUrl ? 'border-[#e70064] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`} 
                   alt={`${cake.name} view ${idx + 1}`} 
                 />
               ))}
            </div>

            {/* MAIN IMAGE BOX */}
            <div className="w-full aspect-square bg-stone-100 rounded-sm relative border border-stone-200 overflow-hidden shadow-sm">
               {activeImage ? (
                 <img src={activeImage} alt={cake.name} className="object-cover w-full h-full absolute inset-0 transition-opacity duration-500" />
               ) : (
                 <div className={`${montserrat.className} w-full h-full flex items-center justify-center text-stone-300 font-semibold text-xs tracking-widest uppercase`}>Image Pending</div>
               )}
               
               {cake.is_eggless && (
                  <div className={`${montserrat.className} absolute top-4 left-4 bg-white/95 backdrop-blur border border-stone-200 text-stone-900 text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-sm shadow-sm`}>
                    100% Eggless
                  </div>
                )}
            </div>
          </div>

          {/* RIGHT: DETAILS & ORDERING */}
          <div className="w-full md:w-1/2 space-y-8">
            
            <div className="border-b border-stone-200 pb-6">
              <h1 className={`${montserrat.className} text-3xl md:text-4xl font-bold text-stone-900 mb-2 leading-tight`}>{cake.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                 <span className={`${montserrat.className} text-2xl font-bold text-[#e70064]`}>₹{selectedPrice}</span>
                 <span className={`${montserrat.className} text-[10px] font-bold text-stone-500 uppercase tracking-widest border border-stone-200 bg-stone-50 px-2 py-1 rounded-sm`}>Incl. GST</span>
              </div>
              <p className="text-stone-500 font-light text-sm leading-relaxed whitespace-pre-wrap">{cake.description}</p>
            </div>

            {/* DYNAMIC WEIGHT SELECTION */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className={`${montserrat.className} block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-900`}>Select Weight</label>
              </div>
              <div className="flex flex-wrap gap-3">
                {cake.pricing && Array.isArray(cake.pricing) && cake.pricing.length > 0 ? (
                  cake.pricing.map((opt: any, idx: number) => (
                    <button 
                      key={idx} 
                      onClick={() => handleWeightSelect(opt)}
                      className={`${montserrat.className} text-xs font-bold tracking-widest uppercase px-5 py-3 rounded-sm border transition-all duration-200 ${selectedWeight === opt.weight ? 'border-stone-900 bg-stone-900 text-white shadow-md' : 'border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900 bg-white'}`}
                    >
                      {opt.weight}
                    </button>
                  ))
                ) : (
                   <button className={`${montserrat.className} text-xs font-bold tracking-widest uppercase px-5 py-3 rounded-sm border border-stone-900 bg-stone-900 text-white shadow-md`}>
                      1.0 KG
                   </button>
                )}
              </div>
            </div>

            {/* CUSTOM MESSAGE INPUT */}
            <div className="space-y-4">
               <label className={`${montserrat.className} block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-900 flex justify-between`}>
                 <span>Cake Message (Optional)</span>
                 <span className="text-stone-400 font-normal">{cakeMessage.length}/25</span>
               </label>
               <input 
                 type="text" 
                 maxLength={25} 
                 value={cakeMessage} 
                 onChange={(e) => setCakeMessage(e.target.value)} 
                 placeholder="Write a sweet wish!" 
                 className="w-full border border-stone-200 p-3.5 rounded-sm focus:outline-none focus:border-[#e70064] text-sm bg-white transition-colors" 
               />
            </div>

            {/* DELIVERY PINCODE & ADDRESS INPUT */}
            <div className="space-y-4">
               <label className={`${montserrat.className} block text-[10px] font-bold uppercase tracking-[0.2em] text-stone-900`}>Delivery Details</label>
               
               {/* Pincode Row */}
               <div className="flex flex-col gap-2">
                 <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={pincode} 
                      onChange={(e) => setPincode(e.target.value)} 
                      placeholder="Area or Pincode" 
                      className="flex-grow border border-stone-200 p-3.5 rounded-sm focus:outline-none focus:border-[#e70064] text-sm bg-white transition-colors" 
                    />
                    <button onClick={handleCheckPincode} className={`${montserrat.className} bg-stone-100 border border-stone-200 text-stone-900 px-6 py-3.5 rounded-sm font-bold text-[10px] tracking-widest uppercase hover:bg-stone-200 transition-colors`}>
                      Check
                    </button>
                 </div>
                 {deliveryStatus && (
                   <p className={`${montserrat.className} text-[10px] font-bold uppercase tracking-widest ${deliveryStatus.includes("✅") ? "text-green-600" : "text-[#e70064]"}`}>
                     {deliveryStatus}
                   </p>
                 )}
               </div>

               {/* Complete Address Textarea */}
               <textarea 
                 rows={3}
                 value={address}
                 onChange={(e) => setAddress(e.target.value)}
                 placeholder="Complete Delivery Address (Mandatory) *"
                 className="w-full border border-stone-200 p-3.5 rounded-sm focus:outline-none focus:border-[#e70064] text-sm bg-white transition-colors placeholder:text-stone-400 mt-2"
               ></textarea>
            </div>

            {/* BIG BOLD BUY NOW BUTTON */}
            <button 
              onClick={handleCheckout} 
              className={`${montserrat.className} w-full bg-stone-900 text-white py-5 px-4 rounded-sm font-bold text-base tracking-widest uppercase hover:bg-stone-800 transition-colors duration-300 shadow-xl flex items-center justify-center gap-3 mt-6`}
            >
               Order Now | ₹{selectedPrice}
            </button>
          </div>
        </div>

        {/* --- YOU MAY ALSO LIKE SECTION --- */}
        {recommendedCakes && recommendedCakes.length > 0 && (
          <div className="mt-24 pt-16 border-t border-stone-200 w-full">
            <h3 className={`${montserrat.className} text-2xl font-bold text-stone-900 mb-8`}>
              You May Also Like
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recommendedCakes.map((rec: any) => (
                <a href={`/shop/${rec.id}`} key={rec.id} className="group flex flex-col bg-white border border-stone-200 p-3 rounded-sm shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-full aspect-square bg-stone-50 overflow-hidden mb-4 relative rounded-sm">
                    {rec.image_url ? (
                      <img src={rec.image_url} alt={rec.name} className="object-cover w-full h-full group-hover:scale-105 transition duration-700 ease-out" />
                    ) : (
                      <div className={`${montserrat.className} w-full h-full flex items-center justify-center text-stone-300 font-semibold text-[10px] tracking-widest uppercase`}>Image Pending</div>
                    )}
                    {rec.is_eggless && (
                      <div className={`${montserrat.className} absolute top-2 right-2 bg-white/95 backdrop-blur border border-stone-200 text-[#e70064] text-[8px] uppercase tracking-widest font-bold px-2 py-1 rounded-sm shadow-sm`}>
                        Eggless
                      </div>
                    )}
                  </div>
                  <div className="flex-grow flex flex-col">
                    <h4 className={`${montserrat.className} text-sm font-bold text-stone-900 mb-1 leading-tight line-clamp-1`}>{rec.name}</h4>
                    <div className="mt-auto pt-2">
                      <span className={`${montserrat.className} font-bold text-sm text-stone-900`}>₹{rec.price}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

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