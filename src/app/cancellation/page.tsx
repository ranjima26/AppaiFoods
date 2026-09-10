import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation Policy - Appai Foods",
  description: "Learn how Appai Foods reviews cancellation requests, handles orders already processed, and processes eligible refunds.",
};

const cancellationSections = [
  {
    id: "requesting-a-cancellation",
    title: "Requesting a cancellation",
    paragraphs: [
      "If you need to cancel an order, please contact Appai Foods within 12 hours of placing the order and share your order details.",
      "Cancellation requests are reviewed based on the 12-hour request window, the order status, and whether the shipment has already been processed through Indian Postal.",
    ],
  },
  {
    id: "orders-already-processed",
    title: "Orders already processed",
    paragraphs: [
      "Once an order has been packed, dispatched, or handed over for shipping, cancellation may no longer be possible.",
      "If cancellation cannot be completed, our team will guide you on the next available support option based on the order stage.",
    ],
  },
  {
    id: "refund-handling",
    title: "Refund handling",
    paragraphs: [
      "If a cancellation request is approved before dispatch, any eligible refund will be processed through the original payment method.",
      "Refund timelines may vary depending on the payment provider or bank processing time.",
    ],
  },
];

export default function CancellationPage() {
  return (
    <main className="min-h-[70vh] bg-[#fcfaf7] px-5 py-12 text-[#003820] sm:px-8 sm:py-16 lg:px-16">
      <div className="mx-auto max-w-[1720px]">
        <header className="mb-9 text-center sm:mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#008846]">Cancellation</p>
          <h1 className="mt-4 text-[2.625rem] font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">Cancellation Policy</h1>
          <p className="mx-auto mt-5 max-w-4xl text-[15px] leading-8 text-[#607167] sm:text-lg">This page explains how cancellation requests are reviewed and when refunds may apply.</p>
        </header>

        <div className="space-y-6">
          {cancellationSections.map(({ id, title, paragraphs }) => (
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
