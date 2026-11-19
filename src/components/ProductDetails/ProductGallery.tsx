"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  title: string;
  hasDiscount?: boolean;
  discountPercentage?: number;
}

export default function ProductGallery({
  images,
  title,
  hasDiscount = false,
  discountPercentage = 0,
}: ProductGalleryProps) {
  const galleryImages = images.length > 0 ? images : ["/placeholder.png"];
  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  return (
    <div className="lg:col-span-5 flex flex-col gap-4">
      <div className="relative w-full aspect-square bg-white rounded-2xl border border-slate-200/80 overflow-hidden flex items-center justify-center p-6 shadow-xs">
        {hasDiscount && (
          <span className="absolute top-4 left-4 z-10 text-xs font-black bg-rose-500 text-white px-2.5 py-1 rounded-full shadow-sm tracking-wide">
            {discountPercentage}% OFF
          </span>
        )}

        <Image
          src={activeImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-contain p-4 mix-blend-multiply transition-all duration-300"
        />
      </div>

      {galleryImages.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {galleryImages.map((img, idx) => {
            const isSelected = activeImage === img;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(img)}
                aria-label={`View image ${idx + 1}`}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white border-2 overflow-hidden shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? "border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs"
                    : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${title} thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain p-1"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
