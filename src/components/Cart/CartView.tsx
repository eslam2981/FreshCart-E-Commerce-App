"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartItemRow, { EmptyCart } from "./CartItemRow";
import CartSummary from "./CartSummary";
import CartSkeleton from "./CartSkeleton";

export default function CartView() {
  const router = useRouter();
  const { cartData, cartCount, isLoading, updateCount, removeItem, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const items = cartData?.products || [];
  const totalPrice = cartData?.totalCartPrice || 0;

  const handleIncrement = (productId: string) => {
    const item = items.find((i) => i.product._id === productId);
    if (item) {
      updateCount(productId, item.count + 1);
    }
  };

  const handleDecrement = (productId: string, currentCount: number) => {
    if (currentCount <= 1) {
      removeItem(productId);
      return;
    }
    updateCount(productId, currentCount - 1);
  };

  const handleRemove = (productId: string) => {
    removeItem(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    router.push("/checkout");
  };

  if (isLoading && !cartData) {
    return <CartSkeleton />;
  }

  return (
    <div className="min-h-[60vh] bg-slate-50/60 py-8 sm:py-12">
      <div className="max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">My Cart</h1>
              {items.length > 0 && (
                <p className="text-xs text-slate-500">
                  {cartCount} item{cartCount !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>

          {items.length > 0 && (
            <button
              onClick={handleClearCart}
              className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 stroke-[2]" />
              Clear all
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs">
            <EmptyCart />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                {items.map((item) => (
                  <CartItemRow
                    key={item._id}
                    item={item}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <CartSummary
                totalPrice={totalPrice}
                discountedPrice={cartData?.totalPriceAfterDiscount}
                itemCount={cartCount}
                onCheckout={handleCheckout}
                isLoading={isCheckingOut}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
