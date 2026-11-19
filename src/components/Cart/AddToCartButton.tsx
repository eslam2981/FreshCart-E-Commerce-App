"use client";

import { useState } from "react";
import { ShoppingCart, Check, Plus, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  productId: string;
  quantity?: number;
  variant?: "icon" | "full";
  size?: "sm" | "md" | "lg";
  price?: number;
  className?: string;
}

export default function AddToCartButton({
  productId,
  quantity = 1,
  variant = "icon",
  size = "md",
  price,
  className = "",
}: AddToCartButtonProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { addToCart } = useCart();
  const [state, setState] = useState<"idle" | "loading" | "added">("idle");

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const userToken = session?.token;
    if (status === "unauthenticated" || !userToken) {
      toast.add({
        type: "error",
        description: "Please sign in with your email & password to manage your cart.",
        timeout: 3500,
      });
      router.push("/login");
      return;
    }

    setState("loading");

    try {
      const success = await addToCart(productId);

      if (success) {
        setState("added");
        toast.add({
          type: "success",
          description: "Product added to cart!",
          timeout: 2500,
        });

        // Reset state after delay
        setTimeout(() => setState("idle"), 1500);
      } else {
        setState("idle");
        toast.add({
          type: "error",
          description: "Failed to add to cart. Try again.",
          timeout: 3000,
        });
      }
    } catch {
      setState("idle");
      toast.add({
        type: "error",
        description: "Failed to add to cart. Try again.",
        timeout: 3000,
      });
    }
  };

  const iconSizeMap = {
    sm: "w-8 h-8",
    md: "w-9 h-9 sm:w-10 sm:h-10",
    lg: "w-11 h-11",
  };

  const iconMap = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-5 h-5",
  };

  const fullSizeMap = {
    sm: "py-2 px-4 text-xs",
    md: "py-3 px-5 text-sm",
    lg: "py-3.5 px-6 text-sm sm:text-base",
  };

  const activeStyle =
    state === "added"
      ? "bg-emerald-700 text-white ring-2 ring-emerald-400/50 scale-105"
      : state === "loading"
      ? "bg-emerald-500 text-white opacity-80"
      : "bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-105";

  // Icon button variant
  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={state === "loading"}
        aria-label="Add to cart"
        title="Add to cart"
        className={`${iconSizeMap[size]} rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer shadow-xs hover:shadow-md shrink-0 disabled:pointer-events-none ${activeStyle} ${className}`}
      >
        {state === "loading" ? (
          <Loader2 className={`${iconMap[size]} stroke-[2.5] animate-spin`} />
        ) : state === "added" ? (
          <Check className={`${iconMap[size]} stroke-[2.5] animate-in zoom-in-75 duration-200`} />
        ) : (
          <Plus className={`${iconMap[size]} stroke-[2.5]`} />
        )}
      </button>
    );
  }

  // Full button variant
  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={state === "loading"}
      className={`flex-1 ${fullSizeMap[size]} rounded-xl font-bold flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-95 shadow-md disabled:pointer-events-none cursor-pointer ${activeStyle} ${className}`}
    >
      {state === "loading" ? (
        <>
          <Loader2 className="w-5 h-5 stroke-[2.5] animate-spin" />
          <span>Adding...</span>
        </>
      ) : state === "added" ? (
        <>
          <Check className="w-5 h-5 stroke-[2.5]" />
          <span>Added to Cart!</span>
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5 stroke-[2.2]" />
          <span>
            Add to Cart
            {price ? ` (${(price * quantity).toLocaleString()} EGP)` : ""}
          </span>
        </>
      )}
    </button>
  );
}

