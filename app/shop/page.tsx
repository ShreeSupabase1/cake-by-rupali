"use client";

import { useState, useEffect, Suspense } from "react";
import { createClient } from "@supabase/supabase-js";
import { Montserrat, Poppins, Playfair_Display } from "next/font/google";
import { useSearchParams } from "next/navigation";

// Premium editorial fonts — visual only, no functional changes.
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
  style: ["normal", "italic"],
});

// Connect to Supabase — unchanged.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Shop() {
  return (
    <Suspense
      fallback={
        <div
          className={`min-h-screen flex items-center justify-center bg-[#FAF9F6] text-stone-500 tracking-widest text-sm uppercase ${montserrat.className}`}
        >
          Loading Catalog...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");

  const [cakes, setCakes] = useState<any[]>([]);
  const [filteredCakes, setFilteredCakes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Existing filter state — unchanged.
  const [activeCategory, setActiveCategory] = useState(
    urlCategory || "All Cakes"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isEggless, setIsEggless] = useState(false);
  const [maxPrice, setMaxPrice] = useState(5000);

  // Existing categories — unchanged.
  const categories = [
    "All Cakes",
    "Birthday Cakes",
    "Wedding & Anniversary",
    "Kids Theme Cakes",
    "Premium Signature",
    "Dry & Tea Cakes",
    "Festive Specials",
  ];

  const customCakeMessage =
    "Hi Rupali! I would like to order a Custom Cake.%0A%0A*My Requirements:*%0A- Occasion: %0A- Flavor: %0A- Weight (kg): %0A- Date Needed: %0A- Reference Image: (I will attach below)";

  // Existing URL-category behavior — unchanged.
  useEffect(() => {
    if (urlCategory) {
      setActiveCategory(urlCategory);
    }
  }, [urlCategory]);

  // Existing Supabase product fetching — unchanged.
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*");
      if (data) {
        setCakes(data);
        setFilteredCakes(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Existing filtering logic — unchanged.
  useEffect(() => {
    let result = cakes;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (cake) =>
          cake.name.toLowerCase().includes(query) ||
          (cake.description &&
            cake.description.toLowerCase().includes(query))
      );
    }

    if (activeCategory !== "All Cakes") {
      result = result.filter((cake) => {
        if (cake.category) {
          return (
            cake.category.trim().toLowerCase() ===
            activeCategory.trim().toLowerCase()
          );
        }

        const text = `${cake.name} ${cake.description}`.toLowerCase();

        if (activeCategory === "Birthday Cakes")
          return text.includes("birthday") || text.includes("bday");
        if (activeCategory === "Wedding & Anniversary")
          return (
            text.includes("wedding") ||
            text.includes("anniversary") ||
            text.includes("tier")
          );
        if (activeCategory === "Kids Theme Cakes")
          return (
            text.includes("kid") ||
            text.includes("theme") ||
            text.includes("cocomelon")
          );
        if (activeCategory === "Premium Signature")
          return (
            text.includes("truffle") ||
            text.includes("premium") ||
            text.includes("signature")
          );
        if (activeCategory === "Dry & Tea Cakes")
          return (
            text.includes("dry") ||
            text.includes("tea") ||
            text.includes("mawa")
          );
        if (activeCategory === "Festive Specials")
          return text.includes("festive") || text.includes("hamper");

        return true;
      });
    }

    if (isEggless) {
      result = result.filter((cake) => cake.is_eggless === true);
    }

    result = result.filter((cake) => cake.price <= maxPrice);

    setFilteredCakes(result);
  }, [cakes, activeCategory, searchQuery, isEggless, maxPrice]);

  const clearFilters = () => {
    setActiveCategory("All Cakes");
    setSearchQuery("");
    setIsEggless(false);
    setMaxPrice(5000);
  };

  return (
    <div
      className={`min-h-screen bg-[#FAF9F6] text-[#3E2723] ${poppins.className}`}
    >
      {/* =========================================================
          GLOBAL HEADER — navigation/functionality preserved
         ========================================================= */}
      <header className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(62,39,35,0.06)] border-b border-stone-100">
        <div
          className={`bg-[#3E2723] text-white text-[9px] md:text-[10px] font-semibold tracking-[0.22em] uppercase text-center py-2.5 ${montserrat.className}`}
        >
          <span className="text-[#ffd8e7]">✦</span> Delivering Premium
          Freshness Across Virar & Mumbai <span className="text-[#ffd8e7]">✦</span>
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-10 flex justify-between items-center py-4">
          <a
            href="/"
            className={`${montserrat.className} text-xl md:text-2xl font-bold tracking-tight text-[#3E2723]`}
          >
            Cake By Rupali<span className="text-[#e70064]">.</span>
          </a>

          <nav
            className={`hidden md:flex items-center gap-8 lg:gap-10 text-[11px] font-semibold tracking-[0.12em] uppercase ${montserrat.className} text-stone-700`}
          >
            <a
              href="/"
              className="hover:text-[#e70064] transition-colors"
            >
              Home
            </a>

            <div className="group relative py-2">
              <button className="text-[#e70064] transition flex items-center gap-1.5 outline-none uppercase tracking-[0.12em] font-bold">
                Shop
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div className="absolute left-0 top-full pt-4 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col transform group-hover:translate-y-1">
                <div className="bg-white rounded-2xl border border-stone-100 shadow-2xl overflow-hidden flex flex-col py-2">
                  <a
                    href="/shop"
                    className="text-[#e70064] text-xs font-bold uppercase tracking-widest px-6 py-3.5 border-b border-stone-100"
                  >
                    All Cakes
                  </a>
                  <a
                    href="/shop?category=Birthday+Cakes"
                    className="hover:text-[#e70064] transition text-sm px-6 py-3"
                  >
                    Birthday Cakes
                  </a>
                  <a
                    href="/shop?category=Wedding+%26+Anniversary"
                    className="hover:text-[#e70064] transition text-sm px-6 py-3"
                  >
                    Wedding & Anniversary
                  </a>
                  <a
                    href="/shop?category=Kids+Theme+Cakes"
                    className="hover:text-[#e70064] transition text-sm px-6 py-3"
                  >
                    Kids & Theme Cakes
                  </a>
                  <a
                    href="/shop?category=Premium+Signature"
                    className="hover:text-[#e70064] transition text-sm px-6 py-3"
                  >
                    Premium Signature
                  </a>
                  <a
                    href="/shop?category=Dry+%26+Tea+Cakes"
                    className="hover:text-[#e70064] transition text-sm px-6 py-3"
                  >
                    Dry & Tea Cakes
                  </a>
                  <div className="bg-[#FFF0F5] p-4 border-t border-pink-100">
                    <a
                      href="/shop?category=Festive+Specials"
                      className="text-[#e70064] font-bold text-sm hover:text-[#3E2723] transition block"
                    >
                      🎉 Festive Specials
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="/custom-cake"
              className="hover:text-[#e70064] transition"
            >
              Custom Cake
            </a>
            <a href="/about" className="hover:text-[#e70064] transition">
              About Us
            </a>
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <a
              href="/admin"
              className={`${montserrat.className} hidden md:block text-[10px] font-bold tracking-[0.18em] uppercase text-stone-400 hover:text-[#3E2723] transition`}
            >
              Admin
            </a>

            <a
              href="https://wa.me/917666660036"
              target="_blank"
              rel="noopener noreferrer"
              className={`${montserrat.className} bg-[#3E2723] text-white px-4 md:px-6 py-3 text-[9px] md:text-[10px] font-bold tracking-[0.14em] uppercase hover:bg-[#e70064] transition-colors duration-300 rounded-full shadow-sm`}
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* =========================================================
          SHOP HERO
         ========================================================= */}
      <section className="relative overflow-hidden bg-[#FFF0F5] border-b border-pink-100">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/70 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-[#f8c6d9]/40 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 text-center">
          <div
            className={`${montserrat.className} inline-flex items-center gap-3 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-[#e70064] mb-5`}
          >
            <span className="w-8 h-px bg-[#e70064]" />
            Freshly Baked Collection
            <span className="w-8 h-px bg-[#e70064]" />
          </div>

          <h1
            className={`${playfair.className} text-4xl md:text-6xl font-bold text-[#3E2723] leading-tight mb-4`}
          >
            Find Your Perfect Cake
          </h1>

          <p className="text-stone-600 max-w-2xl mx-auto font-light text-sm md:text-base leading-relaxed">
            Freshly baked, handcrafted cakes for birthdays, anniversaries,
            little celebrations and everything in between.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`${montserrat.className} px-4 py-2.5 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wider border transition-all ${
                  activeCategory === cat
                    ? "bg-[#e70064] text-white border-[#e70064] shadow-md"
                    : "bg-white/80 text-[#3E2723] border-pink-100 hover:border-[#e70064] hover:text-[#e70064]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CATALOG
         ========================================================= */}
      <main className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* =====================================================
              FILTER PANEL — same functionality, redesigned UI
             ===================================================== */}
          <aside className="w-full md:w-[260px] lg:w-[285px] shrink-0">
            <div className="md:sticky md:top-32">
              <div className="bg-white rounded-[2rem] border border-stone-100 shadow-[0_12px_40px_rgba(62,39,35,0.07)] overflow-hidden">
                <div className="p-6 md:p-7 border-b border-stone-100">
                  <div className="flex items-center justify-between mb-2">
                    <h2
                      className={`${playfair.className} text-2xl font-bold text-[#3E2723]`}
                    >
                      Find a Cake
                    </h2>
                    <span className="w-9 h-9 rounded-full bg-[#FFF0F5] flex items-center justify-center text-[#e70064]">
                      ♡
                    </span>
                  </div>
                  <p className="text-xs text-stone-400">
                    Refine the collection to match your celebration.
                  </p>
                </div>

                <div className="p-6 md:p-7 space-y-8">
                  {/* Search */}
                  <div>
                    <label
                      className={`${montserrat.className} text-[9px] font-bold uppercase tracking-[0.22em] text-stone-400 mb-3 block`}
                    >
                      Search Cakes
                    </label>

                    <div className="relative">
                      <svg
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.7"
                          d="m21 21-4.35-4.35m2.1-5.15a7.25 7.25 0 1 1-14.5 0 7.25 7.25 0 0 1 14.5 0Z"
                        />
                      </svg>

                      <input
                        type="text"
                        placeholder="Chocolate, red velvet..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-full border border-stone-200 bg-[#FAF9F6] pl-11 pr-4 py-3.5 focus:outline-none focus:border-[#e70064] focus:ring-4 focus:ring-pink-50 text-xs transition placeholder:text-stone-400"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label
                        className={`${montserrat.className} text-[9px] font-bold uppercase tracking-[0.22em] text-stone-400`}
                      >
                        Collections
                      </label>
                      <span className="text-[#e70064] text-xs">✦</span>
                    </div>

                    <div className="space-y-1.5">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`${montserrat.className} group w-full flex items-center justify-between text-left px-3.5 py-2.5 rounded-xl text-[11px] tracking-wide transition-all ${
                            activeCategory === cat
                              ? "bg-[#FFF0F5] text-[#e70064] font-bold"
                              : "text-stone-500 hover:bg-[#FAF9F6] hover:text-[#3E2723] font-medium"
                          }`}
                        >
                          <span>{cat}</span>
                          <span
                            className={`transition-transform ${
                              activeCategory === cat
                                ? "translate-x-0 opacity-100"
                                : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                            }`}
                          >
                            →
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dietary */}
                  <div className="pt-2">
                    <label
                      className={`${montserrat.className} text-[9px] font-bold uppercase tracking-[0.22em] text-stone-400 mb-4 block`}
                    >
                      Dietary
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          isEggless
                            ? "bg-[#e70064] border-[#e70064] shadow-sm"
                            : "border-stone-300 group-hover:border-[#e70064]"
                        }`}
                      >
                        {isEggless && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="m5 13 4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>

                      <input
                        type="checkbox"
                        className="hidden"
                        checked={isEggless}
                        onChange={() => setIsEggless(!isEggless)}
                      />

                      <span
                        className={`${montserrat.className} text-[11px] font-semibold text-stone-600 tracking-wide group-hover:text-[#3E2723] transition`}
                      >
                        100% Eggless Only
                      </span>
                    </label>
                  </div>

                  {/* Price */}
                  <div>
                    <label
                      className={`${montserrat.className} text-[9px] font-bold uppercase tracking-[0.22em] text-stone-400 mb-4 flex justify-between items-center`}
                    >
                      <span>Maximum Price</span>
                      <span className="text-[#e70064] font-bold text-xs">
                        ₹{maxPrice.toLocaleString("en-IN")}
                      </span>
                    </label>

                    <input
                      type="range"
                      min="300"
                      max="5000"
                      step="100"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-[#e70064] h-1.5 bg-stone-200 rounded-full appearance-none cursor-pointer"
                    />

                    <div
                      className={`${montserrat.className} flex justify-between mt-2 text-[9px] font-semibold text-stone-400`}
                    >
                      <span>₹300</span>
                      <span>₹5,000+</span>
                    </div>
                  </div>

                  {/* Clear */}
                  <button
                    onClick={clearFilters}
                    className={`${montserrat.className} w-full py-3.5 text-[9px] font-bold tracking-[0.2em] uppercase text-stone-500 border border-stone-200 rounded-full hover:bg-[#3E2723] hover:text-white hover:border-[#3E2723] transition-all`}
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* =====================================================
              PRODUCTS
             ===================================================== */}
          <div className="w-full min-w-0">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-7 pb-5 border-b border-stone-200">
              <div>
                <div
                  className={`${montserrat.className} text-[9px] font-bold tracking-[0.22em] uppercase text-[#e70064] mb-2`}
                >
                  Our Collection
                </div>

                <h2
                  className={`${playfair.className} text-3xl md:text-4xl font-bold text-[#3E2723]`}
                >
                  {activeCategory}
                </h2>
              </div>

              <div
                className={`${montserrat.className} inline-flex self-start sm:self-auto items-center gap-2 bg-white border border-stone-100 rounded-full px-4 py-2.5 text-[9px] text-stone-500 tracking-[0.14em] uppercase font-bold shadow-sm`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#e70064]" />
                {filteredCakes.length}{" "}
                {filteredCakes.length === 1 ? "Cake" : "Cakes"}
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="bg-white rounded-[1.75rem] p-4 border border-stone-100 animate-pulse"
                  >
                    <div className="aspect-[4/4.5] rounded-[1.35rem] bg-stone-100 mb-5" />
                    <div className="h-4 bg-stone-100 rounded w-2/3 mb-3" />
                    <div className="h-3 bg-stone-100 rounded w-full mb-2" />
                    <div className="h-3 bg-stone-100 rounded w-4/5 mb-5" />
                    <div className="flex justify-between">
                      <div className="h-5 bg-stone-100 rounded w-16" />
                      <div className="h-9 bg-stone-100 rounded-full w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredCakes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCakes.map((cake: any) => {
                  // Existing price compatibility logic — unchanged.
                  const hasMultiplePrices =
                    cake.pricing &&
                    Array.isArray(cake.pricing) &&
                    cake.pricing.length > 1;

                  return (
                    <div
                      key={cake.id}
                      className="group flex flex-col bg-white border border-stone-100 p-4 rounded-[1.75rem] shadow-[0_8px_30px_rgba(62,39,35,0.045)] hover:shadow-[0_18px_45px_rgba(62,39,35,0.11)] hover:-translate-y-1 transition-all duration-500"
                    >
                      {/* Product image */}
                      <div className="w-full aspect-[4/4.5] bg-[#FAF9F6] overflow-hidden mb-5 relative rounded-[1.35rem]">
                        {cake.image_url ? (
                          <img
                            src={cake.image_url}
                            alt={cake.name}
                            className="object-cover w-full h-full group-hover:scale-[1.045] transition duration-700 ease-out"
                          />
                        ) : (
                          <div
                            className={`${montserrat.className} w-full h-full flex flex-col items-center justify-center text-stone-300`}
                          >
                            <span className="text-4xl mb-3">🍰</span>
                            <span className="font-semibold text-[9px] tracking-widest uppercase">
                              Image Pending
                            </span>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/20 via-transparent to-transparent pointer-events-none" />

                        {cake.is_eggless && (
                          <div
                            className={`${montserrat.className} absolute top-3 right-3 bg-white/95 backdrop-blur-md text-[#e70064] text-[8px] uppercase tracking-[0.14em] font-bold px-3 py-2 rounded-full shadow-sm`}
                          >
                            ✓ Eggless
                          </div>
                        )}

                        <div
                          className={`${montserrat.className} absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-[#3E2723] text-[8px] uppercase tracking-[0.14em] font-bold px-3 py-2 rounded-full shadow-sm`}
                        >
                          Freshly Baked
                        </div>
                      </div>

                      <div className="px-1 flex-grow flex flex-col">
                        <h4
                          className={`${playfair.className} text-xl font-bold text-[#3E2723] mb-2 leading-tight`}
                        >
                          {cake.name}
                        </h4>

                        <p className="text-stone-500 text-xs mb-5 flex-grow line-clamp-2 leading-relaxed font-light">
                          {cake.description}
                        </p>

                        <div className="flex justify-between items-end gap-3 pt-4 border-t border-stone-100 mt-auto">
                          <div className="flex flex-col">
                            {hasMultiplePrices && (
                              <span
                                className={`${montserrat.className} text-[8px] font-bold text-stone-400 uppercase tracking-[0.16em] mb-0.5`}
                              >
                                Starts at
                              </span>
                            )}

                            <span
                              className={`${montserrat.className} font-extrabold text-lg text-[#3E2723]`}
                            >
                              ₹{cake.price}
                            </span>
                          </div>

                          <a
                            href={`/shop/${cake.id}`}
                            className={`${montserrat.className} inline-flex items-center gap-2 bg-[#FFF0F5] text-[#e70064] px-4 py-2.5 rounded-full font-bold text-[9px] tracking-[0.13em] uppercase hover:bg-[#e70064] hover:text-white transition-all duration-300`}
                          >
                            View Cake
                            <span className="text-sm leading-none">→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-24 md:py-32 text-center bg-white border border-stone-100 rounded-[2rem] shadow-sm">
                <div className="w-16 h-16 rounded-full bg-[#FFF0F5] mx-auto mb-5 flex items-center justify-center text-2xl">
                  🍰
                </div>

                <p
                  className={`${playfair.className} text-2xl font-bold text-[#3E2723] mb-2`}
                >
                  No cakes found
                </p>

                <p className="text-stone-400 text-sm font-light mb-7">
                  Try changing your search or filters to discover more cakes.
                </p>

                <button
                  onClick={clearFilters}
                  className={`${montserrat.className} text-[9px] font-bold tracking-[0.18em] uppercase text-[#e70064] border-b border-[#e70064] pb-1 hover:text-[#3E2723] hover:border-[#3E2723] transition-colors`}
                >
                  View All Cakes
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* =========================================================
          CUSTOM CAKE CTA — visual addition only
         ========================================================= */}
      <section className="px-5 md:px-10 pb-16">
        <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-[#3E2723] text-white">
          <div className="absolute -right-20 -top-32 w-80 h-80 rounded-full bg-[#e70064]/20 blur-3xl" />
          <div className="absolute -left-24 -bottom-32 w-80 h-80 rounded-full bg-[#ffd8e7]/10 blur-3xl" />

          <div className="relative px-7 md:px-14 py-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div
                className={`${montserrat.className} text-[9px] font-bold tracking-[0.25em] uppercase text-[#ffb6d0] mb-3`}
              >
                Can't find what you imagined?
              </div>

              <h2
                className={`${playfair.className} text-3xl md:text-4xl font-bold mb-3`}
              >
                You Imagine It. We Bake It.
              </h2>

              <p className="text-white/65 text-sm font-light max-w-xl">
                Tell us your idea, flavour and occasion. We'll help you create
                a cake made especially for you.
              </p>
            </div>

            <a
              href="/custom-cake"
              className={`${montserrat.className} shrink-0 bg-[#e70064] text-white px-7 py-4 rounded-full font-bold text-[9px] tracking-[0.16em] uppercase hover:bg-white hover:text-[#3E2723] transition-all shadow-lg`}
            >
              Create Custom Cake →
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER — navigation/functionality preserved
         ========================================================= */}
      <footer className="bg-[#251714] text-white pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <h2
              className={`${montserrat.className} text-2xl font-bold tracking-tight mb-4`}
            >
              Cake By Rupali<span className="text-[#e70064]">.</span>
            </h2>

            <p className="text-stone-400 text-sm font-light leading-relaxed mb-8 max-w-sm">
              Premium handcrafted cakes designed with professional perfection
              in Virar. Elevating everyday celebrations into unforgettable
              memories.
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                className={`${montserrat.className} w-10 h-10 border border-stone-700 rounded-full flex items-center justify-center text-[10px] font-bold hover:bg-[#e70064] hover:border-[#e70064] transition-colors text-stone-300 hover:text-white`}
              >
                IG
              </a>
              <a
                href="#"
                className={`${montserrat.className} w-10 h-10 border border-stone-700 rounded-full flex items-center justify-center text-[10px] font-bold hover:bg-[#e70064] hover:border-[#e70064] transition-colors text-stone-300 hover:text-white`}
              >
                FB
              </a>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <h4
              className={`${montserrat.className} font-bold text-[10px] uppercase tracking-widest mb-6 text-stone-100`}
            >
              Quick Links
            </h4>

            <ul className="space-y-4 text-sm font-light text-stone-400">
              <li>
                <a href="/shop" className="hover:text-white transition">
                  Shop Cakes
                </a>
              </li>
              <li>
                <a
                  href="/custom-cake"
                  className="hover:text-white transition"
                >
                  Custom Orders
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  Our Story
                </a>
              </li>
              <li>
                <a href="/admin" className="hover:text-white transition">
                  Admin Portal
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4
              className={`${montserrat.className} font-bold text-[10px] uppercase tracking-widest mb-6 text-stone-100`}
            >
              Contact Us
            </h4>

            <ul className="space-y-4 text-sm font-light text-stone-400">
              <li className="flex gap-3 items-center">
                <span className="text-[#e70064]">📍</span>
                Virar (East), Maharashtra
              </li>
              <li className="flex gap-3 items-center">
                <span className="text-[#e70064]">📞</span>
                +91 76666 60036
              </li>
            </ul>

            <div className="mt-8 p-4 bg-stone-800/40 rounded-2xl border border-stone-800">
              <p
                className={`${montserrat.className} text-[9px] text-stone-500 mb-1 uppercase tracking-widest font-semibold`}
              >
                FSSAI Registration
              </p>
              <p className="text-sm text-stone-300 font-light">
                (Update in Admin)
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-stone-500 tracking-wide">
          <p>&copy; {new Date().getFullYear()} Cake By Rupali. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="/admin" className="hover:text-white transition">
              Admin Portal
            </a>
            <span>Designed for the modern web.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
