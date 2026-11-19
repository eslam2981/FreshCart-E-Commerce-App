import { Skeleton } from "@/components/ui/skeleton";

export default function CartSkeleton() {
  return (
    <div className="min-h-[60vh] bg-slate-50/60 py-8 sm:py-12">
      <div className="max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <Skeleton className="w-9 h-9 rounded-xl bg-slate-200/90" />
            <div className="space-y-1.5">
              <Skeleton className="h-6 w-32 bg-slate-200/90 rounded-md" />
              <Skeleton className="h-3 w-16 bg-slate-200/90 rounded-md" />
            </div>
          </div>
          <Skeleton className="h-7 w-20 bg-slate-200/90 rounded-lg" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden divide-y divide-slate-100">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex gap-4 py-5 px-4 sm:px-6"
                >
                  <Skeleton className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-200/90" />

                  <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-4/5 sm:w-3/5 bg-slate-200/90 rounded-md" />
                      <Skeleton className="h-3.5 w-24 bg-slate-200/90 rounded-md" />
                    </div>

                    <div className="flex items-center justify-between pt-3">
                      <Skeleton className="h-8 w-24 rounded-xl bg-slate-200/90" />
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-4 w-16 bg-slate-200/90 rounded-md" />
                        <Skeleton className="w-7 h-7 rounded-lg bg-slate-200/90" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-5 space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <Skeleton className="h-5 w-32 bg-slate-200/90 rounded-md" />
                <Skeleton className="h-3 w-16 bg-slate-200/90 rounded-md mt-1.5" />
              </div>

              <div className="space-y-3 py-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20 bg-slate-200/90 rounded-md" />
                  <Skeleton className="h-4 w-16 bg-slate-200/90 rounded-md" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20 bg-slate-200/90 rounded-md" />
                  <Skeleton className="h-4 w-12 bg-slate-200/90 rounded-md" />
                </div>
                <div className="border-t border-slate-100 pt-3 flex justify-between">
                  <Skeleton className="h-5 w-16 bg-slate-200/90 rounded-md" />
                  <Skeleton className="h-6 w-24 bg-slate-200/90 rounded-md" />
                </div>
              </div>

              <Skeleton className="h-12 w-full rounded-xl bg-slate-200/90" />
              <Skeleton className="h-3.5 w-28 mx-auto bg-slate-200/90 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

