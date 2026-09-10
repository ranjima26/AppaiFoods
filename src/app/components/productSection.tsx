"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";

export interface ProductItem {
  id: string;
  name: string;
  bigTitle: string;
  subtitle: string;
  description: string;
  bowlImage: string;
  packetImage: string;
  categorySlug: string;
}

export const productsData: ProductItem[] = [
  {
    id: "achappam",
    name: "Achappam",
    bigTitle: "ACHAPPAM",
    subtitle: "Traditional Kerala Rose Cookies",
    description:
      "Delicate, crispy, and flower-shaped heritage cookies crafted from farm-fresh rice flour, rich coconut milk, black sesame seeds, and a hint of sweetness. Kettle-fried in pure coconut oil to deliver that authentic unadulterated crunch in every bite.",
    bowlImage: "/achappam-bowl.png",
    packetImage: "/PRODUCT PICS-1.png",
    categorySlug: "achappam",
  },
  {
    id: "banana-chips",
    name: "Banana Chips",
    bigTitle: "BANANA CHIPS",
    subtitle: "Golden Kerala Nendran Chips",
    description:
      "Thinly sliced premium Kerala Nendran raw bananas, kettle-cooked in 100% pure cold-pressed coconut oil and gently dusted with natural sea salt. Authentic golden crunch with zero added artificial colors or preservatives.",
    bowlImage: "/banana-chips-bowl.png",
    packetImage: "/PRODUCT PICS-5.png",
    categorySlug: "banana-chips",
  },
  {
    id: "tapioca-chips",
    name: "Tapioca Chips Sticks",
    bigTitle: "TAPIOCA STICKS",
    subtitle: "Crispy Spiced Cassava Fries",
    description:
      "Crunchy stick-cut cassava roots fried to golden crispness and tossed in signature Kerala ground chili powder, sea salt, and aromatic curry leaves. The ultimate spicy teatime companion.",
    bowlImage: "/tapioca-sticks-bowl.png",
    packetImage: "/PRODUCT PICS-19.png",
    categorySlug: "tapioca-chips-sticks",
  },
  {
    id: "kuzhalappam-sweet",
    name: "Kuzhalappam (Sweet)",
    bigTitle: "KUZHALAPPAM",
    subtitle: "Crispy Sweet Rice Flutes",
    description:
      "Classic tubular fried snacks made from roasted rice flour, coconut, garlic, and cumin. Lightly sweetened with a satisfying crisp shatter and distinct aromatic village flavors.",
    bowlImage: "/kuzhalappam-bowl.png",
    packetImage: "/PRODUCT PICS-9.png",
    categorySlug: "kuzhalappam-sweet",
  },
  {
    id: "avalose-unda",
    name: "Avalose Unda",
    bigTitle: "AVALOSE UNDA",
    subtitle: "Roasted Rice & Jaggery Balls",
    description:
      "Nutritious and fiber-rich traditional sweet balls made from slow dry-roasted rice powder, freshly grated coconut, aromatic cardamom, and pure organic Kerala jaggery.",
    bowlImage: "/avalose-unda-bowl.png",
    packetImage: "/PRODUCT PICS-3.png",
    categorySlug: "avalose-unda",
  },
  {
    id: "chammanthi-podi",
    name: "Chammanthi Podi",
    bigTitle: "CHAMMANTHI PODI",
    subtitle: "Dry Roasted Coconut Chutney Powder",
    description:
      "Slow-roasted grated coconut blended with dried red chilies, shallots, curry leaves, tamarind, and ginger. A timeless staple that elevates hot rice, ghee, and traditional kanji.",
    bowlImage: "/chammanthi-podi-bowl.png",
    packetImage: "/PRODUCT PICS-7.png",
    categorySlug: "chammanthi-podi",
  },
  {
    id: "spicy-masala-roasted-peanuts",
    name: "Masala Peanuts",
    bigTitle: "MASALA PEANUTS",
    subtitle: "Kerala Spiced Roasted Peanuts",
    description:
      "Plump native groundnuts batter-coated with seasoned gram flour, crushed garlic, and fiery red chili. Crispy, spicy, and perfectly roasted for your evening chai moments.",
    bowlImage: "/masala-peanuts-bowl.png",
    packetImage: "/PRODUCT PICS-14.png",
    categorySlug: "spicy-masala-roasted-peanuts",
  },
];

