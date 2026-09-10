import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns and Exchange - Appai Foods",
  description: "Learn how Appai Foods reviews return and exchange requests, including eligibility, required supporting information, and next steps.",
};

const returnSections = [
  {
    id: "eligibility",
    title: "Eligibility",
    paragraphs: [
      "Returns or exchanges may be considered for eligible orders based on product condition, time from delivery, and issue type.",
      "Items should be unused, in original condition, and accompanied by any relevant packaging where applicable.",
    ],
  },
  {
    id: "requesting-support",
    title: "Requesting support",
    paragraphs: [
      "If you need return or exchange assistance, please contact us with your order details and a brief description of the issue.",
      "An opening video is mandatory for any return or exchange claim involving damage, shipping issues, or product concerns.",
    ],
  },
  {
    id: "approval-and-next-steps",
    title: "Approval and next steps",
    paragraphs: [
      "Once the request is reviewed, our team will guide you through the next steps for exchange, resolution, or any eligible support option.",
      "Approval timelines may vary depending on the nature of the request.",
    ],
  },
];

export default function ReturnsPage() {
  return (
    <main className="min-h-[70vh] bg-[#fcfaf7] px-5 py-12 text-[#003820] sm:px-8 sm:py-16 lg:px-16">
      <div className="mx-auto max-w-[1720px]">
        <header className="mb-9 text-center sm:mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#008846]">Returns</p>
          <h1 className="mt-4 text-[2.625rem] font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">Returns and Exchange</h1>
          <p className="mx-auto mt-5 max-w-4xl text-[15px] leading-8 text-[#607167] sm:text-lg">This page explains how return or exchange requests are reviewed and handled.</p>
        </header>

        <div className="space-y-6">
          {returnSections.map(({ id, title, paragraphs }) => (
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
