"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  User,
  Mail,
  ShieldCheck,
  ShoppingCart,
  Heart,
  Package,
  LogOut,
  Lock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileAddresses from "./ProfileAddresses";
import ProfileSecurity from "./ProfileSecurity";

export default function ProfileView() {
  const { data: session, status } = useSession();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  if (status === "loading") {
    return (
      <div className="min-h-[70vh] bg-slate-50/60 py-10 sm:py-16">
        <div className="max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12">
          <Skeleton className="h-40 w-full rounded-3xl bg-slate-200/80 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Skeleton className="h-28 rounded-2xl bg-slate-200/70" />
            <Skeleton className="h-28 rounded-2xl bg-slate-200/70" />
            <Skeleton className="h-28 rounded-2xl bg-slate-200/70" />
          </div>
          <Skeleton className="h-64 rounded-3xl bg-slate-200/80" />
        </div>
      </div>
    );
  }

  const user = session?.user;
  const userName = user?.name || "Customer";
  const userEmail = user?.email || "No email available";
  const userImage = user?.image;
  const userRole = user?.role || "Customer";
  const initial = userName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50/60 py-8 sm:py-12">
      <div className="max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-100 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/70 rounded-full blur-3xl -z-0 pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            {userImage ? (
              <Image
                src={userImage}
                alt={userName}
                width={80}
                height={80}
                unoptimized
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-full object-cover border-4 border-emerald-100 shadow-sm shrink-0"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-emerald-600 text-white flex items-center justify-center text-2xl font-extrabold shadow-sm shrink-0 border-4 border-emerald-100">
                {initial}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-center sm:justify-start gap-3 flex-wrap mb-1.5">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 truncate">
                  {userName}
                </h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{userRole}</span>
                </span>
              </div>

              <p className="text-sm text-slate-500 flex items-center justify-center sm:justify-start gap-2 mb-4">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{userEmail}</span>
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-emerald-700 font-medium bg-emerald-50/60 px-3 py-1.5 rounded-xl border border-emerald-100/80 w-fit mx-auto sm:mx-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified FreshCart Account</span>
              </div>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl transition-colors flex items-center gap-2 cursor-pointer self-center sm:self-start"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <Link
            href="/cart"
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <ShoppingCart className="w-5 h-5 stroke-[2]" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 block mb-0.5">
              {cartCount}
            </span>
            <span className="text-xs font-medium text-slate-500">Items in Shopping Cart</span>
          </Link>

          <Link
            href="/wishlist"
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:border-rose-300 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors">
                <Heart className="w-5 h-5 stroke-[2]" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-rose-500 group-hover:translate-x-0.5 transition-all" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 block mb-0.5">
              {wishlistCount}
            </span>
            <span className="text-xs font-medium text-slate-500">Saved Wishlist Items</span>
          </Link>

          <Link
            href="/orders"
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:border-blue-300 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Package className="w-5 h-5 stroke-[2]" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </div>
            <span className="text-2xl font-extrabold text-slate-900 block mb-0.5">
              Orders
            </span>
            <span className="text-xs font-medium text-slate-500">View Delivery & Order History</span>
          </Link>
        </div>

        <ProfileAddresses />

        <ProfileSecurity />

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-100">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center">
              <User className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Account Details</h2>
              <p className="text-xs text-slate-400">Personal information and security settings</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100">
              <span className="text-xs text-slate-400 block mb-1">Full Name</span>
              <span className="text-sm font-bold text-slate-800">{userName}</span>
            </div>

            <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100">
              <span className="text-xs text-slate-400 block mb-1">Email Address</span>
              <span className="text-sm font-bold text-slate-800">{userEmail}</span>
            </div>

            <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100">
              <span className="text-xs text-slate-400 block mb-1">Account Role</span>
              <span className="text-sm font-bold text-slate-800 capitalize">{userRole}</span>
            </div>

            <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100">
              <span className="text-xs text-slate-400 block mb-1">Authentication Method</span>
              <span className="text-sm font-bold text-slate-800">
                {userImage ? "Google OAuth 2.0" : "Email & Password"}
              </span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>Your personal data is encrypted and securely protected.</span>
            </div>
            <Link
              href="/cart"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors text-center"
            >
              Go to Shopping Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
