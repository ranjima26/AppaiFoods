"use client";

import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const testimonials = [
  {
    quote: "Crisp banana chips with the true taste of home. Fresh, light, and never oily.",
    name: "Anjali Nair",
    location: "Bengaluru, Karnataka",
    gender: "female",
  },
  {
    quote: "The achappam was delicate and crunchy. Our whole family loved its authentic flavour.",
    name: "Meera Krishnan",
    location: "Chennai, Tamil Nadu",
    gender: "female",
  },
  {
    quote: "Every pack arrived fresh and crunchy. The traditional taste really stands out.",
    name: "Rahul Menon",
    location: "Thrissur, Kerala",
    gender: "male",
  },
  {
    quote: "Perfect with evening tea. The tapioca sticks were so good that I ordered them again.",
    name: "Divya S.",
    location: "Hyderabad, Telangana",
    gender: "female",
  },
  {
    quote: "Authentic taste, clean ingredients, and prompt delivery. A new favourite in our home.",
    name: "Arun Kumar",
    location: "Pune, Maharashtra",
    gender: "male",
  },
];

const positionClasses: Record<number, string> = {
  [-2]: "hidden lg:flex lg:-translate-x-[155%] lg:scale-[0.82] lg:opacity-45 lg:z-0",
  [-1]: "flex -translate-x-[88%] scale-[0.86] opacity-55 z-10 sm:-translate-x-[96%] sm:scale-90 sm:opacity-70",
  0: "flex -translate-x-1/2 scale-100 opacity-100 z-30",
  1: "flex -translate-x-[12%] scale-[0.86] opacity-55 z-10 sm:-translate-x-[4%] sm:scale-90 sm:opacity-70",
  2: "hidden lg:flex lg:translate-x-[55%] lg:scale-[0.82] lg:opacity-45 lg:z-0",
};

function getPosition(index: number, activeIndex: number) {
  let difference = index - activeIndex;
  const halfway = testimonials.length / 2;

  if (difference > halfway) difference -= testimonials.length;
  if (difference < -halfway) difference += testimonials.length;

  return difference;
}

function CustomerAvatar({ gender }: { gender: string }) {
  if (gender === "female") {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true" className="size-full">
        <circle cx="32" cy="32" r="32" fill="#ef8b7f" />
        <path d="M14 58c2-11 9-16 18-16s16 5 18 16" fill="#f4b85e" />
        <path d="M18 28c0-13 6-21 14-21 10 0 16 8 16 22v19l-9-5H24l-10 5c3-7 4-13 4-20Z" fill="#24354a" />
        <ellipse cx="32" cy="28" rx="11" ry="14" fill="#f6bf95" />
        <path d="M21 25c1-10 5-15 12-15 6 0 11 4 12 12-6-1-10-4-13-8-2 5-6 9-11 11Z" fill="#24354a" />
        <path d="M28 34c2 2 6 2 8 0" fill="none" stroke="#b66d58" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="size-full">
      <circle cx="32" cy="32" r="32" fill="#ef8b7f" />
      <path d="M12 59c2-12 10-17 20-17s18 5 20 17" fill="#f4b85e" />
      <ellipse cx="32" cy="28" rx="12" ry="14" fill="#f6bf95" />
      <path d="M19 25c0-12 6-19 14-19 8 0 13 5 14 14-5-2-9-5-12-9-3 5-8 9-16 10Z" fill="#24354a" />
      <path d="M21 31c2 9 6 13 11 13 6 0 10-4 12-13-3 4-7 6-12 6-4 0-8-2-11-6Z" fill="#24354a" />
      <path d="M28 31c2 2 6 2 8 0" fill="none" stroke="#b66d58" strokeLinecap="round" />
    </svg>
  );
}

export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 3500);

    return () => window.clearInterval(interval);
  }, []);

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section className="relative overflow-hidden border-b border-gray-100 bg-[#faf8f5] px-4 py-12 sm:py-14 lg:py-16">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,166,81,0.07),transparent_70%)]" />
        <div className="absolute left-1/2 top-1/4 size-[400px] -translate-x-1/2 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.06),transparent_65%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <h2 className="font-serif text-3xl font-bold text-[#164f39] sm:text-4xl">
          Loved in Every Bite
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-[#5e6f66]">
          A little love from customers who enjoy the taste of home with us.
        </p>

        <div className="relative mt-8 h-[250px] sm:mt-9 sm:h-[265px]">
          {testimonials.map((testimonial, index) => {
            const position = getPosition(index, activeIndex);

            return (
              <article
                key={testimonial.name}
                aria-hidden={position !== 0}
                className={`absolute left-1/2 top-1/2 h-[225px] w-[82%] max-w-[410px] -translate-y-1/2 flex-col items-center rounded-2xl border border-[#164f39]/10 bg-white px-6 py-5 text-center shadow-[0_14px_38px_rgba(87,70,20,0.12)] transition-all duration-300 ease-out sm:w-[390px] sm:px-7 ${positionClasses[position] ?? "hidden"}`}
              >
                <div className="size-12 overflow-hidden rounded-full ring-2 ring-white shadow-[0_4px_12px_rgba(22,79,57,0.18)]">
                  <CustomerAvatar gender={testimonial.gender} />
                </div>

                <div className="mt-2 flex gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <span key={starIndex} className="text-sm text-[#e6ad17]" aria-hidden="true">
                      ★
                    </span>
                  ))}
                </div>

                <blockquote className="mt-2 text-sm font-medium italic leading-5 text-[#445149]">
                  “{testimonial.quote}”
                </blockquote>

                <p className="mt-auto pt-3 font-serif text-base font-bold uppercase tracking-wide text-[#164f39]">
                  {testimonial.name}
                </p>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a938e]">
                  {testimonial.location}
                </p>
              </article>
            );
          })}

          <button
            type="button"
            onClick={showPrevious}
            aria-label="Show previous testimonial"
            className="absolute left-0 top-1/2 z-40 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#164f39] shadow-[0_7px_22px_rgba(0,0,0,0.12)] transition hover:bg-[#164f39] hover:text-white sm:left-3 lg:left-8"
          >
            <FiChevronLeft className="size-5" />
          </button>

          <button
            type="button"
            onClick={showNext}
            aria-label="Show next testimonial"
            className="absolute right-0 top-1/2 z-40 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#164f39] shadow-[0_7px_22px_rgba(0,0,0,0.12)] transition hover:bg-[#164f39] hover:text-white sm:right-3 lg:right-8"
          >
            <FiChevronRight className="size-5" />
          </button>
        </div>

        <div className="mt-1 flex justify-center gap-2" aria-label="Choose testimonial">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show testimonial ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-7 bg-[#00a651]"
                  : "w-2 bg-[#164f39]/25 hover:bg-[#164f39]/45"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
