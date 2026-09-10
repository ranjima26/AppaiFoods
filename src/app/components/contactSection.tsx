import Link from "next/link";
import { FiArrowUpRight, FiMail, FiPhone } from "react-icons/fi";

export default function ContactSection() {
  return (
    <section className="bg-white px-3 py-6 sm:px-5 sm:py-8">
      <div className="relative mx-auto max-w-[1512px] overflow-hidden rounded-[2rem] bg-[#e7efe9] px-6 py-10 text-[#164f39] sm:rounded-[2.5rem] sm:px-10 sm:py-12 lg:px-16">
        <div className="pointer-events-none absolute -right-24 -top-32 size-80 rounded-full border-[60px] border-[#164f39]/5" />

        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-14">
          <div className="max-w-xl text-center lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#00a651]">
              We&apos;re here to help
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold leading-tight sm:text-4xl">
              Have a question or a special order?
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#466456] sm:text-base">
              Reach out for product enquiries, bulk orders, or gifting. Our team
              in Kozhikode would love to hear from you.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-end">
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="tel:+918848688383"
                className="flex items-center gap-3 text-[#365849] transition hover:text-[#00a651]"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-[#164f39]/10">
                  <FiPhone aria-hidden="true" />
                </span>
                +91 88 48 68 83 83
              </a>
              <a
                href="mailto:appaifoodz@gmail.com"
                className="flex items-center gap-3 text-[#365849] transition hover:text-[#00a651]"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-[#164f39]/10">
                  <FiMail aria-hidden="true" />
                </span>
                appaifoodz@gmail.com
              </a>
            </div>

            <Link
              href="/contactUs"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#00a651] px-6 text-xs font-extrabold uppercase tracking-[0.12em] text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#164f39]"
            >
              Contact us
              <FiArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
