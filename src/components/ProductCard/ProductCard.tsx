"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Product } from "@/interfaces/product";
import RatingStars from "@/components/ui/RatingStars";
import ProductCardActions from "./ProductCardActions";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "@/components/ui/toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { status, data: session } = useSession();
  const router = useRouter();
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

  const isWishlisted = isInWishlist(product._id);

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

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (status === "loading") return;

    const userToken = session?.token;
    if (status === "unauthenticated" || !userToken) {
      toast.add({
        type: "error",
        description: "Please sign in to add products to your wishlist.",
        timeout: 3000,
      });
      router.push("/login");
      return;
    }

    if (isTogglingWishlist) return;
    setIsTogglingWishlist(true);

    try {
      if (isWishlisted) {
        const ok = await removeFromWishlist(product._id);
        if (ok) {
          toast.add({
            type: "success",
            description: "Removed from wishlist",
            timeout: 2000,
          });
        } else {
          toast.add({
            type: "error",
            description: "Failed to remove from wishlist",
            timeout: 2500,
          });
        }
      } else {
        const ok = await addToWishlist(product._id);
        if (ok) {
          toast.add({
            type: "success",
            description: "Added to wishlist!",
            timeout: 2000,
          });
        } else {
          toast.add({
            type: "error",
            description: "Failed to add to wishlist",
            timeout: 2500,
          });
        }
      }
    } finally {
      setIsTogglingWishlist(false);
    }
  };

  return (
    <article className="group relative bg-white rounded-2xl border border-slate-300 shadow-xs hover:border-emerald-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden p-3.5 sm:p-4 h-full">
      <div className="relative w-full aspect-square rounded-xl overflow-hidden flex items-center justify-center bg-white mb-3">
        <Link
          href={`/products/${product._id}`}
          className="relative w-full h-full block"
          aria-label={product.title}
        >
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-contain p-1.5 group-hover:scale-108 transition-transform duration-500 ease-out mix-blend-multiply contrast-[1.08] brightness-[1.02] saturate-[0.85]"
          />
          <div className="absolute inset-0 bg-slate-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
        </Link>

        {hasDiscount && (
          <div className="absolute top-2 left-2 z-10 pointer-events-none">
            <span className="bg-rose-500 text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs tracking-tight">
              -{discountPercentage}%
            </span>
          </div>
        )}

        <ProductCardActions
          isWishlisted={isWishlisted}
          onToggleWishlist={handleWishlistToggle}
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          {product.category?.name && (
            <span className="text-xs text-slate-400 font-normal line-clamp-1 mb-1 block">
              {product.category.name}
            </span>
          )}

          <Link href={`/products/${product._id}`} className="block">
            <h3 className="text-sm sm:text-[15px] font-semibold text-slate-800 line-clamp-1 group-hover:text-emerald-600 transition-colors leading-snug">
              {product.title}
            </h3>
          </Link>

          <div className="flex items-center gap-1.5 mt-2">
            <RatingStars
              rating={product.ratingsAverage || 0}
              size={14}
              className="w-3.5 h-3.5"
            />
            <span className="text-xs text-slate-500 font-medium">
              {product.ratingsAverage}{" "}
              <span className="text-slate-400 font-normal">
                ({product.ratingsQuantity || 0})
              </span>
            </span>
          </div>
        </div>

        <div className="mt-3 pt-2.5 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                {hasDiscount
                  ? product.priceAfterDiscount
                  : product.price}{" "}
                <span className="text-xs sm:text-sm font-semibold text-slate-700">
                  EGP
                </span>
              </span>
            </div>
            {hasDiscount && (
              <span className="text-xs text-red-500 font-medium line-through">
                {product.price} EGP
              </span>
            )}
          </div>

          <AddToCartButton
            productId={product._id}
            variant="icon"
          />
        </div>
      </div>
    </article>
  );
}
