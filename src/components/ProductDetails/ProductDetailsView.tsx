"use client";

import React from "react";
import { Product } from "@/interfaces/product";
import { Sparkles } from "lucide-react";
import RatingStars from "@/components/ui/RatingStars";
import ProductGallery from "./ProductGallery";
import ProductPurchaseSection from "./ProductPurchaseSection";
import ProductGuarantees from "./ProductGuarantees";
import ProductReviews from "./ProductReviews";

interface ProductDetailsViewProps {
  product: Product;
}

export default function ProductDetailsView({ product }: ProductDetailsViewProps) {
  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.imageCover];

  const hasDiscount =
    Boolean(product.priceAfterDiscount) &&
    (product.priceAfterDiscount as number) < product.price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - (product.priceAfterDiscount as number)) /
          product.price) *
          100
      )
    : 0;

  const currentPrice = hasDiscount
    ? (product.priceAfterDiscount as number)
    : product.price;

  return (
    <>
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-8 lg:p-10 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <ProductGallery
          images={galleryImages}
          title={product.title}
          hasDiscount={hasDiscount}
          discountPercentage={discountPercentage}
        />

        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {product.category?.name && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                  {product.category.name}
                </span>
              )}
              {product.brand?.name && (
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/80">
                  Brand: {product.brand.name}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mt-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <RatingStars rating={product.ratingsAverage || 0} />
                <span className="text-sm font-bold text-slate-800">
                  {product.ratingsAverage}
                </span>
                <span className="text-xs text-slate-400">
                  ({product.ratingsQuantity || 0} reviews)
                </span>
              </div>

              <span className="h-4 w-px bg-slate-200" aria-hidden="true" />

              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                🔥 {product.sold || 0} sold
              </span>
            </div>

            <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {currentPrice}{" "}
                  <span className="text-base sm:text-lg font-semibold text-slate-600">
                    EGP
                  </span>
                </span>

                {hasDiscount && (
                  <span className="text-base sm:text-lg text-slate-400 font-medium line-through">
                    {product.price} EGP
                  </span>
                )}
              </div>

              {hasDiscount && (
                <div className="mt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    You save {product.price - (product.priceAfterDiscount as number)} EGP ({discountPercentage}%)
                  </span>
                </div>
              )}
            </div>

            <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed">
              {product.description}
            </p>

            <ProductPurchaseSection
              productId={product._id}
              currentPrice={currentPrice}
              maxStock={product.quantity}
            />

            <ProductGuarantees />
          </div>
        </div>
      </div>
    </div>

    <ProductReviews productId={product._id} />
  </>
);
}
