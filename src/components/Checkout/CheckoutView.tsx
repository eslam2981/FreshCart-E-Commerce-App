"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { createCheckoutSession, createCashOrder } from "@/services/order.service";
import { getLoggedUserAddresses } from "@/services/address.service";
import { Address } from "@/interfaces/address";
import { toast } from "@/components/ui/toast";
import {
  CreditCard,
  Banknote,
  ShieldCheck,
  Truck,
  ArrowLeft,
  Loader2,
  Lock,
  Building2,
  Phone,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export default function CheckoutView() {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.token;
  const { cartData, cartCount, isLoading: isCartLoading, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card");
  const [city, setCity] = useState("Cairo");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const cartId = cartData?._id;
  const items = cartData?.products || [];
  const totalPrice = cartData?.totalCartPrice || 0;

  useEffect(() => {
    if (!token) return;
    let ignore = false;
    getLoggedUserAddresses(token)
      .then((res) => {
        if (!ignore && res.status === "success" && Array.isArray(res.data)) {
          setSavedAddresses(res.data);
          if (res.data.length > 0) {
            const first = res.data[0];
            setSelectedAddressId(first._id);
            setCity(first.city || "Cairo");
            setPhone(first.phone || "");
            setDetails(first.details || "");
          }
        }
      })
      .catch(() => {});
    return () => {
      ignore = true;
    };
  }, [token]);

  const handleSelectAddress = (addr: Address) => {
    setSelectedAddressId(addr._id);
    setCity(addr.city);
    setPhone(addr.phone);
    setDetails(addr.details);
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.add({
        type: "error",
        description: "Please sign in to complete your checkout.",
        timeout: 3000,
      });
      router.push("/login?callbackUrl=/checkout");
      return;
    }

    if (!cartId || items.length === 0) {
      toast.add({
        type: "error",
        description: "Your cart is empty. Please add items before checking out.",
        timeout: 3000,
      });
      router.push("/products");
      return;
    }

    // Validate shipping fields
    if (!city.trim() || !phone.trim() || !details.trim()) {
      toast.add({
        type: "error",
        description: "Please fill in all shipping address fields.",
        timeout: 3000,
      });
      return;
    }

    if (phone.trim().length < 10) {
      toast.add({
        type: "error",
        description: "Please enter a valid phone number (at least 10 digits).",
        timeout: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    const shippingAddress = {
      city: city.trim(),
      phone: phone.trim(),
      details: details.trim(),
    };

    try {
      if (paymentMethod === "card") {
        // Stripe online checkout
        const returnUrl = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
        const res = await createCheckoutSession(cartId, shippingAddress, token, returnUrl);

        if (res.status === "success" && res.session?.url) {
          toast.add({
            type: "success",
            description: "Redirecting to secure Stripe Checkout...",
            timeout: 2500,
          });
          // Redirect to Stripe checkout page
          window.location.href = res.session.url;
        } else {
          toast.add({
            type: "error",
            description: res.message || "Failed to initialize Stripe payment. Try again.",
            timeout: 4000,
          });
          setIsSubmitting(false);
        }
      } else {
        // Cash on delivery order
        const res = await createCashOrder(cartId, shippingAddress, token);

        if (res.status === "success") {
          await clearCart();
          setOrderSuccess(true);
          toast.add({
            type: "success",
            description: "Order placed successfully! We'll deliver soon.",
            timeout: 4000,
          });
        } else {
          toast.add({
            type: "error",
            description: res.message || "Failed to place order. Please try again.",
            timeout: 4000,
          });
          setIsSubmitting(false);
        }
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      toast.add({
        type: "error",
        description: "An unexpected error occurred during checkout.",
        timeout: 4000,
      });
      setIsSubmitting(false);
    }
  };

  // Order success view
  if (orderSuccess) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-slate-50/60">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-100 text-center animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-xs">
            <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Order Confirmed!</h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            Thank you for your order! We are preparing your fresh groceries and will deliver them to:
          </p>
          <div className="bg-slate-50 rounded-2xl p-4 text-left text-xs text-slate-600 space-y-1.5 mb-8 border border-slate-100">
            <p><span className="font-semibold text-slate-800">City:</span> {city}</p>
            <p><span className="font-semibold text-slate-800">Address:</span> {details}</p>
            <p><span className="font-semibold text-slate-800">Phone:</span> {phone}</p>
            <p><span className="font-semibold text-slate-800">Payment:</span> Cash on Delivery</p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/products"
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm transition-colors shadow-xs"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="w-full py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart view
  if (!isCartLoading && items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
          <Truck className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Your Cart is Empty</h2>
        <p className="text-sm text-slate-500 mb-6 max-w-sm">
          Please add some items to your shopping cart before proceeding to checkout.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore Products</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/60 py-8 sm:py-12">
      <div className="max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12">
        <div className="mb-6 sm:mb-8 flex items-center justify-between">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-100">
                <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">1. Shipping Address</h2>
                    <p className="text-xs text-slate-400">Where should we deliver your fresh order?</p>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  {savedAddresses.length > 0 && (
                    <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 mb-4">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                        Select from your saved addresses
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {savedAddresses.map((addr) => {
                          const isSelected = selectedAddressId === addr._id;
                          return (
                            <button
                              key={addr._id}
                              type="button"
                              onClick={() => handleSelectAddress(addr)}
                              className={`text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                                isSelected
                                  ? "border-emerald-600 bg-white ring-2 ring-emerald-500/20 shadow-xs"
                                  : "border-slate-200 hover:border-slate-300 bg-white/70"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-slate-900">{addr.name}</span>
                                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                              </div>
                              <p className="text-slate-500 truncate">{addr.details}, {addr.city}</p>
                              <p className="text-slate-400 font-mono mt-0.5">{addr.phone}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div>
                    <label htmlFor="city-select" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      City / Governorate *
                    </label>
                    <div className="relative">
                      <select
                        id="city-select"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="w-full appearance-none px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors cursor-pointer"
                      >
                        <option value="Cairo">Cairo (Ø§Ù„Ù‚Ø§Ù‡Ø±Ø©)</option>
                        <option value="Giza">Giza (Ø§Ù„Ø¬ÙŠØ²Ø©)</option>
                        <option value="Alexandria">Alexandria (Ø§Ù„Ø¥Ø³ÙƒÙ†Ø¯Ø±ÙŠØ©)</option>
                        <option value="Mansoura">Mansoura (Ø§Ù„Ù…Ù†ØµÙˆØ±Ø©)</option>
                        <option value="Tanta">Tanta (Ø·Ù†Ø·Ø§)</option>
                        <option value="Zagazig">Zagazig (Ø§Ù„Ø²Ù‚Ø§Ø²ÙŠÙ‚)</option>
                        <option value="Assiut">Assiut (Ø£Ø³ÙŠÙˆØ·)</option>
                        <option value="Aswan">Aswan (Ø£Ø³ÙˆØ§Ù†)</option>
                        <option value="Hurghada">Hurghada (Ø§Ù„ØºØ±Ø¯Ù‚Ø©)</option>
                        <option value="Sharm El Sheikh">Sharm El Sheikh (Ø´Ø±Ù… Ø§Ù„Ø´ÙŠØ®)</option>
                      </select>
                      <Building2 className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address-details" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Street Address & Details *
                    </label>
                    <div className="relative">
                      <input
                        id="address-details"
                        type="text"
                        placeholder="e.g. 15 El-Tahrir St, Building 4, Apt 12, Floor 3"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone-number" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Contact Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        id="phone-number"
                        type="tel"
                        placeholder="e.g. 01012345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors placeholder:text-slate-400"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      The courier will call this number prior to delivery.
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-100">
                <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">2. Payment Method</h2>
                    <p className="text-xs text-slate-400">Choose how you would like to pay</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <label
                    className={`flex items-start gap-4 p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === "card"
                        ? "border-emerald-600 bg-emerald-50/40 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="mt-1 w-4 h-4 text-emerald-600 accent-emerald-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-sm font-bold text-slate-900">
                          Credit / Debit Card (Powered by Stripe)
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                          <span>Instant & Secure</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Pay with Visa, Mastercard, or American Express via Stripe&apos;s encrypted gateway.
                      </p>
                    </div>
                  </label>

                  <label
                    className={`flex items-start gap-4 p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === "cash"
                        ? "border-emerald-600 bg-emerald-50/40 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={() => setPaymentMethod("cash")}
                      className="mt-1 w-4 h-4 text-emerald-600 accent-emerald-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-emerald-600" />
                          <span>Cash on Delivery (Ø§Ù„Ø¯ÙØ¹ Ø¹Ù†Ø¯ Ø§Ù„Ø§Ø³ØªÙ„Ø§Ù…)</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Pay safely in cash to the delivery courier when your order arrives at your door.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-100">
                <h3 className="text-base font-extrabold text-slate-900 mb-4 pb-4 border-b border-slate-100">
                  Order Summary ({cartCount} {cartCount === 1 ? "item" : "items"})
                </h3>

                <div className="max-h-60 overflow-y-auto space-y-3 pr-1 mb-6 divide-y divide-slate-100">
                  {items.map((item) => {
                    const price = item.price ?? item.product?.price ?? 0;
                    return (
                      <div key={item._id} className="pt-3 first:pt-0 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                          {item.product?.imageCover ? (
                            <Image
                              src={item.product.imageCover}
                              alt={item.product.title || "Product"}
                              width={48}
                              height={48}
                              className="object-contain w-full h-full p-1"
                            />
                          ) : (
                            <div className="text-[10px] text-slate-400">Item</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-800 truncate">
                            {item.product?.title}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Qty: <span className="font-bold text-slate-700">{item.count}</span> Ã— {price} EGP
                          </p>
                        </div>
                        <span className="text-xs font-bold text-slate-900">
                          {(price * item.count).toLocaleString()} EGP
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-2.5 text-xs text-slate-600 pb-5 border-b border-slate-100">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">{totalPrice.toLocaleString()} EGP</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-bold text-emerald-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span className="font-medium text-slate-400">Included</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline pt-4 mb-6">
                  <span className="text-sm font-bold text-slate-900">Total to Pay</span>
                  <span className="text-xl font-extrabold text-emerald-700">
                    {totalPrice.toLocaleString()} EGP
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing Order...</span>
                    </>
                  ) : paymentMethod === "card" ? (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Pay with Stripe ({totalPrice.toLocaleString()} EGP)</span>
                    </>
                  ) : (
                    <>
                      <Truck className="w-4 h-4" />
                      <span>Place Cash Order ({totalPrice.toLocaleString()} EGP)</span>
                    </>
                  )}
                </button>

                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Buyer Protection</span>
                  </span>
                  <span>â€¢</span>
                  <span>Money Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
