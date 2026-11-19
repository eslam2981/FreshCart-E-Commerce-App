import React from "react";
import { Sparkles, Home, ChevronRight } from "lucide-react";
import BrandsLoading from "@/components/Brands/BrandsLoading";

export default function BrandsPageLoading() {
  return (
    <div className="w-full bg-slate-50/50 min-h-screen pb-16">
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-white">
        <div className="max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-14">
          <nav
            className="flex items-center gap-2 text-xs sm:text-sm text-white/80 mb-6 font-medium"
            aria-label="Breadcrumb"
          >
            <span className="flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-white/60" />
            <span className="text-white font-semibold">Brands</span>
          </nav>

          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shadow-lg ring-1 ring-white/30 shrink-0">
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                All Brands
              </h1>
              <p className="text-xs sm:text-sm text-white/90 mt-1 font-medium">
                Shop authentic products from top international and local brands
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-12">
        <BrandsLoading />
      </div>
    </div>
  );
}
