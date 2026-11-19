import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesListLoading() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 flex flex-col items-center justify-between text-center shadow-xs"
        >
          <Skeleton className="w-full aspect-square rounded-2xl bg-slate-200/80 mb-3.5" />
          <div className="w-full flex flex-col items-center justify-center gap-1.5 py-1">
            <Skeleton className="h-4 w-24 sm:w-28 rounded-md bg-slate-200/80" />
          </div>
        </div>
      ))}
    </div>
  );
}
