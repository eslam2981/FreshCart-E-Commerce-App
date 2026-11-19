"use client";

import React from "react";
import Link from "next/link";
import { Truck, Gift, Phone, Mail, User, UserPlus, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TopBar() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <div className="hidden md:block w-full bg-slate-50/80 border-b border-slate-100 text-xs text-slate-600 select-none">
      <div className="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-9 flex items-center justify-between">
        <div className="flex items-center gap-6 lg:gap-8 overflow-hidden">
          <div className="flex items-center gap-2 font-medium shrink-0 text-slate-600 text-[12px]">
            <Truck className="w-4 h-4 text-emerald-600 stroke-[2.2]" />
            <span>Free Shipping on Orders 500 EGP</span>
          </div>

          <div className="flex items-center gap-2 font-medium shrink-0 text-slate-600 text-[12px]">
            <Gift className="w-4 h-4 text-emerald-600 stroke-[2.2]" />
            <span>New Arrivals Daily</span>
          </div>
        </div>

        <div className="flex items-center gap-5 lg:gap-6 shrink-0 text-slate-500 text-[12px]">
          <a
            href="tel:+18001234567"
            className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors cursor-pointer group"
          >
            <Phone className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-600 transition-colors stroke-[2]" />
            <span>+1 (800) 123-4567</span>
          </a>

          <a
            href="mailto:support@freshcart.com"
            className="hidden lg:flex items-center gap-1.5 hover:text-emerald-600 transition-colors cursor-pointer group"
          >
            <Mail className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-600 transition-colors stroke-[2]" />
            <span>support@freshcart.com</span>
          </a>

          <span className="block h-3.5 w-px bg-slate-200" aria-hidden="true" />

          <div className="flex items-center gap-4 font-medium text-[12px]">
            {status === "loading" ? (
              <div className="flex items-center gap-3">
                <Skeleton className="h-3.5 w-14 bg-slate-200/90 rounded" />
                <Skeleton className="h-3.5 w-14 bg-slate-200/90 rounded" />
              </div>
            ) : isLoggedIn ? (
              <div className="flex items-center gap-4 animate-in fade-in-50 duration-200">
                <Link
                  href="/profile"
                  className="flex items-center gap-1.5 text-emerald-700 font-semibold hover:text-emerald-800 transition-colors"
                  title="View Profile"
                >
                  <User className="w-3.5 h-3.5 stroke-[2]" />
                  <span>{session?.user?.name}</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="flex items-center gap-1.5 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 stroke-[2]" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-slate-500 stroke-[2]" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5 text-slate-500 stroke-[2]" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
