"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Truck, Tag, MoveRight, Loader2, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartSummaryProps {
  totalPrice: number;
  discountedPrice?: number;
  itemCount: number;
  onCheckout: () => void;
  isLoading?: boolean;
}

export default function CartSummary({
  totalPrice,
  discountedPrice,
  itemCount,
  onCheckout,
  isLoading = false,
}: CartSummaryProps) {
  const { applyCoupon } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponStatus, setCouponStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const finalPrice = discountedPrice ?? totalPrice;
  const savings = discountedPrice ? totalPrice - discountedPrice : 0;
  const shippingFee = finalPrice >= 500 ? 0 : 29;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setIsApplyingCoupon(true);
    setCouponStatus(null);

    const result = await applyCoupon(couponCode.trim());
    setIsApplyingCoupon(false);
    setCouponStatus({
      success: result.success,
      message: result.message || (result.success ? "Coupon applied!" : "Invalid coupon"),
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden sticky top-24">
      <div className="px-5 py-4 border-b border-slate-100">
        <h2 className="text-base font-bold text-slate-900">Order Summary</h2>
        <p className="text-xs text-slate-500 mt-0.5">{itemCount} item{itemCount !== 1 ? "s" : ""}</p>
      </div>

      <div className="px-5 py-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Subtotal</span>
          <span className="font-semibold text-slate-800 tabular-nums">
            {(totalPrice ?? 0).toLocaleString()} EGP
          </span>
        </div>

        {savings > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-emerald-600">
              <Tag className="w-3.5 h-3.5 stroke-[2]" />
              Discount
            </span>
            <span className="font-semibold text-emerald-600 tabular-nums">
              âˆ’ {savings.toLocaleString()} EGP
            </span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 text-slate-600">
            <Truck className="w-3.5 h-3.5 stroke-[2]" />
            Shipping
          </span>
          {shippingFee === 0 ? (
            <span className="font-semibold text-emerald-600">Free</span>
          ) : (
            <span className="font-semibold text-slate-800 tabular-nums">
              {shippingFee} EGP
            </span>
          )}
        </div>

        {shippingFee > 0 && (
          <p className="text-[11px] text-slate-400 bg-slate-50 rounded-lg px-3 py-2">
            🚚 Add <span className="font-semibold text-slate-600">{(500 - finalPrice).toLocaleString()} EGP</span> more for free shipping
          </p>
        )}

        <div className="pt-1 pb-1">
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 min-w-0 h-9 px-3 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500 font-mono uppercase transition-all"
            />
            <button
              type="submit"
              disabled={isApplyingCoupon || !couponCode.trim()}
              className="px-3.5 h-9 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center justify-center gap-1.5"
            >
              {isApplyingCoupon ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                "Apply"
              )}
            </button>
          </form>
          {couponStatus && (
            <p
              className={`text-[11px] mt-1.5 flex items-center gap-1 ${
                couponStatus.success ? "text-emerald-600 font-semibold" : "text-rose-500"
              }`}
            >
              {couponStatus.success && <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />}
              {couponStatus.message}
            </p>
          )}
        </div>

        <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
          <span className="font-bold text-slate-900">Total</span>
          <span className="text-lg font-extrabold text-emerald-700 tabular-nums">
            {((finalPrice ?? 0) + shippingFee).toLocaleString()} EGP
          </span>
        </div>
      </div>

      <div className="px-5 pb-5">
        <button
          onClick={onCheckout}
          disabled={isLoading || itemCount === 0}
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:pointer-events-none text-white font-semibold text-sm py-3 rounded-xl transition-colors active:scale-[0.98] shadow-sm"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              Proceed to Checkout
              <MoveRight className="w-4 h-4 stroke-[2]" />
            </>
          )}
        </button>

        <Link
          href="/products"
          className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 transition-colors font-medium"
        >
          Continue Shopping
        </Link>
      </div>

      <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[2]" />
          Secure payment â€” SSL encrypted
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
          <Truck className="w-3.5 h-3.5 text-emerald-500 shrink-0 stroke-[2]" />
          Free delivery on orders over 500 EGP
        </div>
      </div>
    </div>
  );
}

