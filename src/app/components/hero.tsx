"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { FiArrowRight, FiShoppingBag } from "react-icons/fi";

const products = [
    { src: "/assets/banana chips.png", name: "Banana Chips", label: "Golden & Crispy" },
    { src: "/assets/achappam.png", name: "Achappam", label: "Rose Cookies" },
    { src: "/assets/tapioca chips.png", name: "Tapioca Chips", label: "Crunchy Delight" },
    { src: "/assets/kuzhalappam.png", name: "Kuzhalappam", label: "Tube Snack" },
    { src: "/assets/avalose unda.png", name: "Avalose Unda", label: "Sweet Balls" },
    { src: "/assets/chammanthi podi.png", name: "Chammanthi Podi", label: "Coconut Chutney" },
    { src: "/assets/spicy masala roasted peanut.png", name: "Masala Peanuts", label: "Spicy & Crunchy" },
    { src: "/assets/tapioca chips sticks.png", name: "Tapioca Sticks", label: "Crispy Sticks" },
    { src: "/assets/sweet kolly.png", name: "Sweet Kolly", label: "Sweet Treat" },
    { src: "/assets/poopola.png", name: "Poopola", label: "Kerala Classic" },
];

// ── Geometry ────────────────────────────────────────────────────────────────
// Full circle (2R × 2R) is centred at the right screen edge (right: -R).
// Section overflow:hidden clips the right half → perfect D-shape.
// Arc angles (screen y-down):  90°=bottom  180°=leftmost/active  270°=top
// ────────────────────────────────────────────────────────────────────────────
const R = 460; // radius px

const subscribeToHydration = () => () => { };

// Angles inward from 90°/270° so top/bottom items are not cut off by screen boundaries
const ARC_ANGLES: Record<number, number> = {
    [-2]: 112,   // lower-arc edge
    [-1]: 146,   // lower-left side product
    [0]: 180,   // active product (leftmost point)
    [1]: 214,   // upper-left side product
    [2]: 248,   // upper-arc edge
};

function slotStyle(abs: number) {
    if (abs === 0) return { size: 250, blur: 0, opacity: 1.00, z: 5, scale: 1.00 };
    if (abs === 1) return { size: 115, blur: 1.5, opacity: 0.75, z: 4, scale: 0.80 };
    return { size: 75, blur: 2.5, opacity: 0.50, z: 3, scale: 0.65 };
}

