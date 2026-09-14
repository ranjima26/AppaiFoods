"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";

const loaderDuration = 1800;
const fadeDuration = 200;

function PreLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const removeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (progressTimer.current) clearInterval(progressTimer.current);
    if (removeTimer.current) clearTimeout(removeTimer.current);
    progressTimer.current = null;
    removeTimer.current = null;
  }, []);

  const startPreloader = useCallback(() => {
    clearTimers();
    setLoading(true);
    setFadeOut(false);
    setProgress(0);
    const startedAt = performance.now();

    progressTimer.current = setInterval(() => {
      const nextProgress = Math.min(100, Math.round(((performance.now() - startedAt) / loaderDuration) * 100));
      setProgress(nextProgress);
      if (nextProgress === 100) {
        if (progressTimer.current) clearInterval(progressTimer.current);
        progressTimer.current = null;
        setFadeOut(true);
        removeTimer.current = setTimeout(() => setLoading(false), fadeDuration);
      }
    }, 16);
  }, [clearTimers]);

  useEffect(() => {
    const startTimer = setTimeout(startPreloader, 0);
    return () => clearTimeout(startTimer);
  }, [pathname, searchParams, startPreloader]);

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = (event.target as HTMLElement).closest("a");
      const href = target?.getAttribute("href");
      if (!target || !href || href.startsWith("http") || href.startsWith("//") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#") || target.hasAttribute("download") || target.target === "_blank") return;
      const destination = new URL(href, window.location.href);
      const currentUrl = window.location.pathname + window.location.search;
      if (destination.origin === window.location.origin && destination.pathname + destination.search !== currentUrl) startPreloader();
    };
    document.addEventListener("click", handleLinkClick, { capture: true });
    return () => document.removeEventListener("click", handleLinkClick, { capture: true });
  }, [startPreloader]);

  useEffect(() => clearTimers, [clearTimers]);

  if (!loading) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#003820] text-[#f4f0df] transition-opacity ease-out ${fadeOut ? "pointer-events-none opacity-0" : "opacity-100"}`} style={{ transitionDuration: `${fadeDuration}ms` }}>
      <div className="flex w-full max-w-3xl flex-col items-center px-6">
        <div aria-label="Appai" className="flex overflow-hidden text-[clamp(4rem,16vw,10rem)] font-black leading-none tracking-[-0.08em]">
          {[..."APPAI"].map((letter, index) => (
            <span key={`${letter}-${index}`} aria-hidden="true" className="preloader-letter inline-block" style={{ animationDelay: `${index * 120}ms` }}>{letter}</span>
          ))}
        </div>
        <div className="mt-14 w-full max-w-sm sm:mt-20">
          <div className="mb-3 flex items-end justify-between text-xs font-bold uppercase tracking-[0.24em] sm:text-sm">
            <span>Loading</span>
            <output aria-live="polite" aria-label={`Loading ${progress} percent`} className="text-lg tracking-normal sm:text-xl">{progress}%</output>
          </div>
          <div className="h-2 overflow-hidden rounded-full border border-[#f4f0df]/30 bg-black/20 sm:h-2.5">
            <div className="h-full rounded-full bg-[#00a651] transition-[width] duration-75 ease-linear" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PreLoader() {
  return <Suspense fallback={null}><PreLoaderContent /></Suspense>;
}
