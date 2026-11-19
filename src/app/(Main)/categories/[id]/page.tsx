import Link from "next/link";
import { notFound } from "next/navigation";
import { getSingleCategory,getSubcategories } from "@/services/category.service";
import { Layers, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { Category, Subcategory } from "@/interfaces/product";

interface CategoryDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function SubcategoriesPage({ params }: CategoryDetailsPageProps) {
  const { id } = await params;

  let category: Category | null = null;
  let subcategories: Subcategory[] = [];

  try {
    category = await getSingleCategory(id);
    subcategories = await getSubcategories(id);
  } catch {
    notFound();
  }

  if (!category) {
    notFound();
  }

  return (
    <div className="w-full bg-slate-50/50 min-h-screen pb-16">
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 text-white">
        <div className="max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12 py-10 sm:py-14">
          <nav
            className="flex items-center gap-2 text-xs sm:text-sm text-white/80 mb-6 font-medium overflow-x-auto scrollbar-none pb-1"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="hover:text-white transition-colors shrink-0"
            >
              Home
            </Link>
            <span className="text-white/60">/</span>
            <Link
              href="/categories"
              className="hover:text-white transition-colors shrink-0"
            >
              Categories
            </Link>
            <span className="text-white/60">/</span>
            <span className="text-white font-semibold truncate max-w-xs sm:max-w-md">
              {category.name}
            </span>
          </nav>

          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shadow-lg ring-1 ring-white/30 shrink-0">
              <Layers className="w-7 h-7 sm:w-8 sm:h-8 text-white stroke-[2.2]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                {category.name}
              </h1>
              <p className="text-xs sm:text-sm text-white/90 mt-1 font-medium">
                Choose a subcategory to browse products
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12 py-8 sm:py-10">
        <div className="mb-6">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Categories</span>
          </Link>
        </div>

        {subcategories.length > 0 ? (
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
            {subcategories.map((sub) => (
              <Link
                key={sub._id}
                href={`/products?category=${category._id}`}
                className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-400 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Tag className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-2">
                    {sub.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 group-hover:text-emerald-600 transition-colors">
                    <span>View Products</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 text-center max-w-lg mx-auto">
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              No Subcategories Available
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              You can explore all products available in {category.name} directly
            </p>
            <Link
              href={`/products?category=${category._id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors"
            >
              <span>Explore {category.name} Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}