export default function Hero() {
    const isHydrated = useSyncExternalStore(
        subscribeToHydration,
        () => true,
        () => false,
    );
    const [activeIdx, setActiveIdx] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const touchStartX = useRef<number | null>(null);
    const total = products.length;

    const resetInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setActiveIdx((previous) => (previous + 1) % total);
        }, 3000);
    };

    useEffect(() => {
        if (!isHydrated) return;

        resetInterval();

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isHydrated, total]);

    const handleSelect = (index: number) => {
        setActiveIdx(index);
        resetInterval();
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const diffX = e.changedTouches[0].clientX - touchStartX.current;
        if (diffX > 40) {
            handleSelect((activeIdx - 1 + total) % total);
        } else if (diffX < -40) {
            handleSelect((activeIdx + 1) % total);
        }
        touchStartX.current = null;
    };

    // ── Mobile 3-Product Slot Configuration (Signed Offset) ────────────────
    const mobileSlots = products.map((product, i) => {
        let raw = (i - activeIdx + total) % total;
        if (raw > total / 2) raw -= total;

        const isActive = raw === 0;
        const isLeft = raw === -1;
        const isRight = raw === 1;
        const isVisible = Math.abs(raw) <= 1;

        let leftPos = "50%";
        let scale = 1.05;
        let translateY = "-6px";
        let rotate = "0deg";
        let opacity = 1;
        let zIndex = 30;
        let filter = "drop-shadow(0 22px 28px rgba(0,0,0,0.55))";

        if (isLeft) {
            leftPos = "24%";
            scale = 0.72;
            translateY = "12px";
            rotate = "-6deg";
            opacity = 0.85;
            zIndex = 10;
            filter = "drop-shadow(0 10px 18px rgba(0,0,0,0.45)) brightness(0.9)";
        } else if (isRight) {
            leftPos = "76%";
            scale = 0.72;
            translateY = "12px";
            rotate = "6deg";
            opacity = 0.85;
            zIndex = 10;
            filter = "drop-shadow(0 10px 18px rgba(0,0,0,0.45)) brightness(0.9)";
        } else if (raw < -1) {
            leftPos = "-15%";
            scale = 0.45;
            translateY = "24px";
            rotate = "-12deg";
            opacity = 0;
            zIndex = 0;
        } else if (raw > 1) {
            leftPos = "115%";
            scale = 0.45;
            translateY = "24px";
            rotate = "12deg";
            opacity = 0;
            zIndex = 0;
        }

        return {
            i,
            product,
            isActive,
            isLeft,
            isRight,
            isVisible,
            leftPos,
            scale,
            translateY,
            rotate,
            opacity,
            zIndex,
            filter,
        };
    });

    // ── Build per-product data for Desktop D-Shape ──────────────────────────
    const productSlots = products.map((product, i) => {
        let raw = (i - activeIdx + total) % total;
        if (raw > total / 2) raw -= total;

        const isActive = raw === 0;
        const isVisible = Math.abs(raw) <= 2;

        const clamped = Math.max(-2, Math.min(2, raw));
        const angleDeg = ARC_ANGLES[clamped];
        const angleRad = (angleDeg * Math.PI) / 180;
        const style = slotStyle(Math.abs(raw));

        const cx = R + R * Math.cos(angleRad);
        const cy = R + R * Math.sin(angleRad);

        return { i, product, isActive, isVisible, style, cx, cy };
    });

    if (!isHydrated) {
        return (
            <section
                aria-hidden="true"
                className="relative min-h-[100svh] w-full overflow-hidden bg-[#04170d]"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,166,81,0.12),transparent_60%)]" />
            </section>
        );
    }

    return (
        <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#04170d] text-white">

            {/* Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-banana-chips.jpg"
                    alt="Kerala Snacks background"
                    fill priority quality={85}
                    className="object-cover object-center opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#03150c] via-[#03150c]/90 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03150c] via-transparent to-[#03150c]/40" />
            </div>

            {/* ── Mobile and tablet interactive showcase & hero content ── */}
            <div
                className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-4 pb-10 pt-28 text-center sm:pt-32 lg:hidden"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Main Heading */}
                <h1 className="order-none text-3xl font-black uppercase leading-tight tracking-tight sm:max-w-md sm:text-4xl">
                    Tradition in Every <span className="bg-gradient-to-r from-[#fb7185] via-[#fb923c] to-[#facc15] bg-clip-text text-transparent">Crunch</span>
                </h1>

                {/* Simple Caption */}
                <p className="order-4 mt-2 max-w-xs text-xs font-normal leading-relaxed text-emerald-100/85 sm:order-none sm:max-w-md sm:text-sm">
                    Handcrafted traditional Kerala snacks made with 100% natural ingredients, pure coconut oil, and authentic recipes passed down through generations.
                </p>

                {/* 2 CTA Buttons */}
                <div className="order-5 mt-5 flex w-full max-w-xs items-center justify-center gap-3 sm:order-none sm:max-w-sm">
                    <Link
                        href="/shop"
                        className="group flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00a651] to-[#00803d] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-900/40 transition-all duration-300 active:scale-95 sm:text-sm"
                    >
                        <span>Shop Now</span>
                        <FiShoppingBag className="h-3.5 w-3.5" />
                    </Link>

                    <Link
                        href="/aboutUs"
                        className="group flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-white/5 px-5 py-2.5 text-xs font-bold text-emerald-100 backdrop-blur-sm transition-all duration-300 hover:bg-emerald-500/15 active:scale-95 sm:text-sm"
                    >
                        <span>Our Story</span>
                        <FiArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>

                {/* 3D Stage Container */}
                <div className="relative order-1 my-4 flex h-[260px] w-full max-w-[440px] items-center justify-center overflow-hidden sm:order-none sm:h-[320px]">
                    {/* Background Radial Glow */}
                    <div className="absolute inset-6 rounded-full bg-[#00a651]/25 blur-3xl pointer-events-none" />

                    {/* Render all 10 products with stable keys & CSS transition */}
                    {mobileSlots.map((slot) => (
                        <div
                            key={slot.i}
                            onClick={() => handleSelect(slot.i)}
                            className="absolute top-1/2 cursor-pointer select-none"
                            style={{
                                width: "200px",
                                height: "250px",
                                marginTop: "-125px",
                                left: slot.leftPos,
                                opacity: slot.opacity,
                                zIndex: slot.zIndex,
                                filter: slot.filter,
                                transform: `translateX(-50%) translateY(${slot.translateY}) scale(${slot.scale}) rotate(${slot.rotate})`,
                                transition:
                                    "left 0.65s cubic-bezier(0.34, 1.25, 0.64, 1), transform 0.65s cubic-bezier(0.34, 1.25, 0.64, 1), opacity 0.5s ease, filter 0.5s ease, z-index 0.3s ease",
                                pointerEvents: slot.isVisible ? "auto" : "none",
                            }}
                        >
                            <div className="relative h-full w-full">
                                <Image
                                    src={slot.product.src}
                                    alt={slot.product.name}
                                    fill
                                    priority={slot.isActive}
                                    className="object-contain"
                                    sizes="240px"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Selected product label under stage */}
                <div className="order-2 flex flex-col items-center sm:order-none">
                    <p className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
                        {products[activeIdx].name}
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-emerald-200/80">
                        {products[activeIdx].label}
                    </p>
                </div>
            </div>

            {/* ── Desktop Hero Content & D-shaped Carousel ────────────────── */}
            <div className="relative z-20 hidden min-h-[100svh] w-full items-center px-8 pb-10 pt-36 lg:flex xl:px-16 xl:pt-40 2xl:px-24">
                {/* Left-Side Hero Text & CTAs */}
                <div className="max-w-xl py-12">
                    {/* Main Heading */}
                    <h1 className="text-4xl font-black uppercase leading-[1.1] tracking-tight text-white xl:text-5xl 2xl:text-6xl">
                        Tradition in Every <span className="bg-gradient-to-r from-[#fb7185] via-[#fb923c] to-[#facc15] bg-clip-text text-transparent">Crunch</span>
                    </h1>

                    {/* Simple Caption */}
                    <p className="mt-4 text-base leading-relaxed text-emerald-100/85 sm:text-lg">
                        Handcrafted traditional Kerala snacks made with 100% natural ingredients, pure coconut oil, and authentic recipes passed down through generations.
                    </p>

                    {/* 2 CTA Buttons */}
                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Link
                            href="/shop"
                            className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#00a651] to-[#00803d] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/40 transition-all duration-300 hover:scale-105 hover:shadow-emerald-600/40 hover:brightness-110 active:scale-95"
                        >
                            <span>Shop Now</span>
                            <FiShoppingBag className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Link>

                        <Link
                            href="/aboutUs"
                            className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-emerald-500/30 bg-white/5 px-8 py-3.5 text-sm font-bold text-emerald-100 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-500/15 hover:text-white active:scale-95"
                        >
                            <span>Our Story</span>
                            <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {/* Trust Highlights */}
                    <div className="mt-10 flex items-center gap-6 border-t border-emerald-900/50 pt-6">
                        <div className="flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold">🌿</span>
                            <span className="text-xs font-medium text-emerald-200/90">100% Natural</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold">🥥</span>
                            <span className="text-xs font-medium text-emerald-200/90">Pure Coconut Oil</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold">✨</span>
                            <span className="text-xs font-medium text-emerald-200/90">No Preservatives</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* D-shaped half-circle (Desktop Layout Carousel) */}
            <div
                className="absolute z-10 hidden lg:block"
                style={{
                    width: R * 2,
                    height: R * 2,
                    right: -R - 30,
                    top: "50%",
                    transform: "translateY(-50%)",
                }}
            >
                {/* Outer arc ring */}
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: "radial-gradient(circle at center, rgba(0,166,81,0.07) 0%, rgba(0,166,81,0.025) 55%, transparent 72%)",
                        border: "1.5px solid rgba(0,166,81,0.22)",
                    }}
                />
                {/* Inner concentric ring */}
                <div
                    className="absolute rounded-full"
                    style={{ inset: R * 0.16, border: "1px solid rgba(0,166,81,0.11)" }}
                />

                {/* All products — desktop */}
                {productSlots.map(({ i, product, isActive, isVisible, style, cx, cy }) => (
                    <div
                        key={i}
                        onClick={() => handleSelect(i)}
                        className="absolute cursor-pointer"
                        style={{
                            width: style.size,
                            height: style.size,
                            left: cx - style.size / 2,
                            top: cy - style.size / 2,
                            zIndex: style.z,
                            opacity: !isVisible ? 0 : style.opacity,
                            filter: style.blur > 0 ? `blur(${style.blur}px)` : undefined,
                            transform: `scale(${style.scale})`,
                            transition: "left 0.65s cubic-bezier(0.4,0,0.2,1), top 0.65s cubic-bezier(0.4,0,0.2,1), opacity 0.55s ease, transform 0.65s ease, filter 0.65s ease",
                            pointerEvents: isVisible ? "auto" : "none",
                        }}
                    >
                        {isActive && (
                            <div
                                className="absolute inset-0 rounded-full pointer-events-none"
                                style={{
                                    background: "radial-gradient(circle, rgba(0,166,81,0.32) 0%, transparent 68%)",
                                    transform: "scale(1.55)",
                                    transition: "opacity 0.55s ease",
                                }}
                            />
                        )}

                        <div
                            className="relative w-full h-full"
                            style={{
                                filter: isActive
                                    ? "drop-shadow(0 0 26px rgba(0,166,81,0.6)) drop-shadow(0 12px 24px rgba(0,0,0,0.55))"
                                    : "drop-shadow(0 6px 14px rgba(0,0,0,0.45))",
                                transition: "filter 0.55s ease",
                            }}
                        >
                            <Image
                                src={product.src}
                                alt={product.name}
                                fill
                                className="object-contain"
                                sizes="300px"
                            />
                        </div>

                        {isActive && (
                            <div
                                className="absolute left-1/2 flex flex-col items-center pointer-events-none"
                                style={{
                                    bottom: -36,
                                    transform: "translateX(-50%)",
                                    animation: "heroFadeIn 0.45s ease forwards",
                                }}
                            >
                                <span className="whitespace-nowrap rounded-full bg-[#00a651]/90 px-4 py-1 text-[11px] font-bold text-white shadow-lg backdrop-blur-sm">
                                    {product.name}
                                </span>
                                <span className="mt-1 text-[10px] text-emerald-300/80 whitespace-nowrap font-medium">
                                    {product.label}
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </section>
    );
}
