"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { FiTruck } from "react-icons/fi";

const loaderDuration = 4000;
const fullyRevealedHoldDuration = 500;
const fadeDuration = 200;

function PreLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const removeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const runningRef = useRef(false);

  const clearTimers = useCallback(() => {
    if (progressTimer.current) clearInterval(progressTimer.current);
    if (holdTimer.current) clearTimeout(holdTimer.current);
    if (removeTimer.current) clearTimeout(removeTimer.current);
    progressTimer.current = null;
    holdTimer.current = null;
    removeTimer.current = null;
  }, []);

  const startPreloader = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
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
        holdTimer.current = setTimeout(() => {
          setFadeOut(true);
          removeTimer.current = setTimeout(() => {
            setLoading(false);
            runningRef.current = false;
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("appai-start-hero"));
            }
          }, fadeDuration);
        }, fullyRevealedHoldDuration);
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

  useEffect(() => () => {
    clearTimers();
    runningRef.current = false;
  }, [clearTimers]);

  if (!loading) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#003820] text-[#f4f0df] transition-opacity ease-out ${fadeOut ? "pointer-events-none opacity-0" : "opacity-100"}`} style={{ transitionDuration: `${fadeDuration}ms` }}>
      <div className="w-full max-w-xl px-6">
        <div className="w-full">
          <div className="relative mx-2 h-44 sm:mx-4 sm:h-56">
            <div aria-label="Appai" className="absolute inset-x-0 top-0 flex items-start justify-center">
              {[..."Appai"].map((letter, index) => {
                const letterPosition = 8 + index * 18;
                const revealed = progress >= letterPosition + 6;
                return (
                  <span
                    key={`${letter}-${index}`}
                    aria-hidden="true"
                    className={`preloader-brand-letter inline-block text-[clamp(3.5rem,14vw,6.5rem)] font-black leading-none transition-[opacity,transform,filter] duration-500 ease-out ${revealed ? "translate-y-0 scale-100 opacity-100 blur-0" : "translate-y-5 scale-50 opacity-0 blur-2xl"}`}
                  >
                    {letter}
                  </span>
                );
              })}
            </div>

            <div
              aria-hidden="true"
              className="absolute bottom-2 z-10 text-[#f4f0df] transition-[left,transform] duration-75 ease-linear sm:bottom-2.5"
              style={{ left: `${progress}%`, transform: `translateX(-${progress}%)` }}
            >
              <div className="relative">
                <div className="absolute bottom-1 right-[82%] flex items-end gap-0.5">
                  <span className="preloader-smoke preloader-smoke-one" />
                  <span className="preloader-smoke preloader-smoke-two" />
                  <span className="preloader-smoke preloader-smoke-three" />
                  <span className="preloader-smoke preloader-smoke-four" />
                  <span className="preloader-smoke preloader-smoke-five" />
                </div>
                <FiTruck className="h-14 w-16 stroke-[1.7] drop-shadow-[0_5px_10px_rgba(0,0,0,0.3)] sm:h-16 sm:w-20" />
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-2 overflow-hidden rounded-full border border-[#f4f0df]/30 bg-black/20 sm:h-2.5">
              <div className="h-full rounded-full bg-[#00a651] transition-[width] duration-75 ease-linear" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <output aria-live="polite" aria-label={`Loading ${progress} percent`} className="mt-4 block text-center text-lg font-bold tracking-normal sm:text-xl">
            {progress}%
          </output>
        </div>
      </div>
    </div>
  );
}

export default function PreLoader() {
  return <Suspense fallback={null}><PreLoaderContent /></Suspense>;
}
