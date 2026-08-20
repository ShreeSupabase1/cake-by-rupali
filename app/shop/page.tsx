"use client";

import { useState, useEffect, Suspense } from "react";
import { createClient } from "@supabase/supabase-js";
import { Inter } from "next/font/google";
import { useSearchParams } from "next/navigation";

// Crisp, professional commerce typography — visual only.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
          className={`min-h-screen flex items-center justify-center bg-[#FAF9F6] text-stone-500 tracking-widest text-sm uppercase ${inter.className}`}
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

  // Product categories — visual expansion only; existing category values are preserved.
  const categories = [
    "All Cakes",
    "Birthday Cakes",
    "Wedding & Anniversary",
    "Kids Theme Cakes",
    "Premium Signature",
    "Chocolate Cakes",
    "Fresh Fruit Cakes",
    "Red Velvet Cakes",
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
        if (activeCategory === "Chocolate Cakes")
          return text.includes("chocolate") || text.includes("oreo") || text.includes("truffle") || text.includes("black forest");
        if (activeCategory === "Fresh Fruit Cakes")
          return text.includes("fruit") || text.includes("pineapple") || text.includes("strawberry") || text.includes("mango") || text.includes("fresh fruit");
        if (activeCategory === "Red Velvet Cakes")
          return text.includes("red velvet") || text.includes("red-velvet");

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
      className={`min-h-screen bg-[#FAF9F6] text-[#3E2723] ${inter.className}`}
    >
      {/* =========================================================
          GLOBAL HEADER — navigation/functionality preserved
         ========================================================= */}
      <header className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(62,39,35,0.06)] border-b border-stone-100">
        <div
          className={`bg-[#3E2723] text-white text-[9px] md:text-[10px] font-semibold tracking-[0.22em] uppercase text-center py-2.5 ${inter.className}`}
        >
          <span className="text-[#ffd8e7]">✦</span> Delivering Premium
          Freshness Across Virar & Mumbai <span className="text-[#ffd8e7]">✦</span>
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-10 flex justify-between items-center py-4">
          <a
            href="/"
            className={`${inter.className} text-xl md:text-2xl font-bold tracking-tight text-[#3E2723]`}
          >
            Cake By Rupali<span className="text-[#e70064]">.</span>
          </a>

          <nav
            className={`hidden md:flex items-center gap-8 lg:gap-10 text-[11px] font-semibold tracking-[0.12em] uppercase ${inter.className} text-stone-700`}
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

              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[520px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col transform group-hover:translate-y-1">
                <div className="bg-white rounded-2xl border border-stone-200 shadow-[0_20px_55px_rgba(62,39,35,0.16)] overflow-hidden">
                  <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between">
                    <div>
                      <p className={`${inter.className} text-[9px] font-bold tracking-[0.22em] uppercase text-[#e70064]`}>Shop by collection</p>
                      <p className="text-[11px] text-stone-400 mt-1">Freshly baked for every celebration</p>
                    </div>
                    <a href="/shop" className={`${inter.className} text-[9px] font-bold uppercase tracking-widest text-stone-500 hover:text-[#e70064]`}>View all →</a>
                  </div>
                  <div className="grid grid-cols-2 p-3 gap-1">
                    {[
                      ["All Cakes", "/shop"],
                      ["Birthday Cakes", "/shop?category=Birthday+Cakes"],
                      ["Wedding & Anniversary", "/shop?category=Wedding+%26+Anniversary"],
                      ["Kids & Theme Cakes", "/shop?category=Kids+Theme+Cakes"],
                      ["Premium Signature", "/shop?category=Premium+Signature"],
                      ["Chocolate Cakes", "/shop?category=Chocolate+Cakes"],
                      ["Fresh Fruit Cakes", "/shop?category=Fresh+Fruit+Cakes"],
                      ["Red Velvet Cakes", "/shop?category=Red+Velvet+Cakes"],
                      ["Dry & Tea Cakes", "/shop?category=Dry+%26+Tea+Cakes"],
                      ["Festive Specials", "/shop?category=Festive+Specials"],
                    ].map(([label, href]) => (
                      <a key={label} href={href} className="group/item flex items-center justify-between rounded-xl px-4 py-3 text-sm text-stone-700 hover:bg-[#FFF0F5] hover:text-[#e70064] transition-colors">
                        <span>{label}</span>
                        <span className="opacity-0 group-hover/item:opacity-100 text-[#e70064] transition-opacity">→</span>
                      </a>
                    ))}
                  </div>
                  <div className="bg-[#3E2723] px-5 py-3.5 flex items-center justify-between">
                    <span className="text-[10px] text-white/70">Looking for something unique?</span>
                    <a href="/custom-cake" className={`${inter.className} text-[9px] font-bold uppercase tracking-widest text-white hover:text-[#ffd8e7]`}>Create a custom cake →</a>
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
              className={`${inter.className} hidden md:block text-[10px] font-bold tracking-[0.18em] uppercase text-stone-400 hover:text-[#3E2723] transition`}
            >
              Admin
            </a>

            <a
              href="https://wa.me/917666660036"
              target="_blank"
              rel="noopener noreferrer"
              className={`${inter.className} bg-[#3E2723] text-white px-4 md:px-6 py-3 text-[9px] md:text-[10px] font-bold tracking-[0.14em] uppercase hover:bg-[#e70064] transition-colors duration-300 rounded-full shadow-sm`}
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* =========================================================
          SHOP HERO
         ========================================================= */}
      <section className="relative overflow-hidden bg-[#fff5f8] border-b border-[#eadfe2]">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/70 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-[#f8c6d9]/40 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20 text-center">
          <div
            className={`${inter.className} inline-flex items-center gap-3 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-[#e70064] mb-5`}
          >
            <span className="w-8 h-px bg-[#e70064]" />
            Freshly Baked Collection
            <span className="w-8 h-px bg-[#e70064]" />
          </div>

          <h1
            className={`${inter.className} text-4xl md:text-6xl font-extrabold tracking-[-0.04em] text-[#2f211d] leading-[1.05] mb-4`}
          >
            Find Your Perfect Cake
          </h1>

          <p className="text-[#625650] max-w-2xl mx-auto font-normal text-[13px] md:text-[14px] leading-relaxed">
            Freshly baked, handcrafted cakes for birthdays, anniversaries,
            little celebrations and everything in between.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`${inter.className} min-h-10 px-4 md:px-5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-[0.06em] border-2 transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#e70064] text-white border-[#e70064] shadow-[0_6px_18px_rgba(231,0,100,0.22)]"
                    : "bg-white text-[#3E2723] border-[#ead9df] shadow-sm hover:border-[#3E2723] hover:bg-[#3E2723] hover:text-white"
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
      <main className="max-w-7xl mx-auto px-5 md:px-10 py-10 md:py-14">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* =====================================================
              FILTER PANEL — generic e-commerce filter UI
             ===================================================== */}
          <aside className="w-full md:w-[260px] lg:w-[285px] shrink-0">
            <div className="md:sticky md:top-32">
              <div className="bg-white rounded-[1.5rem] border border-stone-100 shadow-[0_8px_30px_rgba(62,39,35,0.07)] overflow-hidden">
                <div className="px-5 py-4 border-b border-[#eee9e6] flex items-center justify-between">
                  <div>
                    <h2 className={`${inter.className} text-base font-extrabold tracking-tight text-[#2f211d]`}>
                      Filters
                    </h2>
                    <p className="text-[11px] text-stone-400 mt-0.5">
                      Refine your results
                    </p>
                  </div>

                  <button
                    onClick={clearFilters}
                    className={`${inter.className} text-[10px] font-bold uppercase tracking-[0.08em] text-[#e70064] hover:text-[#3E2723] transition`}
                  >
                    Clear
                  </button>
                </div>

                <div className="p-4">
                  <div className="mb-3">
                    <label
                      className={`${inter.className} text-[10px] font-bold uppercase tracking-[0.12em] text-[#6f625d] mb-2 block`}
                    >
                      Search
                    </label>

                    <div className="relative">
                      <svg
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8f837d]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.8"
                          d="m21 21-4.35-4.35m2.1-5.15a7.25 7.25 0 1 1-14.5 0 7.25 7.25 0 0 1 14.5 0Z"
                        />
                      </svg>

                      <input
                        type="text"
                        placeholder="Search cakes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-11 rounded-xl border border-[#ded7d2] bg-white pl-10 pr-3 text-[12px] text-[#2f211d] focus:outline-none focus:border-[#3E2723] focus:ring-2 focus:ring-[#3E2723]/10 transition placeholder:text-[#a79d97]"
                      />
                    </div>
                  </div>

                  <details open className="group border-t border-[#eee9e6]">
                    <summary className="list-none cursor-pointer py-4 flex items-center justify-between select-none">
                      <div>
                        <span className={`${inter.className} text-[11px] font-bold uppercase tracking-[0.1em] text-[#3E2723]`}>
                          Category
                        </span>
                        <span className={`${inter.className} block mt-1 max-w-[165px] truncate text-[10px] font-semibold text-[#e70064]`}>
                          {activeCategory}
                        </span>
                      </div>
                      <span className="w-8 h-8 rounded-full border border-[#e7dfda] bg-[#faf8f7] flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-[#766a64] transition-transform group-open:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                            d="m6 9 6 6 6-6"
                          />
                        </svg>
                      </span>
                    </summary>

                    <div className="pb-3 space-y-1.5 max-h-[420px] overflow-y-auto pr-1">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={`${inter.className} w-full min-h-10 px-3.5 rounded-xl flex items-center justify-between text-left text-[11px] font-medium transition ${
                            activeCategory === cat
                              ? "bg-[#3E2723] text-white font-bold shadow-sm"
                              : "text-[#655954] hover:bg-[#FFF0F5] hover:text-[#e70064]"
                          }`}
                        >
                          <span>{cat}</span>
                          {activeCategory === cat && (
                            <span className="text-[#ffd0df]">✓</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </details>

                  <details className="group border-t border-[#eee9e6]">
                    <summary className="list-none cursor-pointer py-4 flex items-center justify-between select-none">
                      <span className={`${inter.className} text-[11px] font-bold uppercase tracking-[0.1em] text-[#3E2723]`}>
                        Dietary
                      </span>

                      <span className="flex items-center gap-2">
                        <span className={`${inter.className} text-[10px] font-semibold ${isEggless ? "text-[#e70064]" : "text-[#958a84]"}`}>
                          {isEggless ? "Eggless" : "All"}
                        </span>
                        <svg
                          className="w-4 h-4 text-[#766a64] transition-transform group-open:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                            d="m6 9 6 6 6-6"
                          />
                        </svg>
                      </span>
                    </summary>

                    <div className="pb-4">
                      <label className="flex items-center gap-3 cursor-pointer rounded-lg px-3 py-3 bg-[#faf8f7] hover:bg-[#f5f0ed] transition">
                        <input
                          type="checkbox"
                          checked={isEggless}
                          onChange={() => setIsEggless(!isEggless)}
                          className="sr-only"
                        />

                        <span
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                            isEggless
                              ? "bg-[#e70064] border-[#e70064]"
                              : "bg-white border-[#cfc6c1]"
                          }`}
                        >
                          {isEggless && (
                            <svg
                              className="w-3.5 h-3.5 text-white"
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
                        </span>

                        <span className={`${inter.className} text-[11px] font-semibold text-[#4e433e]`}>
                          100% Eggless Only
                        </span>
                      </label>
                    </div>
                  </details>

                  <details className="group border-t border-[#eee9e6]">
                    <summary className="list-none cursor-pointer py-4 flex items-center justify-between select-none">
                      <span className={`${inter.className} text-[11px] font-bold uppercase tracking-[0.1em] text-[#3E2723]`}>
                        Price
                      </span>

                      <span className="flex items-center gap-2">
                        <span className={`${inter.className} text-[10px] font-bold text-[#e70064]`}>
                          Up to ₹{maxPrice.toLocaleString("en-IN")}
                        </span>
                        <svg
                          className="w-4 h-4 text-[#766a64] transition-transform group-open:rotate-180"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                            d="m6 9 6 6 6-6"
                          />
                        </svg>
                      </span>
                    </summary>

                    <div className="pb-4 px-1">
                      <input
                        type="range"
                        min="300"
                        max="5000"
                        step="100"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full accent-[#e70064] h-1.5 bg-[#e4deda] rounded-full appearance-none cursor-pointer"
                      />

                      <div className={`${inter.className} flex justify-between mt-2 text-[10px] font-semibold text-[#938780]`}>
                        <span>₹300</span>
                        <span>₹5,000+</span>
                      </div>
                    </div>
                  </details>

                  <button
                    onClick={clearFilters}
                    className={`${inter.className} mt-2 w-full h-11 rounded-xl bg-[#3E2723] text-white text-[10px] font-bold uppercase tracking-[0.12em] hover:bg-[#e70064] transition-colors shadow-sm`}
                  >
                    Reset Filters
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
                  className={`${inter.className} text-[9px] font-bold tracking-[0.22em] uppercase text-[#e70064] mb-2`}
                >
                  Our Collection
                </div>

                <h2
                  className={`${inter.className} text-3xl md:text-4xl font-extrabold tracking-[-0.03em] text-[#2f211d]`}
                >
                  {activeCategory}
                </h2>
              </div>

              <div
                className={`${inter.className} inline-flex self-start sm:self-auto items-center gap-2 bg-[#3E2723] text-white rounded-full px-4 py-2.5 text-[10px] tracking-[0.08em] uppercase font-bold shadow-sm`}
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
                      className="group flex flex-col bg-white border border-stone-100 p-3.5 rounded-[1.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      {/* Product image */}
                      <div className="w-full aspect-square bg-[#FAF9F6] overflow-hidden mb-4 relative rounded-[1.35rem]">
                        {cake.image_url ? (
                          <img
                            src={cake.image_url}
                            alt={cake.name}
                            className="object-cover w-full h-full group-hover:scale-105 transition duration-700 ease-out"
                          />
                        ) : (
                          <div
                            className={`${inter.className} w-full h-full flex flex-col items-center justify-center text-stone-300`}
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
                            className={`${inter.className} absolute top-3 right-3 bg-white/95 backdrop-blur-md text-[#e70064] text-[8px] uppercase tracking-[0.14em] font-bold px-3 py-2 rounded-full shadow-sm`}
                          >
                            ✓ Eggless
                          </div>
                        )}

                        <div
                          className={`${inter.className} absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-[#3E2723] text-[8px] uppercase tracking-[0.14em] font-bold px-3 py-2 rounded-full shadow-sm`}
                        >
                          Freshly Baked
                        </div>
                      </div>

                      <div className="px-2 flex-grow flex flex-col">
                        <h4
                          className={`${inter.className} text-[17px] font-bold text-[#2f211d] mb-1.5 leading-tight tracking-[-0.01em]`}
                        >
                          {cake.name}
                        </h4>

                        <p className="text-[#766a64] text-[11px] mb-5 flex-grow line-clamp-2 leading-[1.55] font-normal">
                          {cake.description}
                        </p>

                        <div className="flex justify-between items-center gap-3 pt-3 border-t border-stone-100 mt-auto">
                          <div className="flex flex-col">
                            {hasMultiplePrices && (
                              <span
                                className={`${inter.className} text-[8px] font-bold text-stone-400 uppercase tracking-[0.16em] mb-0.5`}
                              >
                                Starts at
                              </span>
                            )}

                            <span
                              className={`${inter.className} font-extrabold text-lg text-[#3E2723]`}
                            >
                              ₹{cake.price}
                            </span>
                          </div>

                          <a
                            href={`/shop/${cake.id}`}
                            className={`${inter.className} inline-flex items-center justify-center gap-2 bg-[#3E2723] text-white px-4 py-2.5 rounded-full font-bold text-[10px] tracking-[0.08em] uppercase shadow-sm hover:bg-[#e70064] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}
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
                  className={`${inter.className} text-2xl font-bold text-[#3E2723] mb-2`}
                >
                  No cakes found
                </p>

                <p className="text-stone-400 text-sm font-light mb-7">
                  Try changing your search or filters to discover more cakes.
                </p>

                <button
                  onClick={clearFilters}
                  className={`${inter.className} text-[9px] font-bold tracking-[0.18em] uppercase text-[#e70064] border-b border-[#e70064] pb-1 hover:text-[#3E2723] hover:border-[#3E2723] transition-colors`}
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
                className={`${inter.className} text-[9px] font-bold tracking-[0.25em] uppercase text-[#ffb6d0] mb-3`}
              >
                Can't find what you imagined?
              </div>

              <h2
                className={`${inter.className} text-3xl md:text-4xl font-bold mb-3`}
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
              className={`${inter.className} shrink-0 bg-[#e70064] text-white px-7 py-4 rounded-full font-bold text-[9px] tracking-[0.16em] uppercase hover:bg-white hover:text-[#3E2723] transition-all shadow-lg`}
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
              className={`${inter.className} text-2xl font-bold tracking-tight mb-4`}
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
                className={`${inter.className} w-10 h-10 border border-stone-700 rounded-full flex items-center justify-center text-[10px] font-bold hover:bg-[#e70064] hover:border-[#e70064] transition-colors text-stone-300 hover:text-white`}
              >
                IG
              </a>
              <a
                href="#"
                className={`${inter.className} w-10 h-10 border border-stone-700 rounded-full flex items-center justify-center text-[10px] font-bold hover:bg-[#e70064] hover:border-[#e70064] transition-colors text-stone-300 hover:text-white`}
              >
                FB
              </a>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <h4
              className={`${inter.className} font-bold text-[10px] uppercase tracking-widest mb-6 text-stone-100`}
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
              className={`${inter.className} font-bold text-[10px] uppercase tracking-widest mb-6 text-stone-100`}
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
                className={`${inter.className} text-[9px] text-stone-500 mb-1 uppercase tracking-widest font-semibold`}
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
