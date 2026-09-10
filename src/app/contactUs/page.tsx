import React from "react";
import ContactUs from "@/app/components/contactUs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Appai Foods | Authentic Kerala Snacks",
  description: "Get in touch with Appai Foods. Contact us for customer support, bulk wholesale orders, feedback, or visit our facility in Kozhikode, Kerala.",
};

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-[#fcfdfd]">
      <ContactUs />
    </main>
  );
}
