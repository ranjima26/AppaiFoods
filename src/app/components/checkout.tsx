"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiCreditCard,
  FiFileText,
  FiHome,
  FiMapPin,
  FiMinus,
  FiPercent,
  FiPlus,
  FiShoppingBag,
} from "react-icons/fi";
import { products } from "@/app/data/products";

import { useCart, deliveryCharge } from "./cartStore";

const addressTypes = ["Home", "Work", "Other"];

export default function Checkout() {
  const searchParams = useSearchParams();
  const cart = useCart();
  const isBuyNow = searchParams.has("product");
  const [addressType, setAddressType] = useState("Home");
  const [message, setMessage] = useState("");
  const product = products.find((item) => item.slug === searchParams.get("product"));
  const requestedQuantity = Number(searchParams.get("quantity") ?? 1);
  const quantity = Number.isInteger(requestedQuantity)
    ? Math.min(99, Math.max(1, requestedQuantity))
    : 1;
  const [buyNowQuantity, setBuyNowQuantity] = useState(quantity);
  const checkoutItems = isBuyNow ? (product ? [{ product, quantity: buyNowQuantity }] : []) : cart.items;

  function updateQuantity(slug: string, nextQuantity: number) {
    const boundedQuantity = Math.min(99, Math.max(1, nextQuantity));
    if (isBuyNow) setBuyNowQuantity(boundedQuantity);
    else cart.setQuantity(slug, boundedQuantity);
  }

  const subtotal = checkoutItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const delivery = deliveryCharge(subtotal);
  const discount = 0;
  const total = subtotal + delivery - discount;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Checkout UI is ready. Payment connection can be added next.");
  }

  const inputClass =
    "mt-2 h-12 min-w-0 w-full max-w-full rounded-xl border border-[#003820]/12 bg-white px-3 text-sm font-medium text-[#003820] outline-none transition-colors placeholder:text-[#8a978f] focus:border-[#00a651] focus:ring-2 focus:ring-[#00a651]/15 min-[390px]:px-4";

  if (checkoutItems.length === 0) {
    return (
      <main className="min-h-[72vh] bg-[#f7f6ef] px-4 pb-16 pt-24 text-center text-[#003820] min-[390px]:px-5 sm:pb-20 sm:pt-28">
        <h1 className="text-3xl min-[390px]:text-4xl">Choose a product to checkout</h1>
        <p className="mt-4 text-sm text-[#607167]">Visit the shop and select Buy it now on your favourite snack.</p>
        <Link href="/shop" className="mt-8 inline-flex rounded-full bg-[#008846] px-8 py-4 font-bold text-white">Browse products</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f6ef] px-3 pb-16 pt-24 text-[#003820] min-[360px]:px-4 min-[390px]:px-5 sm:px-8 sm:pb-20 sm:pt-28 lg:px-16">
      <section className="mx-auto max-w-7xl">
        <Link
          href={isBuyNow && product ? `/shop/${product.slug}` : "/cart"}
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#006d3b] transition-colors hover:text-[#00a651]"
        >
          <FiArrowLeft aria-hidden="true" />
          {isBuyNow ? "Back to product" : "Back to cart"}
        </Link>

        <div className="mt-5 grid gap-5 sm:mt-7 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
          <form id="checkout-form" onSubmit={handleSubmit} className="min-w-0 space-y-4 sm:space-y-5">
            <div className="rounded-2xl bg-white p-4 shadow-[0_18px_45px_-28px_rgba(0,56,32,0.35)] min-[390px]:p-5 sm:rounded-[1.75rem] sm:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#00a651]">
                Checkout
              </p>
              <h1 className="mt-2 text-3xl leading-tight min-[390px]:text-4xl sm:text-5xl">
                Complete your order
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#607167] sm:leading-7">
                Your name, email and phone can be filled from login. Confirm the
                delivery address and choose how you want to complete payment.
              </p>
            </div>

            <section className="rounded-2xl bg-white p-4 shadow-[0_18px_45px_-28px_rgba(0,56,32,0.35)] min-[390px]:p-5 sm:rounded-[1.75rem] sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-[#e9f3e7] text-[#008846]">
                  <FiShoppingBag aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00a651]">
                    Contact details
                  </p>
                  <h2 className="text-xl leading-tight min-[390px]:text-2xl">From your login</h2>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2">
                <label className="block min-w-0 text-xs font-bold uppercase tracking-[0.12em] text-[#526357]">
                  Name
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder="Your full name"
                    required
                    className={inputClass}
                  />
                </label>
                <label className="block min-w-0 text-xs font-bold uppercase tracking-[0.12em] text-[#526357]">
                  Phone
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Phone number"
                    required
                    className={inputClass}
                  />
                </label>
                <label className="block min-w-0 text-xs font-bold uppercase tracking-[0.12em] text-[#526357] sm:col-span-2">
                  Email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className={inputClass}
                  />
                </label>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-4 shadow-[0_18px_45px_-28px_rgba(0,56,32,0.35)] min-[390px]:p-5 sm:rounded-[1.75rem] sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-[#e9f3e7] text-[#008846]">
                  <FiMapPin aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00a651]">
                    Delivery address
                  </p>
                  <h2 className="text-xl leading-tight min-[390px]:text-2xl">Where should we send it?</h2>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:mt-6 sm:grid-cols-2">
                <label className="block min-w-0 text-xs font-bold uppercase tracking-[0.12em] text-[#526357] sm:col-span-2">
                  Address
                  <textarea
                    name="address"
                    autoComplete="street-address"
                    placeholder="House name, street, landmark"
                    required
                    rows={4}
                    className="mt-2 min-w-0 w-full max-w-full resize-none rounded-xl border border-[#003820]/12 bg-white px-3 py-3 text-sm font-medium leading-6 text-[#003820] outline-none transition-colors placeholder:text-[#8a978f] focus:border-[#00a651] focus:ring-2 focus:ring-[#00a651]/15 min-[390px]:px-4"
                  />
                </label>
                <label className="block min-w-0 text-xs font-bold uppercase tracking-[0.12em] text-[#526357]">
                  City
                  <input
                    name="city"
                    autoComplete="address-level2"
                    placeholder="City"
                    required
                    className={inputClass}
                  />
                </label>
                <label className="block min-w-0 text-xs font-bold uppercase tracking-[0.12em] text-[#526357]">
                  Pincode
                  <input
                    name="pincode"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder="Pincode"
                    required
                    className={inputClass}
                  />
                </label>
              </div>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#526357]">
                  Save address as
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2 min-[390px]:flex min-[390px]:flex-wrap min-[390px]:gap-3">
                  {addressTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      aria-pressed={addressType === type}
                      onClick={() => setAddressType(type)}
                      className={`inline-flex h-11 min-w-0 items-center justify-center gap-1.5 rounded-full border px-2 text-xs font-bold transition-colors min-[390px]:gap-2 min-[390px]:px-5 min-[390px]:text-sm ${
                        addressType === type
                          ? "border-[#008846] bg-[#008846] text-white"
                          : "border-[#003820]/12 bg-[#f7f6ef] text-[#526357] hover:border-[#00a651] hover:text-[#003820]"
                      }`}
                    >
                      {type === "Home" && <FiHome aria-hidden="true" />}
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-4 shadow-[0_18px_45px_-28px_rgba(0,56,32,0.35)] min-[390px]:p-5 sm:rounded-[1.75rem] sm:p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-[#e9f3e7] text-[#008846]">
                  <FiCreditCard aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00a651]">
                    Payment
                  </p>
                  <h2 className="text-xl leading-tight min-[390px]:text-2xl">Complete invoice</h2>
                </div>
              </div>

              <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-[#008846]/30 bg-[#f1f8ef] p-3 min-[390px]:gap-4 min-[390px]:p-4 sm:mt-6">
                <input
                  type="radio"
                  name="payment"
                  value="invoice"
                  defaultChecked
                  className="mt-1 size-4 accent-[#008846]"
                />
                <span className="min-w-0">
                  <span className="flex min-w-0 items-start gap-2 text-sm font-bold leading-5 text-[#003820]">
                    <FiFileText aria-hidden="true" />
                    Complete invoice and pay
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-[#607167]">
                    Review your total and continue to the payment step.
                  </span>
                </span>
              </label>

              <div className="mt-5 rounded-2xl border border-dashed border-[#003820]/18 bg-[#fafbf8] p-3 min-[390px]:p-4">
                <label className="block text-xs font-bold uppercase tracking-[0.12em] text-[#526357]">
                  Coupon code
                  <div className="mt-2 flex gap-2">
                    <input
                      name="coupon"
                      placeholder="Optional"
                      className="h-12 min-w-0 flex-1 rounded-xl border border-[#003820]/12 bg-white px-3 text-sm font-medium text-[#003820] outline-none transition-colors placeholder:text-[#8a978f] focus:border-[#00a651] focus:ring-2 focus:ring-[#00a651]/15 min-[390px]:px-4"
                    />
                    <button
                      type="button"
                      className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#003820] text-white transition-colors hover:bg-[#008846]"
                      aria-label="Apply coupon"
                    >
                      <FiPercent aria-hidden="true" />
                    </button>
                  </div>
                </label>
              </div>
            </section>

            {message && (
              <p role="status" className="rounded-2xl bg-[#e9f3e7] p-4 text-sm font-semibold text-[#003820]">
                {message}
              </p>
            )}
          </form>

          <aside className="min-w-0 rounded-2xl bg-white p-4 shadow-[0_18px_45px_-28px_rgba(0,56,32,0.35)] min-[390px]:p-5 sm:rounded-[1.75rem] sm:p-7 lg:sticky lg:top-28">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#00a651]">
              Order summary
            </p>
            <h2 className="mt-2 text-2xl leading-tight min-[390px]:text-3xl">Your snacks</h2>

            <ul className="mt-5 space-y-4 sm:mt-6">
              {checkoutItems.map((item) => (
                <li key={item.product.slug} className="grid min-w-0 grid-cols-[4rem_minmax(0,1fr)] gap-x-3 gap-y-2 min-[390px]:grid-cols-[5rem_minmax(0,1fr)] min-[390px]:gap-x-4 sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:items-center">
                  <div className="relative size-16 shrink-0 rounded-xl bg-[#f2f5eb] min-[390px]:size-20 min-[390px]:rounded-2xl">
                    <Image
                      src={`/assets/${item.product.image}`}
                      alt={`${item.product.name} packet`}
                      fill
                      sizes="(max-width: 389px) 64px, 80px"
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="min-w-0">
                      <h3 className="truncate text-base leading-tight min-[390px]:text-lg">{item.product.name}</h3>
                      <p className="mt-1.5 text-sm font-bold text-[#003820] min-[390px]:mt-2">
                        Rs {item.product.price * item.quantity}
                      </p>
                    </div>
                  </div>
                  <div aria-label={`${item.product.name} quantity`} className="col-start-2 row-start-2 inline-flex h-9 w-fit shrink-0 items-center justify-self-end rounded-full border border-[#003820]/12 bg-[#f7f6ef] sm:col-start-3 sm:row-start-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                        disabled={item.quantity === 1}
                        aria-label={`Decrease ${item.product.name} quantity`}
                        className="grid size-9 place-items-center rounded-l-full text-[#003820] transition-colors hover:bg-[#e9f3e7] disabled:cursor-not-allowed disabled:text-[#aeb7b1] disabled:hover:bg-transparent"
                      >
                        <FiMinus aria-hidden="true" className="size-3.5" />
                      </button>
                      <output aria-live="polite" className="w-8 text-center text-sm font-bold">
                        {item.quantity}
                      </output>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                        disabled={item.quantity === 99}
                        aria-label={`Increase ${item.product.name} quantity`}
                        className="grid size-9 place-items-center rounded-r-full text-[#003820] transition-colors hover:bg-[#e9f3e7] disabled:cursor-not-allowed disabled:text-[#aeb7b1] disabled:hover:bg-transparent"
                      >
                        <FiPlus aria-hidden="true" className="size-3.5" />
                      </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-3 border-t border-[#003820]/10 pt-5 text-sm sm:mt-6">
              <div className="flex items-center justify-between text-[#607167]">
                <span>Subtotal</span>
                <span>Rs {subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-[#607167]">
                <span>Delivery</span>
                <span>Rs {delivery}</span>
              </div>
              <div className="flex items-center justify-between text-[#008846]">
                <span>Coupon savings</span>
                <span>- Rs {discount}</span>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-[#003820]/10 pt-4 text-lg font-extrabold text-[#003820] min-[390px]:text-xl">
                <span>Total amount</span>
                <span>Rs {total}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="mt-6 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#008846] px-4 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-[0_14px_28px_rgba(0,136,70,0.28)] transition-colors hover:bg-[#003820] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#008846] min-[390px]:mt-7 min-[390px]:px-6"
            >
              Pay now
              <FiArrowRight aria-hidden="true" />
            </button>

            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs font-semibold text-[#607167]">
              <FiCheckCircle aria-hidden="true" className="text-[#008846]" />
              Secure checkout for Appai Foods orders
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
