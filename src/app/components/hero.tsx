"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import gsap from "gsap";

interface PacketItem {
  id: string;
  name: string;
  src: string;
  isForeground: boolean; // 6 sharp foreground, 4 blurred 3D background
  // Desktop target percentage offsets (-50vw to +50vw)
  xPct: number;
  yPct: number;
  rotate: number;
  scale: number;
  blurClass: string;
  opacity: number;
  // Mobile target percentage offsets
  mxPct: number;
  myPct: number;
  mRotate: number;
  mScale: number;
  zIndex: number;
}

// 10 Products Total: Clean outer perimeter locations
const PACKET_LIST: PacketItem[] = [
  // --- 6 Sharp Foreground Products ---
  {
    id: "banana-chips",
    name: "Banana Chips",
    src: "/assets/banana chips.png",
    isForeground: true,
    xPct: -38,
    yPct: -22,
    rotate: -18,
    scale: 1.1,
    blurClass: "",
    opacity: 1,
    mxPct: -36,
    myPct: -30,
    mRotate: -15,
    mScale: 0.75,
    zIndex: 35,
  },
  {
    id: "achappam",
    name: "Achappam",
    src: "/assets/achappam.png",
    isForeground: true,
    xPct: 38,
    yPct: -10,
    rotate: 20,
    scale: 1.1,
    blurClass: "",
    opacity: 1,
    mxPct: 36,
    myPct: -20,
    mRotate: 18,
    mScale: 0.75,
    zIndex: 34,
  },
  {
    id: "tapioca-chips",
    name: "Tapioca Chips",
    src: "/assets/tapioca chips.png",
    isForeground: true,
    xPct: -42,
    yPct: 8,
    rotate: 14,
    scale: 1.0,
    blurClass: "blur-[1.5px]",
    opacity: 1,
    mxPct: -38,
    myPct: 10,
    mRotate: 12,
    mScale: 0.65,
    zIndex: 33,
  },
  {
    id: "kuzhalappam",
    name: "Kuzhalappam",
    src: "/assets/kuzhalappam.png",
    isForeground: true,
    xPct: 42,
    yPct: 8,
    rotate: -15,
    scale: 1.0,
    blurClass: "",
    opacity: 1,
    mxPct: 38,
    myPct: 10,
    mRotate: -14,
    mScale: 0.65,
    zIndex: 32,
  },
  {
    id: "avalose-unda",
    name: "Avalose Unda",
    src: "/assets/avalose unda.png",
    isForeground: true,
    xPct: -28,
    yPct: 34,
    rotate: -22,
    scale: 0.9,
    blurClass: "",
    opacity: 1,
    mxPct: -28,
    myPct: 34,
    mRotate: -18,
    mScale: 0.65,
    zIndex: 31,
  },
  {
    id: "chammanthi-podi",
    name: "Chammanthi Podi",
    src: "/assets/chammanthi podi.png",
    isForeground: true,
    xPct: 28,
    yPct: 34,
    rotate: 22,
    scale: 0.9,
    blurClass: "",
    opacity: 1,
    mxPct: 28,
    myPct: 34,
    mRotate: 18,
    mScale: 0.65,
    zIndex: 30,
  },

  // --- 4 Crisp 3D Background Products (No blur) ---
  {
    id: "masala-peanuts",
    name: "Masala Peanuts",
    src: "/assets/spicy masala roasted peanut.png",
    isForeground: false,
    xPct: -18,
    yPct: -18,
    rotate: 12,
    scale: 0.8,
    blurClass: "blur-[1.5px]",
    opacity: 1,
    mxPct: -16,
    myPct: -22,
    mRotate: 10,
    mScale: 0.55,
    zIndex: 15,
  },
  {
    id: "tapioca-sticks",
    name: "Tapioca Sticks",
    src: "/assets/tapioca chips sticks.png",
    isForeground: false,
    xPct: 18,
    yPct: -38,
    rotate: -12,
    scale: 0.75,
    blurClass: "",
    opacity: 1,
    mxPct: 16,
    myPct: -42,
    mRotate: -10,
    mScale: 0.58,
    zIndex: 31,
  },
  {
    id: "sweet-kolly",
    name: "Sweet Kolly",
    src: "/assets/sweet kolly.png",
    isForeground: false,
    xPct: -46,
    yPct: -34,
    rotate: -28,
    scale: 0.7,
    blurClass: "blur-[2.5px]",
    opacity: 1,
    mxPct: -40,
    myPct: 38,
    mRotate: 15,
    mScale: 0.5,
    zIndex: 13,
  },
  {
    id: "poopola",
    name: "Poopola",
    src: "/assets/poopola.png",
    isForeground: false,
    xPct: 46,
    yPct: -34,
    rotate: 28,
    scale: 0.7,
    blurClass: "blur-[2.5px]",
    opacity: 1,
    mxPct: 40,
    myPct: -44,
    mRotate: -15,
    mScale: 0.5,
    zIndex: 12,
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const packetsRef = useRef<(HTMLDivElement | null)[]>([]);
  const centerCopyRef = useRef<HTMLDivElement>(null);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [isSplitComplete, setIsSplitComplete] = useState(false);

  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  const getTargetPixels = (item: PacketItem) => {
    if (typeof window === "undefined") return { x: 0, y: 0, isMobile: false };
    const isMobile = window.innerWidth < 768;
    const xPct = isMobile ? item.mxPct : item.xPct;
    const yPct = isMobile ? item.myPct : item.yPct;

    const xPx = (xPct / 100) * window.innerWidth;
    const yPx = (yPct / 100) * window.innerHeight;
    return { x: xPx, y: yPx, isMobile };
  };

  const startCinematicAnimation = () => {
    if (animationTriggered) return;
    setAnimationTriggered(true);

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { force3D: true },
        onComplete: () => {
          setIsSplitComplete(true);
          window.dispatchEvent(new CustomEvent("appai-hero-ready"));
        },
      });

      // 1. Initial State: Center text hidden, all packets at dead-center
      gsap.set(centerCopyRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 20,
        pointerEvents: "none",
        force3D: true,
      });

      packetsRef.current.forEach((el, index) => {
        if (!el) return;
        gsap.set(el, {
          xPercent: -50,
          yPercent: -50,
          x: 0,
          y: 0,
          scale: index === 0 ? 0.08 : 0.7,
          rotation: index === 0 ? -20 : 0,
          opacity: 0,
          force3D: true,
        });
      });

      // 2. Chapter 1: Reveal the hero packet at its final size.
      // Keeping the same scale through the split prevents a zoom-then-shrink bounce.
      tl.to(packetsRef.current[0], {
        scale: isMobile ? PACKET_LIST[0].mScale : PACKET_LIST[0].scale,
        rotation: isMobile ? PACKET_LIST[0].mRotate : PACKET_LIST[0].rotate,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      });

      // 3. Chapter 2: The Splash Burst (1.1s)
      packetsRef.current.forEach((el, index) => {
        if (!el) return;
        const item = PACKET_LIST[index];
        const { x: targetX, y: targetY } = getTargetPixels(item);
        const targetRotate = isMobile ? item.mRotate : item.rotate;
        const targetScale = isMobile ? item.mScale : item.scale;

        tl.to(
          el,
          {
            x: targetX,
            y: targetY,
            rotation: targetRotate,
            scale: targetScale,
            opacity: item.opacity,
            duration: 1.1,
            ease: "power3.out",
          },
          0.8 + (index % 3) * 0.02
        );
      });

      // 4. Chapter 3: Center Copy Text Reveal as products smoothly settle
      tl.to(
        centerCopyRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          pointerEvents: "auto",
          duration: 0.75,
          ease: "power2.out",
        },
        "-=0.45"
      );
    }, containerRef);

    return () => ctx.revert();
  };

  useEffect(() => {
    const handleStartHero = () => {
      startCinematicAnimation();
    };

    window.addEventListener("appai-start-hero", handleStartHero);

    const fallbackTimer = setTimeout(() => {
      startCinematicAnimation();
    }, 6500);

    return () => {
      window.removeEventListener("appai-start-hero", handleStartHero);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Butter-smooth GSAP ticker for 60/120Hz ProMotion screen parallax & scroll flight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const mouseX = (e.clientX / innerWidth - 0.5) * 2;
      const mouseY = (e.clientY / innerHeight - 0.5) * 2;
      mouseRef.current.targetX = mouseX;
      mouseRef.current.targetY = mouseY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let time = 0;

    const updateParallax = () => {
      time += 0.016;
      // Butter-smooth lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      const vh = typeof window !== "undefined" ? window.innerHeight : 800;
      const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
      const isMobile = vw < 1024;

      // Scroll progress connecting Hero section to About card landing
      const scrollProgress = Math.min(1, Math.max(0, scrollY / (vh * 0.85)));
      // Smooth power2 ease
      const easeP = scrollProgress < 0.5
        ? 2 * scrollProgress * scrollProgress
        : 1 - Math.pow(-2 * scrollProgress + 2, 2) / 2;
      const parallaxFactor = Math.max(0, 1 - scrollProgress * 2.5);

      // Smoothly fade out center text and background ONLY after intro animation completes
      if (isSplitComplete) {
        if (centerCopyRef.current) {
          const textOpacity = Math.max(0, 1 - scrollY / 180);
          const textY = -scrollY * 0.25;
          gsap.set(centerCopyRef.current, {
            opacity: textOpacity,
            y: textY,
            pointerEvents: textOpacity < 0.1 ? "none" : "auto",
            force3D: true,
          });
        }

        if (bgRef.current) {
          gsap.set(bgRef.current, {
            opacity: Math.max(0, 1 - scrollY / 220),
            force3D: true,
          });
        }
      }

      if (isSplitComplete) {
        packetsRef.current.forEach((el, index) => {
          if (!el) return;
          const item = PACKET_LIST[index];
          const { x: baseX, y: baseY, isMobile: mb } = getTargetPixels(item);
          const baseRotate = mb ? item.mRotate : item.rotate;
          const baseScale = mb ? item.mScale : item.scale;

          const factor = (item.isForeground ? 14 : 6) * parallaxFactor;
          const floatOffset = Math.sin(time * 1.5 + index) * (item.isForeground ? 6 : 3) * parallaxFactor;

          if (index === 4 || index === 5 || index === 7) {
            // Managed seamlessly by FlightProducts
            gsap.set(el, { opacity: 0, force3D: true });
          } else {
            // The other 7 packets fade out cleanly on scroll with subtle drift
            const fadeOpacity = Math.max(0, item.opacity * (1 - scrollY / 220));
            const driftY = -scrollY * 0.22;

            gsap.set(el, {
              x: baseX + mouseRef.current.x * factor,
              y: baseY + mouseRef.current.y * factor + floatOffset + driftY,
              rotation: baseRotate + Math.cos(time * 1.3 + index) * 2,
              opacity: fadeOpacity,
              scale: baseScale,
              force3D: true,
            });
          }
        });
      }
    };

    gsap.ticker.add(updateParallax);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(updateParallax);
    };
  }, [isSplitComplete]);

  return (
    <section
      ref={containerRef}
      aria-label="Appai Foods hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-transparent text-[#003820] flex items-center justify-center select-none"
    >
      {/* Light Green Shade Background (fades on scroll to reveal OurStory) */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#dbedd8] via-[#cce4d3] to-[#bfe0c7] will-change-opacity" />

      {/* Floating Packets Stage */}
      <div aria-hidden="true" className="absolute inset-0 z-10 pointer-events-none overflow-hidden [perspective:1000px]">
        {PACKET_LIST.map((packet, index) => (
          <div
            key={packet.id}
            ref={(el) => {
              packetsRef.current[index] = el;
            }}
            className="absolute top-1/2 left-1/2 w-[clamp(110px,18vw,230px)] aspect-[3/4] will-change-transform cursor-pointer pointer-events-auto [backface-visibility:hidden] [transform-style:preserve-3d]"
            style={{
              zIndex: packet.zIndex,
              transform: "translate3d(-50%, -50%, 0) scale(0)",
              opacity: 0,
            }}
          >
            <div className={`relative w-full h-full drop-shadow-[0_20px_28px_rgba(0,56,32,0.22)] ${packet.blurClass}`}>
              <Image
                src={packet.src}
                alt={packet.name}
                fill
                priority={index === 0}
                quality={85}
                sizes="(max-width: 768px) 140px, 230px"
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Hero Center Content (Hidden initially, revealed after splash) */}
      <div
        ref={centerCopyRef}
        className="relative top-14 z-40 max-w-[720px] px-6 text-center flex flex-col items-center justify-center py-16 pointer-events-none opacity-0 will-change-transform sm:top-16"
        style={{ opacity: 0 }}
      >
        <div aria-hidden="true" className="mb-3 flex w-full max-w-[300px] items-center justify-center gap-4 sm:mb-4 sm:gap-5">
          <span className="h-px flex-1 bg-[#008846]/45" />
          <svg viewBox="0 0 54 32" className="h-7 w-12 fill-[#003820]" role="presentation">
            <path d="M25.5 27.8C15.2 27.1 8.2 20.9 7 10.4c9.8-.4 17.1 5.6 18.5 17.4Z" />
            <path d="M29 25.1C29.8 13.8 36.5 6.6 47.7 5.3c.1 10.7-6.3 18.3-18.7 19.8Z" />
          </svg>
          <span className="h-px flex-1 bg-[#008846]/45" />
        </div>

        <h1 className="uppercase text-[#003820]">
          <span className="block font-sans text-[clamp(1.35rem,3.5vw,3rem)] font-medium leading-none tracking-[0.08em]">
            Tradition in
          </span>
          <span className="mt-1 block font-serif text-[clamp(3.2rem,8vw,7rem)] font-bold leading-[0.74] tracking-[-0.045em] sm:mt-2">
            Every Bite
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-xs font-medium leading-relaxed text-[#006d3b] sm:mt-7 sm:text-base sm:leading-6">
          Classic Kerala flavors, made with care<br className="hidden sm:block" /> and packed for your happiness.
        </p>

        {/* CTA Buttons */}
        <div className="mt-6 flex flex-col items-center gap-3 min-[390px]:flex-row sm:mt-7">
          <Link
            href="/shop"
            className="group relative inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full bg-[#003820] px-6 text-[10px] font-bold uppercase tracking-wider text-white shadow-[0_12px_28px_rgba(0,56,32,0.24)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#008846]"
          >
            <span>EXPLORE</span>
            <FiArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/aboutUs"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#003820]/20 bg-white/75 px-6 text-[10px] font-bold uppercase tracking-wider text-[#003820] shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#003820]/40 hover:bg-white"
          >
            <FiShoppingBag className="text-base" />
            <span>OUR STORY</span>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70 text-[#003820]">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#003820]">Scroll</span>
        <div className="h-5 w-3 rounded-full border border-[#003820] p-0.5 flex justify-center">
          <div className="h-1.5 w-1 rounded-full bg-[#003820] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
