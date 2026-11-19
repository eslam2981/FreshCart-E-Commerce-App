"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Tag,
  Headphones,
} from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div className="relative min-h-[calc(100vh-140px)] flex items-center justify-center py-10 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-emerald-50/25 via-white to-emerald-50/15 overflow-hidden select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-teal-100/30 rounded-full blur-2xl pointer-events-none" />

      <div className="absolute top-8 left-8 sm:top-14 sm:left-24 opacity-40 text-emerald-500 pointer-events-none animate-float-slow">
        <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.75c.61-.74 1.02-1.76.91-2.78-.88.04-1.95.59-2.57 1.32-.55.63-.99 1.66-.86 2.66.97.08 1.91-.46 2.52-1.2z" />
        </svg>
      </div>

      <div className="absolute top-12 right-10 sm:top-18 sm:right-28 opacity-40 text-emerald-500 pointer-events-none -rotate-45 animate-float-reverse">
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.71 2.29a1 1 0 0 0-1.42 0l-2.83 2.83-1.42-1.42a1 1 0 0 0-1.41 1.42l1.41 1.41-1.83 1.83a6.5 6.5 0 0 0-8.87.35l-.09.09a6.5 6.5 0 0 0 .35 8.87l6.36 6.36a1 1 0 0 0 1.42 0L21.71 8.87a6.5 6.5 0 0 0 0-9.19v2.61zm-8.88 15.74L8 13.2l5.17-5.17 4.83 4.83-5.17 5.17z" />
        </svg>
      </div>

      <div className="absolute top-1/2 left-6 sm:left-20 opacity-30 text-emerald-500 pointer-events-none animate-float">
        <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
      </div>

      <div className="absolute top-1/2 right-6 sm:right-20 opacity-35 text-emerald-500 pointer-events-none animate-float-slow">
        <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      <div className="absolute bottom-16 left-8 sm:bottom-24 sm:left-24 opacity-35 text-emerald-500 pointer-events-none rotate-12 animate-float-reverse">
        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V13h-2v3.93A8 8 0 0 1 4.07 11H8V9H4.07A8 8 0 0 1 11 4.07V8h2V4.07A8 8 0 0 1 19.93 11H16v2h3.93A8 8 0 0 1 13 16.93z" />
        </svg>
      </div>

      <div className="absolute bottom-14 right-10 sm:bottom-20 sm:right-24 opacity-40 text-emerald-500 pointer-events-none animate-float">
        <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
        </svg>
      </div>

      <div className="relative max-w-3xl w-full mx-auto text-center flex flex-col items-center z-10 py-2 sm:py-4">
        <div className="relative mb-4 sm:mb-5 group cursor-default">
          <div className="relative z-10 w-40 h-36 sm:w-48 sm:h-42 bg-white/95 backdrop-blur-xs rounded-3xl sm:rounded-[2.25rem] shadow-[0_20px_45px_rgba(16,185,129,0.12)] border border-slate-100 flex items-center justify-center animate-float hover:scale-105 transition-transform duration-300">
            <svg
              className="w-18 h-18 sm:w-22 sm:h-22 text-emerald-400 fill-emerald-400 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105"
              viewBox="0 0 24 24"
            >
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </div>

          <div className="absolute -top-3 -right-3 sm:-top-3.5 sm:-right-3.5 z-20 w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500 text-white font-black text-xs sm:text-sm rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/35 ring-4 ring-white animate-bounce [animation-duration:2.5s] select-none">
            404
          </div>

          <div className="w-32 sm:w-40 h-3.5 bg-emerald-900/10 rounded-full blur-xs mx-auto mt-2.5 animate-shadow-breathe" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-3 text-emerald-500 hover:scale-110 transition-transform">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <svg
            className="w-4 h-2 text-emerald-500"
            viewBox="0 0 16 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M2 2C4.5 6 11.5 6 14 2" />
          </svg>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2 leading-tight">
          Oops! Nothing Here
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed mb-6 font-normal">
          Looks like this page went out of stock! Don&apos;t worry, there&apos;s plenty more fresh content to explore.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-7 sm:mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-xs sm:text-sm shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/30 transition-all duration-150"
          >
            <Home className="w-4 h-4 stroke-[2.2]" />
            <span>Go to Homepage</span>
          </Link>

          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-slate-50 active:scale-95 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all duration-150 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
            <span>Go Back</span>
          </button>
        </div>

        <div className="w-full max-w-xl sm:max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 px-6 sm:px-8 py-4 sm:py-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-center transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          <p className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-3 select-none">
            POPULAR DESTINATIONS
          </p>

          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
            <Link
              href="/products"
              className="group inline-flex items-center gap-1.5 px-4 py-1.5 sm:py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold whitespace-nowrap shrink-0 transition-all hover:scale-105 active:scale-95 shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>All Products</span>
            </Link>

            <Link
              href="/categories"
              className="group inline-flex items-center gap-1.5 px-4 py-1.5 sm:py-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-semibold border border-slate-100/90 whitespace-nowrap shrink-0 transition-all hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              <span>Categories</span>
            </Link>

            <Link
              href="/products"
              className="group inline-flex items-center gap-1.5 px-4 py-1.5 sm:py-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-semibold border border-slate-100/90 whitespace-nowrap shrink-0 transition-all hover:scale-105 active:scale-95"
            >
              <Tag className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 transition-colors" />
              <span>Today&apos;s Deals</span>
            </Link>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 px-4 py-1.5 sm:py-2 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-semibold border border-slate-100/90 whitespace-nowrap shrink-0 transition-all hover:scale-105 active:scale-95"
            >
              <Headphones className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
