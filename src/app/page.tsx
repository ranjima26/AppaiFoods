"use client";

import { useEffect } from "react";
import FlightProducts from "@/app/components/flightProducts";
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
      <FlightProducts />
      <Hero />
      <OurStory />
      <ProductSection />
      <WhyAppai />
      <SisterConcerns />
      <Testimonial />
      <ContactSection />
    </main>
  );
}
