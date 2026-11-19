import React from "react";
import { Truck, ShieldCheck, RotateCcw } from "lucide-react";

export default function ProductGuarantees() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8 pt-6 border-t border-slate-100">
      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
        <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
        <div className="text-xs">
          <div className="font-bold text-slate-800">Free Shipping</div>
          <div className="text-slate-500">Orders 500+ EGP</div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
        <div className="text-xs">
          <div className="font-bold text-slate-800">100% Genuine</div>
          <div className="text-slate-500">Quality checked</div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60">
        <RotateCcw className="w-5 h-5 text-emerald-600 shrink-0" />
        <div className="text-xs">
          <div className="font-bold text-slate-800">Easy Returns</div>
          <div className="text-slate-500">14-day policy</div>
        </div>
      </div>
    </div>
  );
}
