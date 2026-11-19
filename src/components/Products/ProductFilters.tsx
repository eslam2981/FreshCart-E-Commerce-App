"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, RotateCcw, Check } from "lucide-react";

interface CategoryItem {
  _id: string;
  name: string;
}

interface ProductFiltersProps {
  categories: CategoryItem[];
  activeCategory?: string;
  totalProducts: number;
}

export default function ProductFilters({
  categories,
  activeCategory,
  totalProducts,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleCategorySelect = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryId) {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }
    params.set("page", "1"); 
    router.push(`/products?${params.toString()}`);
    setMobileDrawerOpen(false);
  };

  const handleClearFilters = () => {
    router.push("/products");
    setMobileDrawerOpen(false);
  };

  const hasActiveFilters = Boolean(activeCategory);

  const filterContent = (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
            Categories
          </h3>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs sm:text-sm text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        <div className="flex flex-col gap-1.5 pt-3">
          <button
            type="button"
            onClick={() => handleCategorySelect(null)}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm sm:text-[15px] font-medium transition-colors cursor-pointer text-left ${
              !activeCategory
                ? "bg-emerald-50 text-emerald-700 font-bold shadow-2xs"
                : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span>All Categories</span>
            {!activeCategory && <Check className="w-4.5 h-4.5 text-emerald-600 stroke-[2.5]" />}
          </button>

          {categories.map((cat) => {
            const isSelected = activeCategory === cat._id;
            return (
              <button
                key={cat._id}
                type="button"
                onClick={() => handleCategorySelect(cat._id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm sm:text-[15px] font-medium transition-colors cursor-pointer text-left ${
                  isSelected
                    ? "bg-emerald-50 text-emerald-700 font-bold shadow-2xs"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="line-clamp-1">{cat.name}</span>
                {isSelected && (
                  <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="lg:hidden flex items-center justify-between gap-3 w-full mb-4">
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white shadow-xs text-xs sm:text-sm font-semibold text-slate-800 active:scale-95 transition-all cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 stroke-[2]" />
          <span>Filters {hasActiveFilters ? "(Active)" : ""}</span>
        </button>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="px-3 py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 text-xs font-semibold hover:bg-rose-100 transition-colors cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      <aside className="hidden lg:block w-64 xl:w-72 shrink-0 sticky top-32 self-start z-10 transition-all duration-300">
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          {filterContent}
        </div>
      </aside>

      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden flex justify-end"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          <div className="relative w-full max-w-xs bg-white h-full z-10 shadow-2xl flex flex-col p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                <h2 className="font-bold text-base text-slate-900">Filters</h2>
              </div>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                aria-label="Close filters"
              >
                <X className="w-5 h-5 stroke-[2]" />
              </button>
            </div>

            {filterContent}

            <div className="mt-auto pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-xs cursor-pointer"
              >
                View {totalProducts} Products
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
