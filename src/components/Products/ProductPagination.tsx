"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ProductPaginationProps {
  currentPage: number;
  numberOfPages: number;
}

function ProductPaginationContent({
  currentPage,
  numberOfPages,
}: ProductPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (numberOfPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `/products?${params.toString()}`;
  };

  const handlePageChange = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: number
  ) => {
    e.preventDefault();
    if (page < 1 || page > numberOfPages || page === currentPage) return;
    router.push(createPageUrl(page));
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 120, behavior: "smooth" });
    }
  };

  const getPageItems = () => {
    const items: (number | "ellipsis")[] = [];

    if (numberOfPages <= 7) {
      for (let i = 1; i <= numberOfPages; i++) {
        items.push(i);
      }
      return items;
    }

    items.push(1);

    if (currentPage > 3) {
      items.push("ellipsis");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(numberOfPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      items.push(i);
    }

    if (currentPage < numberOfPages - 2) {
      items.push("ellipsis");
    }

    items.push(numberOfPages);

    return items;
  };

  const pageItems = getPageItems();

  return (
    <div className="mt-10 pt-6 border-t border-slate-100 flex justify-center w-full">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}
              onClick={(e) => handlePageChange(e, currentPage - 1)}
              aria-disabled={currentPage <= 1}
              className={
                currentPage <= 1
                  ? "pointer-events-none opacity-40 select-none"
                  : "cursor-pointer hover:text-emerald-600 transition-colors"
              }
            />
          </PaginationItem>

          {pageItems.map((item, index) => {
            if (item === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            const page = item;
            const isActive = page === currentPage;

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href={createPageUrl(page)}
                  isActive={isActive}
                  onClick={(e) => handlePageChange(e, page)}
                  className={`cursor-pointer transition-all ${
                    isActive
                      ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white border-emerald-600 font-bold shadow-xs"
                      : "text-slate-700 hover:text-emerald-600 hover:bg-emerald-50"
                  }`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href={currentPage < numberOfPages ? createPageUrl(currentPage + 1) : "#"}
              onClick={(e) => handlePageChange(e, currentPage + 1)}
              aria-disabled={currentPage >= numberOfPages}
              className={
                currentPage >= numberOfPages
                  ? "pointer-events-none opacity-40 select-none"
                  : "cursor-pointer hover:text-emerald-600 transition-colors"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default function ProductPagination(props: ProductPaginationProps) {
  return (
    <Suspense fallback={null}>
      <ProductPaginationContent {...props} />
    </Suspense>
  );
}
