import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Brand } from "@/interfaces/product";
import { ArrowRight } from "lucide-react";

interface BrandCardProps {
  brand: Brand;
}

export default function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link
      href={`/products?brand=${brand._id}`}
      className="group bg-white rounded-3xl border-2 border-slate-200/90 hover:border-emerald-500 p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden relative shadow-xs"
    >
      <div className="relative w-full aspect-square rounded-2xl bg-white border border-slate-100 overflow-hidden mb-4 p-4 flex items-center justify-center group-hover:border-emerald-200 transition-colors">
        {brand.image ? (
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <span className="text-xl font-black text-slate-400">{brand.name[0]}</span>
        )}
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <h3 className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-1">
          {brand.name}
        </h3>
        <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-2 opacity-80 group-hover:opacity-100 transition-opacity">
          <span>View Products</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
