import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy - Appai Foods",
  description: "Learn how Appai Foods orders are processed, dispatched, and delivered, including delivery timelines and shipping coverage across India.",
};

const shippingSections = [
  {
    id: "order-processing",
    title: "Order processing",
    paragraphs: [
      "Orders are usually processed after payment confirmation and may require additional time during launches, festive seasons, or high-volume periods.",
      "You may be contacted if any order detail needs clarification before dispatch.",
    ],
  },
  {
    id: "delivery-timelines",
    title: "Delivery timelines",
    paragraphs: [
      "Orders are typically delivered within 4-5 working days through Indian Postal, depending on location and seasonal demand.",
      "Once shipped, tracking details may be shared where available.",
    ],
  },
  {
    id: "shipping-coverage",
    title: "Shipping coverage",
    paragraphs: [
      "We currently support shipping across India based on service availability in the destination area.",
      "If a delivery location cannot be serviced after an order is placed, our team will contact you with the next steps.",
    ],
  },
];

export default function ShippingPage() {
  return (
    <main className="min-h-[70vh] bg-[#fcfaf7] px-5 py-12 text-[#003820] sm:px-8 sm:py-16 lg:px-16">
      <div className="mx-auto max-w-[1720px]">
        <header className="mb-9 text-center sm:mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#008846]">Shipping</p>
          <h1 className="mt-4 text-[2.625rem] font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">Shipping Policy</h1>
          <p className="mx-auto mt-5 max-w-4xl text-[15px] leading-8 text-[#607167] sm:text-lg">This page outlines how orders are processed, dispatched, and delivered.</p>
        </header>

        <div className="space-y-6">
          {shippingSections.map(({ id, title, paragraphs }) => (
            <section key={id} aria-labelledby={id} className="rounded-[1.75rem] border border-[#e6dccb] bg-white p-6 shadow-[0_16px_40px_-24px_rgba(63,49,25,0.16)] sm:p-10">
              <h2 id={id} className="text-2xl font-semibold leading-tight sm:text-3xl">{title}</h2>
              <div className="mt-4 space-y-5 text-[15px] leading-[1.9] text-[#607167] sm:text-base">
                {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
