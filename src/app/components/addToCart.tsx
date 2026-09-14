"use client";

import Link from "next/link";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "./cartStore";

export default function AddToCart({ slug, name, quantity = 1, compact = false }: { slug: string; name: string; quantity?: number; compact?: boolean }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  return (
    <div className={compact ? "flex flex-col items-end gap-2" : "min-w-48 flex-1"}>
      <button type="button" aria-label={`Add ${name} to cart`} onClick={() => { addItem(slug, quantity); setAdded(true); }} className={compact ? "flex size-11 items-center justify-center rounded-full bg-[#003820] text-white transition-colors hover:bg-[#008846] sm:size-12" : "flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#008846] px-5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#003820]"}>
        <FiShoppingCart aria-hidden="true" className="size-5" />{!compact && "Add to cart"}
      </button>
      {added && <p role="status" className="mt-2 text-xs font-semibold text-[#008846]">Added! <Link href="/cart" className="underline underline-offset-2">View cart</Link></p>}
    </div>
  );
}
