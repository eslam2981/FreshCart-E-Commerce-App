import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function WishlistSkeleton() {
  return (
    <div className="min-h-[70vh] bg-slate-50/60 py-8 sm:py-12">
      <div className="max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between mb-8 pb-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-2xl bg-slate-200/90" />
            <div>
              <Skeleton className="h-7 w-40 rounded-xl bg-slate-200/90 mb-2" />
              <Skeleton className="h-3.5 w-52 rounded-lg bg-slate-200/70" />
            </div>
          </div>
          <Skeleton className="h-5 w-32 rounded-lg bg-slate-200/70" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="relative w-full aspect-square rounded-2xl bg-slate-100 border border-slate-200/80 overflow-hidden p-3 flex items-center justify-center">
                <Skeleton className="w-full h-full rounded-xl bg-slate-200/80" />
                <div className="absolute top-3 right-3">
                  <Skeleton className="w-9 h-9 rounded-full bg-slate-300/80" />
                </div>
              </div>

              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-4 w-20 rounded-md bg-slate-200/80" />
                    <Skeleton className="h-4 w-12 rounded-md bg-slate-200/80" />
                  </div>
                  <Skeleton className="h-4 w-full rounded-md bg-slate-200/90 mb-1.5" />
                  <Skeleton className="h-4 w-3/4 rounded-md bg-slate-200/80" />
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                  <div className="space-y-1.5">
                    <Skeleton className="h-5 w-24 rounded-md bg-slate-200/90" />
                    <Skeleton className="h-3.5 w-16 rounded-md bg-slate-200/70" />
                  </div>
                  <Skeleton className="h-10 w-28 rounded-xl bg-slate-200/90 shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
