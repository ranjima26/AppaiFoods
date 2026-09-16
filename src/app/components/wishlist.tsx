"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight, FiHeart, FiShoppingBag } from "react-icons/fi";
import { useState } from "react";
import { useWishlist } from "./wishlistStore";
import { useCart, formatPrice } from "./cartStore";

export default function Wishlist() {
  const { items, count, removeItem } = useWishlist();
  const { moveToCart } = useCart();
  const [message, setMessage] = useState("");

  return (
    <main className="min-h-[72vh] bg-[#fbfaf6] px-5 pb-24 pt-7 text-[#003820] sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <Link href="/shop" className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-[#607167] hover:text-[#008846]"><FiArrowLeft aria-hidden="true" />Back to shop</Link>

        <div className="mb-6 mt-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#003820]/10 pb-5">
          <div className="flex items-center gap-3"><h1 id="wishlist-heading" className="text-3xl">My wishlist</h1><span aria-live="polite" className="rounded-full bg-[#eaf0df] px-3 py-1 text-xs font-bold text-[#008846]">{count} {count === 1 ? "item" : "items"}</span></div>
          {count > 0 && <Link href="/cart" className="inline-flex items-center gap-2 text-xs font-bold text-[#008846]">View your bag<FiShoppingBag aria-hidden="true" className="size-4" /></Link>}
        </div>

        {count === 0 ? (
          <section className="flex flex-col items-center rounded-3xl border border-dashed border-[#003820]/15 bg-white px-6 py-14 text-center sm:py-20">
            <FiHeart aria-hidden="true" className="size-12 text-[#008846]" strokeWidth={1.2} />
            <h2 className="mt-6 text-4xl">Make room for your favourites</h2>
            <p className="mt-3 max-w-sm text-sm leading-7 text-[#607167]">Found something you love? Tap the heart on any snack and it will be waiting right here.</p>
            <Link href="/shop" className="mt-7 inline-flex min-h-13 items-center gap-3 rounded-full bg-[#003820] px-8 text-sm font-bold text-white transition-colors hover:bg-[#008846]">Find your favourites<FiArrowRight aria-hidden="true" /></Link>
          </section>
        ) : (
          <ul className="grid gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product, index) => (
              <li key={product.slug} className="group flex flex-col">
                <div className={`relative overflow-hidden rounded-2xl ${index % 3 === 0 ? "bg-[#f0efdf]" : index % 3 === 1 ? "bg-[#eaf0e6]" : "bg-[#f4eae0]"}`}>
                  <Link href={`/shop/${product.slug}`} className="relative block h-52 sm:h-56 lg:h-60"><Image src={`/assets/${product.image}`} alt={`${product.name} packet`} fill sizes="(max-width: 639px) 90vw, (max-width: 1023px) 44vw, 400px" className="object-contain p-5 transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none sm:p-6" /></Link>
                </div>
                <div className="flex flex-1 flex-col px-1 pt-3">
                  <div className="flex items-start justify-between gap-3"><div><h3 className="text-base leading-tight sm:text-lg"><Link href={`/shop/${product.slug}`} className="hover:text-[#008846]">{product.name}</Link></h3><p className="mt-1 text-xs leading-5 text-[#526357]">{product.subtitle}</p></div><div className="shrink-0 pt-1 text-right"><p className="text-base font-bold">{formatPrice(product.price)}</p><del className="mt-1 block text-xs text-[#6f7d74]">{formatPrice(product.originalPrice)}</del></div></div>
                  <div className="mt-auto grid grid-cols-2 gap-2 pt-3 [&_button]:h-10 [&_button]:px-2 [&_button]:!text-[10px] [&_button]:!leading-tight [&_button]:tracking-normal [&_button_svg]:size-4 sm:[&_button]:!text-[11px]">
                    <button
                      type="button"
                      onClick={() => {
                        moveToCart(product.slug);
                        removeItem(product.slug);
                        setMessage(`${product.name} moved to your cart.`);
                      }}
                      aria-label={`Add ${product.name} to cart`}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#008846] font-bold uppercase text-white transition-colors hover:bg-[#003820] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008846]"
                    >
                      <FiShoppingBag aria-hidden="true" />
                      Add to cart
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        removeItem(product.slug);
                        setMessage(`${product.name} removed from your wishlist.`);
                      }}
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-red-500 font-bold uppercase text-white transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                    >
                      <FiHeart aria-hidden="true" className="fill-current" />
                      Remove from wishlist
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p role="status" className="mt-4 text-sm font-semibold text-[#008846]">{message}</p>
        <div className="mt-10 border-t border-[#003820]/10 pt-6"><p className="text-xs leading-6 text-[#607167]">A favourite today. A little treat tomorrow.</p></div>
      </div>
    </main>
  );
}
