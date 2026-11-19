import getBestSellerProducts from "@/services/bestseller.service";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Product } from "@/interfaces/product";

export default async function BestSellerProducts() {
  const response = await getBestSellerProducts(10);
  const bestSeller: Product[] = response?.data || [];

  return (
    <section
      aria-label="Best Seller Products"
      className="w-full max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-10"
    >
      <SectionHeader
        title="Best Seller"
        highlight="Products"
        actionText="View All Products"
        actionHref="/products"
      />

      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5 mt-6">
        {bestSeller.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}