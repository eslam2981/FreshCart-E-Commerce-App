import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="w-full max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-10">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-4 w-12 bg-slate-200/90 rounded-md" />
        <span className="text-slate-300">/</span>
        <Skeleton className="h-4 w-16 bg-slate-200/90 rounded-md" />
      </div>

      <div className="mb-8">
        <Skeleton className="h-8 w-48 sm:w-64 bg-slate-200/90 rounded-xl mb-2" />
        <Skeleton className="h-4 w-64 sm:w-96 bg-slate-200/90 rounded-md" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
        <aside className="hidden lg:block w-64 xl:w-72 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
            <Skeleton className="h-5 w-24 bg-slate-200/90 rounded-md mb-4" />
            <div className="flex flex-col gap-2.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-9 w-full bg-slate-200/90 rounded-xl" />
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1 w-full">
          <div className="h-14 w-full bg-white rounded-2xl border border-slate-200/80 p-3.5 mb-6 flex items-center justify-between shadow-xs">
            <Skeleton className="h-4 w-32 bg-slate-200/90 rounded-md" />
            <Skeleton className="h-8 w-36 bg-slate-200/90 rounded-xl" />
          </div>

          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-300 p-3.5 sm:p-4 flex flex-col justify-between shadow-xs"
              >
                <div className="relative w-full aspect-square rounded-xl bg-slate-100/80 mb-3 overflow-hidden flex items-center justify-center">
                  <Skeleton className="w-full h-full bg-slate-200/90" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-3 w-20 bg-slate-200/90 rounded-md" />
                  <Skeleton className="h-4 w-full bg-slate-200/90 rounded-md" />
                  <Skeleton className="h-3.5 w-24 bg-slate-200/90 rounded-md" />
                  <div className="flex items-center justify-between mt-3 pt-2">
                    <Skeleton className="h-5 w-16 bg-slate-200/90 rounded-md" />
                    <Skeleton className="w-9 h-9 rounded-full bg-slate-200/90" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
