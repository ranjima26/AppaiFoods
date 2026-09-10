"use client";

import Image from "next/image";

export default function WhyAppai() {
  return (
    <section className="relative flex min-h-0 w-full items-center overflow-hidden border-b border-gray-100 bg-[#faf8f5] px-5 py-16 sm:min-h-[750px] sm:px-8 sm:py-20 lg:px-12 xl:px-20">
      {/* Snack-Themed Ambient Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,166,81,0.07),transparent_70%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 size-[400px] bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.06),transparent_65%)]" />
      </div>

      {/* Left Peeking Bowl (Achappam Bowl) */}
      <div className="absolute -left-40 top-1/2 z-10 size-[280px] -translate-y-1/2 opacity-25 pointer-events-none sm:-left-36 sm:size-[440px] sm:opacity-100 lg:-left-44 lg:size-[520px]">
        <Image
          src="/achappam-bowl.png"
          alt="Achappam Bowl"
          fill
          className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.18)]"
        />
      </div>

      {/* Right Peeking Bowl (Banana Chips Bowl) */}
      <div className="absolute -right-40 top-1/2 z-10 size-[280px] -translate-y-1/2 opacity-25 pointer-events-none sm:-right-36 sm:size-[440px] sm:opacity-100 lg:-right-44 lg:size-[520px]">
        <Image
          src="/banana-chips-bowl.png"
          alt="Banana Chips Bowl"
          fill
          className="object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.18)]"
        />
      </div>

      {/* Floating Animated Single Snack Pieces (Rich Floating Shower) */}
      {/* 1. Floating Achappam Top Outer Left */}
      <div className="absolute left-[8%] top-[6%] size-10 sm:size-14 md:size-20 pointer-events-none z-10 animate-float-slow opacity-45 md:opacity-90">
        <Image
          src="/achappam.png"
          alt="Achappam Cookie"
          fill
          className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.14)] -rotate-12"
        />
      </div>

      {/* 2. Floating Banana Chip Top Mid-Left */}
      <div className="absolute left-[18%] top-[12%] size-16 sm:size-20 pointer-events-none z-10 animate-float-spin hidden md:block">
        <Image
          src="/single-chip.png"
          alt="Single Banana Chip"
          fill
          className="object-contain drop-shadow-md rotate-12"
        />
      </div>

      {/* 3. Floating Achappam Top Center-Left */}
      <div className="absolute left-[29%] top-[7%] size-12 sm:size-15 pointer-events-none z-10 animate-float-reverse hidden lg:block opacity-80">
        <Image
          src="/achappam.png"
          alt="Achappam Cookie"
          fill
          className="object-contain drop-shadow-md rotate-45"
        />
      </div>

      {/* 4. Floating Banana Chip Top Center-Right */}
      <div className="absolute right-[29%] top-[8%] size-12 sm:size-15 pointer-events-none z-10 animate-float-slow hidden lg:block opacity-80">
        <Image
          src="/single-chip.png"
          alt="Single Banana Chip"
          fill
          className="object-contain drop-shadow-md -rotate-30"
        />
      </div>

      {/* 5. Floating Achappam Top Mid-Right */}
      <div className="absolute right-[18%] top-[14%] size-16 sm:size-20 pointer-events-none z-10 animate-float-reverse hidden md:block">
        <Image
          src="/achappam.png"
          alt="Single Achappam"
          fill
          className="object-contain drop-shadow-md -rotate-12"
        />
      </div>

      {/* 6. Floating Banana Chip Top Outer Right */}
      <div className="absolute right-[8%] top-[6%] size-10 sm:size-14 md:size-20 pointer-events-none z-10 animate-float-spin opacity-45 md:opacity-90">
        <Image
          src="/single-chip.png"
          alt="Single Banana Chip"
          fill
          className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.14)] rotate-25"
        />
      </div>

      {/* 7. Floating Achappam Mid Left */}
      <div className="absolute left-[24%] top-[46%] size-14 sm:size-18 pointer-events-none z-10 animate-float-slow hidden lg:block opacity-75">
        <Image
          src="/achappam.png"
          alt="Achappam Cookie"
          fill
          className="object-contain drop-shadow-md -rotate-45"
        />
      </div>

      {/* 8. Floating Banana Chip Mid Right */}
      <div className="absolute right-[24%] top-[46%] size-14 sm:size-18 pointer-events-none z-10 animate-float-reverse hidden lg:block opacity-75">
        <Image
          src="/single-chip.png"
          alt="Single Banana Chip"
          fill
          className="object-contain drop-shadow-md rotate-60"
        />
      </div>

      {/* 9. Floating Banana Chip Bottom Left */}
      <div className="absolute left-[12%] bottom-[8%] size-10 sm:left-[16%] sm:size-12 md:left-[20%] md:bottom-[10%] md:size-17 pointer-events-none z-10 animate-float-reverse opacity-45 md:opacity-100">
        <Image
          src="/single-chip.png"
          alt="Single Banana Chip"
          fill
          className="object-contain drop-shadow-md -rotate-45"
        />
      </div>

      {/* 10. Floating Achappam Bottom Center-Left */}
      <div className="absolute left-[31%] bottom-[6%] size-12 sm:size-15 pointer-events-none z-10 animate-float-spin hidden lg:block opacity-80">
        <Image
          src="/achappam.png"
          alt="Achappam Cookie"
          fill
          className="object-contain drop-shadow-md rotate-15"
        />
      </div>

      {/* 11. Floating Banana Chip Bottom Center-Right */}
      <div className="absolute right-[31%] bottom-[6%] size-12 sm:size-15 pointer-events-none z-10 animate-float-slow hidden lg:block opacity-80">
        <Image
          src="/single-chip.png"
          alt="Single Banana Chip"
          fill
          className="object-contain drop-shadow-md -rotate-20"
        />
      </div>

      {/* 12. Floating Achappam Bottom Right */}
      <div className="absolute right-[12%] bottom-[10%] size-10 sm:right-[16%] sm:size-12 md:right-[20%] md:bottom-[12%] md:size-17 pointer-events-none z-10 animate-float-slow opacity-45 md:opacity-100">
        <Image
          src="/achappam.png"
          alt="Single Achappam"
          fill
          className="object-contain drop-shadow-md rotate-45"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 mx-auto w-full max-w-[1280px]">
        {/* Title Header (Matching 2nd Picture Pattern) */}
        <div className="mb-10 flex flex-col items-center space-y-1 text-center sm:mb-14">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#00a651]">
            WHY CHOOSE
          </span>
          <h2 className="text-3xl font-black uppercase leading-[1.05] tracking-tight text-gray-900 min-[375px]:text-4xl sm:text-5xl lg:text-6xl">
            APPAI FOODS
          </h2>
        </div>

        {/* Staggered Grid Layout (Matching Reference Screenshot) */}
        <div className="mx-auto max-w-4xl space-y-8 sm:space-y-12">
          {/* Row 1: Left Pill -> Right Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 sm:gap-8">
            {/* Left Pill Badge */}
            <div className="flex justify-center md:justify-end">
              <div className="bg-white rounded-2xl px-7 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-gray-100/90 text-center min-w-[260px] sm:min-w-[300px] transition-all hover:scale-105">
                <span className="text-base sm:text-lg font-bold text-[#006d3b]">
                  100% Pure Coconut Oil
                </span>
              </div>
            </div>
            {/* Right Description */}
            <div className="text-center md:text-left">
              <p className="text-xs sm:text-sm font-medium text-gray-500 max-w-xs mx-auto md:mx-0 leading-relaxed">
                Handcrafted Kettle-Cooked Snacks Prepared Only In 100% Cold-Pressed Coconut Oil.
              </p>
            </div>
          </div>

          {/* Row 2: Left Text -> Right Pill */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 sm:gap-8">
            {/* Left Description */}
            <div className="text-center md:text-right order-2 md:order-1">
              <p className="text-xs sm:text-sm font-medium text-gray-500 max-w-xs mx-auto md:ml-auto md:mr-0 leading-relaxed">
                Sealed Immediately After Frying To Lock In Natural Aroma, Taste, And Maximum Crunch.
              </p>
            </div>
            {/* Right Pill Badge */}
            <div className="flex justify-center md:justify-start order-1 md:order-2">
              <div className="bg-white rounded-2xl px-7 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-gray-100/90 text-center min-w-[260px] sm:min-w-[300px] transition-all hover:scale-105">
                <span className="text-base sm:text-lg font-bold text-[#006d3b]">
                  Freshly Packed Daily
                </span>
              </div>
            </div>
          </div>

          {/* Row 3: Left Pill -> Right Text */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 sm:gap-8">
            {/* Left Pill Badge */}
            <div className="flex justify-center md:justify-end">
              <div className="bg-white rounded-2xl px-7 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-gray-100/90 text-center min-w-[260px] sm:min-w-[300px] transition-all hover:scale-105">
                <span className="text-base sm:text-lg font-bold text-[#006d3b]">
                  No Preservatives
                </span>
              </div>
            </div>
            {/* Right Description */}
            <div className="text-center md:text-left">
              <p className="text-xs sm:text-sm font-medium text-gray-500 max-w-xs mx-auto md:mx-0 leading-relaxed">
                Only Pure Natural Ingredients. Zero Chemicals. Zero Artificial Flavorings Or Colors.
              </p>
            </div>
          </div>

          {/* Row 4: Left Text -> Right Pill */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4 sm:gap-8">
            {/* Left Description */}
            <div className="text-center md:text-right order-2 md:order-1">
              <p className="text-xs sm:text-sm font-medium text-gray-500 max-w-xs mx-auto md:ml-auto md:mr-0 leading-relaxed">
                Made From Heritage Recipes Passed Down Through Generations Of Authentic Village Kitchens.
              </p>
            </div>
            {/* Right Pill Badge */}
            <div className="flex justify-center md:justify-start order-1 md:order-2">
              <div className="bg-white rounded-2xl px-7 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-gray-100/90 text-center min-w-[260px] sm:min-w-[300px] transition-all hover:scale-105">
                <span className="text-base sm:text-lg font-bold text-[#006d3b]">
                  Traditional Village Recipes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
