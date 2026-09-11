"use client";

import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";

function PreLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const removeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (removeTimerRef.current) clearTimeout(removeTimerRef.current);
    timerRef.current = null;
    removeTimerRef.current = null;
  }, []);

  const startPreloader = useCallback((holdTime = 800) => {
    clearTimers();

    setLoading(true);
    setFadeOut(false);

    timerRef.current = setTimeout(() => {
      setFadeOut(true);
      removeTimerRef.current = setTimeout(() => {
        setLoading(false);
      }, 500);
    }, holdTime);
  }, [clearTimers]);

  // Re-scheduling on every effect setup keeps this safe when React replays
  // effects in development mode.
  useEffect(() => {
    const startTimer = setTimeout(() => startPreloader(1000), 0);
    return () => clearTimeout(startTimer);
  }, [pathname, searchParams, startPreloader]);

  // Intercept internal link clicks for immediate preloader feedback on click
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("http") ||
        href.startsWith("//") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.hasAttribute("download") ||
        target.target === "_blank"
      ) {
        return;
      }

      const destination = new URL(href, window.location.href);
      const currentUrl = window.location.pathname + window.location.search;
      const destinationUrl = destination.pathname + destination.search;

      if (destination.origin === window.location.origin && destinationUrl !== currentUrl && !href.startsWith("#")) {
        startPreloader(800);
      }
    };

    document.addEventListener("click", handleLinkClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleLinkClick, { capture: true });
    };
  }, [startPreloader]);

  // Cleanup timers on unmount
  useEffect(() => {
    return clearTimers;
  }, [clearTimers]);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#00a651] transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Decorative ambient background blur light */}
      <div className="absolute size-96 rounded-full bg-white/10 blur-3xl" />

      {/* Logo with a white glow following its silhouette */}
      <div className="relative z-10 flex items-center justify-center">
        <div className="relative grid size-60 place-items-center sm:size-72">
          <svg
            viewBox="0 0 240 240"
            aria-hidden="true"
            className="preloader-orbit-counter-clockwise absolute inset-0 size-full overflow-visible fill-white/90"
          >
            <defs>
              <path id="preloader-outer-text-path" d="M 120,18 A 102,102 0 1,1 119.9,18" />
            </defs>
            <text className="text-[11px] font-bold uppercase tracking-[0.24em] drop-shadow-sm">
              <textPath href="#preloader-outer-text-path" startOffset="0%" textLength="560" lengthAdjust="spacing">
                100% Authentic Kerala Snacks •
              </textPath>
            </text>
          </svg>
          <svg
            viewBox="0 0 240 240"
            aria-hidden="true"
            className="preloader-orbit-clockwise absolute inset-5 size-[calc(100%-2.5rem)] overflow-visible fill-white/75 sm:inset-6 sm:size-[calc(100%-3rem)]"
          >
            <defs>
              <path id="preloader-inner-text-path" d="M 120,18 A 102,102 0 1,1 119.9,18" />
            </defs>
            <text className="text-[10px] font-semibold uppercase tracking-[0.2em] drop-shadow-sm">
              <textPath href="#preloader-inner-text-path" startOffset="0%" textLength="560" lengthAdjust="spacing">
                100% Authentic Kerala Snacks •
              </textPath>
            </text>
          </svg>
          <Image
            src="/Appai Foods logo.png"
            alt="Appai Foods"
            width={1794}
            height={2429}
            priority
            className="preloader-pulse-glow h-28 w-auto object-contain sm:h-36"
          />
        </div>
      </div>
    </div>
  );
}

export default function PreLoader() {
  return (
    <Suspense fallback={null}>
      <PreLoaderContent />
    </Suspense>
  );
}
