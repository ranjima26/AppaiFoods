"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiHeart, FiMapPin } from "react-icons/fi";

export default function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-x-clip bg-white px-5 py-16 sm:px-8 sm:py-24 lg:px-12 xl:px-20">
      <div className="pointer-events-none absolute -right-24 top-10 size-72 rounded-full bg-[#00a651]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/3 size-80 rounded-full bg-[#d9a441]/10 blur-3xl" />

      <div className="mx-auto grid max-w-[1280px] items-center gap-16 sm:gap-20 lg:grid-cols-2">
        <div
          ref={cardRef}
          className="relative mx-auto w-full max-w-[580px] lg:mx-0"
        >
          {/* Card Container: The 3 hero products land directly inside this frame */}
          <div
            id="about-card-frame"
            className="group relative aspect-[4/5] overflow-visible rounded-[2rem] bg-[#dfece2] shadow-[0_30px_70px_rgba(0,56,32,0.16)] sm:rounded-[2.5rem]"
          >
            {/* Inner background clipped container for gradients & circles */}
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] pointer-events-none">
              <div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.95),transparent_70%)]" />
              <div className="absolute -left-28 top-8 size-64 rounded-full border border-[#003820]/10" />
              <div className="absolute -right-24 -top-20 size-72 rounded-full border border-[#003820]/10" />
              <div className="absolute inset-x-12 bottom-5 h-8 rounded-[50%] bg-[#003820]/15 blur-xl" />
            </div>

            {/* Location Badge */}
            <div className="absolute left-6 top-6 z-30 rounded-full border border-[#003820]/10 bg-white/80 px-4 py-2 backdrop-blur-sm sm:left-8 sm:top-8">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#003820]">
                <FiMapPin aria-hidden className="text-[#00a651]" /> Made in Kozhikode
              </p>
            </div>

            {/* Left Landing Anchor: Tapioca Chips Sticks */}
            <div
              id="slot-tapioca"
              className="absolute left-[7%] bottom-[10%] w-[48%] h-[68%] -rotate-3 z-10 pointer-events-none"
            />

            {/* Right Landing Anchor: Chammanthi Podi */}
            <div
              id="slot-podi"
              className="absolute right-[7%] bottom-[8%] w-[44%] h-[65%] rotate-3 z-10 pointer-events-none"
            />

            {/* Center Foreground Landing Anchor: Avalose Unda */}
            <div
              id="slot-unda"
              className="absolute left-1/2 -translate-x-1/2 bottom-[3%] w-[58%] h-[82%] z-20 pointer-events-none"
            />

            {/* Soft landing shadow beneath the 3 arriving products */}
            <div className="absolute inset-x-10 bottom-6 h-10 rounded-[50%] bg-[#003820]/15 blur-xl pointer-events-none z-0" />
          </div>

          {/* Warmth Badge */}
          <div className="absolute -bottom-6 -right-2 z-30 flex max-w-[230px] items-center gap-3 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur-md sm:-right-8 sm:p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#e5f5eb] text-[#00a651]">
              <FiHeart aria-hidden />
            </span>
            <p className="text-xs font-bold leading-5 text-[#003820]">Made with the warmth of a Kerala home</p>
          </div>
        </div>

        <div
          className={`max-w-xl transition-all delay-150 duration-1000 ease-out motion-reduce:transition-none lg:py-8 ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-16 opacity-0 sm:translate-x-24"
          }`}
        >
          <div className="flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.24em] text-[#00a651]">
            <span className="h-px w-10 bg-[#00a651]" />
            Who we are
          </div>

          <h2 className="mt-5 text-3xl font-black uppercase leading-[1.05] tracking-[-0.035em] text-[#111827] min-[375px]:text-4xl sm:text-5xl lg:text-6xl">
            A taste of home, shared with you
          </h2>

          <p className="mt-7 text-base font-medium leading-8 text-gray-600">
            Appai Foods began with a simple wish: to preserve the honest flavours of Kerala kitchens and share them beyond our home. Every batch carries the recipes, patience, and care we grew up with.
          </p>
          <p className="mt-4 text-sm leading-7 text-gray-500">
            From carefully chosen ingredients to small-batch preparation, our snacks are made fresh in Kozhikode—just as they would be for family.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 border-y border-[#003820]/10 py-5 min-[390px]:grid-cols-3 min-[390px]:gap-0">
            <div>
              <p className="text-xl font-bold text-[#003820] sm:text-2xl">Kerala</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">Our roots</p>
            </div>
            <div className="border-y border-[#003820]/10 py-4 min-[390px]:border-x min-[390px]:border-y-0 min-[390px]:px-4 min-[390px]:py-0 sm:px-6">
              <p className="text-xl font-bold text-[#003820] sm:text-2xl">Daily</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">Fresh batches</p>
            </div>
            <div className="min-[390px]:pl-4 sm:pl-6">
              <p className="text-xl font-bold text-[#003820] sm:text-2xl">100%</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">Made with care</p>
            </div>
          </div>

          <div className="mt-9 flex justify-center lg:justify-start">
            <Link
              href="/aboutUs"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#00a651] px-8 text-center text-xs font-bold uppercase tracking-[0.15em] text-white shadow-[0_12px_30px_rgba(0,166,81,0.2)] transition hover:-translate-y-0.5 hover:bg-[#008f46]"
            >
              Discover our journey
              <FiArrowUpRight aria-hidden className="text-base transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
