"use client";

import Image from "next/image";
import PageBanner from "./pageBanner";
import { useEffect, useRef } from "react";
import styles from "./aboutUs.module.css";

const products = [
  { id: "masala-peanuts", src: "spicy masala roasted peanut.png", alt: "Appai spicy masala roasted peanuts", heightPct: 100, zIndex: 10 },
  { id: "banana-chips", src: "banana chips.png", alt: "Appai banana chips", heightPct: 91, zIndex: 9 },
  { id: "kuzhalappam", src: "kuzhalappam.png", alt: "Appai kuzhalappam", heightPct: 82, zIndex: 8 },
  { id: "tapioca-chips", src: "tapioca chips.png", alt: "Appai tapioca chips", heightPct: 74, zIndex: 7 },
  { id: "achappam", src: "achappam.png", alt: "Appai achappam", heightPct: 66, zIndex: 6 },
  { id: "poopola", src: "poopola.png", alt: "Appai poopola", heightPct: 58, zIndex: 5 },
  { id: "avalose-unda", src: "avalose unda.png", alt: "Appai avalose unda", heightPct: 51, zIndex: 4 },
  { id: "chammanthi-podi", src: "chammanthi podi.png", alt: "Appai chammanthi podi", heightPct: 44, zIndex: 3 },
  { id: "tapioca-sticks", src: "tapioca chips sticks.png", alt: "Appai tapioca chips sticks", heightPct: 38, zIndex: 2 },
  { id: "sweet-kolly", src: "sweet kolly.png", alt: "Appai sweet kolly", heightPct: 33, zIndex: 1 },
];

export default function AboutUs() {
  const storyRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = storyRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;
    let lastTime = 0;
    let currentX: number | null = null;
    let targetX = 0;
    let needsMeasure = true;
    const clamp = (n: number) => Math.max(0, Math.min(1, n));

    const update = (time: number) => {
      frameId = 0;
      if (needsMeasure) {
        needsMeasure = false;
        const rect = section.getBoundingClientRect();
        const stage = section.firstElementChild as HTMLElement | null;
        const totalScrollable = Math.max(1, rect.height - (stage?.offsetHeight ?? window.innerHeight));
        const isMobile = window.innerWidth <= 900;
        // Mobile animates during normal scrolling without a tall sticky spacer.
        const lineupRect = track.parentElement?.getBoundingClientRect() ?? rect;
        // Hold the first pack in view until the lineup reaches the upper half.
        const mobileStart = window.innerHeight * 0.45;
        const progress = isMobile
          ? clamp((mobileStart - lineupRect.top) / Math.max(1, mobileStart + lineupRect.height))
          : clamp(-rect.top / totalScrollable);
        const startX = isMobile ? 6 : 22;
        const endX = isMobile ? -75 : -62;
        targetX = reduced.matches ? 0 : startX + (endX - startX) * progress;
      }

      // Time-based easing keeps wheel and touch scrolling smooth at any refresh rate.
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      if (currentX === null || reduced.matches) currentX = targetX;
      currentX += (targetX - currentX) * (1 - Math.exp(-elapsed / 140));
      const settled = Math.abs(targetX - currentX) < 0.005;
      if (settled) currentX = targetX;
      track.style.transform = `translate3d(${currentX}vw, 0, 0)`;

      if (!settled) frameId = requestAnimationFrame(update);
      else lastTime = 0;
    };

    const schedule = () => {
      needsMeasure = true;
      if (!frameId) frameId = requestAnimationFrame(update);
    };

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(section);
    if (section.firstElementChild) resizeObserver.observe(section.firstElementChild);

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);

    schedule();

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <section className="min-h-screen bg-[#f7f5ee] max-[900px]:min-h-0">
      <PageBanner title="About Us" mobileImage="/assets/mobile%20about.png" />
      {/* ── 2-Column Our Story Section: Left Text | Right Oversized Lineup Stage ── */}
      <section ref={storyRef} className={styles.story} aria-labelledby="story-heading">
        <div className={styles.stage}>
          <div className={styles.halo} aria-hidden="true" />

          {/* Left Column: Stable Content */}
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Our story</p>
            <h2 id="story-heading" className={styles.heading}>A taste of Kerala. <span className={styles.headingSecondLine}>A feeling of home.</span></h2>
            <p className={styles.description}>
              Our story begins in Kodanchery, Kozhikode, with a love for Kerala&apos;s traditional snacks.
              From crisp banana chips to kuzhalappam and spicy roasted peanuts, Appai Foods brings
              familiar flavours to everyday moments — a tea break, a family gathering, or a little taste of home.
            </p>
          </div>

          {/* Right Column: Scroll-Driven Oversized Product Lineup Stage */}
          <div className={styles.lineupStage}>
            <div ref={trackRef} className={styles.lineupTrack}>
              {products.map((product) => (
                <div
                  key={product.id}
                  className={styles.productCard}
                  style={{
                    height: `${product.heightPct}%`,
                    zIndex: product.zIndex,
                  }}
                >
                  <Image
                    src={`/assets/${product.src}`}
                    alt={product.alt}
                    fill
                    sizes="(max-width: 900px) 30vw, 18vw"
                    className={styles.productImg}
                  />
                </div>
              ))}
            </div>
          </div>

          <p className={styles.caption}>Rooted in Kerala. Made with care.</p>
        </div>
      </section>
    </section>
  );
}
