"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

const packets = [
  { src: "/assets/banana chips.png", name: "Banana Chips", x: "-39vw", y: "-22vh", mx: "-38vw", my: "-25vh", rotate: "-18deg", mobileScale: ".76", scale: "1.02" },
  { src: "/assets/achappam.png", name: "Achappam", x: "39vw", y: "-22vh", mx: "38vw", my: "-24vh", rotate: "17deg", mobileScale: ".73", scale: ".98" },
  { src: "/assets/tapioca chips.png", name: "Tapioca Chips", x: "-43vw", y: "8vh", mx: "-40vw", my: "7vh", rotate: "12deg", mobileScale: ".72", scale: ".92" },
  { src: "/assets/kuzhalappam.png", name: "Kuzhalappam", x: "43vw", y: "8vh", mx: "40vw", my: "8vh", rotate: "-13deg", mobileScale: ".72", scale: ".94" },
  { src: "/assets/avalose unda.png", name: "Avalose Unda", x: "-33vw", y: "34vh", mx: "-30vw", my: "31vh", rotate: "-25deg", mobileScale: ".66", scale: ".86" },
  { src: "/assets/chammanthi podi.png", name: "Chammanthi Podi", x: "33vw", y: "34vh", mx: "30vw", my: "31vh", rotate: "23deg", mobileScale: ".66", scale: ".86" },
  { src: "/assets/spicy masala roasted peanut.png", name: "Masala Peanuts", x: "-14vw", y: "-39vh", mx: "-13vw", my: "-38vh", rotate: "9deg", mobileScale: ".6", scale: ".78" },
  { src: "/assets/tapioca chips sticks.png", name: "Tapioca Sticks", x: "15vw", y: "-39vh", mx: "14vw", my: "-38vh", rotate: "-8deg", mobileScale: ".6", scale: ".78" },
  { src: "/assets/chammanthi podi.png", name: "Kerala Chammanthi", x: "0vw", y: "42vh", mx: "0vw", my: "39vh", rotate: "8deg", mobileScale: ".58", scale: ".72" },
];

type PacketStyle = CSSProperties & Record<`--${string}`, string | number>;

export default function Hero() {
  const [split, setSplit] = useState(false);

  useEffect(() => {
    const splitTimer = setTimeout(() => setSplit(true), 2250);
    return () => clearTimeout(splitTimer);
  }, []);

  return (
    <section aria-label="Appai Foods hero" className={`hero-packet-stage relative min-h-[100svh] w-full overflow-hidden bg-[#e8f3e9] text-[#003820] ${split ? "is-split" : "is-stacked"}`}>
      <style jsx global>{`
        .hero-packet-stage::before { content:""; position:absolute; inset:0; background:radial-gradient(circle at 50% 46%,rgba(255,255,255,.95) 0 18%,rgba(222,240,225,.65) 42%,rgba(0,136,70,.1) 100%); }
        .hero-packet-stage::after { content:""; position:absolute; inset:0; opacity:.28; background-image:radial-gradient(rgba(0,56,32,.16) .65px,transparent .65px); background-size:7px 7px; mask-image:linear-gradient(to bottom,transparent,black 24%,black 76%,transparent); }
        .hero-packet { position:absolute; left:50%; top:50%; width:clamp(92px,20vw,150px); aspect-ratio:3/4; transform:translate(-50%,-50%) rotate(-360deg) scale(.9); opacity:0; filter:drop-shadow(0 20px 24px rgba(0,56,32,.22)); transition:transform 1.45s cubic-bezier(.16,1,.3,1),opacity .55s ease; transition-delay:var(--delay); will-change:transform,opacity; }
        .hero-packet:first-child { opacity:1; z-index:20; transform:translate(-50%,-50%) rotate(-12deg) scale(1.2); animation:leadPacketFloat 1.8s ease-in-out infinite alternate; }
        .is-split .hero-packet { opacity:1; animation:none; transform:translate(calc(-50% + var(--mx)),calc(-50% + var(--my))) rotate(var(--rotate)) scale(var(--mobile-scale)); }
        .hero-center-copy { opacity:0; transform:translateY(28px) scale(.96); transition:opacity .8s ease 1.15s,transform 1s cubic-bezier(.16,1,.3,1) 1.15s; }
        .is-split .hero-center-copy { opacity:1; transform:translateY(0) scale(1); }
        @keyframes leadPacketFloat { from { transform:translate(-50%,-52%) rotate(-9deg) scale(1.15) } to { transform:translate(-50%,-48%) rotate(9deg) scale(1.22) } }
        @media (min-width:768px) {
          .hero-packet { width:clamp(150px,15vw,245px); }
          .is-split .hero-packet { transform:translate(calc(-50% + var(--x)),calc(-50% + var(--y))) rotate(var(--rotate)) scale(var(--scale)); }
        }
        @media (max-width:639px) and (max-height:720px) {
          .hero-packet { width:82px; }
          .is-split .hero-packet { transform:translate(calc(-50% + var(--mx)),calc(-50% + var(--my))) rotate(var(--rotate)) scale(.55); }
        }
        @media (prefers-reduced-motion:reduce) {
          .hero-packet,.hero-center-copy { transition-duration:.01ms; transition-delay:0ms; }
          .hero-packet:first-child { animation:none; }
        }
      `}</style>

      <div aria-hidden="true" className="absolute inset-0 z-10">
        {packets.map((packet, index) => {
          const style: PacketStyle = {
            "--x": packet.x,
            "--y": packet.y,
            "--mx": packet.mx,
            "--my": packet.my,
            "--rotate": packet.rotate,
            "--mobile-scale": packet.mobileScale,
            "--scale": packet.scale,
            "--delay": `${index === 0 ? 0 : 90 + index * 75}ms`,
            zIndex: 20 - index,
          };
          return (
            <div key={`${packet.name}-${index}`} className={`hero-packet ${index > 5 ? "hidden sm:block" : ""}`} style={style}>
              <Image src={packet.src} alt="" fill priority={index === 0} sizes="(max-width: 767px) 150px, 245px" className="object-contain" />
            </div>
          );
        })}
      </div>

      <div className="relative z-20 flex min-h-[100svh] items-center justify-center px-5 pb-16 pt-32 sm:px-8 sm:pb-20">
        <div className="hero-center-copy max-w-[720px] text-center">
          <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.32em] text-[#008846] sm:text-xs">From Kerala, with crunch</p>
          <h1 className="text-[clamp(2.8rem,9vw,7.6rem)] font-black uppercase leading-[.82] tracking-[-0.055em] text-[#003820]">
            Truly Kerala
            <span className="mt-3 block -rotate-2 bg-[#008846] px-4 py-3 text-[#f5f1df] sm:mt-5 sm:px-8">Truly Delicious</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-xs font-medium leading-6 text-[#345f49] sm:mt-8 sm:text-base sm:leading-7">Authentic snacks, time-honoured recipes, and the unmistakable taste of home in every packet.</p>
          <Link href="/shop" className="group mt-7 inline-flex min-h-13 items-center justify-center gap-3 rounded-full bg-[#003820] px-7 text-sm font-bold uppercase tracking-wider text-white shadow-[0_14px_35px_rgba(0,56,32,.24)] transition hover:-translate-y-1 hover:bg-[#008846] sm:mt-9 sm:min-h-14 sm:px-9">
            Taste the tradition <FiArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-30 h-px w-20 -translate-x-1/2 bg-[#003820]/25 sm:bottom-8" />
    </section>
  );
}
