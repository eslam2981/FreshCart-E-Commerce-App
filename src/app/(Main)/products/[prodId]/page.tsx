import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import getProductDetails from "@/services/productDetails.service";
import getAllProducts from "@/services/products.service";
import ProductDetailsView from "@/components/ProductDetails/ProductDetailsView";
import ProductCard from "@/components/ProductCard/ProductCard";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { Product } from "@/interfaces/product";
import { Home, ChevronRight } from "lucide-react";

interface ProductDetailsPageProps {
  params: Promise<{ prodId: string }>;
}

export async function generateMetadata({params}: ProductDetailsPageProps): Promise<Metadata> {
  const { prodId } = await params;
  try {
    const product = await getProductDetails(prodId);
    return {
      title: `${product.title} - FreshCart Online Supermarket`,
      description: product.description?.slice(0, 160) || "Product details",
      openGraph: {
        images: product.imageCover ? [product.imageCover] : [],
      },
    };
  } catch {
    return {
      title: "Product Details - FreshCart",
    };
  }
}

export default async function ProductDetails({params}: ProductDetailsPageProps) {
  const { prodId } = await params;

  let product: Product;
  try {
    product = await getProductDetails(prodId);
  } catch {
    notFound();
  }

  if (!product) {
    notFound();
  }

  let relatedProducts: Product[] = [];
  try {
    if (product.category?._id) {
      const relatedRes = await getAllProducts({category: product.category._id,limit: 6});
      relatedProducts = (relatedRes?.data || []).filter(
        (p) => p._id !== product._id
      );
    }
  } catch {
    relatedProducts = [];
  }

  return (
    <div className="w-full bg-slate-50/50 min-h-screen pb-16">
      <div className="max-w-[1650px] mx-auto px-2.5 sm:px-6 lg:px-8 xl:px-12 py-5 sm:py-7">
        <nav
          className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6 sm:mb-8 font-medium overflow-x-auto scrollbar-none pb-1"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors shrink-0"
          >
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span>Home</span>
          </Link>

          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

          <Link
            href="/products"
            className="hover:text-emerald-600 transition-colors shrink-0"
          >
            Products
          </Link>

          {product.category?.name && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <Link
                href={`/products?category=${product.category._id}`}
                className="hover:text-emerald-600 transition-colors shrink-0"
              >
                {product.category.name}
              </Link>
            </>
          )}

          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

          <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md">
            {product.title}
          </span>
        </nav>

        <ProductDetailsView product={product} />

        {relatedProducts.length > 0 && (
          <section className="mt-16 sm:mt-20 pt-10 border-t border-slate-200/80">
            <SectionHeader
              title="Related"
              highlight="Products"
              actionText="View All Products"
              actionHref="/products"
            />

            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5 mt-6">
              {relatedProducts.slice(0, 5).map((relatedProduct) => (
                <ProductCard key={relatedProduct._id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
