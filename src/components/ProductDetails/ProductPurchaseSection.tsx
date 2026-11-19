"use client";

import React, { useState } from "react";
import { Minus, Plus, Heart, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "@/components/ui/toast";

interface ProductPurchaseSectionProps {
  productId: string;
  currentPrice: number;
  maxStock?: number;
}

export default function ProductPurchaseSection({
  productId,
  currentPrice,
  maxStock,
}: ProductPurchaseSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { status, data: session } = useSession();
  const router = useRouter();
  const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

  const isWishlisted = isInWishlist(productId);

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => {
      if (maxStock && prev >= maxStock) return prev;
      return prev + 1;
    });
  };

  const handleToggleWishlist = async () => {
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
        const ok = await removeFromWishlist(productId);
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
        const ok = await addToWishlist(productId);
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
    <div className="mt-6 space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-slate-800">Quantity:</span>
        <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white p-1">
          <button
            type="button"
            onClick={handleDecreaseQuantity}
            disabled={quantity <= 1}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-colors cursor-pointer"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center text-sm font-bold text-slate-900">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncreaseQuantity}
            disabled={Boolean(maxStock && quantity >= maxStock)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 transition-colors cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <AddToCartButton
          productId={productId}
          quantity={quantity}
          variant="full"
          size="lg"
          price={currentPrice}
        />

        <button
          type="button"
          onClick={handleToggleWishlist}
          disabled={isTogglingWishlist}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer shrink-0 disabled:opacity-60 ${
            isWishlisted
              ? "bg-rose-50 border-rose-300 text-rose-600"
              : "bg-white border-slate-200 text-slate-600 hover:border-rose-300 hover:text-rose-600"
          }`}
        >
          {isTogglingWishlist ? (
            <Loader2 className="w-5 h-5 animate-spin text-rose-500" />
          ) : (
            <Heart
              className={`w-5 h-5 ${
                isWishlisted ? "fill-rose-500 stroke-rose-500" : "stroke-[2]"
              }`}
            />
          )}
        </button>
      </div>
    </div>
  );
}
