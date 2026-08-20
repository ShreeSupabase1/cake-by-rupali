"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Inter } from "next/font/google";
import { useParams } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id as string;

  const [cake, setCake] = useState<any>(null);
  const [recommendedCakes, setRecommendedCakes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Existing selection states — functionality unchanged.
  const [selectedWeight, setSelectedWeight] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [cakeMessage, setCakeMessage] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const { data } = await supabase.from("products").select("*").eq("id", id).single();

      if (data) {
        setCake(data);
        setActiveImage(data.image_url || "");

        if (data.pricing && Array.isArray(data.pricing) && data.pricing.length > 0) {
          setSelectedWeight(data.pricing[0].weight);
          setSelectedPrice(data.pricing[0].price);
        } else {
          setSelectedWeight("1.0 KG");
          setSelectedPrice(data.price);
        }

        // Existing recommendation logic — unchanged.
        let recs: any[] = [];
        if (data.category) {
          const { data: catData } = await supabase
            .from("products")
            .select("*")
            .eq("category", data.category)
            .neq("id", id)
            .limit(4);
          if (catData) recs = [...catData];
        }

        if (recs.length < 4) {
          const { data: extraData } = await supabase
            .from("products")
            .select("*")
            .neq("category", data.category || "")
            .neq("id", id)
            .limit(4 - recs.length);
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

  // Existing pincode validation — unchanged.
  const handleCheckPincode = () => {
    const trimmedPin = pincode.trim();
    const pinNumber = parseInt(trimmedPin, 10);

    if (!trimmedPin || isNaN(pinNumber) || trimmedPin.length !== 6) {
      setDeliveryStatus("⚠️ Please enter a valid 6-digit pincode.");
      return;
    }

    let isDeliverable = false;

    if (
      (pinNumber >= 400001 && pinNumber <= 400099) ||
      (pinNumber >= 400601 && pinNumber <= 400615) ||
      (pinNumber >= 400701 && pinNumber <= 400708)
    ) {
      isDeliverable = true;
    } else if (
      (pinNumber >= 401101 && pinNumber <= 401107) ||
      (pinNumber >= 401201 && pinNumber <= 401503)
    ) {
      isDeliverable = true;
    } else if (
      (pinNumber >= 410201 && pinNumber <= 410221) ||
      (pinNumber >= 410301 && pinNumber <= 410501)
    ) {
      isDeliverable = true;
    } else if (pinNumber >= 421001 && pinNumber <= 421605) {
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
    window.open(`https://wa.me/917666660036?text=${message}`, "_blank");
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-white text-stone-500 text-xs font-semibold uppercase tracking-[0.2em] ${inter.className}`}>
        Loading Product...
      </div>
    );
  }

  if (!cake) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-white text-stone-500 text-xs font-semibold uppercase tracking-[0.2em] ${inter.className}`}>
        Product Not Found.
      </div>
    );
  }

  const gallery =
    cake.gallery_images && Array.isArray(cake.gallery_images) && cake.gallery_images.length > 0
      ? cake.gallery_images
      : cake.image_url
        ? [cake.image_url]
        : [];

  const hasMultiplePrices = cake.pricing && Array.isArray(cake.pricing) && cake.pricing.length > 1;

  return (
    <div className={`min-h-screen bg-white text-[#3E2723] ${inter.className}`}>
      {/* GLOBAL HEADER — navigation and links preserved */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-stone-100 shadow-[0_8px_30px_rgba(62,39,35,0.06)]">
        <div className="bg-[#3E2723] text-white text-[9px] md:text-[10px] font-semibold tracking-[0.2em] uppercase text-center py-2.5">
          <span className="text-[#ffd1e2]">✦</span> Delivering Premium Freshness Across Virar & Mumbai <span className="text-[#ffd1e2]">✦</span>
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-10 flex justify-between items-center py-4">
          <a href="/" className="text-xl md:text-2xl font-extrabold tracking-tight text-[#3E2723]">
            Cake By Rupali<span className="text-[#e70064]">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-[10px] font-bold tracking-[0.13em] uppercase text-stone-700">
            <a href="/" className="hover:text-[#e70064] transition-colors">Home</a>

            <div className="group relative py-2">
              <button className="text-[#e70064] flex items-center gap-1.5 outline-none uppercase tracking-[0.13em] font-bold">
                Shop
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute left-0 top-full pt-3 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 group-hover:translate-y-1">
                <div className="bg-white rounded-2xl border border-stone-100 shadow-2xl overflow-hidden py-2">
                  <a href="/shop" className="block text-[#e70064] text-[10px] font-bold uppercase tracking-widest px-6 py-3.5 border-b border-stone-100">All Cakes</a>
                  <a href="/shop?category=Birthday+Cakes" className="block hover:text-[#e70064] transition text-sm px-6 py-3">Birthday Cakes</a>
                  <a href="/shop?category=Wedding+%26+Anniversary" className="block hover:text-[#e70064] transition text-sm px-6 py-3">Wedding & Anniversary</a>
                  <a href="/shop?category=Kids+Theme+Cakes" className="block hover:text-[#e70064] transition text-sm px-6 py-3">Kids & Theme Cakes</a>
                  <a href="/shop?category=Premium+Signature" className="block hover:text-[#e70064] transition text-sm px-6 py-3">Premium Signature</a>
                  <a href="/shop?category=Dry+%26+Tea+Cakes" className="block hover:text-[#e70064] transition text-sm px-6 py-3">Dry & Tea Cakes</a>
                  <div className="bg-[#FFF0F5] p-4 border-t border-pink-100">
                    <a href="/shop?category=Festive+Specials" className="text-[#e70064] font-bold text-sm hover:text-[#3E2723] transition block">🎉 Festive Specials</a>
                  </div>
                </div>
              </div>
            </div>

            <a href="/custom-cake" className="hover:text-[#e70064] transition">Custom Cake</a>
            <a href="/about" className="hover:text-[#e70064] transition">About Us</a>
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <a href="/admin" className="hidden md:block text-[9px] font-bold tracking-[0.18em] uppercase text-stone-400 hover:text-[#3E2723] transition">Admin</a>
            <a
              href="https://wa.me/917666660036"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#3E2723] text-white px-4 md:px-6 py-3 rounded-full text-[9px] md:text-[10px] font-bold tracking-[0.13em] uppercase hover:bg-[#e70064] transition-colors shadow-sm"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 pt-7 md:pt-9">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-400">
          <a href="/shop" className="hover:text-[#e70064] transition">Shop</a>
          <span>/</span>
          <span className="text-stone-700 truncate max-w-[220px]">{cake.name}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-5 md:px-10 pt-6 md:pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 xl:gap-14 items-start">
          {/* PRODUCT GALLERY */}
          <section className="lg:sticky lg:top-32">
            <div className="grid grid-cols-[72px_1fr] md:grid-cols-[92px_1fr] gap-4 md:gap-5">
              <div className="flex flex-col gap-3">
                {gallery.map((imgUrl: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`relative aspect-square rounded-xl overflow-hidden bg-white border-2 transition-all ${activeImage === imgUrl ? "border-[#e70064] shadow-sm" : "border-stone-100 hover:border-stone-300"}`}
                    aria-label={`View ${cake.name} image ${idx + 1}`}
                  >
                    <img src={imgUrl} alt={`${cake.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="relative aspect-square rounded-[1.75rem] overflow-hidden bg-white border border-stone-100 shadow-[0_16px_45px_rgba(62,39,35,0.08)]">
                {activeImage ? (
                  <img src={activeImage} alt={cake.name} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-300 text-xs font-semibold uppercase tracking-widest">Image Pending</div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#3E2723]/25 to-transparent pointer-events-none" />

                {cake.is_eggless && (
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur border border-stone-100 text-[#e70064] text-[9px] uppercase tracking-[0.12em] font-bold px-3 py-2 rounded-full shadow-sm">
                    ✓ 100% Eggless
                  </div>
                )}

                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur border border-white text-[#3E2723] text-[9px] uppercase tracking-[0.12em] font-bold px-3 py-2 rounded-full shadow-sm">
                  Freshly Baked
                </div>
              </div>
            </div>
          </section>

          {/* PRODUCT INFORMATION + ORDERING */}
          <section className="lg:pl-4 lg:pt-1">
            <div className="pb-7 border-b border-stone-200">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-px bg-[#e70064]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#e70064]">Freshly Baked Collection</span>
              </div>

              <h1 className="text-3xl md:text-[2.7rem] font-extrabold tracking-tight leading-[1.08] text-[#3E2723]">
                {cake.name}
              </h1>

              <div className="flex items-end gap-3 mt-5">
                <span className="text-4xl md:text-[2.9rem] font-extrabold tracking-tight text-[#3E2723]">₹{selectedPrice}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400 mb-1.5">{selectedWeight} selected</span>
                <span className="text-[8px] font-bold uppercase tracking-[0.13em] text-stone-500 bg-stone-50 border border-stone-100 px-2.5 py-1.5 rounded-full mb-1.5">Incl. GST</span>
              </div>

              <p className="text-sm text-stone-500 leading-6 mt-4 whitespace-pre-wrap">{cake.description}</p>

              {/* TRUST FACTORS — visual reassurance only; no functionality changed */}
              <div className="grid grid-cols-3 gap-2.5 mt-6 pt-5 border-t border-stone-100">
                {[
                  { icon: "✦", title: "Freshly Made", desc: "Prepared fresh" },
                  { icon: "♡", title: "Handcrafted", desc: "Made with care" },
                  { icon: "⌁", title: "Local Delivery", desc: "Virar & nearby" },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-xl border border-stone-200 bg-[#FAF9F6] px-3 py-3.5 text-center transition-colors hover:border-pink-200 hover:bg-[#FFF7FA]">
                    <div className="text-[#e70064] text-sm font-bold mb-1.5">{item.icon}</div>
                    <p className="text-[8px] md:text-[9px] font-extrabold uppercase tracking-[0.11em] text-[#3E2723] leading-tight">{item.title}</p>
                    <p className="hidden md:block text-[8px] text-stone-400 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* WEIGHT */}
            <div className="py-6 border-b border-stone-200">
              <div className="flex items-center justify-between mb-4">
                <label className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#3E2723]">Choose Your Size</label>
                <span className="text-[9px] font-medium text-stone-400">Select one</span>
              </div>

              <div className="flex flex-nowrap gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                {cake.pricing && Array.isArray(cake.pricing) && cake.pricing.length > 0 ? (
                  cake.pricing.map((opt: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleWeightSelect(opt)}
                      className={`text-center shrink-0 w-[135px] lg:flex-1 lg:min-w-0 px-4 py-4 rounded-xl border-2 transition-all ${selectedWeight === opt.weight ? "border-[#e70064] bg-[#e70064] text-white shadow-[0_8px_22px_rgba(231,0,100,0.22)]" : "border-stone-200 bg-white text-[#3E2723] hover:border-[#e70064] hover:text-[#e70064]"}`}
                    >
                      <span className="block text-[13px] font-extrabold uppercase tracking-[0.06em]">{opt.weight}</span>
                    </button>
                  ))
                ) : (
                  <button className="text-center shrink-0 w-[135px] lg:flex-1 lg:min-w-0 px-4 py-4 rounded-xl border-2 border-[#e70064] bg-[#e70064] text-white shadow-[0_8px_22px_rgba(231,0,100,0.22)]">
                    <span className="block text-[13px] font-extrabold uppercase tracking-[0.06em]">1.0 KG</span>
                  </button>
                )}
              </div>
            </div>

            {/* MESSAGE */}
            <div className="py-6 border-b border-stone-200">
              <div className="flex items-center justify-between mb-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#3E2723]">Cake Message <span className="text-stone-400 font-medium normal-case tracking-normal">(Optional)</span></label>
                <span className="text-[9px] font-semibold text-stone-400">{cakeMessage.length}/25</span>
              </div>
              <input
                type="text"
                maxLength={25}
                value={cakeMessage}
                onChange={(e) => setCakeMessage(e.target.value)}
                placeholder="e.g. Happy Birthday Riya!"
                className="w-full border-2 border-stone-200 bg-white rounded-xl px-4 py-3.5 text-sm text-[#3E2723] font-medium placeholder:text-stone-400 focus:outline-none focus:border-[#e70064] focus:ring-4 focus:ring-pink-50 transition"
              />
            </div>

            {/* DELIVERY */}
            <div className="py-6 border-b border-stone-200">
              <div className="flex items-center justify-between mb-4">
                <label className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#3E2723]">Delivery Details</label>
                <span className="text-[9px] font-semibold text-stone-400">Virar & nearby areas</span>
              </div>

              <div className="rounded-2xl border-2 border-[#3E2723]/15 bg-[#FAF7F5] p-4 shadow-[0_8px_24px_rgba(62,39,35,0.06)]">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">⌖</span>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter 6-digit pincode"
                      className="w-full border-2 border-stone-200 bg-white rounded-xl pl-10 pr-4 py-3.5 text-sm text-[#3E2723] font-medium focus:outline-none focus:border-[#e70064] focus:ring-4 focus:ring-pink-50 transition"
                    />
                  </div>
                  <button
                    onClick={handleCheckPincode}
                    className="shrink-0 px-6 py-3.5 rounded-xl bg-[#3E2723] border-2 border-[#3E2723] text-white text-[9px] font-bold uppercase tracking-[0.14em] hover:bg-[#e70064] hover:border-[#e70064] transition-colors"
                  >
                    Check Delivery
                  </button>
                </div>

                {deliveryStatus && (
                  <p className={`mt-3 text-[10px] font-bold uppercase tracking-[0.08em] ${deliveryStatus.includes("✅") ? "text-green-600" : "text-[#e70064]"}`}>
                    {deliveryStatus}
                  </p>
                )}

                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Complete delivery address * (Required to order)"
                  className="w-full mt-3 border-2 border-stone-200 bg-white rounded-xl px-4 py-3.5 text-sm text-[#3E2723] font-medium focus:outline-none focus:border-[#e70064] focus:ring-4 focus:ring-pink-50 transition resize-none placeholder:text-stone-400"
                />
              </div>
            </div>

            {/* ORDER CTA */}
            <div className="pt-5">
              <button
                onClick={handleCheckout}
                className="w-full bg-[#e70064] text-white py-[17px] px-5 rounded-xl font-extrabold text-sm tracking-[0.13em] uppercase hover:bg-[#c90057] transition-all shadow-[0_12px_28px_rgba(231,0,100,0.24)] flex items-center justify-center gap-3"
              >
                Order on WhatsApp · ₹{selectedPrice}
                <span className="text-lg leading-none">→</span>
              </button>

              <div className="flex items-center justify-center gap-2 mt-3 text-[9px] font-semibold uppercase tracking-[0.12em] text-stone-400">
                <span>✓ Freshly prepared</span>
                <span>•</span>
                <span>✓ Confirmed on WhatsApp</span>
              </div>
            </div>
          </section>
        </div>

        {/* YOU MAY ALSO LIKE */}
        {recommendedCakes && recommendedCakes.length > 0 && (
          <section className="mt-16 md:mt-20">
            <div className="flex items-end justify-between gap-4 mb-7">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-px bg-[#e70064]" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#e70064]">More to Explore</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#3E2723]">You May Also Like</h2>
              </div>
              <a href="/shop" className="hidden sm:inline-flex text-[9px] font-bold uppercase tracking-[0.15em] text-[#e70064] hover:text-[#3E2723] transition">View All Cakes →</a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {recommendedCakes.map((rec: any) => (
                <a
                  href={`/shop/${rec.id}`}
                  key={rec.id}
                  className="group bg-white rounded-[1.25rem] border border-stone-100 p-3.5 shadow-[0_8px_25px_rgba(62,39,35,0.04)] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(62,39,35,0.1)] transition-all duration-300"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-[#FAF9F6]">
                    {rec.image_url ? (
                      <img src={rec.image_url} alt={rec.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-300 text-[9px] font-bold uppercase tracking-widest">Image Pending</div>
                    )}
                    {rec.is_eggless && (
                      <span className="absolute top-2.5 left-2.5 bg-white/95 text-[#e70064] text-[8px] uppercase tracking-[0.1em] font-bold px-2.5 py-1.5 rounded-full shadow-sm">Eggless</span>
                    )}
                  </div>
                  <div className="px-1 pt-4">
                    <h3 className="text-sm font-bold text-[#3E2723] leading-tight line-clamp-1">{rec.name}</h3>
                    <div className="flex items-center justify-between gap-2 mt-2">
                      <span className="text-sm font-extrabold text-[#3E2723]">₹{rec.price}</span>
                      <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#e70064]">View →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* CUSTOM CAKE CTA */}
        <section className="mt-16 md:mt-20">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-[#FFF0F5] border border-pink-100 px-7 md:px-12 py-9 md:py-11 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute -right-20 -top-24 w-64 h-64 rounded-full bg-pink-200/30 blur-3xl" />
            <div className="relative text-center md:text-left">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#e70064] mb-2">Can't find exactly what you want?</p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#3E2723]">Need a custom cake?</h2>
              <p className="text-sm text-stone-500 mt-2">Share your idea and let Rupali create something special.</p>
            </div>
            <a href="/custom-cake" className="relative shrink-0 bg-[#3E2723] text-white px-7 py-3.5 rounded-full text-[9px] font-bold uppercase tracking-[0.14em] hover:bg-[#e70064] transition-colors shadow-md">
              Create Custom Cake →
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#251714] text-white pt-16 pb-8 mt-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-12">
          <div className="md:col-span-4">
            <h2 className="text-2xl font-extrabold tracking-tight mb-4">Cake By Rupali<span className="text-[#e70064]">.</span></h2>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">Premium handcrafted cakes designed with professional perfection in Virar. Elevating everyday celebrations into unforgettable memories.</p>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <h4 className="font-bold text-[10px] uppercase tracking-widest mb-5 text-stone-100">Quick Links</h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li><a href="/shop" className="hover:text-white transition">Shop Cakes</a></li>
              <li><a href="/custom-cake" className="hover:text-white transition">Custom Orders</a></li>
              <li><a href="/about" className="hover:text-white transition">Our Story</a></li>
              <li><a href="/admin" className="hover:text-white transition">Admin Portal</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-bold text-[10px] uppercase tracking-widest mb-5 text-stone-100">Contact Us</h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li>📍 Virar (East), Maharashtra</li>
              <li>📞 +91 76666 60036</li>
            </ul>
            <div className="mt-6 p-4 bg-stone-800/40 rounded-xl border border-stone-800">
              <p className="text-[9px] text-stone-500 mb-1 uppercase tracking-widest font-semibold">FSSAI Registration</p>
              <p className="text-sm text-stone-300">(Update in Admin)</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-7 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-stone-500">
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
