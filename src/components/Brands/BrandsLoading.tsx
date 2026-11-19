import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function BrandsLoading() {
  return (
    <div className="grid grid-cols-2 min-[480px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-3xl border-2 border-slate-200/90 p-5 flex flex-col items-center justify-between space-y-4 shadow-xs"
        >
          <div className="w-full aspect-square rounded-2xl bg-slate-100 border border-slate-200/70 p-4 flex items-center justify-center">
            <Skeleton className="w-full h-full rounded-xl bg-slate-200/80" />
          </div>
          <div className="w-full space-y-2 flex flex-col items-center">
            <Skeleton className="h-4 w-24 rounded-md bg-slate-200/80" />
            <Skeleton className="h-3 w-16 rounded-md bg-slate-200/60" />
          </div>
        </div>
      ))}
    </div>
  );
}
