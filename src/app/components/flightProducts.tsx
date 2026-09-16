"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function FlightProducts() {
  const undaRef = useRef<HTMLDivElement>(null);
  const podiRef = useRef<HTMLDivElement>(null);
  const tapiocaRef = useRef<HTMLDivElement>(null);
  const [isHeroReady, setIsHeroReady] = useState(false);

  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const smoothProgress = useRef(0);

  useEffect(() => {
    const handleHeroReady = () => {
      setIsHeroReady(true);
    };

    window.addEventListener("appai-hero-ready", handleHeroReady);

    const timer = setTimeout(() => {
      setIsHeroReady(true);
    }, 9000);

    return () => {
      window.removeEventListener("appai-hero-ready", handleHeroReady);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!isHeroReady) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let time = 0;

    // Fixed base dimensions for GPU texture caching (zero layout reflow)
    const BASE_W = 200;
    const BASE_H = 267;

    const tick = () => {
      time += 0.016;
      // Butter-smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scrollY = window.scrollY || 0;
      const isMobile = vw < 768;

      // Base packet width matching hero.tsx: clamp(110px, 18vw, 230px)
      const basePacketW = Math.max(110, Math.min(vw * 0.18, 230));

      // 1. Hero starting coordinates (matching hero.tsx exactly on mobile & desktop)
      const heroUnda = {
        x: vw / 2 + (isMobile ? -0.28 : -0.28) * vw,
        y: vh / 2 + (isMobile ? 0.34 : 0.34) * vh,
        scale: (basePacketW * (isMobile ? 0.65 : 0.9)) / BASE_W,
        rotate: isMobile ? -18 : -22,
      };

      const heroPodi = {
        x: vw / 2 + (isMobile ? 0.28 : 0.28) * vw,
        y: vh / 2 + (isMobile ? 0.34 : 0.34) * vh,
        scale: (basePacketW * (isMobile ? 0.65 : 0.9)) / BASE_W,
        rotate: isMobile ? 18 : 22,
      };

      const heroTapioca = {
        x: vw / 2 + (isMobile ? 0.16 : 0.18) * vw,
        y: vh / 2 + (isMobile ? -0.42 : -0.38) * vh,
        scale: (basePacketW * (isMobile ? 0.58 : 0.75)) / BASE_W,
        rotate: isMobile ? -10 : -12,
      };

      // 2. Measure live card and slots
      const cardFrame = document.getElementById("about-card-frame");
      const slotUnda = document.getElementById("slot-unda");
      const slotPodi = document.getElementById("slot-podi");
      const slotTapioca = document.getElementById("slot-tapioca");

      if (!cardFrame || !slotUnda || !slotPodi || !slotTapioca) return;

      const rectCard = cardFrame.getBoundingClientRect();
      const rectUnda = slotUnda.getBoundingClientRect();
      const rectPodi = slotPodi.getBoundingClientRect();
      const rectTapioca = slotTapioca.getBoundingClientRect();

      // Calculate dynamic flight distance
      const cardTopAtZero = rectCard.top + scrollY;
      const desiredCardTop = isMobile
        ? Math.max(40, (vh - rectCard.height) / 2)
        : Math.max(60, (vh - rectCard.height) / 2);
      const flightDist = Math.max(250, cardTopAtZero - desiredCardTop);

      // Raw target progress
      const targetProgress = Math.min(1, Math.max(0, scrollY / flightDist));
      // Inertial smoothing for silky, organic momentum
      smoothProgress.current += (targetProgress - smoothProgress.current) * (isMobile ? 0.18 : 0.14);

      const p = smoothProgress.current;
      // Smooth easeInOutCubic for organic acceleration and deceleration
      const easeP = p < 0.5
        ? 4 * p * p * p
        : 1 - Math.pow(-2 * p + 2, 3) / 2;

      const pFactor = Math.max(0, 1 - p * 2.2);
      const floatOffset = Math.sin(time * 1.6) * 4 * pFactor;

      // Card target landing specs
      const targetUnda = {
        x: rectUnda.left + rectUnda.width / 2,
        y: rectUnda.top + rectUnda.height / 2,
        scale: rectUnda.width / BASE_W,
        rotate: 0,
      };

      const targetPodi = {
        x: rectPodi.left + rectPodi.width / 2,
        y: rectPodi.top + rectPodi.height / 2,
        scale: rectPodi.width / BASE_W,
        rotate: 3,
      };

      const targetTapioca = {
        x: rectTapioca.left + rectTapioca.width / 2,
        y: rectTapioca.top + rectTapioca.height / 2,
        scale: rectTapioca.width / BASE_W,
        rotate: -3,
      };

      // 1. Avalose Unda (Foreground center)
      if (undaRef.current) {
        const curX = heroUnda.x + (targetUnda.x - heroUnda.x) * easeP + mouseRef.current.x * 10 * pFactor;
        const curY = heroUnda.y + (targetUnda.y - heroUnda.y) * easeP + mouseRef.current.y * 10 * pFactor + floatOffset;
        const curScale = heroUnda.scale + (targetUnda.scale - heroUnda.scale) * easeP;
        const curRot = heroUnda.rotate + (targetUnda.rotate - heroUnda.rotate) * easeP;

        gsap.set(undaRef.current, {
          x: curX - BASE_W / 2,
          y: curY - BASE_H / 2,
          scale: curScale,
          rotation: curRot,
          force3D: true,
        });
      }

      // 2. Chammanthi Podi (Right slot)
      if (podiRef.current) {
        const curX = heroPodi.x + (targetPodi.x - heroPodi.x) * easeP + mouseRef.current.x * 9 * pFactor;
        const curY = heroPodi.y + (targetPodi.y - heroPodi.y) * easeP + mouseRef.current.y * 9 * pFactor + floatOffset;
        const curScale = heroPodi.scale + (targetPodi.scale - heroPodi.scale) * easeP;
        const curRot = heroPodi.rotate + (targetPodi.rotate - heroPodi.rotate) * easeP;

        gsap.set(podiRef.current, {
          x: curX - BASE_W / 2,
          y: curY - BASE_H / 2,
          scale: curScale,
          rotation: curRot,
          force3D: true,
        });
      }

      // 3. Tapioca Chips Sticks (Left slot)
      if (tapiocaRef.current) {
        const curX = heroTapioca.x + (targetTapioca.x - heroTapioca.x) * easeP + mouseRef.current.x * 9 * pFactor;
        const curY = heroTapioca.y + (targetTapioca.y - heroTapioca.y) * easeP + mouseRef.current.y * 9 * pFactor + floatOffset;
        const curScale = heroTapioca.scale + (targetTapioca.scale - heroTapioca.scale) * easeP;
        const curRot = heroTapioca.rotate + (targetTapioca.rotate - heroTapioca.rotate) * easeP;

        gsap.set(tapiocaRef.current, {
          x: curX - BASE_W / 2,
          y: curY - BASE_H / 2,
          scale: curScale,
          rotation: curRot,
          force3D: true,
        });
      }
    };

    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(tick);
    };
  }, [isHeroReady]);

  if (!isHeroReady) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden [perspective:1000px]"
    >
      {/* Tapioca Chips Sticks - Left Slot (z-28 behind Unda) */}
      <div
        ref={tapiocaRef}
        className="absolute top-0 left-0 w-[200px] h-[267px] will-change-transform [transform-style:preserve-3d] [backface-visibility:hidden] z-[28]"
        style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
      >
        <div className="relative w-full h-full drop-shadow-[0_20px_26px_rgba(0,56,32,0.24)]">
          <Image
            src="/assets/tapioca chips sticks.png"
            alt="Tapioca Chips Sticks"
            fill
            priority
            quality={90}
            sizes="200px"
            className="object-contain"
          />
        </div>
      </div>

      {/* Chammanthi Podi - Right Slot (z-29 behind Unda) */}
      <div
        ref={podiRef}
        className="absolute top-0 left-0 w-[200px] h-[267px] will-change-transform [transform-style:preserve-3d] [backface-visibility:hidden] z-[29]"
        style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
      >
        <div className="relative w-full h-full drop-shadow-[0_20px_26px_rgba(0,56,32,0.24)]">
          <Image
            src="/assets/chammanthi podi.png"
            alt="Chammanthi Podi"
            fill
            priority
            quality={90}
            sizes="200px"
            className="object-contain"
          />
        </div>
      </div>

      {/* Avalose Unda - Center Foreground Slot (z-35 in front) */}
      <div
        ref={undaRef}
        className="absolute top-0 left-0 w-[200px] h-[267px] will-change-transform [transform-style:preserve-3d] [backface-visibility:hidden] z-[35]"
        style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
      >
        <div className="relative w-full h-full drop-shadow-[0_26px_34px_rgba(0,56,32,0.32)]">
          <Image
            src="/assets/avalose unda.png"
            alt="Avalose Unda"
            fill
            priority
            quality={90}
            sizes="200px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
