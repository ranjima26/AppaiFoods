"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type PointerEvent } from "react";
import { products } from "@/app/data/products";


import AddToCart from "./addToCart";
import WishlistButton from "./wishlistButton";

export default function ShopProducts() {
  const [backImageProduct, setBackImageProduct] = useState<string | null>(null);

  function toggleMobileProductImage(productSlug: string) {
    setBackImageProduct((current) => current === productSlug ? null : productSlug);
  }

  function showBackImageOnPointerEnter(event: PointerEvent<HTMLDivElement>, productSlug: string, hasBackImage: boolean) {
    if (hasBackImage && event.pointerType !== "touch") setBackImageProduct(productSlug);
  }

  function hideBackImageOnPointerLeave(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "touch") setBackImageProduct(null);
  }

  return (
    <section aria-labelledby="all-products-heading" className="px-5 py-14 sm:px-8 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-9 text-center sm:mb-12">
          <div>
            <p className="mb-6 sm:mb-8 text-[11px] font-bold uppercase tracking-[0.24em] text-[#00a651]">Made for your snack moments</p>
            <h2 id="all-products-heading" className="text-[2.625rem] font-semibold tracking-tight text-[#003820] sm:text-5xl lg:text-6xl">All Products</h2>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:[&>li:nth-last-child(2)]:col-start-2">
          {products.map((product) => {
            const isBackImageVisible = backImageProduct === product.slug;
            const imagePadding = ["avalose-unda", "chammanthi-podi", "masala-peanuts", "tapioca-sticks"].includes(product.slug)
              ? "px-3 pb-3 pt-14 sm:px-4 sm:pb-4 sm:pt-16"
              : "p-4 sm:p-6";

            return (
            <li key={product.image}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#003820]/10 bg-white transition-[border-color,box-shadow] duration-300 hover:border-[#00a651]/50 hover:shadow-[0_12px_32px_-12px_rgba(0,56,32,0.2)] motion-reduce:transition-none sm:rounded-3xl">
                <div onPointerEnter={(event) => showBackImageOnPointerEnter(event, product.slug, Boolean(product.backImage))} onPointerLeave={hideBackImageOnPointerLeave} className="group/product-image relative m-2 block aspect-[4/5] overflow-hidden rounded-xl bg-[#f2f5eb] sm:m-3 sm:rounded-2xl">
                  <div aria-hidden="true" className="absolute inset-[15%] rounded-full bg-[#dfeacd]/65 blur-2xl" />
                  <Image
                    src={`/assets/${product.image}`}
                    alt={`${product.name} packet`}
                    fill
                    sizes="(max-width: 639px) 45vw, (max-width: 1023px) 44vw, (max-width: 1279px) 29vw, 290px"
                    className={`object-contain ${imagePadding} drop-shadow-[0_12px_12px_rgba(0,56,32,0.12)] transition-[transform,opacity] duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${isBackImageVisible ? "opacity-0" : ""} ${product.backImage ? "group-hover/product-image:opacity-0" : ""}`}
                  />
                  {product.backImage && (
                    <Image
                      src={`/assets/${product.backImage}`}
                      alt={`${product.name} packet back`}
                      fill
                      sizes="(max-width: 639px) 45vw, (max-width: 1023px) 44vw, (max-width: 1279px) 29vw, 290px"
                      className={`pointer-events-none object-contain ${imagePadding} opacity-0 drop-shadow-[0_12px_12px_rgba(0,56,32,0.12)] transition-opacity duration-300 group-hover/product-image:opacity-100 motion-reduce:transition-none ${isBackImageVisible ? "opacity-100" : ""}`}
                    />
                  )}
                  <WishlistButton slug={product.slug} name={product.name} className="absolute -right-1 top-1 z-20 sm:right-4 sm:top-4" />
                  <Link href={`/shop/${product.slug}`} aria-label={`View ${product.name}`} className="absolute inset-0 z-10 hidden sm:block" />
                  {product.backImage && (
                    <button type="button" aria-label={`Show ${isBackImageVisible ? "front" : "back"} of ${product.name}`} aria-pressed={isBackImageVisible} onClick={() => toggleMobileProductImage(product.slug)} className="absolute inset-0 z-10 sm:hidden" />
                  )}
                </div>
                <div className="flex flex-1 flex-col px-4 pb-5 pt-2 sm:px-6 sm:pb-6">
                  <h3 className="text-xl leading-tight text-[#003820] sm:text-2xl"><Link href={`/shop/${product.slug}`} className="hover:text-[#00a651]">{product.name}</Link></h3>
                  <p className="mt-2 text-[11px] leading-5 text-[#526357] sm:text-xs">{product.subtitle}</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-5">
                    {/* Sample prices from the reference; replace with catalog pricing. */}
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span className="text-xl font-bold text-[#003820] sm:text-2xl">₹{product.price}</span>
                      <del className="text-xs font-medium text-gray-400 sm:text-sm">₹{product.originalPrice}</del>
                    </div>
                    <div className="ml-auto flex shrink-0 items-center gap-2">
                      <AddToCart slug={product.slug} name={product.name} compact />
                    </div>
                  </div>
                </div>
              </article>
            </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
