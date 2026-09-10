"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiChevronRight, FiMinus, FiPlus, FiCoffee, FiPackage } from "react-icons/fi";
import { products, type Product } from "@/app/data/products";

import AddToCart from "./addToCart";
import WishlistButton from "./wishlistButton";

const sections = ["Description", "Ingredients", "Shipping"] as const;

export default function PageOverview({ product }: { product: Product }) {
  const otherProducts = products.filter((item) => item.slug !== product.slug).slice(0, 3);
  const images = [
    { src: `/assets/${product.image}`, label: "Front" },
    ...(product.backImage ? [{ src: `/assets/${product.backImage}`, label: "Back" }] : []),
    ...(product.bowlImage ? [{ src: product.bowlImage, label: "Bowl" }] : []),
  ];
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [section, setSection] = useState<(typeof sections)[number]>("Description");

  return (
    <main className="min-h-screen bg-white px-5 pb-20 pt-8 text-[#003820] sm:px-8 sm:pt-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-xs text-[#69766d] sm:mb-10 sm:gap-3 sm:text-sm">
          <Link href="/" className="hover:text-[#00a651]">Home</Link>
          <FiChevronRight aria-hidden="true" />
          <Link href="/shop" className="hover:text-[#00a651]">Shop</Link>
          <FiChevronRight aria-hidden="true" />
          <span aria-current="page" className="font-semibold text-[#003820]">{product.name}</span>
        </nav>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-[#003820]/5 bg-[#f7f5ee] sm:rounded-[2.5rem]">
              <Image src={images[selectedImage].src} alt={`${product.name} — ${images[selectedImage].label.toLowerCase()} view`} fill priority sizes="(max-width: 1023px) 90vw, 608px" className="object-contain p-8 sm:p-12" />
              <WishlistButton slug={product.slug} name={product.name} className="absolute right-3 top-3 z-20 sm:right-4 sm:top-4" />
            </div>
            <div aria-label="Product image views" className="mt-5 flex flex-wrap gap-3 sm:gap-4">
              {images.map((item, index) => (
                <button key={item.label} type="button" onClick={() => setSelectedImage(index)} aria-label={`Show ${product.name} ${item.label.toLowerCase()} view`} aria-pressed={selectedImage === index} className={`relative flex h-28 w-24 flex-col items-center overflow-hidden rounded-2xl border-2 bg-[#faf9f5] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00a651] sm:h-32 sm:w-28 ${selectedImage === index ? "border-[#00a651]" : "border-[#003820]/10 hover:border-[#00a651]/50"}`}>
                  <span className="relative block w-full flex-1"><Image src={item.src} alt="" fill sizes="112px" className="object-contain p-2" /></span>
                  <span className="pb-2 text-[10px] font-semibold uppercase tracking-wider">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-5xl leading-[1.05] sm:text-6xl">{product.name}</h1>
            <p className="mt-4 text-base font-semibold text-[#008846] sm:text-lg">{product.subtitle}</p>
            <p className="mt-6 text-sm text-[#69766d]">No reviews yet</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <span className="text-4xl font-bold">₹{product.price}</span>
              <del className="text-lg font-semibold text-gray-400">₹{product.originalPrice}</del>
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">Sale</span>
            </div>
            <p className="mt-7 text-sm leading-7 text-[#69766d]">{product.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div aria-label="Quantity" className="flex h-14 items-center rounded-xl border border-[#003820]/15 bg-white shadow-sm">
                <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} disabled={quantity === 1} aria-label="Decrease quantity" className="grid size-12 place-items-center disabled:text-gray-300"><FiMinus aria-hidden="true" /></button>
                <output aria-live="polite" className="w-8 text-center font-semibold">{quantity}</output>
                <button type="button" onClick={() => setQuantity((value) => Math.min(99, value + 1))} disabled={quantity === 99} aria-label="Increase quantity" className="grid size-12 place-items-center disabled:text-gray-300"><FiPlus aria-hidden="true" /></button>
              </div>
              <AddToCart slug={product.slug} name={product.name} quantity={quantity} />
            </div>
            <Link href={{ pathname: "/checkout", query: { product: product.slug, quantity } }} className="mt-4 flex h-14 w-full items-center justify-center rounded-xl bg-[#003820] text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#008846] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#008846]">Buy it now</Link>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 rounded-2xl border border-[#003820]/5 bg-[#f7f5ee] p-4 text-xs font-semibold"><FiCoffee aria-hidden="true" className="size-6 shrink-0 text-[#008846]" />Kerala favourites</div>
              <div className="flex items-center gap-3 rounded-2xl border border-[#003820]/5 bg-[#f7f5ee] p-4 text-xs font-semibold"><FiPackage aria-hidden="true" className="size-6 shrink-0 text-[#008846]" />Packed for sharing</div>
            </div>

            <div className="mt-9 border-t border-[#003820]/10 pt-5">
              <div aria-label="Product information" className="flex gap-5 border-b border-[#003820]/10 sm:gap-8">
                {sections.map((item) => <button key={item} type="button" aria-pressed={section === item} aria-controls="product-information" onClick={() => setSection(item)} className={`border-b-2 pb-4 text-[10px] font-bold uppercase tracking-wide sm:text-xs ${section === item ? "border-[#008846] text-[#008846]" : "border-transparent text-[#69766d] hover:text-[#003820]"}`}>{item}</button>)}
              </div>
              <div id="product-information" aria-live="polite" className="min-h-32 py-6 text-sm leading-7 text-[#69766d]">
                {section === "Description" && <p>{product.description}</p>}
                {section === "Ingredients" && <p>Please refer to the product packaging for the full ingredient list and allergen information.{product.backImage ? " Select the Back image to view the packet label." : ""}</p>}
                {section === "Shipping" && <p>Online ordering is coming soon. <Link href="/contactUs" className="font-semibold text-[#008846] underline underline-offset-4">Contact us</Link> for product availability and delivery enquiries.</p>}
              </div>
            </div>
          </div>
        </div>
        <section aria-labelledby="other-products-heading" className="mt-12 border-t border-[#003820]/10 pt-8 sm:mt-16">
          <h2 id="other-products-heading" className="mb-6 text-3xl">Other products</h2>
          <ul className="grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
            {otherProducts.map((item) => (
              <li key={item.slug}>
                <Link href={`/shop/${item.slug}`} className="group block h-full rounded-2xl border border-[#003820]/10 bg-white p-3 transition-colors hover:border-[#00a651]/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00a651]">
                  <div className="group/product-image relative aspect-square overflow-hidden rounded-xl bg-[#f7f5ee]">
                    <Image src={`/assets/${item.image}`} alt={`${item.name} packet`} fill sizes="(max-width: 639px) 42vw, 220px" className={`object-contain p-4 transition-[transform,opacity] duration-300 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none ${item.backImage ? "group-hover/product-image:opacity-0" : ""}`} />
                    {item.backImage && (
                      <Image src={`/assets/${item.backImage}`} alt={`${item.name} packet back`} fill sizes="(max-width: 639px) 42vw, 220px" className="pointer-events-none object-contain p-4 opacity-0 transition-opacity duration-300 group-hover/product-image:opacity-100 motion-reduce:transition-none" />
                    )}
                  </div>
                  <h3 className="mt-3 text-xl leading-tight group-hover:text-[#008846]">{item.name}</h3>
                  <div className="mt-2 flex flex-wrap items-baseline gap-2 pb-1">
                    <span className="text-sm font-bold">₹{item.price}</span>
                    <del className="text-xs text-gray-400">₹{item.originalPrice}</del>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
