import React from "react";
import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

interface FeatureItem {
  icon: React.ElementType;
  title: string;
  description: string;
  containerClass: string;
  iconClass: string;
}

const featuresData: FeatureItem[] = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "On orders over 500 EGP",
    containerClass:
      "bg-gradient-to-br from-blue-50 to-indigo-50/80 border-blue-100/80 text-blue-600 shadow-blue-500/5 group-hover:border-blue-200 group-hover:shadow-blue-500/15",
    iconClass: "text-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure transactions",
    containerClass:
      "bg-gradient-to-br from-emerald-50 to-teal-50/80 border-emerald-100/80 text-emerald-600 shadow-emerald-500/5 group-hover:border-emerald-200 group-hover:shadow-emerald-500/15",
    iconClass: "text-emerald-600",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "14-day return policy",
    containerClass:
      "bg-gradient-to-br from-amber-50 to-orange-50/80 border-amber-100/80 text-amber-600 shadow-amber-500/5 group-hover:border-amber-200 group-hover:shadow-amber-500/15",
    iconClass: "text-amber-600",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated support team",
    containerClass:
      "bg-gradient-to-br from-purple-50 to-indigo-50/80 border-purple-100/80 text-purple-600 shadow-purple-500/5 group-hover:border-purple-200 group-hover:shadow-purple-500/15",
    iconClass: "text-purple-600",
  },
];

export default function Features() {
  return (
    <section
      aria-label="Store Features"
      className="w-full max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-3 sm:py-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {featuresData.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="group bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex items-center gap-4 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 cursor-default"
            >
              <div
                className={`w-12 h-12 sm:w-13 sm:h-13 rounded-2xl border flex items-center justify-center shrink-0 shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-0.5 ${feature.containerClass}`}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 stroke-[1.9] transition-transform duration-300 ${feature.iconClass}`} />
              </div>

              <div className="flex flex-col">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-slate-950 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-normal">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
