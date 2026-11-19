"use client";

import React, { useState } from "react";
import {
  Mail,
  Leaf,
  Truck,
  Tag,
  ArrowRight,
  Smartphone,
  Star,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function NewsletterAppBanner() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 2500);
  };

  return (
    <section
      aria-label="Newsletter and Mobile App"
      className="w-full max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-10"
    >
      <div className="relative bg-gradient-to-br from-emerald-50/50 via-white to-emerald-50/30 rounded-3xl border border-emerald-100/80 shadow-xs p-6 sm:p-8 lg:p-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch relative z-10">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/25 shrink-0">
                  <Mail className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-600 tracking-wider uppercase">
                    NEWSLETTER
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    50,000+ subscribers
                  </div>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-slate-900 tracking-tight leading-tight">
                Get the Freshest Updates{" "}
                <span className="text-emerald-600">Delivered Free</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-500 mt-2.5 font-normal leading-relaxed">
                Weekly recipes, seasonal offers &amp; exclusive member perks.
              </p>

              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 my-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70 shadow-2xs">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Fresh Picks Weekly</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70 shadow-2xs">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free Delivery Codes</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70 shadow-2xs">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Members-Only Deals</span>
                </span>
              </div>
            </div>

            <div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 max-w-xl"
              >
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all shadow-xs"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribed}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 cursor-pointer disabled:bg-emerald-700 shrink-0"
                >
                  {isSubscribed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                    </>
                  )}
                </button>
              </form>

              <div className="flex items-center gap-1.5 mt-3 text-[11px] text-slate-400 font-medium">
                <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                <span>Unsubscribe anytime. No spam, ever.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-full bg-[#0d1624] rounded-2xl p-6 sm:p-7 text-white flex flex-col justify-between overflow-hidden shadow-xl border border-slate-800/80">
              <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/70 text-emerald-400 border border-emerald-500/30 mb-4">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>MOBILE APP</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Shop Faster on Our App
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                  Get app-exclusive deals &amp; 15% off your first order.
                </p>

                <div className="space-y-2.5 mt-6">
                  <a
                    href="https://apple.com/app-store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 px-4 py-3 rounded-xl bg-slate-800/85 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/60 transition-all duration-200 group shadow-xs"
                  >
                    <svg
                      className="w-6 h-6 fill-white shrink-0 group-hover:scale-105 transition-transform"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.67-.82 1.13-1.96.99-3.1-.98.04-2.18.66-2.88 1.48-.61.71-1.15 1.87-1 2.99 1.1.09 2.22-.55 2.89-1.37z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider leading-none">
                        Download on
                      </div>
                      <div className="text-sm font-bold text-white leading-tight mt-0.5 group-hover:text-emerald-400 transition-colors">
                        App Store
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://play.google.com/store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 px-4 py-3 rounded-xl bg-slate-800/85 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/60 transition-all duration-200 group shadow-xs"
                  >
                    <svg
                      className="w-6 h-6 fill-white shrink-0 group-hover:scale-105 transition-transform"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3.609 1.814L13.793 12 3.61 22.186a1.99 1.99 0 0 1-.61-1.425V3.24c0-.537.22-1.03.61-1.426zM15.207 13.414l2.138 2.138-11.45 6.611 9.312-8.75zM17.345 8.448l-2.138 2.138-9.312-8.75 11.45 6.612zm1.482 1.483l3.074 1.775a1.5 1.5 0 0 1 0 2.588l-3.074 1.775-2.217-2.217 2.217-2.221z" />
                    </svg>
                    <div className="text-left">
                      <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider leading-none">
                        Get it on
                      </div>
                      <div className="text-sm font-bold text-white leading-tight mt-0.5 group-hover:text-emerald-400 transition-colors">
                        Google Play
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-6 pt-5 border-t border-slate-800/80">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-slate-200">
                  4.9{" "}
                  <span className="text-slate-400 font-normal">
                    Â· 100K+ downloads
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
