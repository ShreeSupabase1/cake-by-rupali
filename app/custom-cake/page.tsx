"use client";

import { useState } from "react";
import { Montserrat, Poppins, Playfair_Display } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function CustomCakePage() {
  const [occasion, setOccasion] = useState("Birthday");
  const [flavor, setFlavor] = useState("Chocolate Truffle");
  const [weight, setWeight] = useState("1 kg");
  const [dietary, setDietary] = useState("Eggless");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  // Existing WhatsApp functionality preserved exactly.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Hi Rupali! I would like to order a Custom Cake.%0A%0A*My Requirements:*%0A- Occasion: ${occasion}%0A- Flavor/Theme: ${flavor}%0A- Weight: ${weight}%0A- Dietary: ${dietary}%0A- Date Needed: ${date || "Not specified"}%0A- Special Notes: ${notes || "None"}%0A%0A*(I will attach my reference image below)*`;

    window.open(`https://wa.me/917666660036?text=${message}`, "_blank");
  };

  const occasionOptions = [
    { value: "Birthday", icon: "🎂" },
    { value: "Wedding", icon: "💍" },
    { value: "Anniversary", icon: "❤️" },
    { value: "Baby Shower", icon: "🍼" },
    { value: "Kids Theme Party", icon: "🎈" },
    { value: "Festive Celebration", icon: "✨" },
    { value: "Other", icon: "✦" },
  ];

  return (
    <div className={`min-h-screen bg-white text-[#2f1d1a] ${poppins.className}`}>
      {/* --- EXISTING GLOBAL HEADER --- */}
      <header className="sticky top-0 w-full z-50 bg-white shadow-sm border-b border-stone-200">
        <div
          className={`bg-[#3d2723] text-white text-[9px] md:text-[10px] font-semibold tracking-[0.2em] uppercase text-center py-2.5 ${montserrat.className}`}
        >
          Delivering Premium Freshness Across Virar & Mumbai
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center py-4">
          <a
            href="/"
            className={`${montserrat.className} text-2xl font-bold tracking-tight text-stone-900`}
          >
            Cake By Rupali<span className="text-[#e70064]">.</span>
          </a>

          <nav
            className={`hidden md:flex items-center gap-10 text-xs font-semibold tracking-wide uppercase ${montserrat.className} text-stone-700`}
          >
            <a href="/" className="hover:text-[#e70064] transition-colors">
              Home
            </a>

            <div className="group relative py-2">
              <button className="hover:text-[#e70064] transition flex items-center gap-1 outline-none uppercase tracking-wide font-semibold">
                Shop
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
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
                  <a href="/shop?category=Festive+Specials" className="text-[#e70064] font-semibold text-sm hover:text-pink-800 transition capitalize block">
                    🎉 Festive Specials
                  </a>
                </div>
              </div>
            </div>

            <a href="/custom-cake" className="text-[#e70064] transition uppercase tracking-wide font-bold">
              Custom Cake
            </a>
            <a href="/about" className="hover:text-[#e70064] transition uppercase tracking-wide font-semibold">
              About Us
            </a>
          </nav>

          <div className="flex items-center gap-6">
            <a href="/admin" className={`${montserrat.className} hidden md:block text-xs font-bold tracking-widest uppercase text-stone-400 hover:text-stone-900 transition`}>
              Admin
            </a>
            <a
              href="https://wa.me/917666660036"
              target="_blank"
              rel="noopener noreferrer"
              className={`${montserrat.className} bg-[#3d2723] text-white px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#e70064] transition-colors duration-300 rounded-full`}
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#fff7f9] border-b border-[#f3e5e9]">
        <div className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full bg-[#fce2eb] blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-32 w-[420px] h-[420px] rounded-full bg-white blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20 relative">
          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-20 items-center">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-[#e70064]" />
                <span className={`${montserrat.className} text-[10px] font-bold tracking-[0.25em] uppercase text-[#e70064]`}>
                  Custom Cake Studio
                </span>
              </div>

              <h1 className={`${playfair.className} text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.98] text-[#3d2723]`}>
                Design Your
                <br />
                <span className="italic text-[#e70064]">Dream Cake.</span>
              </h1>

              <p className="mt-7 max-w-xl text-sm md:text-base leading-7 text-stone-600">
                Tell us what you are celebrating, choose your flavour and size,
                and share your inspiration with us. We&apos;ll turn your idea
                into a cake made specially for your moment.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {["Freshly baked", "Custom designs", "Eggless options"].map((item) => (
                  <span
                    key={item}
                    className={`${montserrat.className} px-4 py-2.5 rounded-full bg-white border border-[#eadde1] text-[9px] font-bold uppercase tracking-widest text-[#3d2723] shadow-sm`}
                  >
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] border border-white/80" />
              <div className="relative h-[330px] md:h-[430px] rounded-[2.2rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1557979619-445218f326b9?auto=format&fit=crop&w=1000&q=85"
                  alt="Custom decorated celebration cake"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3d2723]/60 via-transparent to-transparent" />
                <div className="absolute left-6 bottom-6 right-6">
                  <p className={`${montserrat.className} text-[9px] uppercase tracking-[0.2em] font-bold text-white/80 mb-1`}>
                    Made around your idea
                  </p>
                  <p className={`${playfair.className} text-2xl md:text-3xl font-bold text-white`}>
                    Your occasion. Your cake.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-8 bg-white" style={{ clipPath: "ellipse(65% 100% at 50% 100%)" }} />
      </section>

      {/* PROCESS */}
      <section className="bg-white py-12 md:py-16 border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-0 border border-stone-200 rounded-3xl overflow-hidden">
            {[
              ["01", "Share Your Idea", "Tell us your occasion, flavour and theme."],
              ["02", "Discuss on WhatsApp", "Send reference images and finalise the details."],
              ["03", "We Bake It", "Your cake is freshly prepared for your celebration."],
            ].map(([number, title, description], index) => (
              <div
                key={number}
                className={`p-7 md:p-9 ${index < 2 ? "md:border-r border-b md:border-b-0 border-stone-200" : ""}`}
              >
                <div className={`${montserrat.className} text-[#e70064] text-xs font-bold tracking-widest mb-5`}>
                  {number}
                </div>
                <h3 className={`${playfair.className} text-2xl font-bold text-[#3d2723] mb-2`}>
                  {title}
                </h3>
                <p className="text-xs leading-6 text-stone-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20">
        <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-20 items-start">
          {/* FORM INTRO */}
          <aside className="lg:sticky lg:top-32">
            <span className={`${montserrat.className} text-[10px] font-bold tracking-[0.22em] uppercase text-[#e70064]`}>
              Build Your Cake
            </span>

            <h2 className={`${playfair.className} mt-4 text-4xl md:text-5xl font-bold leading-tight text-[#3d2723]`}>
              Let&apos;s create
              <br />
              something <span className="italic text-[#e70064]">special.</span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-stone-500">
              Give us the basic details below. When you submit, WhatsApp will
              open with your information already prepared for Rupali.
            </p>

            <div className="mt-8 rounded-2xl bg-[#3d2723] p-6 text-white">
              <p className={`${montserrat.className} text-[9px] uppercase tracking-[0.2em] font-bold text-[#f8a9c4]`}>
                Before you submit
              </p>
              <ul className="mt-4 space-y-3 text-xs text-white/75">
                <li>✓ Keep your reference image ready</li>
                <li>✓ Mention colours or writing if important</li>
                <li>✓ We&apos;ll confirm availability on WhatsApp</li>
              </ul>
            </div>
          </aside>

          <div className="border border-stone-200 rounded-[2rem] bg-white p-6 md:p-10 shadow-[0_18px_60px_rgba(61,39,35,0.07)]">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* OCCASION */}
              <section>
                <div className="flex items-end justify-between gap-4 mb-5">
                  <div>
                    <p className={`${montserrat.className} text-[9px] font-bold uppercase tracking-[0.2em] text-[#e70064]`}>
                      Step 01
                    </p>
                    <h3 className={`${playfair.className} mt-1 text-2xl font-bold text-[#3d2723]`}>
                      What are you celebrating?
                    </h3>
                  </div>
                  <span className={`${montserrat.className} hidden sm:block text-[9px] uppercase tracking-widest text-stone-400`}>
                    Select one
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {occasionOptions.map((item) => {
                    const selected = occasion === item.value;
                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setOccasion(item.value)}
                        className={`text-left p-4 rounded-2xl border transition-all duration-200 ${
                          selected
                            ? "border-[#e70064] bg-[#fff0f5] shadow-sm"
                            : "border-stone-200 bg-white hover:border-[#ef9fba] hover:bg-[#fffafb]"
                        }`}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className={`${montserrat.className} block mt-3 text-[9px] font-bold uppercase tracking-wider text-[#3d2723]`}>
                          {item.value}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Keeps the original select functionality/value available without changing the submitted value. */}
                <select
                  aria-label="Select Occasion"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="sr-only"
                >
                  {occasionOptions.map((item) => (
                    <option key={item.value} value={item.value}>{item.value}</option>
                  ))}
                </select>
              </section>

              <div className="h-px bg-stone-100" />

              {/* FLAVOUR */}
              <section>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className={`${montserrat.className} text-[9px] font-bold uppercase tracking-[0.2em] text-[#e70064]`}>
                      Step 02
                    </p>
                    <h3 className={`${playfair.className} mt-1 text-2xl font-bold text-[#3d2723]`}>
                      Choose your flavour or theme
                    </h3>
                  </div>
                  <span className="text-[9px] text-stone-400">Required *</span>
                </div>

                <input
                  type="text"
                  required
                  value={flavor}
                  onChange={(e) => setFlavor(e.target.value)}
                  placeholder="e.g. Chocolate Truffle or Cocomelon Theme"
                  className="w-full h-14 rounded-xl border border-stone-200 bg-[#fcfbfa] px-5 text-sm text-stone-800 outline-none transition focus:border-[#e70064] focus:bg-white focus:ring-4 focus:ring-pink-50 placeholder:text-stone-400"
                />

                <p className="mt-3 text-[11px] text-stone-400">
                  You can mention a flavour, theme, colour palette or character.
                </p>
              </section>

              {/* WEIGHT + DIETARY */}
              <section className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className={`${montserrat.className} block text-[9px] font-bold uppercase tracking-[0.2em] text-[#3d2723] mb-3`}>
                    Approximate Weight *
                  </label>
                  <select
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full h-14 rounded-xl border border-stone-200 bg-[#fcfbfa] px-4 text-sm font-medium text-stone-800 outline-none focus:border-[#e70064] focus:ring-4 focus:ring-pink-50"
                  >
                    <option value="0.5 kg">0.5 kg (Half Kg)</option>
                    <option value="1.0 kg">1.0 kg (One Kg)</option>
                    <option value="1.5 kg">1.5 kg</option>
                    <option value="2.0 kg">2.0 kg</option>
                    <option value="3+ kg">3+ kg (Grand Celebration)</option>
                  </select>
                </div>

                <div>
                  <label className={`${montserrat.className} block text-[9px] font-bold uppercase tracking-[0.2em] text-[#3d2723] mb-3`}>
                    Dietary Preference *
                  </label>
                  <select
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    className="w-full h-14 rounded-xl border border-stone-200 bg-[#fcfbfa] px-4 text-sm font-medium text-stone-800 outline-none focus:border-[#e70064] focus:ring-4 focus:ring-pink-50"
                  >
                    <option value="100% Eggless">100% Eggless</option>
                    <option value="Regular (Contains Egg)">Regular (Contains Egg)</option>
                    <option value="Jain Friendly">Jain Friendly</option>
                  </select>
                </div>
              </section>

              {/* DATE */}
              <section>
                <div className="flex items-end justify-between mb-3">
                  <label className={`${montserrat.className} text-[9px] font-bold uppercase tracking-[0.2em] text-[#3d2723]`}>
                    Date Needed By *
                  </label>
                  <span className="text-[9px] text-stone-400">Required</span>
                </div>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-14 rounded-xl border border-stone-200 bg-[#fcfbfa] px-4 text-sm text-stone-800 outline-none focus:border-[#e70064] focus:bg-white focus:ring-4 focus:ring-pink-50"
                />
              </section>

              {/* NOTES */}
              <section>
                <div className="flex items-end justify-between mb-3">
                  <label className={`${montserrat.className} text-[9px] font-bold uppercase tracking-[0.2em] text-[#3d2723]`}>
                    Special Instructions
                  </label>
                  <span className="text-[9px] text-stone-400">Optional</span>
                </div>
                <textarea
                  rows={5}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Mention specific colours, writing on cake, character/theme, decoration preferences or allergen concerns..."
                  className="w-full rounded-xl border border-stone-200 bg-[#fcfbfa] p-4 text-sm leading-6 text-stone-800 outline-none transition focus:border-[#e70064] focus:bg-white focus:ring-4 focus:ring-pink-50 placeholder:text-stone-400 resize-none"
                />
              </section>

              {/* REFERENCE IMAGE */}
              <div className="rounded-2xl border border-dashed border-[#e5a7b9] bg-[#fff7f9] p-5 md:p-6">
                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-white border border-pink-100 flex items-center justify-center text-xl">
                    📷
                  </div>
                  <div>
                    <h4 className={`${montserrat.className} text-xs font-bold uppercase tracking-widest text-[#3d2723]`}>
                      Have a reference image?
                    </h4>
                    <p className="mt-2 text-xs leading-5 text-stone-500">
                      No upload is required here. Once WhatsApp opens with your
                      pre-written details, simply attach your cake inspiration
                      image in the chat.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className={`${montserrat.className} w-full min-h-16 rounded-xl bg-[#e70064] text-white px-6 py-4 font-bold text-sm tracking-[0.12em] uppercase hover:bg-[#3d2723] transition-all duration-300 shadow-[0_12px_30px_rgba(231,0,100,0.2)] hover:shadow-lg flex items-center justify-center gap-3`}
                >
                  Send My Cake Request
                  <span className="text-lg">→</span>
                </button>

                <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[9px] uppercase tracking-widest text-stone-400 font-semibold">
                  <span>✓ Freshly prepared</span>
                  <span>✓ Customised for you</span>
                  <span>✓ Confirmed on WhatsApp</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* FINAL REASSURANCE */}
      <section className="bg-[#fff0f5] border-y border-pink-100 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className={`${montserrat.className} text-[9px] font-bold tracking-[0.25em] uppercase text-[#e70064]`}>
            Made with care
          </span>
          <h2 className={`${playfair.className} mt-3 text-4xl md:text-5xl font-bold text-[#3d2723]`}>
            Your idea. Your flavour. Your cake.
          </h2>
          <p className="max-w-2xl mx-auto mt-5 text-sm leading-7 text-stone-600">
            Every custom order is prepared around your celebration, with
            attention to freshness, finishing and the little details that make
            the cake yours.
          </p>

          <div className="mt-9 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              ["✦", "Fresh Ingredients"],
              ["♡", "Handcrafted"],
              ["✓", "Eggless Options"],
              ["⌁", "Local Delivery"],
            ].map(([icon, title]) => (
              <div key={title} className="bg-white rounded-2xl border border-pink-100 p-5">
                <div className="text-[#e70064] text-lg">{icon}</div>
                <p className={`${montserrat.className} mt-3 text-[9px] font-bold uppercase tracking-widest text-[#3d2723]`}>
                  {title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- EXISTING GLOBAL FOOTER --- */}
      <footer className="bg-stone-900 text-white pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <h2 className={`${montserrat.className} text-2xl font-bold tracking-tight mb-4`}>
              Cake By Rupali.
            </h2>
            <p className="text-stone-400 text-sm font-light leading-relaxed mb-8 max-w-sm">
              Premium handcrafted cakes designed with professional perfection
              in Virar. Elevating everyday celebrations into unforgettable
              memories.
            </p>
            <div className="flex gap-4">
              <a href="#" className={`${montserrat.className} w-10 h-10 border border-stone-700 rounded-sm flex items-center justify-center text-xs font-bold hover:bg-[#e70064] hover:border-[#e70064] transition-colors text-stone-300 hover:text-white`}>IG</a>
              <a href="#" className={`${montserrat.className} w-10 h-10 border border-stone-700 rounded-sm flex items-center justify-center text-xs font-bold hover:bg-[#e70064] hover:border-[#e70064] transition-colors text-stone-300 hover:text-white`}>FB</a>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <h4 className={`${montserrat.className} font-bold text-xs uppercase tracking-widest mb-6 text-stone-100`}>
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm font-light text-stone-400">
              <li><a href="/shop" className="hover:text-white transition">Shop Cakes</a></li>
              <li><a href="/custom-cake" className="hover:text-white transition">Custom Cake</a></li>
              <li><a href="/about" className="hover:text-white transition">About Us</a></li>
              <li><a href="/admin" className="hover:text-white transition">Admin Portal</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className={`${montserrat.className} font-bold text-xs uppercase tracking-widest mb-6 text-stone-100`}>
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm font-light text-stone-400">
              <li className="flex gap-3 items-center"><span className="text-[#e70064]">📍</span> Virar (East), Maharashtra</li>
              <li className="flex gap-3 items-center"><span className="text-[#e70064]">📞</span> +91 76666 60036</li>
            </ul>
            <div className="mt-8 p-4 bg-stone-800/50 rounded-sm border border-stone-800">
              <p className={`${montserrat.className} text-[10px] text-stone-500 mb-1 uppercase tracking-widest font-semibold`}>
                FSSAI Registration
              </p>
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
