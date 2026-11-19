"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart, MoveRight } from "lucide-react";
import { CartItem } from "@/interfaces/cart";

interface CartItemRowProps {
  item: CartItem;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string, currentCount: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItemRow({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemRowProps) {
  const itemPrice = item.price ?? item.product?.price ?? 0;
  const priceAfterDiscount = item.product?.priceAfterDiscount;
  const hasDiscount = Boolean(priceAfterDiscount && priceAfterDiscount < itemPrice);
  const productId = item.product?._id || item.product?.id || item._id;
  const productTitle = item.product?.title || "Product";
  const productImage = item.product?.imageCover || "";

  return (
    <div className="flex gap-4 py-5 px-4 sm:px-6 border-b border-slate-100 last:border-0 group hover:bg-slate-50/50 transition-colors">
      <Link
        href={`/products/${productId}`}
        className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-white border border-slate-100 flex items-center justify-center"
      >
        {productImage ? (
          <Image
            src={productImage}
            alt={productTitle}
            width={96}
            height={96}
            className="object-contain w-full h-full p-1.5 mix-blend-multiply"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-xs text-slate-400">
            No image
          </div>
        )}
      </Link>

      <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
        <div>
          <Link
            href={`/products/${productId}`}
            className="text-sm font-semibold text-slate-800 hover:text-emerald-600 transition-colors line-clamp-2 leading-snug"
          >
            {productTitle}
          </Link>

          <div className="flex items-center gap-2 mt-1.5">
            {hasDiscount ? (
              <>
                <span className="text-sm font-bold text-emerald-700">
                  {(priceAfterDiscount ?? 0).toLocaleString()} EGP
                </span>
                <span className="text-xs text-slate-400 line-through">
                  {itemPrice.toLocaleString()} EGP
                </span>
              </>
            ) : (
              <span className="text-sm font-bold text-slate-800">
                {itemPrice.toLocaleString()} EGP
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-1 py-0.5 shadow-xs">
            <button
              onClick={() => onDecrement(productId, item.count)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-red-500 hover:bg-red-50 transition-colors active:scale-90 cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
            <span className="w-7 text-center text-sm font-bold text-slate-800 tabular-nums">
              {item.count}
            </span>
            <button
              onClick={() => onIncrement(productId)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors active:scale-90 cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-900 tabular-nums">
              {(itemPrice * item.count).toLocaleString()} EGP
            </span>
            <button
              onClick={() => onRemove(productId)}
              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors active:scale-90 cursor-pointer"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4 stroke-[1.8]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Empty cart state
export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-20 h-20 rounded-2xl bg-emerald-50 text-emerald-400 flex items-center justify-center mb-5 shadow-xs">
        <ShoppingCart className="w-10 h-10 stroke-[1.5]" />
      </div>
      <h2 className="text-xl font-bold text-slate-800 mb-2">
        Your cart is empty
      </h2>
      <p className="text-sm text-slate-500 max-w-xs mb-6">
        Looks like you haven&apos;t added anything yet. Start shopping to fill it up!
      </p>
      <Link
        href="/products"
        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors active:scale-95"
      >
        Browse Products
        <MoveRight className="w-4 h-4 stroke-[2]" />
      </Link>
    </div>
  );
}
