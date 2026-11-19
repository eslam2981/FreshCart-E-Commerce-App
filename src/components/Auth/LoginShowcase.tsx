import Image from "next/image";
import { Sparkles, ShieldCheck } from "lucide-react";
import groceryBanner from "@/assets/images/signIn-banner.png";

export default function LoginShowcase() {
  return (
    <div className="lg:col-span-6 xl:col-span-6 relative hidden lg:flex flex-col justify-between p-10 xl:p-12 text-white overflow-hidden bg-gradient-to-br from-[#042f24] via-[#064232] to-[#02231c]">
      <Image
        src={groceryBanner}
        alt="Fresh Groceries in shopping bag"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover object-center scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#042f24]/95 via-slate-950/45 to-[#042f24]/75 pointer-events-none" />
      <div className="absolute inset-0 bg-emerald-950/25 mix-blend-multiply pointer-events-none" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-white w-fit shadow-xs">
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span>100% Farm Fresh Quality</span>
        </div>
      </div>

      <div className="relative z-10 space-y-5 max-w-xl">
        <div>
          <h2 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Freshness You Deserve, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400">
              Delivered in Minutes.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-200/90 mt-2.5 leading-relaxed">
            Join thousands of happy households shopping fresh organic produce, daily pantry essentials, and farm-fresh dairy with guaranteed 30-min express delivery.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              ★ 4.9
            </div>
            <div>
              <div className="text-xs font-bold text-white">50K+ Happy Customers</div>
              <div className="text-[11px] text-emerald-200/80">30-min express chilled delivery</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Quality</span>
          </div>
        </div>
      </div>
    </div>
  );
}
