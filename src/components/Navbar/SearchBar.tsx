"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

function SearchBarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentKeyword = searchParams.get("keyword") || "";

  const [query, setQuery] = useState(currentKeyword);
  const [prevKeyword, setPrevKeyword] = useState(currentKeyword);

  if (prevKeyword !== currentKeyword) {
    setPrevKeyword(currentKeyword);
    setQuery(currentKeyword);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/products?keyword=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/products");
    }
  };

  const handleClear = () => {
    setQuery("");
    if (searchParams.has("keyword")) {
      router.push("/products");
    }
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="relative flex items-center w-full h-10 sm:h-11 md:h-12 bg-slate-50/90 hover:bg-white focus-within:bg-white border border-slate-200/90 rounded-full transition-all duration-200 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600/15 shadow-xs"
    >
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products, brands and more..."
        className="w-full h-full pl-4 sm:pl-5 md:pl-6 pr-18 sm:pr-20 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-transparent rounded-full border-none outline-none focus:outline-none"
        aria-label="Search store products"
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-10 sm:right-12 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Clear search text"
        >
          <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
        </button>
      )}

      <button
        type="submit"
        aria-label="Submit search"
        className="absolute right-1 sm:right-1.5 w-8 sm:w-9 md:w-9.5 h-8 sm:h-9 md:h-9.5 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white flex items-center justify-center shrink-0 transition-colors duration-150 cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-1"
      >
        <Search className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[2.5]" />
      </button>
    </form>
  );
}

export default function SearchBar() {
  return (
    <Suspense
      fallback={
        <div className="relative flex items-center w-full h-10 sm:h-11 md:h-12 bg-slate-50/90 border border-slate-200/90 rounded-full shadow-xs">
          <input
            type="search"
            disabled
            placeholder="Search for products, brands and more..."
            className="w-full h-full pl-4 sm:pl-5 md:pl-6 pr-18 sm:pr-20 text-xs sm:text-sm text-slate-400 bg-transparent rounded-full border-none outline-none"
          />
          <div className="absolute right-1 sm:right-1.5 w-8 sm:w-9 md:w-9.5 h-8 sm:h-9 md:h-9.5 rounded-full bg-emerald-600 flex items-center justify-center text-white">
            <Search className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[2.5]" />
          </div>
        </div>
      }
    >
      <SearchBarContent />
    </Suspense>
  );
}
