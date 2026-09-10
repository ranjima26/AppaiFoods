"use client";

import Link from "next/link";
import { useCart } from "./cartStore";
import { useWishlist } from "./wishlistStore";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiHeart, FiHome, FiShoppingCart, FiUser } from "react-icons/fi";
import AuthModal from "./authmodal";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { count } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [panel, setPanel] = useState<"Account" | null>(null);
  const [activeItem, setActiveItem] = useState<"home" | "wishlist" | "account" | "cart">("home");
  const itemClass = "mobile-bottom-nav-item";
  const selectedItem = pathname === "/cart" ? "cart" : pathname === "/wishlist" ? "wishlist" : activeItem;

  return (
    <>
      <nav aria-label="Mobile quick navigation" className="mobile-bottom-nav sm:hidden">
        <Link href="/" aria-label="Home" aria-current={selectedItem === "home" ? "page" : undefined} onClick={() => setActiveItem("home")} className={itemClass}>
          <FiHome aria-hidden="true" />
        </Link>
        <Link href="/wishlist" aria-label={`Wishlist (${wishlistCount} items)`} aria-current={selectedItem === "wishlist" ? "page" : undefined} onClick={() => setActiveItem("wishlist")} className={itemClass}>
          <span className="relative"><FiHeart aria-hidden="true" />{wishlistCount > 0 && <span className="absolute -right-3 -top-2 rounded-full bg-[#008846] px-1.5 text-[10px] font-bold text-white">{wishlistCount}</span>}</span>
        </Link>
        <button type="button" aria-label="Account" aria-current={selectedItem === "account" ? "page" : undefined} aria-haspopup="dialog" onClick={() => { setActiveItem("account"); setPanel("Account"); }} className={itemClass}>
          <FiUser aria-hidden="true" />
        </button>
        <Link href="/cart" aria-label={`Shopping cart (${count} items)`} aria-current={selectedItem === "cart" ? "page" : undefined} onClick={() => setActiveItem("cart")} className={itemClass}>
          <span className="relative"><FiShoppingCart aria-hidden="true" />{count > 0 && <span className="absolute -right-3 -top-2 rounded-full bg-[#008846] px-1.5 text-[10px] font-bold text-white">{count}</span>}</span>
        </Link>
      </nav>
      {panel === "Account" && <AuthModal onClose={() => setPanel(null)} />}
    </>
  );
}
