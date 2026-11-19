import React from "react";

export default function CarouselLoading() {
  return (
    <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-3 sm:py-5">
      <div className="relative w-full h-[260px] sm:h-[320px] md:h-[360px] lg:h-[400px] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-800/90 via-emerald-700/80 to-emerald-800/90 shadow-md flex flex-col justify-center px-8 sm:px-14 md:px-20 lg:px-24 animate-pulse">
        <div className="max-w-xl space-y-3 sm:space-y-4">
          <div className="h-7 sm:h-9 md:h-11 w-4/5 bg-white/25 rounded-xl" />
          <div className="h-7 sm:h-9 md:h-11 w-3/5 bg-white/20 rounded-xl" />

          <div className="h-3.5 sm:h-4.5 w-1/2 bg-white/15 rounded-lg mt-2" />

          <div className="flex items-center gap-3 pt-2 sm:pt-4">
            <div className="h-8 sm:h-10 w-24 sm:w-28 bg-white/90 rounded-lg shadow-xs" />
            <div className="h-8 sm:h-10 w-24 sm:w-28 bg-white/15 rounded-lg border border-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
