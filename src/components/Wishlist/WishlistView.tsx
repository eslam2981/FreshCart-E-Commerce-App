"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, MoveRight, Star, Loader2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import WishlistSkeleton from "./WishlistSkeleton";
import { toast } from "@/components/ui/toast";

export default function WishlistView() {
  const { wishlistItems, wishlistCount, isLoading, removeFromWishlist } = useWishlist();
  const [removingId, setRemovingId] = useState<string | null>(null);

  const handleRemove = async (productId: string) => {
    setRemovingId(productId);
    const success = await removeFromWishlist(productId);
    setRemovingId(null);

    if (success) {
      toast.add({
        type: "success",
        description: "Removed from your wishlist.",
        timeout: 2500,
      });
    } else {
      toast.add({
        type: "error",
        description: "Failed to remove item. Please try again.",
        timeout: 3000,
      });
    }
  };

  // Loading skeleton
  if (isLoading && wishlistItems.length === 0) {
    return <WishlistSkeleton />;
  }

  // Empty state
  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 text-center bg-slate-50/60">
        <div className="w-20 h-20 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mb-5 shadow-xs">
          <Heart className="w-10 h-10 stroke-[1.8]" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Your Wishlist is Empty</h2>
        <p className="text-sm text-slate-500 max-w-sm mb-8 leading-relaxed">
          Explore our fresh products and save your favorites to buy them anytime later!
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm px-6 py-3.5 rounded-2xl transition-all shadow-md shadow-emerald-600/20 active:scale-95"
        >
          <span>Explore Products</span>
          <MoveRight className="w-4 h-4 stroke-[2.2]" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 py-8 sm:py-12">
      <div className="max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between mb-8 pb-5 border-b border-slate-200/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-rose-500 stroke-rose-500" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">My Wishlist</h1>
              <p className="text-xs text-slate-400">
                You have <span className="font-bold text-slate-700">{wishlistCount}</span> {wishlistCount === 1 ? "item" : "items"} saved for later
              </p>
            </div>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 hover:underline"
          >
            <span>Continue Shopping</span>
            <MoveRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => {
            const productId = product._id || product.id;
            const isRemoving = removingId === productId;
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

            return (
              <div
                key={productId}
                className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200/90 hover:border-emerald-500 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="relative aspect-square w-full rounded-2xl bg-white border border-slate-200/90 overflow-hidden mb-4 p-3 flex items-center justify-center group-hover:border-emerald-200 transition-colors">
                  <button
                    type="button"
                    onClick={() => handleRemove(productId)}
                    disabled={isRemoving}
                    className="absolute top-2.5 right-2.5 z-10 w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs border border-slate-300 hover:border-rose-300 text-slate-500 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-all duration-200 shadow-sm active:scale-90 cursor-pointer disabled:opacity-50"
                    title="Remove from Wishlist"
                    aria-label="Remove from Wishlist"
                  >
                    {isRemoving ? (
                      <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
                    ) : (
                      <Trash2 className="w-4 h-4 stroke-[2]" />
                    )}
                  </button>

                  {hasDiscount && (
                    <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                      <span className="bg-rose-500 text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs tracking-tight">
                        -{discountPercentage}%
                      </span>
                    </div>
                  )}

                  <Link
                    href={`/products/${productId}`}
                    className="relative w-full h-full block"
                  >
                    {product.imageCover ? (
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain p-1.5 mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                        No Image
                      </div>
                    )}
                  </Link>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-2">
                      <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md uppercase tracking-wider text-[10px]">
                        {product.category?.name || "Grocery"}
                      </span>
                      {product.ratingsAverage ? (
                        <div className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                          <span>{product.ratingsAverage}</span>
                        </div>
                      ) : null}
                    </div>

                    <Link
                      href={`/products/${productId}`}
                      className="text-sm sm:text-[15px] font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug mb-3"
                    >
                      {product.title}
                    </Link>
                  </div>

                  <div className="mt-auto pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-1">
                        <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                          {hasDiscount
                            ? product.priceAfterDiscount?.toLocaleString()
                            : product.price?.toLocaleString()}{" "}
                          <span className="text-xs font-semibold text-slate-700">
                            EGP
                          </span>
                        </span>
                      </div>
                      {hasDiscount && (
                        <span className="text-xs text-rose-500 font-medium line-through">
                          {product.price?.toLocaleString()} EGP
                        </span>
                      )}
                    </div>

                    <div className="shrink-0">
                      <AddToCartButton
                        productId={productId}
                        variant="full"
                        size="sm"
                        className="rounded-xl!"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
