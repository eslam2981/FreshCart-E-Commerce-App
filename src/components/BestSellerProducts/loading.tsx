import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";

export default function BestSellerLoading() {
  return (
    <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-10">
      <SectionHeader
        title="Best Seller"
        highlight="Products"
      />

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5 mt-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-slate-300 p-3.5 sm:p-4 flex flex-col justify-between shadow-xs"
          >
            <div className="relative w-full aspect-square rounded-xl bg-slate-100/80 mb-3 overflow-hidden flex items-center justify-center">
              <Skeleton className="w-full h-full bg-slate-200/90" />
              <div className="absolute top-2 right-2 flex flex-col gap-1.5">
                <Skeleton className="w-7 h-7 rounded-full bg-slate-200/90" />
                <Skeleton className="w-7 h-7 rounded-full bg-slate-200/90" />
                <Skeleton className="w-7 h-7 rounded-full bg-slate-200/90" />
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <Skeleton className="h-3 w-20 rounded-md bg-slate-200/90 mb-1.5" />
                <Skeleton className="h-4 w-full rounded-md bg-slate-200/90 mb-2" />
                <div className="flex items-center gap-1.5 mt-2">
                  <Skeleton className="h-3.5 w-20 rounded-md bg-slate-200/90" />
                  <Skeleton className="h-3 w-10 rounded-md bg-slate-200/90" />
                </div>
              </div>

              <div className="mt-3 pt-2.5 flex items-center justify-between gap-2">
                <Skeleton className="h-5 w-20 rounded-md bg-slate-200/90" />
                <Skeleton className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-200/90 shrink-0" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
