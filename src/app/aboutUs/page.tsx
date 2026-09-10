import React from "react";
import AboutUs from "@/app/components/aboutUs";
import WhyAppai from "@/app/components/whyAppai";
import MissionVision from "@/app/components/missionVision";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Appai Foods | Authentic Kerala Snack Heritage",
  description: "Learn about Appai Foods' story, our traditional recipes from Kodanchery, Kozhikode, and our commitment to 100% natural ingredients & pure coconut oil preparation.",
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen">
      <AboutUs />
      <WhyAppai />
      <MissionVision />
    </main>
  );
}
