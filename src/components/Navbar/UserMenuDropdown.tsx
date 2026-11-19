"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Package,
  Heart,
  ShoppingCart,
  LogOut,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";

interface UserMenuDropdownProps {
  session: Session;
}

export default function UserMenuDropdown({ session }: UserMenuDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userName = session.user?.name || "User";
  const userEmail = session.user?.email || "";
  const userImage = session.user?.image;
  const userRole = session.user?.role || "Customer";
  const initial = userName.charAt(0).toUpperCase();

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 text-emerald-800 transition-all duration-200 active:scale-95 cursor-pointer shadow-2xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User account menu"
      >
        {userImage ? (
          <Image
            src={userImage}
            alt={userName}
            width={24}
            height={24}
            unoptimized
            referrerPolicy="no-referrer"
            className="w-6 h-6 rounded-full object-cover border border-emerald-300"
          />
        ) : (
          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0 shadow-2xs">
            {initial}
          </div>
        )}

        <span className="text-xs font-semibold max-w-[90px] sm:max-w-[110px] truncate">
          {userName}
        </span>

        <ChevronDown
          className={`w-3.5 h-3.5 text-emerald-700 stroke-[2.5] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-white shadow-xl ring-1 ring-slate-900/5 border border-slate-100 p-2 z-50 animate-in fade-in-50 zoom-in-95 duration-150 origin-top-right divide-y divide-slate-100"
        >
          <div className="px-3 py-2.5 pb-3">
            <div className="flex items-center gap-3">
              {userImage ? (
                <Image
                  src={userImage}
                  alt={userName}
                  width={38}
                  height={38}
                  unoptimized
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-2xs">
                  {initial}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-slate-900 truncate">
                  {userName}
                </span>
                <span className="text-[11px] text-slate-500 truncate" title={userEmail}>
                  {userEmail}
                </span>
              </div>
            </div>

            <div className="mt-2.5 flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                {userRole}
              </span>
            </div>
          </div>

          <div className="py-1.5 space-y-0.5">
            <Link
              href="/profile"
              onClick={closeDropdown}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 rounded-xl hover:bg-slate-50 hover:text-emerald-700 transition-colors cursor-pointer group"
              role="menuitem"
            >
              <User className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors stroke-[2]" />
              <span>My Profile</span>
            </Link>

            <Link
              href="/orders"
              onClick={closeDropdown}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 rounded-xl hover:bg-slate-50 hover:text-emerald-700 transition-colors cursor-pointer group"
              role="menuitem"
            >
              <Package className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors stroke-[2]" />
              <span>My Orders</span>
            </Link>

            <Link
              href="/wishlist"
              onClick={closeDropdown}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 rounded-xl hover:bg-slate-50 hover:text-emerald-700 transition-colors cursor-pointer group"
              role="menuitem"
            >
              <Heart className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors stroke-[2]" />
              <span>Wishlist</span>
            </Link>

            <Link
              href="/cart"
              onClick={closeDropdown}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 rounded-xl hover:bg-slate-50 hover:text-emerald-700 transition-colors cursor-pointer group"
              role="menuitem"
            >
              <ShoppingCart className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors stroke-[2]" />
              <span>Shopping Cart</span>
            </Link>
          </div>

          <div className="pt-1.5">
            <button
              type="button"
              onClick={async () => {
                closeDropdown();
                await signOut({ redirect: false });
                window.location.href = "/";
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 rounded-xl hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer group"
              role="menuitem"
            >
              <LogOut className="w-4 h-4 text-red-500 group-hover:text-red-700 transition-colors stroke-[2]" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
