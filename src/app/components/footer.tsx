"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiLock,
} from "react-icons/fi";

const shopLinks = [
  { label: "Banana Chips", href: "/shop?category=banana-chips" },
  { label: "Tapioca Chips & Sticks", href: "/shop?category=tapioca-chips" },
  { label: "Achappam & Kuzhalappam", href: "/shop?category=achappam" },
  { label: "Chammanthi Podi", href: "/shop?category=chammanthi-podi" },
  { label: "Avalose Unda & Sweets", href: "/shop?category=avalose-unda" },
  { label: "Best Sellers & Combos", href: "/shop?category=combos" },
];

const supportLinks = [
  { label: "Help Center", href: "/contactUs" },
  { label: "FAQ", href: "/faq" },
  { label: "Shipping & Delivery", href: "/shipping" },
  { label: "Cancellation & Refund", href: "/cancellation" },
  { label: "Returns", href: "/returns" },
  { label: "Track Order", href: "/trackOrder" },
];

const aboutLinks = [
  { label: "Our Story", href: "/aboutUs" },
  { label: "Quality Assurance", href: "/#quality" },
  { label: "Journal & Blog", href: "/aboutUs" },
  { label: "Gift Packs", href: "/shop?category=gift-packs" },
  { label: "Contact Us", href: "/contactUs" },
];

export default function Footer() {
  return (
    <footer className="relative border-t-4 border-[#00a651] bg-gradient-to-b from-[#003820] via-[#002b18] to-[#001c10] pb-8 pt-12 text-white shadow-2xl sm:pt-14">
      <div className="mx-auto max-w-[1720px] px-5 sm:px-8 lg:px-12 xl:px-20">
        {/* Main Grid */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 pb-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">

          {/* Left Column: Brand & Contact Info */}
          <div className="col-span-2 space-y-6 lg:col-span-2">

            <div className="space-y-3.5 text-xs sm:text-sm text-emerald-100">
              <div className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#00a651]/20 text-[#00a651] border border-[#00a651]/30">
                  <FiMail className="text-sm" />
                </span>
                <a
                  href="mailto:appaifoodz@gmail.com"
                  className="hover:text-[#00a651] transition-colors font-medium"
                >
                  appaifoodz@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#00a651]/20 text-[#00a651] border border-[#00a651]/30">
                  <FiPhone className="text-sm" />
                </span>
                <a
                  href="tel:+918848688383"
                  className="hover:text-[#00a651] transition-colors font-medium"
                >
                  +91 88 48 68 83 83
                </a>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#00a651]/20 text-[#00a651] border border-[#00a651]/30 mt-0.5">
                  <FiMapPin className="text-sm" />
                </span>
                <div className="max-w-xs text-xs leading-relaxed text-emerald-100/90">
                  <p className="font-semibold text-white/90">APPAI FOODS PVT. LTD</p>
                  <p>Kodanchery, Valiyakolli, Kozhikode (Dist), Kerala - 673580, India</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-9 items-center justify-center rounded-full border border-[#00a651]/40 bg-[#00a651]/10 text-white hover:bg-[#00a651] hover:border-[#00a651] transition-all transform hover:-translate-y-0.5"
              >
                <FiInstagram className="text-base" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-9 items-center justify-center rounded-full border border-[#00a651]/40 bg-[#00a651]/10 text-white hover:bg-[#00a651] hover:border-[#00a651] transition-all transform hover:-translate-y-0.5"
              >
                <FiFacebook className="text-base" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex size-9 items-center justify-center rounded-full border border-[#00a651]/40 bg-[#00a651]/10 text-white hover:bg-[#00a651] hover:border-[#00a651] transition-all transform hover:-translate-y-0.5"
              >
                <FiYoutube className="text-base" />
              </a>
            </div>
          </div>

          {/* Column 2: SHOP (Kerala Snack Categories) */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#00a651] mb-5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#00a651] inline-block"></span>
              SHOP SNACKS
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100/90">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-[#00a651] transition-colors inline-block hover:translate-x-1 transform duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: SUPPORT */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#00a651] mb-5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#00a651] inline-block"></span>
              SUPPORT
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100/90">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-[#00a651] transition-colors inline-block hover:translate-x-1 transform duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: ABOUT */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[#00a651] mb-5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#00a651] inline-block"></span>
              ABOUT
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100/90">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-[#00a651] transition-colors inline-block hover:translate-x-1 transform duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar Divider */}
        <div className="border-t border-[#00a651]/25 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row text-xs text-emerald-100/70">
            {/* Copyright */}
            <p>© 2026 Appai Foods. All rights reserved.</p>

            {/* Payments & Legal Links */}
            <div className="flex max-w-full flex-wrap items-center justify-center gap-4 sm:gap-6">
              {/* Razorpay Badge */}
              <div className="flex items-center gap-2 bg-[#002616] border border-[#00a651]/30 px-3.5 py-1.5 rounded-lg shadow-inner">
                <FiLock className="text-[#00a651] text-xs" />
                <span className="text-[11px] text-emerald-100/90 font-medium">
                  Payments Powered by
                </span>
                <span className="text-[11px] font-bold text-[#38bdf8] tracking-wide">
                  Razorpay
                </span>
              </div>

              {/* Policy Links */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-emerald-100/80">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
                <Link href="/cancellation" className="hover:text-white transition-colors">
                  Cancellation
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms
                </Link>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Appai Logo Widget (Bottom Right) */}
      <a
        href="https://wa.me/918848688383?text=Hi%20Appai%20Foods!%20I%20have%20a%20query."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Appai Foods on WhatsApp"
        className="group fixed bottom-[calc(108px+env(safe-area-inset-bottom,0px))] right-3 z-50 flex items-center justify-center animate-float-jump sm:bottom-6 sm:right-6"
      >
        {/* Ambient Glowing Aura */}
        <span className="absolute -inset-1 rounded-full bg-[#00a651]/30 blur-md animate-pulse-glow"></span>

        {/* Floating Circle Badge with Appai Logo */}
        <div className="relative z-10 flex size-14 sm:size-16 items-center justify-center rounded-full bg-white border-2 border-[#00a651]/40 p-2.5 shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:border-[#00a651] group-hover:shadow-[0_10px_25px_rgba(0,166,81,0.35)]">
          <Image
            src="/Appai Foods logo.png"
            alt="Appai Foods Logo"
            width={1794}
            height={2429}
            className="h-10 sm:h-11 w-auto object-contain"
          />
        </div>

        {/* Hover Tooltip */}
        <span className="absolute right-full mr-3 hidden rounded-xl bg-[#003820] border border-[#00a651]/40 px-3.5 py-2 text-xs font-semibold text-white shadow-2xl whitespace-nowrap group-hover:block transition-all animate-in fade-in slide-in-from-right-2">
          💬 Chat with us on WhatsApp
        </span>
      </a>
    </footer>
  );
}
