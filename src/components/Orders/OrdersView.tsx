"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import {
  PackageCheck,
  ShoppingBag,
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  XCircle,
  CreditCard,
  Banknote,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { UserOrder } from "@/interfaces/order";
import { getUserOrders } from "@/services/order.service";
import { Skeleton } from "@/components/ui/skeleton";

interface DecodedToken {
  id: string;
}

interface OrdersViewProps {
  isStripeRedirect?: boolean;
}

export default function OrdersView({ isStripeRedirect = false }: OrdersViewProps) {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = session?.token;

  useEffect(() => {
    let ignore = false;

    async function fetchOrders() {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        let userId = session.user?.id;
        if (!userId && token) {
          try {
            const decoded = jwtDecode<DecodedToken>(token);
            userId = decoded.id;
          } catch {
            // ignore decode error
          }
        }

        if (!userId) {
          setError("Unable to identify current user account.");
          setIsLoading(false);
          return;
        }

        const data = await getUserOrders(userId);
        if (!ignore) {
          if (Array.isArray(data)) {
            // Sort orders descending by createdAt
            const sorted = [...data].sort(
              (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            setOrders(sorted);
          } else {
            setOrders([]);
          }
        }
      } catch (err) {
        if (!ignore) {
          console.error("Fetch orders error:", err);
          setError("Failed to load your orders. Please try again later.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    if (status === "authenticated" && token) {
      queueMicrotask(() => {
        void fetchOrders();
      });
    } else if (status === "unauthenticated") {
      queueMicrotask(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });
    }

    return () => {
      ignore = true;
    };
  }, [token, session, status]);

  // Unauthenticated state
  if (status === "unauthenticated") {
    return (
      <div className="min-h-[60vh] bg-slate-50/60 py-12 sm:py-16">
        <div className="max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12">
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-md mx-auto border border-slate-200/90 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">
              Sign In to View Orders
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              You must be logged in to view your order history and live delivery tracking.
            </p>
            <Link
              href="/login?callbackUrl=/orders"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-md shadow-emerald-600/20 active:scale-98"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-[60vh] bg-slate-50/60 py-8 sm:py-12">
        <div className="max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12 space-y-6">
          <div className="mb-6">
            <Skeleton className="h-8 w-48 rounded-xl bg-slate-200/90 mb-2" />
            <Skeleton className="h-4 w-36 rounded-lg bg-slate-200/70" />
          </div>
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4"
            >
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <Skeleton className="h-5 w-40 rounded-md bg-slate-200/80" />
                <Skeleton className="h-6 w-24 rounded-full bg-slate-200/80" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-16 w-full rounded-2xl bg-slate-200/70" />
                <Skeleton className="h-16 w-full rounded-2xl bg-slate-200/70" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-slate-50/60 py-8 sm:py-12">
      <div className="max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12">
        {isStripeRedirect && (
          <div className="mb-8 p-5 sm:p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
                <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-emerald-950">
                  Payment Successful!
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800/90 mt-0.5">
                  Thank you for your purchase. Your online Stripe transaction was processed and confirmed.
                </p>
              </div>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-8 sm:h-9 bg-emerald-600 rounded-full shrink-0" />
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                My Orders
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                {orders.length} {orders.length === 1 ? "order" : "orders"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Track your current orders and review past delivery receipts.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors self-start sm:self-auto"
          >
            <span>Explore more products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm mb-6 flex items-center gap-3">
            <XCircle className="w-5 h-5 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 sm:p-16 text-center max-w-lg mx-auto border border-slate-200/90 shadow-xs">
            <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-10 h-10 stroke-[1.8]" />
            </div>
            <h2 className="text-xl font-black text-slate-900 mb-2">
              No orders found
            </h2>
            <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">
              Looks like you haven&apos;t placed any orders yet. Discover our fresh groceries and best deals today!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-md shadow-emerald-600/20 active:scale-98"
            >
              Start Shopping Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const formattedDate = new Date(order.createdAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }
              );

              return (
                <div
                  key={order._id || order.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden transition-all hover:border-slate-300"
                >
                  <div className="p-4 sm:p-6 bg-slate-50/70 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-4">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                          Order ID
                        </span>
                        <span className="text-xs sm:text-sm font-mono font-bold text-slate-800">
                          #{String(order.id || order._id).slice(-8).toUpperCase()}
                        </span>
                      </div>

                      <div className="h-7 w-px bg-slate-200 hidden sm:block" />

                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                          Date Placed
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-slate-700 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {formattedDate}
                        </span>
                      </div>

                      <div className="h-7 w-px bg-slate-200 hidden sm:block" />

                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                          Payment Method
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1">
                          {order.paymentMethodType === "card" ? (
                            <>
                              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Stripe (Online Card)</span>
                            </>
                          ) : (
                            <>
                              <Banknote className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Cash on Delivery</span>
                            </>
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {order.isPaid ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3 h-3 text-amber-600" />
                          Payment Pending
                        </span>
                      )}

                      {order.isDelivered ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          <PackageCheck className="w-3.5 h-3.5 text-blue-600" />
                          Delivered
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          <RefreshCw className="w-3 h-3 text-slate-500 animate-spin" />
                          Processing
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 divide-y divide-slate-100">
                    {order.cartItems?.map((item) => {
                      const prod = item.product;
                      return (
                        <div
                          key={item._id}
                          className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center p-1">
                              {prod?.imageCover ? (
                                <Image
                                  src={prod.imageCover}
                                  alt={prod.title || "Product"}
                                  fill
                                  sizes="64px"
                                  className="object-contain"
                                />
                              ) : (
                                <ShoppingBag className="w-6 h-6 text-slate-300" />
                              )}
                            </div>
                            <div className="min-w-0">
                              {prod?.category?.name && (
                                <span className="text-[11px] font-semibold text-emerald-600 block line-clamp-1">
                                  {prod.category.name}
                                </span>
                              )}
                              {prod?._id ? (
                                <Link
                                  href={`/products/${prod._id}`}
                                  className="text-xs sm:text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors line-clamp-1"
                                >
                                  {prod.title}
                                </Link>
                              ) : (
                                <span className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                                  {prod?.title || "Product"}
                                </span>
                              )}
                              <span className="text-xs text-slate-500 mt-0.5 block">
                                Qty: <strong className="text-slate-800">{item.count}</strong> Ã—{" "}
                                {item.price} EGP
                              </span>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-xs sm:text-sm font-black text-slate-900">
                              {item.price * item.count} EGP
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-4 sm:p-6 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {order.shippingAddress && (
                      <div className="text-xs text-slate-600 flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {order.shippingAddress.city} - {order.shippingAddress.details}
                        </span>
                        <span className="flex items-center gap-1 font-medium">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {order.shippingAddress.phone}
                        </span>
                      </div>
                    )}

                    <div className="flex items-baseline gap-2 self-end sm:self-auto ml-auto">
                      <span className="text-xs font-semibold text-slate-500">
                        Total Amount:
                      </span>
                      <span className="text-base sm:text-lg font-black text-slate-900">
                        {order.totalOrderPrice}{" "}
                        <span className="text-xs font-bold text-emerald-700">
                          EGP
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
