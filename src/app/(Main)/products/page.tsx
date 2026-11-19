import Link from "next/link";
import getAllProducts from "@/services/products.service";
import getAllCategories from "@/services/category.service";
import { getSingleBrand } from "@/services/brands.service";
import ProductCard from "@/components/ProductCard/ProductCard";
import ProductFilters from "@/components/Products/ProductFilters";
import ProductSort from "@/components/Products/ProductSort";
import ProductPagination from "@/components/Products/ProductPagination";
import { Product, Brand } from "@/interfaces/product";
import { PackageOpen, ChevronRight, Home as HomeIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Products - FreshCart Online Supermarket",
  description: "Browse our hand-picked collection of groceries, electronics, fashion, and daily essentials at FreshCart.",
};

interface ProductsPageProps {
  searchParams: Promise<{
    page?: string;
    sort?: string;
    category?: string;
    brand?: string;
    keyword?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page) || 1;
  const activeSort = resolvedParams?.sort || "";
  const activeCategory = resolvedParams?.category || "";
  const activeBrand = resolvedParams?.brand || "";
  const activeKeyword = resolvedParams?.keyword || "";

  const categoriesRes = await getAllCategories();
  const categories = categoriesRes?.data || [];

  let activeBrandObj: Brand | null = null;
  if (activeBrand) {
    try {
      activeBrandObj = await getSingleBrand(activeBrand);
    } catch {
      activeBrandObj = null;
    }
  }

  const productsRes = await getAllProducts({
    page: currentPage,
    limit: 12,
    sort: activeSort || undefined,
    category: activeCategory || undefined,
    brand: activeBrand || undefined,
    keyword: activeKeyword || undefined,
  });

  const products: Product[] = productsRes?.data || [];
  const totalResults = productsRes?.results || 0;
  const numberOfPages = productsRes?.metadata?.numberOfPages || 1;

  const activeCategoryObj = categories.find(
    (c: { _id: string }) => c._id === activeCategory
  );

  return (
    <div className="w-full bg-slate-50/50 min-h-screen pb-16">
      <div className="max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-8">
        <nav
          className="flex items-center gap-2.5 text-sm sm:text-base text-slate-600 mb-6 sm:mb-8 font-medium"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-600 transition-colors"
          >
            <HomeIcon className="w-4 h-4 text-slate-400" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <Link
            href="/products"
            className={`transition-colors ${
              !activeCategory && !activeBrand && !activeKeyword
                ? "text-slate-900 font-bold"
                : "text-slate-500 hover:text-emerald-600"
            }`}
          >
            Products
          </Link>
          {activeCategoryObj && (
            <>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200/60 text-sm">
                Category: {activeCategoryObj.name}
              </span>
            </>
          )}
          {activeBrandObj && (
            <>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200/60 text-sm">
                Brand: {activeBrandObj.name}
              </span>
            </>
          )}
          {activeKeyword && (
            <>
              <ChevronRight className="w-4 h-4 text-slate-400" />
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200/60 text-sm">
                &ldquo;{activeKeyword}&rdquo;
              </span>
            </>
          )}
        </nav>

        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3.5">
            <span className="w-2 h-9 sm:h-11 bg-emerald-600 rounded-full shrink-0" />
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-slate-900 tracking-tight">
              {activeCategoryObj
                ? activeCategoryObj.name
                : activeBrandObj
                ? activeBrandObj.name
                : activeKeyword
                ? `Results for "${activeKeyword}"`
                : "All Products"}
            </h1>
          </div>
          <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-3xl leading-relaxed font-normal">
            {activeBrandObj
              ? `Browse authentic products from ${activeBrandObj.name} available at FreshCart.`
              : "Explore our wide range of groceries, fresh essentials, and premium products delivered straight to your door with guaranteed freshness."}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
          <ProductFilters
            categories={categories}
            activeCategory={activeCategory}
            totalProducts={totalResults}
          />

          <main className="flex-1 w-full">
            <ProductSort
              totalResults={totalResults}
              currentCount={products.length}
              activeSort={activeSort}
            />

            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4 md:gap-5">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                <ProductPagination
                  currentPage={currentPage}
                  numberOfPages={numberOfPages}
                />
              </>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200/90 p-10 sm:p-14 flex flex-col items-center justify-center text-center shadow-xs">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <PackageOpen className="w-8 h-8 stroke-[1.8]" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                  No products found
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-5">
                  We couldn&apos;t find any products matching your selected filter criteria. Try choosing another category or resetting filters.
                </p>
                <Link
                  href="/products"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
                >
                  Clear All Filters
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
