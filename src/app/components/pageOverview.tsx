"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiChevronRight, FiCoffee, FiPackage, FiStar } from "react-icons/fi";
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
  const [section, setSection] = useState<(typeof sections)[number]>("Description");

  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-4 pb-16 pt-24 text-[#003820] min-[390px]:px-5 sm:px-8 sm:pb-20 sm:pt-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="mb-5 flex min-w-0 items-center gap-1.5 overflow-hidden text-[11px] text-[#69766d] min-[390px]:gap-2 min-[390px]:text-xs sm:mb-10 sm:gap-3 sm:text-sm">
          <Link href="/" className="hover:text-[#00a651]">Home</Link>
          <FiChevronRight aria-hidden="true" />
          <Link href="/shop" className="hover:text-[#00a651]">Shop</Link>
          <FiChevronRight aria-hidden="true" />
          <span aria-current="page" className="truncate font-semibold text-[#003820]">{product.name}</span>
        </nav>

        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-3xl border border-[#003820]/5 bg-[#f7f5ee] sm:rounded-[2.5rem] lg:max-w-none">
              <Image src={images[selectedImage].src} alt={`${product.name} — ${images[selectedImage].label.toLowerCase()} view`} fill priority sizes="(max-width: 1023px) 90vw, 608px" className="object-contain p-8 sm:p-12" />
              <WishlistButton slug={product.slug} name={product.name} className="absolute right-3 top-3 z-20 sm:right-4 sm:top-4" />
            </div>
            <div aria-label="Product image views" className="mx-auto mt-3 flex w-full max-w-xl gap-2 sm:mt-5 sm:gap-4 lg:max-w-none">
              {images.map((item, index) => (
                <button key={item.label} type="button" onClick={() => setSelectedImage(index)} aria-label={`Show ${product.name} ${item.label.toLowerCase()} view`} aria-pressed={selectedImage === index} className={`relative flex h-20 min-w-0 flex-1 flex-col items-center overflow-hidden rounded-xl border-2 bg-[#faf9f5] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00a651] min-[390px]:h-24 sm:h-32 sm:max-w-28 sm:rounded-2xl ${selectedImage === index ? "border-[#00a651]" : "border-[#003820]/10 hover:border-[#00a651]/50"}`}>
                  <span className="relative block w-full flex-1"><Image src={item.src} alt="" fill sizes="112px" className="object-contain p-2" /></span>
                  <span className="pb-1.5 text-[9px] font-semibold uppercase tracking-wider sm:pb-2 sm:text-[10px]">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="break-words text-3xl leading-[1.08] min-[390px]:text-4xl sm:text-6xl">{product.name}</h1>
            <p className="mt-3 text-sm font-semibold text-[#008846] min-[390px]:text-base sm:mt-4 sm:text-lg">{product.subtitle}</p>
            <div aria-label="Rated 4.2 out of 5" className="mt-4 inline-flex items-center gap-1 rounded-full bg-[#207553] px-2.5 py-0.5 text-xs font-medium leading-5 text-white sm:mt-6 sm:text-sm">
              <FiStar aria-hidden="true" className="size-3.5 fill-current" />
              <span aria-hidden="true">4.2</span>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7 sm:gap-4">
              <span className="text-4xl font-bold">₹{product.price}</span>
              <del className="text-lg font-semibold text-gray-400">₹{product.originalPrice}</del>
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">Sale</span>
            </div>
            <p className="mt-5 text-sm leading-6 text-[#69766d] sm:mt-7 sm:leading-7">{product.description}</p>

            <div className="mt-6 sm:mt-8">
              <AddToCart slug={product.slug} name={product.name} />
            </div>
            <Link href={{ pathname: "/checkout", query: { product: product.slug } }} className="mt-4 flex h-14 w-full items-center justify-center rounded-full bg-[#003820] text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#008846] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#008846]">Buy it now</Link>

            <div className="mt-6 grid grid-cols-1 gap-2 min-[390px]:grid-cols-2 sm:mt-8 sm:gap-3">
              <div className="flex items-center gap-3 rounded-2xl border border-[#003820]/5 bg-[#f7f5ee] p-3 text-xs font-semibold sm:p-4"><FiCoffee aria-hidden="true" className="size-5 shrink-0 text-[#008846] sm:size-6" />Kerala favourites</div>
              <div className="flex items-center gap-3 rounded-2xl border border-[#003820]/5 bg-[#f7f5ee] p-3 text-xs font-semibold sm:p-4"><FiPackage aria-hidden="true" className="size-5 shrink-0 text-[#008846] sm:size-6" />Packed for sharing</div>
            </div>

            <div className="mt-7 border-t border-[#003820]/10 pt-4 sm:mt-9 sm:pt-5">
              <div aria-label="Product information" className="grid grid-cols-3 border-b border-[#003820]/10">
                {sections.map((item) => <button key={item} type="button" aria-pressed={section === item} aria-controls="product-information" onClick={() => setSection(item)} className={`min-w-0 border-b-2 px-0.5 pb-3 text-[9px] font-bold uppercase tracking-normal min-[390px]:text-[10px] min-[390px]:tracking-wide sm:pb-4 sm:text-xs ${section === item ? "border-[#008846] text-[#008846]" : "border-transparent text-[#69766d] hover:text-[#003820]"}`}>{item}</button>)}
              </div>
              <div id="product-information" aria-live="polite" className="min-h-32 py-6 text-sm leading-7 text-[#69766d]">
                {section === "Description" && <p>{product.description}</p>}
                {section === "Ingredients" && <p>Please refer to the product packaging for the full ingredient list and allergen information.{product.backImage ? " Select the Back image to view the packet label." : ""}</p>}
                {section === "Shipping" && <p>Online ordering is coming soon. <Link href="/contactUs" className="font-semibold text-[#008846] underline underline-offset-4">Contact us</Link> for product availability and delivery enquiries.</p>}
              </div>
            </div>
          </div>
        </div>
        <section aria-labelledby="other-products-heading" className="mt-10 border-t border-[#003820]/10 pt-7 sm:mt-16 sm:pt-8">
          <h2 id="other-products-heading" className="mb-5 text-2xl sm:mb-6 sm:text-3xl">Other products</h2>
          <ul className="grid max-w-3xl grid-cols-1 gap-3 min-[390px]:grid-cols-2 sm:grid-cols-3 sm:gap-5">
            {otherProducts.map((item) => (
              <li key={item.slug}>
                <Link href={`/shop/${item.slug}`} className="group block h-full rounded-2xl border border-[#003820]/10 bg-white p-3 transition-colors hover:border-[#00a651]/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00a651]">
                  <div className="group/product-image relative aspect-square overflow-hidden rounded-xl bg-[#f7f5ee]">
                    <Image src={`/assets/${item.image}`} alt={`${item.name} packet`} fill sizes="(max-width: 639px) 42vw, 220px" className={`object-contain p-4 transition-[transform,opacity] duration-300 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none ${item.backImage ? "group-hover/product-image:opacity-0" : ""}`} />
                    {item.backImage && (
                      <Image src={`/assets/${item.backImage}`} alt={`${item.name} packet back`} fill sizes="(max-width: 639px) 42vw, 220px" className="pointer-events-none object-contain p-4 opacity-0 transition-opacity duration-300 group-hover/product-image:opacity-100 motion-reduce:transition-none" />
                    )}
                  </div>
                  <h3 className="mt-3 text-lg leading-tight group-hover:text-[#008846] sm:text-xl">{item.name}</h3>
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
