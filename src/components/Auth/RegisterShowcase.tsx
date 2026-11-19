import Image from "next/image";
import {
  Sparkles,
  Zap,
  ShoppingBag,
  HeartHandshake,
  Star,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import groceryBanner from "@/assets/images/grocery-banner.png";

export default function RegisterShowcase() {
  return (
    <div className="lg:col-span-6 xl:col-span-6 relative hidden lg:flex flex-col justify-center p-8 sm:p-10 xl:p-12 text-white overflow-hidden bg-gradient-to-br from-[#042f24] via-[#064232] to-[#02231c]">
      <Image
        src={groceryBanner}
        alt="Fresh Groceries in shopping bag"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover object-center opacity-25 pointer-events-none scale-105 mix-blend-luminosity"
      />

      <div className="absolute -top-24 -left-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-6 xl:gap-7">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-xs font-semibold text-emerald-300 w-fit shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
          <span>Egypt&apos;s #1 Online Fresh Supermarket</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl xl:text-[34px] font-extrabold tracking-tight text-white leading-[1.25]">
            Fresh Quality Food, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400">
              Delivered in 30 Minutes.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-lg">
            Experience Cairo&apos;s premier grocery market. Handpicked farm vegetables, organic fruits, butcher-cut meats, and pantry essentials delivered chilled to your doorstep.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-emerald-400/30 transition-all flex flex-col gap-1 shadow-sm">
            <div className="w-7 h-7 rounded-lg bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-white">30-Min Delivery</span>
            <span className="text-[10px] text-emerald-200/70 leading-tight">Chilled express to your kitchen</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-emerald-400/30 transition-all flex flex-col gap-1 shadow-sm">
            <div className="w-7 h-7 rounded-lg bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-white">100% Farm Fresh</span>
            <span className="text-[10px] text-emerald-200/70 leading-tight">Daily from certified organic farms</span>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-emerald-400/30 transition-all flex flex-col gap-1 shadow-sm">
            <div className="w-7 h-7 rounded-lg bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-white">Guaranteed</span>
            <span className="text-[10px] text-emerald-200/70 leading-tight">100% fresh or instant refund</span>
          </div>
        </div>

        <div className="pt-3 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15">
                <div className="flex -space-x-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <span className="text-xs font-extrabold text-white ml-1">4.9 / 5</span>
              </div>
              <span className="text-xs text-emerald-100/90 font-medium">
                15,000+ Happy Households
              </span>
            </div>
            <span className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Reviews
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-white/[0.09] backdrop-blur-md border border-white/15 shadow-md flex flex-col justify-between hover:bg-white/[0.13] transition-all">
              <p className="text-[11px] text-emerald-50 leading-relaxed italic">
                &ldquo;FreshCart changed our grocery routine completely. Produce arrives crisp, super clean, and within 30 minutes!&rdquo;
              </p>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center shadow-xs">
                    S
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-white leading-tight">Sarah Mansour</h5>
                    <p className="text-[9px] text-emerald-200/70">New Cairo</p>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-emerald-300 flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Verified
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.09] backdrop-blur-md border border-white/15 shadow-md flex flex-col justify-between hover:bg-white/[0.13] transition-all">
              <p className="text-[11px] text-emerald-50 leading-relaxed italic">
                &ldquo;The best bakery and dairy delivery in Cairo. Everything arrives fresh, oven-warm, and packaged with extreme care.&rdquo;
              </p>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold text-[10px] flex items-center justify-center shadow-xs">
                    A
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-white leading-tight">Ahmed Tarek</h5>
                    <p className="text-[9px] text-emerald-200/70">Maadi, Cairo</p>
                  </div>
                </div>
                <span className="text-[10px] font-medium text-emerald-300 flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  Verified
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-emerald-200/70 pt-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </span>
            <span>Cash on Delivery & Cards Accepted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
