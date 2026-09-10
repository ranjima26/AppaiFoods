"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./cartStore";
import { useWishlist } from "./wishlistStore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AuthModal from "@/app/components/authmodal";
import {
  FiHeart,
  FiMenu,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiX,
} from "react-icons/fi";

interface NavItem {
  label: string;
  href: string;
}

const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/aboutUs" },
  { label: "Shop", href: "/shop" },
  { label: "Track Order", href: "/trackOrder" },
  { label: "Contact Us", href: "/contactUs" },
];

export default function Header() {
  const pathname = usePathname();
  const { count } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const normalizedPath = pathname?.toLowerCase().replace(/\/$/, "") || "";
  const hasBlendedHero = normalizedPath === "" || normalizedPath === "/aboutus" || normalizedPath === "/shop" || normalizedPath === "/trackorder" || normalizedPath === "/contactus";

  useEffect(() => {
    const updateHeader = () => setHasScrolled(window.scrollY > 24);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, [pathname]);

  const isBlended = hasBlendedHero && !hasScrolled && !menuOpen;
  const hasLightBanner = ["/aboutus", "/shop", "/trackorder", "/contactus"].includes(normalizedPath);
  const isTransparent = isBlended && !hasLightBanner;

  return (
    <header
      className={`${hasBlendedHero ? "fixed" : "sticky"} top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-300 ${isBlended
          ? "border-transparent bg-transparent shadow-none"
          : "border-[#00a651]/15 bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,86,48,0.08)]"
        }`}
    >
      {announcementVisible && !hasBlendedHero && (
        <div className={`relative py-2 pl-3 pr-10 text-center text-[9px] font-semibold leading-4 tracking-[0.04em] text-white transition-colors duration-300 sm:px-4 sm:py-2.5 sm:text-sm sm:tracking-[0.08em] ${isTransparent
            ? "bg-black/10"
            : "bg-gradient-to-r from-[#005630] via-[#00a651] to-[#005630] shadow-inner"
          }`}>
          🌱 100% AUTHENTIC &amp; FRESH TRADITIONAL KERALA SNACKS | FREE SHIPPING ON ORDERS ABOVE ₹499 🚚
          <button
            onClick={() => setAnnouncementVisible(false)}
            aria-label="Close announcement"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full w-5 h-5 bg-white/20 hover:bg-white/35 transition-colors duration-200"
          >
            <FiX className="text-white" size={11} />
          </button>
        </div>
      )}

      <div className="mx-auto flex min-h-18 max-w-[1720px] items-center justify-between gap-3 px-4 pt-3 sm:min-h-24 sm:gap-8 sm:px-8 sm:pt-0 lg:px-12 xl:px-20">
        <Link
          href="/"
          aria-label="Appai Foods home"
          className={`shrink-0 py-2 pl-2 sm:pl-0 transition-transform duration-300 ${isTransparent ? "translate-y-2 sm:translate-y-3" : "translate-y-0"
            }`}
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/Appai Foods logo.png"
            alt="Appai Foods"
            width={1794}
            height={2429}
            priority
            className="h-14 w-auto object-contain sm:h-20"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden items-center gap-7 xl:flex">
          {navigation.map(({ label, href }) => {
            const active =
              href !== "/" &&
              pathname.startsWith(href);

            return (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-1 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.06em] transition-colors ${active
                    ? isTransparent
                      ? "text-emerald-400 font-bold"
                      : "text-[#00a651]"
                    : isTransparent
                      ? "text-white hover:text-emerald-300"
                      : "text-black hover:text-[#00a651]"
                  }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <HeaderAction label="Search" transparent={isTransparent}>
            <FiSearch />
          </HeaderAction>
          <HeaderAction label={`Wishlist (${wishlistCount} items)`} transparent={isTransparent} href="/wishlist">
            <span className="relative"><FiHeart aria-hidden="true" />{wishlistCount > 0 && <span className="absolute -right-3 -top-2 rounded-full bg-[#008846] px-1.5 text-[10px] font-bold text-white">{wishlistCount}</span>}</span>
          </HeaderAction>
          <HeaderAction label="Account" transparent={isTransparent} onClick={() => setAuthOpen(true)}>
            <FiUser />
          </HeaderAction>
          <HeaderAction label={`Shopping cart (${count} items)`} transparent={isTransparent} href="/cart">
            <span className="relative"><FiShoppingCart />{count > 0 && <span className="absolute -right-3 -top-3 rounded-full bg-[#008846] px-1.5 text-[10px] font-bold text-white">{count}</span>}</span>
          </HeaderAction>
        </div>

        <div className="flex shrink-0 items-center gap-2 xl:hidden">
          <div className="sm:hidden">
            <HeaderAction label="Search" transparent={isTransparent}>
              <FiSearch />
            </HeaderAction>
          </div>
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className={`grid size-10 shrink-0 place-items-center rounded-full border text-xl transition-colors hover:bg-[#00a651] hover:text-white sm:size-11 ${isTransparent
                ? "border-white/45 text-white"
                : "border-[#00a651]/35 text-[#006d3b]"
              }`}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full border-t border-[#00a651]/15 bg-white px-5 py-5 shadow-xl xl:hidden max-h-[85vh] overflow-y-auto"
        >
          <div className="mx-auto flex max-w-[1720px] flex-col">
            {navigation.map(({ label, href }) => {
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-[#00a651]/10 py-3 text-sm font-semibold uppercase tracking-[0.06em] text-[#00a651] last:border-0 hover:text-[#008846]"
                >
                  {label}
                </Link>
              );
            })}

            <div className="mt-5 flex gap-3 sm:hidden">
              <HeaderAction label="Search" transparent={false}><FiSearch /></HeaderAction>
              <HeaderAction label={`Wishlist (${wishlistCount} items)`} transparent={false} href="/wishlist"><span className="relative"><FiHeart aria-hidden="true" />{wishlistCount > 0 && <span className="absolute -right-3 -top-2 rounded-full bg-[#008846] px-1.5 text-[10px] font-bold text-white">{wishlistCount}</span>}</span></HeaderAction>
              <HeaderAction label="Account" transparent={false} onClick={() => setAuthOpen(true)}><FiUser /></HeaderAction>
              <HeaderAction label={`Shopping cart (${count} items)`} transparent={false} href="/cart"><span className="relative"><FiShoppingCart />{count > 0 && <span className="absolute -right-3 -top-3 rounded-full bg-[#008846] px-1.5 text-[10px] font-bold text-white">{count}</span>}</span></HeaderAction>
            </div>
          </div>
        </nav>
      )}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </header>
  );
}

function HeaderAction({
  label,
  children,
  transparent = false,
  onClick,
  href,
}: Readonly<{ label: string; children: React.ReactNode; transparent?: boolean; onClick?: () => void; href?: string }>) {
  const className = `grid size-11 place-items-center rounded-full border text-lg transition-all hover:border-[#00a651] hover:bg-[#00a651] hover:text-white ${transparent
      ? "border-white/40 text-white hover:bg-white/20"
      : "border-[#00a651]/30 text-[#006d3b]"
    }`;

  if (href) {
    return <Link href={href} aria-label={label} title={label} className={className}>{children}</Link>;
  }

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}
