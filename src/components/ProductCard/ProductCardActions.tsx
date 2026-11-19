"use client";

import React from "react";
import { Heart, RefreshCw, Eye } from "lucide-react";

interface ProductCardActionsProps {
  isWishlisted: boolean;
  onToggleWishlist: (e: React.MouseEvent) => void;
}

export default function ProductCardActions({
  isWishlisted,
  onToggleWishlist,
}: ProductCardActionsProps) {
  return (
    <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
      <button
        type="button"
        onClick={onToggleWishlist}
        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-label="Wishlist"
        className={`w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-white border shadow-xs flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer hover:scale-105 ${
          isWishlisted
            ? "text-rose-600 border-rose-300 bg-rose-50/70"
            : "text-slate-700 border-slate-200 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50/50 hover:shadow-sm"
        }`}
      >
        <Heart
          className={`w-4.5 h-4.5 transition-colors ${
            isWishlisted ? "fill-rose-500 stroke-rose-500" : "stroke-[2.2]"
          }`}
        />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        title="Compare"
        aria-label="Compare"
        className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-sm transition-all duration-200 active:scale-90 cursor-pointer hover:scale-105"
      >
        <RefreshCw className="w-4 h-4 stroke-[2.2]" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        title="Quick view"
        aria-label="Quick view"
        className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50/50 hover:shadow-sm transition-all duration-200 active:scale-90 cursor-pointer hover:scale-105"
      >
        <Eye className="w-4.5 h-4.5 stroke-[2.2]" />
      </button>
    </div>
  );
}
