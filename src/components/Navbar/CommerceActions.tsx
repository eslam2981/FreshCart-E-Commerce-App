"use client";
import Link from "next/link";
import { Headset, Heart, ShoppingCart, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Skeleton } from "@/components/ui/skeleton";
import UserMenuDropdown from "./UserMenuDropdown";

export default function CommerceActions() {
  const { data: session, status } = useSession();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const isLoggedIn = status === "authenticated" && Boolean(session);

  return (
    <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-4 shrink-0">
      <a
        href="tel:+18001234567"
        className="hidden lg:flex items-center gap-2.5 group cursor-pointer"
        title="Contact 24/7 Customer Support"
      >
        <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
          <Headset className="w-4 h-4 stroke-[2]" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[10px] font-medium text-slate-400 leading-tight">Support</span>
          <span className="text-[12px] font-bold text-slate-900 leading-snug group-hover:text-emerald-600 transition-colors">
            24/7 Help
          </span>
        </div>
      </a>

      <span className="hidden lg:block h-6 w-px bg-slate-200" aria-hidden="true" />

      <div className="flex items-center gap-0.5 sm:gap-1.5">
        <Link
          href="/wishlist"
          className="relative p-1.5 sm:p-2 text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/80 rounded-full active:scale-95 transition-all duration-200 cursor-pointer group"
          aria-label="Wishlist"
        >
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.9] group-hover:scale-110 transition-transform duration-200" />
          {wishlistCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 sm:top-0 sm:right-0 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white animate-in zoom-in-75 duration-200 shadow-xs">
              {wishlistCount > 99 ? "99+" : wishlistCount}
            </span>
          )}
        </Link>

        <Link
          href="/cart"
          className="relative p-1.5 sm:p-2 text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/80 rounded-full active:scale-95 transition-all duration-200 cursor-pointer group"
          aria-label="Shopping cart"
        >
          <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.9] group-hover:scale-110 transition-transform duration-200" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 sm:top-0 sm:right-0 min-w-4 h-4 px-1 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white animate-in zoom-in-75 duration-200 shadow-xs">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </Link>

        {status === "loading" ? (
          <div className="hidden sm:flex items-center ml-1">
            <Skeleton className="h-8 w-24 rounded-full bg-slate-200/90" />
          </div>
        ) : isLoggedIn && session ? (
          <div className="hidden sm:flex items-center ml-1">
            <UserMenuDropdown session={session} />
          </div>
        ) : (
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-800 border border-emerald-200/80 rounded-full active:scale-95 transition-all duration-200 cursor-pointer ml-1"
            aria-label="Sign In"
          >
            <User className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Sign In</span>
          </Link>
        )}
      </div>
    </div>
  );
}