export default function ProductSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeProduct = productsData[selectedIndex];
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const getPageForIndex = (idx: number) => {
    if (idx <= 2) return 0;
    if (idx <= 5) return 1;
    return 2;
  };

  const [activeDot, setActiveDot] = useState(0);

  const selectProduct = (index: number) => {
    setSelectedIndex(index);
    setActiveDot(getPageForIndex(index));
    if (itemRefs.current[index]) {
      itemRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const handleDotClick = (pageIndex: number) => {
    setActiveDot(pageIndex);
    const targetProductIndex = pageIndex === 0 ? 0 : pageIndex === 1 ? 3 : Math.min(6, productsData.length - 1);
    setSelectedIndex(targetProductIndex);
    if (itemRefs.current[targetProductIndex]) {
      itemRefs.current[targetProductIndex]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const scrollRatio = scrollLeft / maxScroll;
    if (scrollRatio < 0.33) {
      setActiveDot(0);
    } else if (scrollRatio < 0.67) {
      setActiveDot(1);
    } else {
      setActiveDot(2);
    }
  };

  return (
    <section className="relative w-full overflow-hidden border-b border-gray-100 bg-white px-5 py-14 sm:px-8 sm:py-16 lg:px-12 xl:px-20">
      <div className="mx-auto max-w-[1720px]">
        {/* Top Display Area */}
        <div className="mb-8 grid grid-cols-1 items-center gap-5 sm:gap-8 lg:mb-4 lg:grid-cols-12">
          {/* Left Column: Big Round Wooden Bowl */}
          <div className="flex justify-center items-center lg:col-span-5 relative">
            <div className="absolute size-56 sm:size-72 rounded-full bg-[#f59e0b]/10 blur-3xl" />
            <div className="absolute size-48 rounded-full bg-[#00a651]/10 blur-3xl -bottom-6" />

            {/* Big Round Bowl Image Container */}
            <div className="relative flex size-[240px] items-center justify-center transition-all duration-500 hover:scale-[1.03] min-[375px]:size-[280px] sm:size-[340px] md:size-[380px] p-2">
              <Image
                key={activeProduct.id}
                src={activeProduct.bowlImage}
                alt={activeProduct.name}
                fill
                priority
                className="animate-bowl-clockwise object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.20)]"
              />
            </div>
          </div>

          {/* Right Column: Large Typography, Description & Shop Now Button */}
          <div key={activeProduct.id} className="flex flex-col items-center gap-4 text-center lg:col-span-7 lg:items-start lg:pl-6 lg:text-left animate-fade-in">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00a651]">
                {activeProduct.subtitle}
              </span>
              <h3 className="text-[1.75rem] font-black leading-[1.05] tracking-tight text-gray-900 min-[375px]:text-3xl sm:text-4xl lg:text-5xl">
                {activeProduct.bigTitle}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl">
              {activeProduct.description}
            </p>

            <div className="pt-1">
              <Link
                href={`/shop?category=${activeProduct.categorySlug}`}
                className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#d97706] px-8 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(217,119,6,0.35)] transition-all hover:scale-105 hover:bg-[#b45309] active:scale-95"
              >
                <span>Shop Now</span>
                <FiArrowRight className="text-lg" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Selector Row */}
        <div className="border-t border-gray-200/80 pt-4">
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory items-center justify-start gap-3 overflow-x-auto py-4 px-4 sm:justify-center sm:gap-7 scrollbar-none"
          >
            {productsData.map((prod, index) => {
              const isSelected = selectedIndex === index;
              return (
                <button
                  key={prod.id}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  type="button"
                  onClick={() => selectProduct(index)}
                  onMouseEnter={() => selectProduct(index)}
                  onFocus={() => selectProduct(index)}
                  className={`group flex shrink-0 snap-center flex-col items-center transition-all duration-300 cursor-pointer ${isSelected
                      ? "rounded-2xl border-2 border-[#00a651]/40 shadow-md bg-white p-3.5 scale-105"
                      : "p-3 opacity-75 hover:opacity-100 hover:scale-105"
                    }`}
                >
                  <div
                    className={`relative size-20 sm:size-24 transition-all duration-300 flex items-center justify-center ${isSelected
                        ? "scale-110 drop-shadow-[0_6px_14px_rgba(0,166,81,0.28)]"
                        : "group-hover:scale-105 drop-shadow-[0_4px_8px_rgba(0,0,0,0.12)]"
                      }`}
                  >
                    <Image
                      src={prod.bowlImage}
                      alt={prod.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <span
                    className={`mt-2.5 text-xs sm:text-sm font-semibold transition-colors text-center max-w-[100px] leading-tight ${isSelected ? "text-gray-950 font-bold" : "text-gray-600 group-hover:text-gray-900"
                      }`}
                  >
                    {prod.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 3-Dot Slider Indicator for Mobile View */}
          <div className="mt-3 flex items-center justify-center gap-2 sm:hidden">
            {[0, 1, 2].map((dotIdx) => {
              const isActive = activeDot === dotIdx;
              return (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => handleDotClick(dotIdx)}
                  aria-label={`View product page ${dotIdx + 1}`}
                  className={`h-2.5 transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                    isActive
                      ? "w-7 bg-[#00a651] shadow-sm shadow-emerald-600/30"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

