import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsLoading() {
  return (
    <div className="w-full bg-slate-50/50 min-h-screen pb-16">
      <div className="max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12 py-5 sm:py-7">
        <div className="flex items-center gap-2 mb-6 sm:mb-8">
          <Skeleton className="h-4 w-12 rounded-md bg-slate-200/90" />
          <Skeleton className="h-4 w-4 rounded-md bg-slate-200/90" />
          <Skeleton className="h-4 w-16 rounded-md bg-slate-200/90" />
          <Skeleton className="h-4 w-4 rounded-md bg-slate-200/90" />
          <Skeleton className="h-4 w-32 rounded-md bg-slate-200/90" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-4">
            <div className="relative w-full aspect-square rounded-2xl bg-white border border-slate-200 p-6 flex items-center justify-center">
              <Skeleton className="w-full h-full rounded-xl bg-slate-200/90" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-200/90 shrink-0" />
              <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-200/90 shrink-0" />
              <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-200/90 shrink-0" />
            </div>
          </div>

          <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-24 rounded-full bg-slate-200/90" />
              <Skeleton className="h-6 w-28 rounded-full bg-slate-200/90" />
            </div>

            <Skeleton className="h-8 sm:h-10 w-3/4 rounded-xl bg-slate-200/90" />
            <Skeleton className="h-4 w-40 rounded-md bg-slate-200/90" />

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 mt-2">
              <Skeleton className="h-9 w-36 rounded-lg bg-slate-200/90" />
              <Skeleton className="h-4 w-52 rounded-md bg-slate-200/90" />
            </div>

            <div className="space-y-2 mt-2">
              <Skeleton className="h-4 w-full rounded-md bg-slate-200/90" />
              <Skeleton className="h-4 w-5/6 rounded-md bg-slate-200/90" />
              <Skeleton className="h-4 w-2/3 rounded-md bg-slate-200/90" />
            </div>

            <div className="flex items-center gap-3 mt-4">
              <Skeleton className="h-12 flex-1 rounded-xl bg-slate-200/90" />
              <Skeleton className="h-12 w-12 rounded-xl bg-slate-200/90 shrink-0" />
              <Skeleton className="h-12 w-12 rounded-xl bg-slate-200/90 shrink-0" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              <Skeleton className="h-16 rounded-xl bg-slate-200/90" />
              <Skeleton className="h-16 rounded-xl bg-slate-200/90" />
              <Skeleton className="h-16 rounded-xl bg-slate-200/90" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
