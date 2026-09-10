"use client";

import { useEffect } from "react";
import Hero from "@/app/components/hero";
import ProductSection from "@/app/components/productSection";
import WhyAppai from "@/app/components/whyAppai";
import OurStory from "@/app/components/ourStory";
import SisterConcerns from "@/app/components/sisterConcerns";
import Testimonial from "@/app/components/testimonial";
import ContactSection from "@/app/components/contactSection";

export default function Home() {
  useEffect(() => {
    // Prevent browser from restoring scroll position on refresh
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Always force scroll to top (Hero section) on initial page load / refresh
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="isolate min-h-screen bg-white">
      <div className="relative">
        <div className="sticky top-0 z-0">
          <Hero />
        </div>
        <div className="relative z-10 overflow-hidden rounded-t-[2rem] shadow-[0_-18px_45px_rgba(0,0,0,0.14)] sm:rounded-t-[2.75rem]">
          <OurStory />
        </div>
      </div>
      <ProductSection />
      <WhyAppai />
      <SisterConcerns />
      <Testimonial />
      <ContactSection />
    </main>
  );
}
