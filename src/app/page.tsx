import { Suspense } from "react";
import Carousel from "@/components/Carousel/Carousel";
import CarouselLoading from "@/components/Carousel/loading";
import Features from "@/components/Features/Features";
import Categories from "@/components/HomeCategories/Categories";
import CategoriesLoading from "@/components/HomeCategories/loading";
import PromoBanners from "@/components/PromoBanners/PromoBanners";
import BestSellerProducts from "@/components/BestSellerProducts/BestSellerProducts";
import BestSellerLoading from "@/components/BestSellerProducts/loading";
import NewsletterAppBanner from "@/components/NewsletterAppBanner/NewsletterAppBanner";

export default function Home() {
  return (
    <main className="w-full pb-16">
      <Suspense fallback={<CarouselLoading />}>
        <Carousel />
      </Suspense>
      <Features />
      <Suspense fallback={<CategoriesLoading />}>
        <Categories />
      </Suspense>
      <PromoBanners />
      <Suspense fallback={<BestSellerLoading />}>
        <BestSellerProducts />
      </Suspense>
      <NewsletterAppBanner />
    </main>
  );
}
