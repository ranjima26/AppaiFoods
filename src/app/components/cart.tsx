"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight, FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { useCart, deliveryCharge, formatPrice } from "./cartStore";

export default function Cart() {
  const { items, count, subtotal, setQuantity, removeItem } = useCart();
  const delivery = deliveryCharge(subtotal);
  return (
    <main className="min-h-[72vh] bg-[#f7f6ef] px-5 py-10 pb-24 text-[#003820] sm:px-8 lg:px-16">
      <section className="mx-auto max-w-7xl">
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-[#006d3b]"><FiArrowLeft aria-hidden="true" />Continue shopping</Link>
        {items.length === 0 ? (
          <div className="mx-auto flex min-h-[420px] max-w-xl flex-col items-center justify-center py-16 text-center">
            <span className="grid size-24 place-items-center rounded-full bg-[#e9f3e7] text-[#008846]"><FiShoppingBag aria-hidden="true" className="size-10" /></span>
            <h1 className="mt-7 text-4xl sm:text-5xl">Your bag is empty</h1>
            <p className="mt-4 text-sm leading-7 text-[#65766a]">Find a Kerala favourite for your next tea break.</p>
            <Link href="/shop" className="mt-8 rounded-full bg-[#008846] px-8 py-4 text-sm font-bold text-white">Start shopping</Link>
          </div>
        ) : (
          <>
            <div className="mb-8 mt-8 flex items-baseline gap-4"><h1 className="text-4xl sm:text-5xl">Your shopping bag</h1><span className="text-sm text-[#607167]" aria-live="polite">{count} {count === 1 ? "item" : "items"}</span></div>
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
              <ul className="space-y-5">
                {items.map(({ product, quantity }) => (
                  <li key={product.slug} className="flex gap-4 rounded-3xl border border-[#003820]/10 bg-white p-4 shadow-sm sm:gap-6 sm:p-6">
                    <Link href={`/shop/${product.slug}`} className="relative h-28 w-24 shrink-0 rounded-2xl bg-[#f2f5eb] sm:h-40 sm:w-36"><Image src={`/assets/${product.image}`} alt={product.name} fill sizes="(max-width: 639px) 96px, 144px" className="object-contain p-3" /></Link>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2"><div><h2 className="text-xl sm:text-3xl"><Link href={`/shop/${product.slug}`}>{product.name}</Link></h2><p className="mt-1 text-sm text-[#345144] sm:text-base">{product.subtitle}</p></div><button type="button" onClick={() => removeItem(product.slug)} aria-label={`Remove ${product.name} from cart`} className="grid size-10 shrink-0 place-items-center rounded-full text-[#79857d] hover:bg-red-50 hover:text-red-600"><FiTrash2 aria-hidden="true" /></button></div>
                      <p className="mt-2 text-sm text-[#345144]">{formatPrice(product.price)} each</p>
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                        <div className="flex items-center rounded-full border border-[#003820]/10 bg-[#f7f8f5]"><button type="button" aria-label={`Decrease ${product.name} quantity`} disabled={quantity <= 1} onClick={() => setQuantity(product.slug, quantity - 1)} className="grid size-10 place-items-center disabled:opacity-30"><FiMinus aria-hidden="true" /></button><output className="w-7 text-center text-sm font-semibold" aria-label={`${product.name} quantity`} aria-live="polite">{quantity}</output><button type="button" aria-label={`Increase ${product.name} quantity`} disabled={quantity >= 99} onClick={() => setQuantity(product.slug, quantity + 1)} className="grid size-10 place-items-center disabled:opacity-30"><FiPlus aria-hidden="true" /></button></div>
                        <span className="font-bold sm:text-xl">{formatPrice(product.price * quantity)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <aside className="rounded-3xl border border-[#003820]/10 bg-white p-6 shadow-sm sm:p-8 lg:sticky lg:top-36">
                <h2 className="text-3xl">Order summary</h2>
                <dl className="mt-7 space-y-5 text-sm" aria-live="polite"><div className="flex justify-between gap-4"><dt className="text-[#607167]">Subtotal</dt><dd className="font-bold">{formatPrice(subtotal)}</dd></div><div className="flex justify-between gap-4"><dt className="text-[#607167]">Delivery</dt><dd className="font-bold">{delivery === 0 ? "Free" : formatPrice(delivery)}</dd></div><div className="flex justify-between gap-4 border-t border-[#003820]/10 pt-5 text-xl font-bold"><dt>Order total</dt><dd>{formatPrice(subtotal + delivery)}</dd></div></dl>
                <p className="mt-4 text-xs leading-5 text-[#607167]">Free delivery on orders above Rs 499.</p>
                <Link href="/checkout" className="mt-7 flex min-h-14 items-center justify-center gap-3 rounded-xl bg-[#008846] px-5 font-bold text-white transition-colors hover:bg-[#003820]">Checkout<FiArrowRight aria-hidden="true" /></Link>
                <Link href="/shop" className="mt-5 block text-center text-sm font-semibold text-[#607167]">Continue shopping</Link>
              </aside>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
