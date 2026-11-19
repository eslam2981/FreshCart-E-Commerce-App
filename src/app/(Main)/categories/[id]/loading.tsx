import { Skeleton } from "@/components/ui/skeleton";
import { Layers } from "lucide-react";

export default function CategorySubcategoriesLoading() {
  return (
    <div className="w-full bg-slate-50/50 min-h-screen pb-16">
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 text-white">
        <div className="max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-14">
          <nav
            className="flex items-center gap-2 text-xs sm:text-sm text-white/80 mb-6 font-medium"
            aria-label="Breadcrumb"
          >
            <span>Home</span>
            <span className="text-white/60">/</span>
            <span>Categories</span>
            <span className="text-white/60">/</span>
            <span className="text-white font-semibold">Loading</span>
          </nav>

          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shadow-lg ring-1 ring-white/30 shrink-0">
              <Layers className="w-7 h-7 sm:w-8 sm:h-8 text-white stroke-[2.2]" />
            </div>
            <div>
              <Skeleton className="h-8 w-44 sm:w-56 bg-white/30 rounded-lg mb-2" />
              <p className="text-xs sm:text-sm text-white/90 font-medium">
                Choose a subcategory to browse products
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-10">
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 flex flex-col justify-between shadow-xs"
            >
              <Skeleton className="w-10 h-10 rounded-xl bg-slate-200/80 mb-4" />
              <div>
                <Skeleton className="h-5 w-3/4 rounded-md bg-slate-200/80 mb-2" />
                <Skeleton className="h-3.5 w-1/2 rounded-md bg-slate-200/80" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
