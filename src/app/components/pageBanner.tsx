import Image from "next/image";

export default function PageBanner({ title, mobileImage }: { title: string; mobileImage?: string }) {
  return (
    <section aria-labelledby="page-banner-heading" className={`relative z-10 ${mobileImage ? "aspect-[1122/963] sm:aspect-auto" : "min-h-[48svh]"} overflow-hidden rounded-b-[2.5rem] bg-[#f3e7d7] shadow-[0_18px_30px_-14px_rgba(36,45,22,0.35)] sm:min-h-[52svh] sm:rounded-b-[4rem] lg:min-h-[56svh] lg:rounded-b-[6rem]`}>
      <h1 id="page-banner-heading" className={`absolute inset-x-0 ${mobileImage ? "top-[25%] text-[2.625rem] sm:top-[30%]" : "top-[30%] text-4xl"} z-10 px-5 text-center font-semibold tracking-tight text-[#243f1b] sm:text-5xl lg:text-6xl`}>{title}</h1>
      <picture>
        {mobileImage && <source media="(width < 640px)" srcSet={mobileImage} />}
        <Image
        src="/assets/banner about.jpeg"
        alt="Traditional Kerala snacks arranged in wooden bowls on a table"
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center"
        />
      </picture>
    </section>
  );
}
