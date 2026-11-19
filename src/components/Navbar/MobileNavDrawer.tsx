"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { navLinks } from "./NavLinks";
import { X, Headset, User, UserPlus, Truck, Gift, LogOut, PackageCheck, Heart, ShoppingCart } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export default function MobileNavDrawer({
  isOpen,
  onClose,
  pathname,
}: MobileNavDrawerProps) {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  return (
    <div
      className={`fixed inset-0 z-50 xl:hidden overflow-hidden transition-[visibility] duration-300 ${
        isOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl flex flex-col z-50 p-6 overflow-y-auto transform transition-transform duration-300 ease-out will-change-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <Link
            href="/"
            onClick={onClose}
            className="shrink-0 flex items-center"
            aria-label="FreshCart Homepage"
          >
            <Image
              src="/logo.svg"
              alt="FreshCart"
              width={140}
              height={28}
              priority
              className="h-7 w-auto"
            />
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 active:scale-95 transition-all duration-150 cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        <div className="pt-4">
          <SearchBar />
        </div>

        <div className="py-5 flex flex-col gap-1.5 text-base font-medium">
          {navLinks.map((link) => {
            const isActive =
              link.path === "/"
                ? pathname === "/"
                : pathname.startsWith(link.path);

            return (
              <Link
                key={link.path}
                href={link.path}
                onClick={onClose}
                className={`px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700 font-semibold"
                    : "text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
                }`}
              >
                <span>{link.name}</span>
                {link.hasDropdown && (
                  <span className="text-xs bg-emerald-100/70 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                    All
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
          {status === "loading" ? (
            <div className="flex flex-col gap-2.5">
              <Skeleton className="h-14 w-full rounded-xl bg-slate-200/90" />
            </div>
          ) : isLoggedIn ? (
            <>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {session?.user?.name?.[0]?.toUpperCase() ?? "U"}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-slate-900 truncate">{session?.user?.name}</span>
                  <span className="text-xs text-slate-500 truncate">{session?.user?.email}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 my-1">
                <Link
                  href="/profile"
                  onClick={onClose}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                >
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/orders"
                  onClick={onClose}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                >
                  <PackageCheck className="w-4 h-4 text-emerald-600" />
                  <span>Orders</span>
                </Link>
                <Link
                  href="/wishlist"
                  onClick={onClose}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                >
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  href="/cart"
                  onClick={onClose}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4 text-emerald-600" />
                  <span>Cart</span>
                </Link>
              </div>

              <button
                onClick={async () => {
                  onClose();
                  await signOut({ redirect: false });
                  window.location.href = "/login";
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-600 font-medium text-sm transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 stroke-[2]" />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium text-sm transition-colors shadow-xs"
              >
                <User className="w-4 h-4 stroke-[2]" />
                <span>Sign In</span>
              </Link>
              <Link
                href="/register"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-medium text-sm transition-colors"
              >
                <UserPlus className="w-4 h-4 stroke-[2]" />
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <a
            href="tel:+18001234567"
            className="flex items-center gap-3 p-3 bg-emerald-50/70 rounded-xl text-emerald-800 hover:bg-emerald-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Headset className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-emerald-700 uppercase">Need Support?</div>
              <div className="text-sm font-bold text-slate-900">+1 (800) 123-4567</div>
            </div>
          </a>

          <div className="mt-4 text-xs text-slate-500 space-y-2">
            <div className="flex items-center gap-2 font-medium">
              <Truck className="w-4 h-4 text-emerald-600 stroke-[2.2] shrink-0" />
              <span>Free Shipping on Orders 500 EGP</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <Gift className="w-4 h-4 text-emerald-600 stroke-[2.2] shrink-0" />
              <span>New Arrivals Daily</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
