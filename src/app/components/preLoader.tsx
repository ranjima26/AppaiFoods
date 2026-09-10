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
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="relative flex h-32 items-center justify-center sm:h-40">
          <Image
            src="/Appai Foods logo.png"
            alt="Appai Foods Loading..."
            width={1794}
            height={2429}
            priority
            className="preloader-pulse-glow h-28 w-auto object-contain sm:h-36"
          />
        </div>

        {/* Loading Progress Bar & Subtitle */}
        <div className="flex flex-col items-center gap-3">
          <div className="h-1.5 w-52 overflow-hidden rounded-full bg-black/20 shadow-inner">
            <div className="h-full w-full bg-white animate-pulse rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/90 drop-shadow">
            100% Authentic Kerala Snacks
          </span>
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
