from pathlib import Path

code = r''' "use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
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
  style: ["normal", "italic"],
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

const heroImages = [
  "/hero-1.jpg",
  "/hero-2.jpg",
  "/hero-3.jpg",
  "/hero-4.jpg",
];

const categoryData = [
  {
    title: "Birthday Cakes",
    sub: "For the special day",
    img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80",
    link: "/shop?category=Birthday+Cakes",
  },
  {
    title: "Wedding & Anniversary",
    sub: "For your forever moments",
    img: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80",
    link: "/shop?category=Wedding+%26+Anniversary",
  },
  {
    title: "Kids & Theme Cakes",
    sub: "Made for little smiles",
    img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80",
    link: "/shop?category=Kids+Theme+Cakes",
  },
  {
    title: "Premium Signature",
    sub: "For something extra special",
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80",
    link: "/shop?category=Premium+Signature",
  },
  {
    title: "Dry & Tea Cakes",
    sub: "Perfect with your chai",
    img: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80",
    link: "/shop?category=Dry+%26+Tea+Cakes",
  },
  {
    title: "Festive Specials",
    sub: "Made for the season",
    img: "https://images.unsplash.com/photo-1602351447937-745cb720612f?auto=format&fit=crop&q=80",
    link: "/shop?category=Festive+Specials",
  },
  {
    title: "Custom Cakes",
    sub: "Your idea. Your cake.",
    img: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&q=80",
    link: "/custom-cake",
  },
];

const processData = [
  {
    step: "01",
    title: "Mix",
    img: "https://images.unsplash.com/photo-1556910103-1c02745a872e?auto=format&fit=crop&w=800&q=80",
  },
  {
    step: "02",
    title: "Bake",
    img: "https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&w=800&q=80",
  },
  {
    step: "03",
    title: "Decorate",
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
  },
  {
    step: "04",
    title: "Pack",
    img: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80",
  },
];

const reviews = [
  {
    text: "The Black Forest cake was absolutely divine! The finishing was so professional, it looked like it came from a 5-star hotel. Highly recommended.",
    name: "Priya M.",
    cake: "Black Forest",
  },
  {
    text: "Ordered a custom Cocomelon theme cake for my son's 1st birthday. Rupali nailed the design perfectly and the eggless chocolate flavor was a hit!",
    name: "Rahul D.",
    cake: "Custom Theme Cake",
  },
  {
    text: "Best tea cakes in Virar! The mawa cake brings back so many memories. Ordering through WhatsApp was also super easy and convenient.",
    name: "Sneha S.",
    cake: "Mawa Tea Cake",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1563716113315-769502b748cb?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80",
];

const instagramImages = [
  "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80",
];

function LineIcon({ type }: { type: "fresh" | "eggless" | "finish" | "delivery" | "cake" | "ring" | "kids" | "heart" }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const paths = {
    fresh: (
      <>
        <path {...common} d="M12 3v4M5.6 5.6l2.8 2.8M3 12h4M5.6 18.4l2.8-2.8M18.4 18.4l-2.8-2.8M21 12h-4M18.4 5.6l-2.8 2.8" />
        <circle {...common} cx="12" cy="12" r="4" />
      </>
    ),
    eggless: (
      <>
        <path {...common} d="M12 21c4.1 0 6.5-2.4 6.5-5.8C18.5 10.7 15.3 4 12 4s-6.5 6.7-6.5 11.2C5.5 18.6 7.9 21 12 21Z" />
        <path {...common} d="M5 5l14 14" />
      </>
    ),
    finish: (
      <>
        <path {...common} d="M5 20h14M7 17h10M8 14h8M9 11h6M10 8h4" />
        <path {...common} d="M12 4V2M8 5 7 3M16 5l1-2" />
      </>
    ),
    delivery: (
      <>
        <path {...common} d="M3 7h11v10H3zM14 11h4l3 3v3h-7z" />
        <circle {...common} cx="7" cy="19" r="2" />
        <circle {...common} cx="18" cy="19" r="2" />
      </>
    ),
    cake: (
      <>
        <path {...common} d="M4 11h16v8H4z" />
        <path {...common} d="M4 14h16M8 11V8M12 11V7M16 11V8" />
        <path {...common} d="M8 7c-1.4-1-1.2-2.5 0-3 1.2.5 1.4 2 0 3ZM12 6c-1.4-1-1.2-2.5 0-3 1.2.5 1.4 2 0 3ZM16 7c-1.4-1-1.2-2.5 0-3 1.2.5 1.4 2 0 3Z" />
      </>
    ),
    ring: (
      <>
        <circle {...common} cx="12" cy="13" r="7" />
        <path {...common} d="M8.5 8.5 12 4l3.5 4.5M10.5 6 12 3l1.5 3" />
      </>
    ),
    kids: (
      <>
        <path {...common} d="M12 21a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />
        <path {...common} d="M8.5 12.5h.01M15.5 12.5h.01M9.5 16c1.5 1 3.5 1 5 0" />
        <path {...common} d="M12 7V4M9 5l3-2 3 2" />
      </>
    ),
    heart: (
      <path {...common} d="M20.8 8.8c0 5.2-8.8 10.2-8.8 10.2S3.2 14 3.2 8.8A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z" />
    ),
  };

  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden="true">
      {paths[type]}
    </svg>
  );
}

export default function Home() {
  const [cakes, setCakes] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const customCakeMessage =
    "Hi Rupali! I would like to order a Custom Cake.%0A%0A*My Requirements:*%0A- Occasion: %0A- Flavor: %0A- Weight (kg): %0A- Date Needed: %0A- Reference Image: (I will attach below)";

  const handleNext = () =>
    setCurrentSlide((prev) =>
      prev === heroImages.length - 1 ? 0 : prev + 1
    );

  const handlePrev = () =>
    setCurrentSlide((prev) =>
      prev === 0 ? heroImages.length - 1 : prev - 1
    );

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*");
      if (data) setCakes(data);
    };

    fetchProducts();

    const timer = setInterval(() => {
      handleNext();
    }, 6000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="home"
      className={`min-h-screen bg-[#FAF9F6] text-[#3E2723] scroll-smooth ${poppins.className}`}
    >
      {/* =========================================================
          EXISTING HEADER — LOGIC / FUNCTIONS / STRUCTURE PRESERVED
          ========================================================= */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-white shadow-sm border-b border-stone-200"
            : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center transition-all duration-300 ${
            scrolled ? "py-4" : "py-6"
          }`}
        >
          <h1
            className={`${montserrat.className} text-2xl font-bold tracking-tight ${
              scrolled ? "text-stone-900" : "text-white"
            }`}
          >
            Cake By Rupali
          </h1>

          <nav
            className={`hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide uppercase ${montserrat.className} ${
              scrolled ? "text-stone-700" : "text-white"
            }`}
          >
            <a href="#home" className="hover:text-[#e70064] transition-colors">
              Home
            </a>

            <div className="group relative py-4">
              <button className="hover:text-[#e70064] transition flex items-center gap-1 outline-none uppercase tracking-wide font-semibold">
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

              <div className="absolute left-0 top-full w-60 bg-white border border-stone-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col transform group-hover:translate-y-1">
                <div className="p-4 text-stone-700 flex flex-col gap-3">
                  <a
                    href="/shop"
                    className="hover:text-[#e70064] transition text-xs font-bold uppercase tracking-widest border-b border-stone-100 pb-2"
                  >
                    All Cakes
                  </a>
                  <a
                    href="/shop?category=Birthday+Cakes"
                    className="hover:text-[#e70064] transition text-sm capitalize"
                  >
                    Birthday Cakes
                  </a>
                  <a
                    href="/shop?category=Wedding+%26+Anniversary"
                    className="hover:text-[#e70064] transition text-sm capitalize"
                  >
                    Wedding & Anniversary
                  </a>
                  <a
                    href="/shop?category=Kids+Theme+Cakes"
                    className="hover:text-[#e70064] transition text-sm capitalize"
                  >
                    Kids & Theme Cakes
                  </a>
                  <a
                    href="/shop?category=Premium+Signature"
                    className="hover:text-[#e70064] transition text-sm capitalize"
                  >
                    Premium Signature
                  </a>
                  <a
                    href="/shop?category=Dry+%26+Tea+Cakes"
                    className="hover:text-[#e70064] transition text-sm capitalize"
                  >
                    Dry & Tea Cakes
                  </a>
                </div>
                <div className="bg-stone-50 p-4 border-t border-stone-100">
                  <a
                    href="/shop?category=Festive+Specials"
                    className="text-[#e70064] font-semibold text-sm hover:text-pink-800 transition capitalize block"
                  >
                    🎉 Festive Specials
                  </a>
                </div>
              </div>
            </div>

            <a
              href="/custom-cake"
              className="hover:text-[#e70064] transition uppercase tracking-wide font-semibold"
            >
              Custom Cake
            </a>

            <a
              href="/about"
              className="hover:text-[#e70064] transition uppercase tracking-wide font-semibold"
            >
              About Us
            </a>

            {/* Kept available without exposing admin visually in the customer navigation */}
            <a
              href="/admin"
              aria-label="Admin"
              className="sr-only"
            >
              Admin
            </a>
          </nav>

          <a
            href="https://wa.me/917666660036"
            target="_blank"
            rel="noopener noreferrer"
            className={`${montserrat.className} px-6 py-3 text-xs font-bold tracking-wider uppercase transition-all duration-300 rounded-sm border ${
              scrolled
                ? "bg-stone-900 text-white border-stone-900 hover:bg-[#e70064] hover:border-[#e70064]"
                : "bg-white text-stone-900 border-white hover:bg-transparent hover:text-white"
            }`}
          >
            Order on WhatsApp
          </a>
        </div>
      </header>

      {/* =========================================================
          HERO — VISUAL UPGRADE ONLY
          Slider state, images and 6-second timing unchanged.
          ========================================================= */}
      <section className="relative h-screen min-h-[680px] w-full overflow-hidden flex items-center bg-[#0d0907]">
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Fresh Cake"
              className={`absolute inset-0 w-full h-full object-cover object-[72%_center] transition-opacity duration-1000 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0"
              }`}
            />
          ))}
        </div>

        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0d0907]/90 via-[#0d0907]/52 to-[#0d0907]/10" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0d0907]/70 via-transparent to-[#0d0907]/20" />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-10 pt-24 md:pt-28">
          <div className="max-w-[560px]">
            <div className="flex items-center gap-3 mb-6">
              <span
                className={`${montserrat.className} text-[#e3c77a] text-xs md:text-sm italic tracking-[0.12em]`}
              >
                Made Fresh. Made Happy.
              </span>
              <span className="w-7 h-px bg-[#e70064]" />
            </div>

            <h2
              className={`${playfair.className} text-[42px] sm:text-5xl md:text-[58px] lg:text-[64px] font-semibold text-white leading-[1.05] tracking-[-0.02em] mb-7 drop-shadow-2xl`}
            >
              Fresh Cakes,
              <br />
              Baked with Love
              <br />
              in <span className="text-[#e70064] italic">Virar.</span>
            </h2>

            <div className="flex items-center gap-3 mb-7">
              <span className="w-10 h-px bg-[#e70064]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#e70064]" />
              <span className="w-10 h-px bg-white/30" />
            </div>

            <p className="text-sm md:text-base lg:text-[17px] text-white/85 font-light max-w-[500px] mb-9 leading-[1.8]">
              Birthday ho, anniversary ho, ya bas kuch meetha khane ka mann ho
              — we bake fresh cakes for every special moment.
            </p>

            <div className={`${montserrat.className} flex flex-col sm:flex-row gap-3`}>
              <a
                href="/shop"
                className="bg-[#e70064] text-white px-8 py-3.5 font-bold text-[11px] tracking-[0.14em] uppercase hover:bg-white hover:text-stone-900 transition-all rounded-sm shadow-lg text-center"
              >
                Shop Now
              </a>
              <a
                href="/custom-cake"
                className="bg-white/5 text-white border border-white/45 px-8 py-3.5 font-bold text-[11px] tracking-[0.14em] uppercase hover:bg-white/15 transition-all rounded-sm backdrop-blur-md text-center"
              >
                Custom Order
              </a>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-between px-4 md:px-8 z-20 pointer-events-none">
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full border border-white/25 bg-black/15 text-white hover:bg-[#e70064] hover:border-[#e70064] transition-all backdrop-blur-sm hidden md:flex"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={handleNext}
            aria-label="Next slide"
            className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full border border-white/25 bg-black/15 text-white hover:bg-[#e70064] hover:border-[#e70064] transition-all backdrop-blur-sm hidden md:flex"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="absolute bottom-24 md:bottom-28 left-6 md:left-10 z-20 flex items-center gap-3">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-500 rounded-full ${
                idx === currentSlide
                  ? "w-8 h-1.5 bg-[#e70064]"
                  : "w-1.5 h-1.5 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>

        {/* Four-layer organic transition */}
        <div className="absolute bottom-[-1px] left-0 w-full z-20 overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 1440 190"
            preserveAspectRatio="none"
            className="w-full h-[72px] sm:h-[105px] md:h-[135px] block"
          >
            <path
              fill="#FAF9F6"
              fillOpacity="0.28"
              d="M0 92C160 42 290 122 470 90C650 58 780 32 950 78C1120 124 1270 56 1440 88V190H0Z"
            />
            <path
              fill="#FAF9F6"
              fillOpacity="0.5"
              d="M0 112C160 76 300 138 490 111C680 84 830 62 1000 105C1170 148 1290 84 1440 105V190H0Z"
            />
            <path
              fill="#FAF9F6"
              fillOpacity="0.78"
              d="M0 136C180 102 320 152 520 130C720 108 850 104 1030 133C1210 162 1320 120 1440 134V190H0Z"
            />
            <path
              fill="#FAF9F6"
              d="M0 154C180 132 350 169 540 151C730 133 880 132 1060 151C1240 170 1340 145 1440 154V190H0Z"
            />
          </svg>
        </div>
      </section>

      {/* =========================================================
          TRUST RIBBON
          ========================================================= */}
      <section className="relative z-30 max-w-6xl mx-auto px-5 md:px-8 -mt-1 mb-8 md:mb-16">
        <div className="bg-white border-y md:border border-stone-200/80 md:rounded-2xl px-4 py-7 md:px-8 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { icon: "fresh" as const, title: "100% Fresh & Pure" },
              { icon: "eggless" as const, title: "Eggless Options" },
              { icon: "finish" as const, title: "Perfect Finishing" },
              { icon: "delivery" as const, title: "Safe Local Delivery" },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center justify-center gap-3 px-4 py-3 ${
                  i < 3 ? "md:border-r border-stone-200" : ""
                } ${i < 2 ? "border-b md:border-b-0 border-stone-200" : ""}`}
              >
                <span className="text-[#e70064] shrink-0">
                  <LineIcon type={item.icon} />
                </span>
                <span
                  className={`${montserrat.className} text-[9px] sm:text-[10px] font-bold text-stone-700 tracking-[0.12em] uppercase leading-snug`}
                >
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CATEGORIES
          ========================================================= */}
      <section
        id="categories"
        className="py-16 md:py-24 max-w-7xl mx-auto px-5 md:px-10 scroll-mt-28"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-2xl">
            <span
              className={`${montserrat.className} text-[#e70064] text-[10px] font-bold tracking-[0.22em] uppercase`}
            >
              Explore the collection
            </span>
            <h3
              className={`${playfair.className} text-[38px] md:text-5xl font-semibold text-[#3E2723] mt-3 leading-tight`}
            >
              Find a Cake for Every Celebration
            </h3>
          </div>
          <p className="text-stone-500 font-light text-base md:text-lg max-w-sm md:text-right leading-relaxed">
            Har celebration ke liye kuch special.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-12 gap-3 md:gap-5">
          {categoryData.map((cat, index) => {
            const featured = index === 0 || index === 6;
            const span = featured
              ? "lg:col-span-4"
              : index === 1 || index === 2
              ? "lg:col-span-4"
              : "lg:col-span-2";

            return (
              <a
                key={index}
                href={cat.link}
                className={`group relative min-w-0 h-[245px] md:h-[310px] ${span} rounded-[18px] overflow-hidden block border border-stone-200/70`}
              >
                <img
                  src={cat.img}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.045] transition-transform duration-700"
                  alt={cat.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#211310]/90 via-[#211310]/15 to-transparent" />

                <div className="absolute left-5 md:left-6 right-5 md:right-6 bottom-5 md:bottom-6">
                  <div
                    className={`${montserrat.className} text-[#f8dce8] text-[9px] tracking-[0.18em] uppercase font-semibold mb-2`}
                  >
                    {cat.sub}
                  </div>
                  <h4
                    className={`${playfair.className} text-white text-xl md:text-2xl font-semibold leading-tight`}
                  >
                    {cat.title}
                  </h4>
                  <div
                    className={`${montserrat.className} mt-3 text-white/80 text-[9px] tracking-[0.16em] uppercase font-bold flex items-center gap-2 group-hover:text-white transition-colors`}
                  >
                    Explore
                    <span className="text-base leading-none group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Subtle curve */}
      <div className="w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 70"
          preserveAspectRatio="none"
          className="w-full h-[38px] md:h-[60px] block"
        >
          <path
            fill="#FFFFFF"
            d="M0 40C180 18 310 55 500 38C700 20 820 12 1010 35C1190 56 1300 25 1440 14V70H0Z"
          />
        </svg>
      </div>

      {/* =========================================================
          BEST SELLERS
          ========================================================= */}
      <section
        id="bestsellers"
        className="py-20 md:py-28 bg-white border-y border-stone-100"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 mb-10 md:mb-14">
            <div>
              <span
                className={`${montserrat.className} text-[#e70064] text-[10px] font-bold tracking-[0.22em] uppercase`}
              >
                Freshly baked favourites
              </span>
              <h3
                className={`${playfair.className} text-[38px] md:text-5xl font-semibold text-[#3E2723] mt-3`}
              >
                Our Best Sellers
              </h3>
              <p className="text-stone-500 font-light text-base md:text-lg mt-3">
                Virar's favourites, freshly baked and loved by our customers.
              </p>
            </div>

            <a
              href="/shop"
              className={`${montserrat.className} inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#e70064] hover:text-[#3E2723] transition`}
            >
              View Entire Menu <span className="text-base">→</span>
            </a>
          </div>

          {cakes.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {cakes.slice(0, 4).map((cake: any) => (
                <a
                  href={`/shop/${cake.id}`}
                  key={cake.id}
                  className="group flex flex-col bg-[#FAF9F6] border border-stone-200/80 overflow-hidden hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="aspect-[4/4.2] bg-[#F3F0EA] overflow-hidden relative">
                    {cake.image_url ? (
                      <img
                        src={cake.image_url}
                        alt={cake.name}
                        className="object-cover w-full h-full group-hover:scale-[1.035] transition duration-700 ease-out"
                      />
                    ) : (
                      <div
                        className={`${montserrat.className} w-full h-full flex items-center justify-center text-stone-300 font-semibold text-[10px] tracking-widest uppercase`}
                      >
                        No Image
                      </div>
                    )}

                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <div
                        className={`${montserrat.className} bg-white/95 text-[#3E2723] text-[8px] uppercase tracking-[0.15em] font-bold px-3 py-1.5`}
                      >
                        Bestseller
                      </div>

                      {cake.is_eggless && (
                        <div
                          className={`${montserrat.className} bg-[#e70064] text-white text-[8px] uppercase tracking-[0.15em] font-bold px-3 py-1.5`}
                        >
                          Eggless
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-grow flex flex-col p-4 md:p-5">
                    <h4
                      className={`${playfair.className} text-lg md:text-xl font-semibold text-[#3E2723] mb-2 leading-tight`}
                    >
                      {cake.name}
                    </h4>

                    <p className="text-stone-500 text-xs mb-5 line-clamp-2 font-light min-h-[32px] leading-relaxed">
                      {cake.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-stone-200 flex justify-between items-end gap-3">
                      <div>
                        <span
                          className={`${montserrat.className} block text-[8px] font-bold text-stone-400 uppercase tracking-widest`}
                        >
                          Starts at
                        </span>
                        <span
                          className={`${montserrat.className} font-bold text-base md:text-lg text-[#3E2723]`}
                        >
                          ₹{cake.price}
                        </span>
                      </div>

                      <span
                        className={`${montserrat.className} text-[#e70064] font-bold text-[9px] tracking-[0.13em] uppercase group-hover:translate-x-1 transition-transform`}
                      >
                        Details →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="py-16 md:py-20 text-center bg-[#FAF9F6] border border-stone-200">
              <div className="mx-auto mb-5 text-[#e70064] flex justify-center">
                <LineIcon type="cake" />
              </div>
              <h4
                className={`${playfair.className} text-2xl md:text-3xl font-semibold text-[#3E2723] mb-2`}
              >
                Fresh favourites are coming soon.
              </h4>
              <p className="text-stone-500 font-light text-sm mb-6">
                Explore our collection and find something delicious for your
                celebration.
              </p>
              <a
                href="/shop"
                className={`${montserrat.className} inline-flex bg-[#e70064] text-white px-7 py-3 text-[10px] font-bold tracking-[0.16em] uppercase hover:bg-[#3E2723] transition`}
              >
                Explore Our Cakes
              </a>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          CAKE DISCOVERY
          ========================================================= */}
      <section className="py-20 md:py-28 bg-[#FAF9F6]">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <span
              className={`${montserrat.className} text-[#e70064] text-[10px] font-bold tracking-[0.22em] uppercase`}
            >
              Need a little help?
            </span>
            <h3
              className={`${playfair.className} text-3xl md:text-4xl font-semibold text-[#3E2723] mt-3`}
            >
              Not Sure Which Cake to Choose?
            </h3>
            <p className="text-stone-500 font-light text-base mt-3">
              Tell us what you're celebrating — we'll help you pick.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 border border-stone-200 bg-white">
            {[
              { label: "Birthday", icon: "cake" as const, link: "/shop?category=Birthday+Cakes" },
              { label: "Anniversary", icon: "ring" as const, link: "/shop?category=Wedding+%26+Anniversary" },
              { label: "Kids", icon: "kids" as const, link: "/shop?category=Kids+Theme+Cakes" },
              { label: "Just Because", icon: "heart" as const, link: "/shop" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                className={`flex flex-col items-center justify-center py-8 md:py-10 px-4 group hover:bg-[#FFF0F5] transition-colors ${
                  i < 3 ? "border-r border-stone-200" : ""
                } ${i < 2 ? "border-b md:border-b-0 border-stone-200" : ""}`}
              >
                <span className="text-[#e70064] mb-4 group-hover:-translate-y-1 transition-transform">
                  <LineIcon type={item.icon} />
                </span>
                <span
                  className={`${montserrat.className} font-bold text-[10px] text-[#3E2723] uppercase tracking-[0.16em]`}
                >
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY CHOOSE US
          ========================================================= */}
      <section id="about" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative">
            <div className="absolute -left-4 -top-4 w-20 h-20 border-l border-t border-[#e70064]/30" />
            <img
              src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80"
              alt="Baking Process"
              className="w-full h-[440px] md:h-[620px] object-cover rounded-[20px]"
            />
            <div className="absolute -right-4 -bottom-4 w-24 h-24 border-r border-b border-[#e70064]/30" />
          </div>

          <div className="space-y-7 md:space-y-9">
            <div>
              <span
                className={`${montserrat.className} text-[#e70064] font-bold tracking-[0.22em] text-[10px] uppercase`}
              >
                Why choose us
              </span>
              <h3
                className={`${playfair.className} text-4xl md:text-5xl lg:text-[58px] font-semibold text-[#3E2723] leading-[1.05] mt-4`}
              >
                Homemade
                <br />
                Tastes Different.
              </h3>
            </div>

            <p className="text-stone-600 leading-[1.85] font-light text-base md:text-lg max-w-xl">
              We are based right here in Virar (East). Hum sirf cake nahi
              banate, memories banate hain. Every cake is prepared in small
              batches with attention to flavour, freshness and detail.
            </p>

            <div className="pt-5 border-t border-stone-200">
              {[
                {
                  title: "100% Fresh & Pure",
                  desc: "No stale cakes. Baked fresh to order with pure ingredients.",
                },
                {
                  title: "Perfect Finishing",
                  desc: "Beautiful designs that look great and taste even better.",
                },
                {
                  title: "Easy WhatsApp Ordering",
                  desc: "No complicated apps. Just message us directly to discuss.",
                },
                {
                  title: "Made for Your Occasion",
                  desc: "Every detail customized exactly how you want it.",
                },
              ].map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-5 py-4 border-b border-stone-100 last:border-0"
                >
                  <span
                    className={`${montserrat.className} text-[#e70064]/50 font-semibold text-sm tracking-widest mt-1`}
                  >
                    0{idx + 1}
                  </span>
                  <div>
                    <h5
                      className={`${montserrat.className} font-bold text-[#3E2723] text-[10px] tracking-[0.15em] uppercase mb-1.5`}
                    >
                      {point.title}
                    </h5>
                    <p className="text-stone-500 text-sm font-light leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          KITCHEN PROCESS
          ========================================================= */}
      <section className="py-20 md:py-28 bg-[#FAF9F6] border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="max-w-2xl mb-12 md:mb-16">
            <span
              className={`${montserrat.className} text-[#e70064] text-[10px] font-bold tracking-[0.22em] uppercase`}
            >
              From our kitchen
            </span>
            <h3
              className={`${playfair.className} text-4xl md:text-5xl font-semibold text-[#3E2723] mt-3`}
            >
              Made Fresh in Our Kitchen
            </h3>
            <p className="text-stone-500 font-light text-base md:text-lg mt-4 leading-relaxed max-w-xl">
              Every cake starts with fresh ingredients, careful preparation and
              a lot of attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative">
            <div className="hidden md:block absolute left-[12.5%] right-[12.5%] top-[43%] border-t border-[#e70064]/20" />

            {processData.map((process, i) => (
              <div key={i} className="relative group">
                <div className="aspect-[4/5] overflow-hidden rounded-[18px] relative">
                  <img
                    src={process.img}
                    alt={process.title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div
                    className={`${montserrat.className} absolute bottom-4 left-4 text-white text-[10px] font-bold tracking-widest`}
                  >
                    {process.step}
                  </div>
                </div>

                <h4
                  className={`${playfair.className} font-semibold text-xl md:text-2xl text-[#3E2723] mt-4`}
                >
                  {process.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organic curve */}
      <div className="w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="w-full h-[45px] md:h-[75px] block"
        >
          <path
            fill="#FFF0F5"
            d="M0 48C190 18 330 70 530 48C730 26 840 20 1040 47C1240 74 1320 42 1440 30V90H0Z"
          />
        </svg>
      </div>

      {/* =========================================================
          CUSTOM CAKES
          ========================================================= */}
      <section className="py-20 md:py-28 bg-[#FFF0F5] relative overflow-hidden">
        <div className="absolute -top-28 -right-28 w-80 h-80 rounded-full bg-white/50 blur-3xl" />
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center relative">
          <div className="space-y-7 md:space-y-9 text-center md:text-left">
            <span
              className={`${montserrat.className} text-[#e70064] font-bold tracking-[0.22em] text-[10px] uppercase`}
            >
              Made around your idea
            </span>

            <h3
              className={`${playfair.className} text-[44px] md:text-[60px] font-semibold text-[#3E2723] leading-[1.04]`}
            >
              You Imagine It.
              <br />
              <span className="italic">We Bake It.</span>
            </h3>

            <p className="text-[#3E2723]/75 leading-[1.8] font-light text-base md:text-lg max-w-xl">
              Birthday, anniversary, baby shower or a special surprise — share
              your idea and let us create a cake around your celebration.
            </p>

            <a
              href="/custom-cake"
              className={`${montserrat.className} inline-flex bg-[#e70064] text-white px-9 py-4 font-bold text-[10px] tracking-[0.18em] uppercase hover:bg-[#3E2723] transition-colors rounded-sm shadow-lg`}
            >
              Create My Custom Cake →
            </a>

            <div className="pt-7 mt-2 border-t border-pink-200/70">
              <div className="grid grid-cols-2 gap-y-5">
                {[
                  "Share Your Idea",
                  "Choose Your Flavour",
                  "Choose Your Size",
                  "Confirm on WhatsApp",
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-left">
                    <span
                      className={`${montserrat.className} flex items-center justify-center w-7 h-7 rounded-full bg-white text-[#e70064] text-[10px] font-bold shadow-sm shrink-0`}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className={`${montserrat.className} text-[9px] font-bold uppercase tracking-[0.13em] text-[#3E2723]`}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 border border-white/80 rounded-t-[48%] rounded-b-[24%]" />
            <img
              src="https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&q=80"
              alt="Custom Designer Cake"
              className="relative rounded-t-[48%] rounded-b-[24%] shadow-2xl border-[7px] border-white w-full h-[480px] md:h-[660px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          CAKE SIZE GUIDE
          ========================================================= */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 md:px-10 text-center">
          <span
            className={`${montserrat.className} text-[#e70064] text-[10px] font-bold tracking-[0.22em] uppercase`}
          >
            Planning your celebration
          </span>
          <h3
            className={`${playfair.className} text-3xl md:text-4xl font-semibold text-[#3E2723] mt-3 mb-10 md:mb-12`}
          >
            How Much Cake Do You Need?
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 border border-stone-200">
            {[
              { size: "0.5 KG", people: "2–4 People" },
              { size: "1.0 KG", people: "6–10 People" },
              { size: "1.5 KG", people: "10–14 People" },
              { size: "2.0 KG", people: "14–20 People" },
            ].map((item, i) => (
              <div
                key={i}
                className={`py-8 md:py-10 px-4 flex flex-col items-center justify-center hover:bg-[#FAF9F6] transition-colors ${
                  i < 3 ? "border-r border-stone-200" : ""
                } ${i < 2 ? "border-b md:border-b-0 border-stone-200" : ""}`}
              >
                <span
                  className={`${montserrat.className} text-2xl md:text-3xl font-extrabold text-[#3E2723]`}
                >
                  {item.size}
                </span>
                <div className="h-px w-7 bg-[#e70064] my-3" />
                <span className="text-stone-500 text-xs md:text-sm font-medium">
                  {item.people}
                </span>
              </div>
            ))}
          </div>

          <p className="text-stone-400 text-xs mt-7 font-light">
            * Serving sizes are approximate. Contact us for multi-tier or
            larger party sizes.
          </p>
        </div>
      </section>

      {/* =========================================================
          REVIEWS
          ========================================================= */}
      <section className="py-20 md:py-28 bg-[#FAF9F6] border-y border-stone-100">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-10 md:mb-14">
            <span
              className={`${montserrat.className} text-[#e70064] text-[10px] font-bold tracking-[0.22em] uppercase`}
            >
              Customer love
            </span>
            <h3
              className={`${playfair.className} text-4xl md:text-5xl font-semibold text-[#3E2723] mt-3`}
            >
              Virar Loves Our Cakes
            </h3>
            <p className="text-stone-500 font-light text-base mt-3">
              Real celebrations. Real customers. Real cake love.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 md:gap-7">
            {reviews.map((t, i) => (
              <div
                key={i}
                className="bg-white p-7 md:p-9 border border-stone-200/80 flex flex-col relative"
              >
                <div className="text-[#e70064]/15 text-6xl font-serif absolute top-5 right-7 leading-none">
                  “
                </div>

                <div className="flex text-[#d7a21a] mb-6 text-sm tracking-[0.15em]">
                  ★★★★★
                </div>

                <p className="text-stone-600 mb-8 font-light text-sm leading-[1.85] flex-grow italic relative z-10">
                  “{t.text}”
                </p>

                <div className="border-t border-stone-100 pt-5">
                  <h5
                    className={`${montserrat.className} font-bold text-[#3E2723] text-[10px] tracking-[0.16em] uppercase mb-1`}
                  >
                    {t.name}
                  </h5>
                  <p className="text-stone-400 text-[9px] uppercase tracking-wider">
                    Ordered: {t.cake}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          GALLERY
          ========================================================= */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-5 mb-10 md:mb-12">
            <div>
              <span
                className={`${montserrat.className} text-[#e70064] text-[10px] font-bold tracking-[0.22em] uppercase`}
              >
                Moments worth remembering
              </span>
              <h3
                className={`${playfair.className} text-4xl md:text-5xl font-semibold text-[#3E2723] mt-3`}
              >
                Made for Moments Like These
              </h3>
            </div>
            <p className="text-stone-500 font-light text-sm max-w-sm md:text-right">
              Cakes made to become part of your favourite memories.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 auto-rows-[150px] md:auto-rows-[210px]">
            {galleryImages.map((src, i) => (
              <div
                key={i}
                className={`overflow-hidden rounded-[14px] ${
                  i === 0
                    ? "md:col-span-2 md:row-span-2"
                    : i === 3
                    ? "md:row-span-2"
                    : ""
                }`}
              >
                <img
                  src={src}
                  alt="Cake celebration"
                  className="w-full h-full object-cover hover:scale-[1.035] transition duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          INSTAGRAM
          ========================================================= */}
      <section className="py-20 md:py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-9 gap-4">
            <div>
              <span
                className={`${montserrat.className} text-[#e70064] text-[10px] font-bold tracking-[0.22em] uppercase`}
              >
                Follow the baking
              </span>
              <h3
                className={`${playfair.className} text-3xl md:text-4xl font-semibold text-[#3E2723] mt-3`}
              >
                Fresh From Our Kitchen
              </h3>
              <p className="text-stone-500 font-light mt-2 text-sm">
                See what we're baking, decorating and delivering.
              </p>
            </div>

            <a
              href="#"
              className={`${montserrat.className} text-[10px] font-bold tracking-[0.16em] uppercase text-[#e70064] hover:text-[#3E2723] transition flex items-center gap-2`}
            >
              Follow @CakeByRupali <span className="text-base">→</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {instagramImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Cake By Rupali Instagram"
                className={`aspect-square w-full object-cover rounded-[12px] hover:opacity-90 transition ${
                  i === 2 ? "hidden md:block" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          ORDERING PROCESS
          ========================================================= */}
      <section className="py-20 md:py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-5">
          <span
            className={`${montserrat.className} text-[#e70064] text-[10px] font-bold tracking-[0.22em] uppercase`}
          >
            Simple & personal
          </span>
          <h3
            className={`${playfair.className} text-3xl md:text-4xl font-semibold text-[#3E2723] mt-3 mb-12 md:mb-14`}
          >
            Ordering Your Cake is Easy
          </h3>

          <div className="grid md:grid-cols-3 gap-10 md:gap-6 relative mb-12">
            <div className="hidden md:block absolute top-6 left-[16%] right-[16%] border-t border-dashed border-[#e70064]/30" />

            {[
              { step: "01", title: "Choose Your Cake" },
              { step: "02", title: "Message Us on WhatsApp" },
              { step: "03", title: "Confirm & Celebrate" },
            ].map((p, i) => (
              <div key={i} className="relative bg-white px-5">
                <div
                  className={`${montserrat.className} mx-auto w-12 h-12 rounded-full bg-[#FFF0F5] text-[#e70064] flex items-center justify-center font-bold text-sm mb-4 shadow-sm`}
                >
                  {p.step}
                </div>
                <h4
                  className={`${montserrat.className} font-bold text-[10px] uppercase tracking-[0.14em] text-[#3E2723]`}
                >
                  {p.title}
                </h4>
              </div>
            ))}
          </div>

          <p className="text-stone-500 font-light text-sm mb-7">
            Need help choosing? Just message us — we'll help you find the right
            cake.
          </p>

          <a
            href="https://wa.me/917666660036"
            target="_blank"
            rel="noopener noreferrer"
            className={`${montserrat.className} inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3.5 rounded-full font-bold text-[10px] tracking-[0.15em] uppercase hover:bg-[#128C7E] transition-colors shadow-lg`}
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
          ========================================================= */}
      <section className="py-0 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-10 pb-20 md:pb-28">
          <div className="bg-[#FFF0F5] overflow-hidden grid md:grid-cols-2 items-stretch rounded-[24px]">
            <div className="min-h-[300px] md:min-h-[470px]">
              <img
                src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80"
                alt="Celebration"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-9 md:p-14 lg:p-16 flex flex-col justify-center">
              <span
                className={`${montserrat.className} text-[#e70064] text-[10px] font-bold tracking-[0.22em] uppercase mb-4`}
              >
                Make it extra sweet
              </span>

              <h2
                className={`${playfair.className} text-4xl md:text-5xl font-semibold text-[#3E2723] mb-5 leading-[1.08]`}
              >
                Koi Special Celebration
                <br />
                Aane Wala Hai?
              </h2>

              <p className="text-[#3E2723]/75 text-base md:text-lg mb-8 font-light leading-relaxed max-w-lg">
                Chhota sa birthday ho ya grand celebration, let's make it
                extra sweet.
              </p>

              <div
                className={`${montserrat.className} flex flex-col sm:flex-row gap-3`}
              >
                <a
                  href="/shop"
                  className="bg-[#e70064] text-white px-7 py-3.5 font-bold text-[10px] tracking-[0.16em] uppercase hover:bg-[#3E2723] transition-colors text-center"
                >
                  Order Your Cake
                </a>
                <a
                  href="/custom-cake"
                  className="bg-white text-[#3E2723] px-7 py-3.5 font-bold text-[10px] tracking-[0.16em] uppercase hover:bg-stone-50 transition-colors border border-pink-100 text-center"
                >
                  Create Custom Cake
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER — LOGIC PRESERVED, INTERNAL PLACEHOLDER REMOVED
          ========================================================= */}
      <footer className="bg-stone-900 text-white pt-20 pb-8 mt-0">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <h2
              className={`${montserrat.className} text-2xl font-bold tracking-tight mb-4`}
            >
              Cake By Rupali.
            </h2>

            <p className="text-stone-400 text-sm font-light leading-relaxed mb-8 max-w-sm">
              Freshly baked, delicious cakes made with love in Virar. Making
              your everyday celebrations extra sweet.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className={`${montserrat.className} w-10 h-10 border border-stone-700 rounded-sm flex items-center justify-center text-xs font-bold hover:bg-[#e70064] hover:border-[#e70064] transition-colors cursor-pointer text-stone-300 hover:text-white`}
              >
                IG
              </a>
              <a
                href="#"
                className={`${montserrat.className} w-10 h-10 border border-stone-700 rounded-sm flex items-center justify-center text-xs font-bold hover:bg-[#e70064] hover:border-[#e70064] transition-colors cursor-pointer text-stone-300 hover:text-white`}
              >
                FB
              </a>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <h4
              className={`${montserrat.className} font-bold text-xs uppercase tracking-widest mb-6 text-stone-100`}
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
                <a href="/custom-cake" className="hover:text-white transition">
                  Custom Orders
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition">
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="/admin"
                  className="sr-only"
                  aria-label="Admin Portal"
                >
                  Admin Portal
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4
              className={`${montserrat.className} font-bold text-xs uppercase tracking-widest mb-6 text-stone-100`}
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
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-stone-500 tracking-wide">
          <p>
            &copy; {new Date().getFullYear()} Cake By Rupali. All rights
            reserved.
          </p>

          <div className="flex gap-6">
            <a href="/admin" className="sr-only" aria-label="Admin Portal">
              Admin Portal
            </a>
            <span>Designed for the modern web.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
'''

# Remove the accidental leading space before the opening quote.
code = code.replace('''export default''', '''export default''')
path = Path("/mnt/data/CakeByRupali_Home_VisualUpgrade.tsx")
path.write_text(code, encoding="utf-8")

print(f"Created: {path}")
print(f"Lines: {len(code.splitlines())}")
