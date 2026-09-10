import Image from "next/image";

const sisterConcerns = [
  {
    name: "CS Builders",
    logo: "/APPAI LOGO-4.png",
    imageClassName: "scale-[1.45]",
  },
  {
    name: "Appai Foods",
    logo: "/APPAI LOGO-5.png",
    imageClassName: "scale-[2]",
  },
];

export default function SisterConcerns() {
  return (
    <section className="bg-white px-3 py-4 sm:px-5 sm:py-5">
      <div className="relative mx-auto max-w-[1512px] overflow-hidden rounded-[1.75rem] border border-[#164f39]/5 bg-[linear-gradient(115deg,#eaf4ed_0%,#f1f2ef_55%,#e4ebe7_100%)] px-5 py-8 text-center sm:rounded-[2rem] sm:px-8 sm:py-10 lg:py-12">
        <div className="pointer-events-none absolute -left-20 -top-24 size-56 rounded-full border border-[#164f39]/10" />
        <div className="pointer-events-none absolute -left-12 -top-16 size-40 rounded-full border border-[#164f39]/10" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 size-60 rounded-full border border-[#b49b3b]/15" />
        <div className="pointer-events-none absolute -bottom-14 -right-8 size-40 rounded-full border border-[#b49b3b]/15" />

        <div className="relative z-10 mx-auto mb-3 flex w-24 items-center gap-2" aria-hidden="true">
          <span className="h-px flex-1 bg-[#164f39]/25" />
          <span className="size-2 rotate-45 border border-[#b49b3b] bg-white/60" />
          <span className="h-px flex-1 bg-[#164f39]/25" />
        </div>

        <h2 className="relative z-10 font-serif text-3xl font-bold leading-tight text-[#164f39] sm:text-4xl lg:text-[2.75rem]">
          Our Growing Family
        </h2>

        <p className="relative z-10 mx-auto mt-3 max-w-2xl text-sm font-medium leading-6 text-[#52645b] sm:text-base">
          Growing together through businesses built on trust, quality, and care.
        </p>

        <div className="relative mt-6 flex flex-col items-center justify-center gap-5 sm:mt-7 sm:flex-row sm:gap-8">
          <div className="pointer-events-none absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#b49b3b]/55 to-transparent sm:inset-y-auto sm:top-1/2 sm:h-px sm:w-24 sm:bg-gradient-to-r" />
          <span className="pointer-events-none absolute left-1/2 top-1/2 z-20 size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-[#b49b3b] bg-[#edf2ed]" aria-hidden="true" />
          {sisterConcerns.map((concern) => (
            <div
              key={concern.name}
              className="relative z-10 h-24 w-full max-w-[210px] overflow-hidden rounded-xl border border-[#164f39]/10 bg-white/95 shadow-[0_8px_24px_rgba(22,79,57,0.09)] sm:h-28 sm:w-[220px]"
            >
              <Image
                src={concern.logo}
                alt={`${concern.name} logo`}
                fill
                sizes="240px"
                className={`object-contain ${concern.imageClassName}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
