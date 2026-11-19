import React from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import getAllCategories from "@/services/category.service";

interface Category {
  _id: string;
  name: string;
  slug?: string;
  image: string;
}

export default async function Categories() {
  const response = await getAllCategories(6);
  const categories: Category[] = response?.data || [];

  return (
    <section
      aria-label="Shop By Category"
      className="w-full max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-10"
    >
      <SectionHeader
        title="Shop By"
        highlight="Category"
        actionText="View All Categories"
        actionHref="/categories"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-3 sm:mb-4 bg-slate-50 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-300">
              <Image
                src={category.image}
                alt={category.name}
                width={96}
                height={96}
                className="w-full h-full object-cover rounded-full"
                
              />
            </div>
            <h3 className="text-xs sm:text-sm font-medium text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}