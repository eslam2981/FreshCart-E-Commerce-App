import React from "react";
import getAllBrands from "@/services/brands.service";
import BrandCard from "./BrandCard";

export default async function BrandsList() {
  const res = await getAllBrands(40);
  const brands = res?.data || [];

  return (
    <div className="grid grid-cols-2 min-[480px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
      {brands.map((brand) => (
        <BrandCard key={brand._id} brand={brand} />
      ))}
    </div>
  );
}
