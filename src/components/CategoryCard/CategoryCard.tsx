import Image from "next/image";
import Link from "next/link";
import { Category } from "@/interfaces/product";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category._id}`}
      className="group bg-white rounded-2xl border border-slate-100 hover:border-emerald-400 p-4 sm:p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:shadow-xl cursor-pointer"
    >
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 mb-3.5">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center pt-1">
        <h2 className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-1">
          {category.name}
        </h2>
        <div className="h-5 flex items-center justify-center mt-1">
          <span className="text-xs font-semibold text-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 flex items-center justify-center gap-1">
            View Subcategories →
          </span>
        </div>
      </div>
    </Link>
  );
}
