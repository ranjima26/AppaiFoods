"use client";

import { FiHeart } from "react-icons/fi";
import { useWishlist } from "./wishlistStore";

export default function WishlistButton({ slug, name, className = "" }: { slug: string; name: string; className?: string }) {
  const { hasItem, toggleItem } = useWishlist();
  const saved = hasItem(slug);
  const label = `${saved ? "Remove" : "Add"} ${name} ${saved ? "from" : "to"} wishlist`;
  return (
    <button type="button" aria-label={label} title={label} aria-pressed={saved} onClick={() => toggleItem(slug)} className={`grid size-11 shrink-0 place-items-center border-0 bg-transparent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008846] ${saved ? "text-red-500" : "text-[#607167] hover:text-red-500"} ${className}`}>
      <FiHeart aria-hidden="true" className={`size-5 ${saved ? "fill-current" : ""}`} />
    </button>
  );
}
