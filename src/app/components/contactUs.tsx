"use client";

import React, { useState } from "react";
import PageBanner from "./pageBanner";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiArrowRight,
  FiClock,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

const contactCards = [
  {
    icon: FiPhone,
    title: "Speak With Us",
    category: "CUSTOMER SUPPORT LINE",
    value: "+91 88 48 68 83 83",
    href: "tel:+918848688383",
  },
  {
    icon: FiMail,
    title: "Digital Inquiry",
    category: "GENERAL ENQUIRIES",
    value: "appaifoodz@gmail.com",
    href: "mailto:appaifoodz@gmail.com",
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp Direct",
    category: "INSTANT CHAT SUPPORT",
    value: "+91 88 48 68 83 83",
    href: "https://wa.me/918848688383?text=Hi%20Appai%20Foods!%20I%20have%20an%20inquiry.",
  },
  {
    icon: FiMapPin,
    title: "Visit Our Factory",
    category: "KOZHIKODE, KERALA",
    value: "Kodanchery, Valiyakolli, Kozhikode - 673580",
    href: "tel:+918848688383",
  },
];

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "General Inquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        category: "General Inquiry",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f8f5] text-gray-800">
      <PageBanner title="Contact Us" mobileImage="/assets/mobile%20about.png" />

      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-20">
        
        <div className="mb-12 grid gap-7 border-b border-[#003820]/10 pb-10 sm:mb-16 sm:pb-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.55fr)] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#00a651]"><span className="h-px w-9 bg-[#00a651]" />We&apos;re here to help</p>
            <h2 className="text-4xl font-bold uppercase leading-[0.95] tracking-[-0.03em] text-[#111827] sm:text-6xl lg:text-7xl font-serif">
              Get in touch
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
              For product questions, wholesale requests, or a little help with an order, our Kozhikode team is ready to assist.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 rounded-3xl border border-[#003820]/10 bg-white p-5 shadow-sm sm:p-6">
            <div>
              <FiClock aria-hidden className="mb-3 text-xl text-[#00a651]" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Support hours</p>
              <p className="mt-1 text-xs font-semibold leading-5 text-[#003820]">Mon – Sat<br />9:00 AM – 6:00 PM</p>
            </div>
            <div>
              <FiMapPin aria-hidden className="mb-3 text-xl text-[#00a651]" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Our home</p>
              <p className="mt-1 text-xs font-semibold leading-5 text-[#003820]">Kozhikode,<br />Kerala</p>
            </div>
          </div>
        </div>

        {/* 2. MAIN 2-COLUMN GRID SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          
          {/* LEFT COLUMN: INFO CARDS STACK */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 sm:space-y-5">
            {contactCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <a
                  key={idx}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 rounded-[24px] bg-[#ededea] hover:bg-[#e4e5e0] p-6 shadow-sm border border-black/5 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#dfded8] text-[#003820] group-hover:bg-[#003820] group-hover:text-white transition-colors duration-300">
                    <Icon className="text-xl" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-[#003820] font-serif group-hover:text-[#00a651] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mt-0.5">
                      {card.category}
                    </p>
                    <p className="text-sm font-semibold text-gray-800 mt-1 truncate">
                      {card.value}
                    </p>
                  </div>

                  <FiArrowRight className="text-gray-400 group-hover:text-[#003820] group-hover:translate-x-1 transition-all shrink-0 text-lg" />
                </a>
              );
            })}

          </div>

          {/* RIGHT COLUMN: ELEGANT VIBRANT GREEN FORM CONTAINER */}
          <div className="lg:col-span-7 bg-[#00a657] text-white rounded-[32px] sm:rounded-[36px] p-8 sm:p-12 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            {/* Subtle decorative glow element */}
            <div className="absolute -top-24 -right-24 size-80 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>

            {submitted ? (
              <div className="my-auto py-12 text-center animate-fadeIn">
                <div className="flex size-16 mx-auto items-center justify-center rounded-full bg-white text-[#00a651] text-3xl shadow-lg mb-5">
                  <FiCheckCircle />
                </div>
                <h3 className="text-2xl font-bold font-serif text-white">Message Received!</h3>
                <p className="text-sm text-emerald-50 mt-3 max-w-md mx-auto leading-relaxed">
                  Thank you for contacting Appai Foods. Our team has received your message and will respond to your email promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-[#00a651] px-8 py-3.5 text-xs font-bold shadow-lg hover:bg-emerald-50 transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-white/90">
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-white/40 pb-3 text-sm text-white placeholder-white/60 focus:border-white outline-none transition-colors"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-white/90">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-white/40 pb-3 text-sm text-white placeholder-white/60 focus:border-white outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Phone Number */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-white/90">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-white/40 pb-3 text-sm text-white placeholder-white/60 focus:border-white outline-none transition-colors"
                    />
                  </div>

                  {/* Subject Category */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-white/90">
                      INQUIRY TYPE
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-white/40 pb-3 text-sm text-white focus:border-white outline-none transition-colors cursor-pointer"
                    >
                      <option value="General Inquiry" className="bg-[#00a651] text-white">General Inquiry</option>
                      <option value="Bulk / Wholesale Order" className="bg-[#00a651] text-white">Bulk / Wholesale Order</option>
                      <option value="Order Tracking & Support" className="bg-[#00a651] text-white">Order Tracking & Support</option>
                      <option value="Feedback & Quality" className="bg-[#00a651] text-white">Feedback & Quality</option>
                    </select>
                  </div>
                </div>

                {/* Your Message */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-white/90">
                    YOUR MESSAGE
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us how we can help..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-white/40 pb-3 text-sm text-white placeholder-white/60 focus:border-white outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submit Pill Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full bg-white text-[#00a651] font-bold px-9 py-4 text-xs tracking-wider uppercase shadow-lg hover:bg-emerald-50 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="size-4 rounded-full border-2 border-[#00a651] border-t-transparent animate-spin"></div>
                        SENDING...
                      </>
                    ) : (
                      <>
                        SEND MESSAGE
                        <FiSend className="text-sm" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <section aria-labelledby="visit-us-heading" className="grid overflow-hidden rounded-[28px] border border-[#003820]/10 bg-white shadow-sm lg:grid-cols-[minmax(280px,0.75fr)_minmax(0,1.25fr)] sm:rounded-[36px]">
          <div className="flex flex-col justify-between bg-[#003820] p-7 text-white sm:p-10">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-200">Visit us</p>
              <h2 id="visit-us-heading" className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl">Find us in Kozhikode.</h2>
              <p className="mt-5 max-w-sm text-sm leading-7 text-emerald-50/80">Our facility is in Kodanchery, Valiyakolli, Kozhikode. Contact us before visiting so we can welcome you properly.</p>
            </div>
            <a href="https://www.google.com/maps/search/?api=1&query=Kodanchery%2C+Valiyakolli%2C+Kozhikode%2C+673580" target="_blank" rel="noreferrer" className="mt-8 inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-200 transition-colors hover:text-white">
              Open in Google Maps <FiArrowRight aria-hidden />
            </a>
          </div>
          <div className="min-h-80 bg-[#e9eee6] lg:min-h-full">
            <iframe title="Appai Foods location in Kozhikode" src="https://www.google.com/maps?q=Kodanchery%2C%20Valiyakolli%2C%20Kozhikode%2C%20673580&output=embed" className="h-full min-h-80 w-full border-0 grayscale-[0.25]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </section>
      </div>
    </div>
  );
}
