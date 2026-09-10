import type { Metadata } from "next";
import { FiPlus } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Frequently Asked Questions - Appai Foods",
  description: "Find answers to common questions about Appai Foods snacks, ordering, delivery, returns, and customer support.",
};

const faqs = [
  {
    question: "How do I place an order on Appai Foods?",
    answer: <>You can browse products, add your favourites to cart, and complete checkout directly on the website.<br />If you face any issue while ordering, you can contact Appai Foods support for help before or after checkout.</>,
  },
  {
    question: "Do you ship across India?",
    answer: <>Yes, Appai Foods ships across India through Indian Postal based on service availability in the destination area.<br />Delivery timelines are typically 4-5 working days, depending on your location and festive demand.</>,
  },
  {
    question: "Can I request a return or exchange?",
    answer: <>Eligible return or exchange requests are reviewed based on product condition, delivery timeline, and the issue reported.<br />If you need support, share your order details and the opening video, as an opening video is mandatory for any claim.</>,
  },
  {
    question: "What types of snacks does Appai Foods offer?",
    answer: <>Appai Foods offers traditional Kerala favourites including banana chips, tapioca chips and sticks, achappam, kuzhalappam, Avalose Unda, Chammanthi Podi, and spicy masala peanuts. Explore our full collection to find your favourites.</>,
  },
  {
    question: "How can I track my order?",
    answer: <>You can use the Track Order page to check your order status.<br />If you need additional help, you can also contact Appai foods support directly.</>,
  },
  {
    question: "How do I contact Appai Foods support?",
    answer: <>For order help, shipping questions, product concerns, or general support, use the Contact page.<br />The support team will assist based on business hours and response volume.</>,
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-[70vh] bg-[#fcfaf7] px-5 py-12 text-[#003820] sm:px-8 sm:py-16 lg:px-16">
      <div className="mx-auto max-w-[1720px]">
        <header className="mb-9 text-center sm:mb-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#008846]">Help</p>
          <h1 className="mt-4 text-[2.625rem] font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">Frequently Asked Questions</h1>
          <p className="mx-auto mt-5 max-w-4xl text-[15px] leading-8 text-[#607167] sm:text-lg">Quick answers to the most common questions about shopping with Appai Foods.</p>
        </header>

        <div className="space-y-4 sm:space-y-5">
          {faqs.map(({ question, answer }) => (
            <details key={question} name="faq" className="group rounded-[1.75rem] border border-[#e6dccb] bg-gradient-to-r from-[#fcf7ef] to-white shadow-[0_16px_40px_-24px_rgba(63,49,25,0.16)] open:border-[#008846]/35">
              <summary className="flex min-h-[82px] cursor-pointer list-none items-center justify-between gap-5 rounded-[1.75rem] px-5 py-5 text-[15px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#008846] sm:px-6 sm:text-lg [&::-webkit-details-marker]:hidden">
                <span>{question}</span>
                <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full border border-[#e6dccb] bg-white text-[#008846]">
                  <FiPlus className="size-5 transition-transform group-open:rotate-45 motion-reduce:transition-none" />
                </span>
              </summary>
              <p className="px-5 pb-6 text-[15px] leading-[1.9] text-[#607167] sm:px-6 sm:pr-24 sm:text-base">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
