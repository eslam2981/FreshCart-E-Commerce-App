import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesLoading() {
  return (
    <div className="w-full max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-10">
      <SectionHeader
        title="Shop By"
        highlight="Category"
        actionText="View All Categories"
        actionHref="/categories"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card
            key={index}
            className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-xs"
          >
            <CardContent className="p-0 flex flex-col items-center justify-center w-full">
              <Skeleton className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-3.5 sm:mb-4 bg-slate-200/90 shrink-0" />
              <Skeleton className="h-4 w-20 sm:w-24 rounded-md bg-slate-200/90" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
