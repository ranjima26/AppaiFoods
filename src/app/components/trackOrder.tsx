"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "./pageBanner";
import { FiArrowRight, FiCheck, FiClock, FiHelpCircle, FiMail, FiMapPin, FiPackage, FiShield, FiTruck } from "react-icons/fi";

const deliverySteps = [
  { icon: FiCheck, label: "Order confirmed" },
  { icon: FiPackage, label: "Freshly packed" },
  { icon: FiTruck, label: "On the way" },
  { icon: FiMapPin, label: "Delivered" },
];

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [contact, setContact] = useState("");
  const [submittedOrder, setSubmittedOrder] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedOrder(orderNumber.trim());
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f6f1] text-[#18352a]">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <Image
          src="/achappam.png"
          alt=""
          width={420}
          height={420}
          className="absolute -left-36 top-44 w-80 -rotate-12 opacity-[0.07] grayscale sm:w-96"
        />
        <Image
          src="/achappam.png"
          alt=""
          width={360}
          height={360}
          className="absolute -right-28 top-[34rem] w-72 rotate-[18deg] opacity-[0.06] grayscale sm:w-80"
        />
        <Image
          src="/achappam.png"
          alt=""
          width={260}
          height={260}
          className="absolute bottom-12 left-[18%] hidden w-52 rotate-[32deg] opacity-[0.045] grayscale lg:block"
        />
      </div>

      <PageBanner title="Track Order" mobileImage="/assets/mobile%20about.png" />

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-4 pt-12 sm:px-8 sm:pb-6 sm:pt-16 lg:px-12 lg:pt-20">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#00a651]">
              <span className="h-px w-9 bg-[#00a651]" />
              Order journey
            </div>
            <h2 className="max-w-2xl text-4xl font-extrabold uppercase leading-[1.05] tracking-[-0.035em] text-[#111827] sm:text-5xl lg:text-6xl">
              Track your fresh delivery
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
              Follow your Appai Foods order from our kitchen in Kerala to your doorstep. Keep your order number and the email or phone used at checkout ready.
            </p>
          </div>

          <div className="hidden items-center gap-4 rounded-2xl border border-[#003820]/10 bg-white px-5 py-4 shadow-sm lg:flex">
            <span className="grid size-11 place-items-center rounded-full bg-[#e8f5ec] text-xl text-[#00a651]">
              <FiPackage aria-hidden />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">Freshly packed</p>
              <p className="mt-1 text-sm font-bold text-[#003820]">From Kerala, with care</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-10 lg:px-12 lg:pb-20 lg:pt-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.75fr)]">
          <div className="overflow-hidden rounded-[28px] border border-[#003820]/10 bg-white shadow-[0_24px_70px_rgba(0,56,32,0.08)]">
            <div className="border-b border-[#003820]/10 px-6 py-7 sm:px-10 sm:py-9">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00a651]">Find your parcel</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#003820] sm:text-3xl">Enter your order details</h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">You can find the order number in your confirmation email or message.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 px-6 py-8 sm:px-10 sm:py-10">
              <div>
                <label htmlFor="order-number" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#003820]">Order number</label>
                <div className="relative">
                  <FiPackage aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00a651]" />
                  <input id="order-number" value={orderNumber} onChange={(event) => setOrderNumber(event.target.value)} required autoComplete="off" placeholder="e.g. APPAI-10248" className="h-14 w-full rounded-xl border border-[#003820]/15 bg-[#fafaf7] pl-11 pr-4 text-sm font-medium text-[#003820] outline-none transition focus:border-[#00a651] focus:ring-4 focus:ring-[#00a651]/10" />
                </div>
              </div>
              <div>
                <label htmlFor="contact-detail" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#003820]">Email address or phone number</label>
                <div className="relative">
                  <FiMail aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 text-[#00a651]" />
                  <input id="contact-detail" value={contact} onChange={(event) => setContact(event.target.value)} required placeholder="Used while placing your order" className="h-14 w-full rounded-xl border border-[#003820]/15 bg-[#fafaf7] pl-11 pr-4 text-sm font-medium text-[#003820] outline-none transition focus:border-[#00a651] focus:ring-4 focus:ring-[#00a651]/10" />
                </div>
              </div>
              <button type="submit" className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-[#00a651] px-9 text-sm font-medium uppercase tracking-[0.1em] text-white shadow-[0_12px_30px_rgba(0,166,81,0.22)] transition hover:bg-[#008f46] focus:outline-none focus:ring-4 focus:ring-[#00a651]/20 sm:w-auto sm:min-w-64">
                Track order <FiArrowRight aria-hidden className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            {submittedOrder && (
              <div aria-live="polite" className="border-t border-[#003820]/10 bg-[#f2f8f3] px-6 py-8 sm:px-10">
                <div className="flex items-start gap-4">
                  <div className="grid size-11 shrink-0 place-items-center rounded-full bg-[#003820] text-white"><FiClock aria-hidden /></div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#00a651]">Tracking request</p>
                    <h3 className="mt-1 font-serif text-xl font-semibold text-[#003820]">Order {submittedOrder}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">Your details are ready for tracking. Live shipment data will appear here once the store&apos;s delivery service is connected.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-[28px] bg-[#e8eee8] p-7 sm:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00a651]">How it travels</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#003820]">From us to you</h2>
              <ol className="mt-7 space-y-0">
                {deliverySteps.map(({ icon: Icon, label }, index) => (
                  <li key={label} className="relative flex gap-4 pb-7 last:pb-0">
                    {index < deliverySteps.length - 1 && <span className="absolute left-[19px] top-10 h-[calc(100%-2rem)] w-px bg-[#003820]/15" />}
                    <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-[#003820]/15 bg-[#f7f6f1] text-[#003820]"><Icon aria-hidden /></span>
                    <div className="pt-1">
                      <p className="text-sm font-bold text-[#003820]">{label}</p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">We&apos;ll update you at every stage.</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-[28px] border border-[#003820]/10 bg-white p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-[#00a651]/10 text-[#00a651]"><FiHelpCircle aria-hidden /></span>
                <h2 className="font-serif text-xl font-semibold text-[#003820]">Need some help?</h2>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600">If your order has not updated for 48 hours, our team will be happy to help.</p>
              <Link href="/contactUs" className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#003820] transition hover:text-[#00a651]">Contact support <FiArrowRight aria-hidden /></Link>
            </div>

            <div className="flex items-center gap-3 px-2 text-xs leading-5 text-gray-500">
              <FiShield aria-hidden className="shrink-0 text-lg text-[#00a651]" /> Your order information is kept private and secure.
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
