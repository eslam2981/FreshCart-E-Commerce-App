"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown, ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductSortProps {
  totalResults: number;
  currentCount: number;
  activeSort?: string;
}

const sortOptions = [
  { value: "", label: "Featured" },
  { value: "-sold", label: "Best Selling" },
  { value: "-ratingsAverage", label: "Top Rated" },
  { value: "price", label: "Price: Low to High" },
  { value: "-price", label: "Price: High to Low" },
  { value: "-createdAt", label: "Newest Arrivals" },
];

export default function ProductSort({
  totalResults,
  currentCount,
  activeSort = "",
}: ProductSortProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newSort) {
      params.set("sort", newSort);
    } else {
      params.delete("sort");
    }
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

  const activeSortOption =
    sortOptions.find((opt) => opt.value === activeSort) || sortOptions[0];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-xs mb-6">
      <div className="text-sm sm:text-base text-slate-700 font-medium">
        Showing{" "}
        <span className="font-extrabold text-slate-900">{currentCount}</span> of{" "}
        <span className="font-extrabold text-slate-900">{totalResults}</span> products
      </div>

      <div className="flex items-center gap-2.5">
        <span className="text-sm sm:text-base font-semibold text-slate-600 flex items-center gap-1.5 shrink-0">
          <ArrowUpDown className="w-4 h-4 text-slate-500 stroke-[2.2]" />
          <span>Sort by:</span>
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button
                type="button"
                className="group relative flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-800 text-sm font-bold rounded-xl px-4 py-2.5 cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-xs"
              >
                <span>{activeSortOption.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 transition-transform duration-200 stroke-[2.5] group-data-popup-open:rotate-180" />
              </button>
            }
          />

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-56 bg-white rounded-xl shadow-xl border border-slate-100 p-1.5 z-50 animate-in fade-in-0 zoom-in-95"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Sort Products By
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-100 my-1" />
              {sortOptions.map((opt) => {
                const isSelected = activeSort === opt.value;
                return (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() => handleSortChange(opt.value)}
                    className={`cursor-pointer rounded-lg px-3 py-2 text-xs sm:text-sm flex items-center justify-between transition-colors ${
                      isSelected
                        ? "bg-emerald-50 text-emerald-700 font-bold"
                        : "text-slate-700 hover:bg-emerald-50/70 hover:text-emerald-700"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
