import getAllCategories from "@/services/category.service";
import { Category } from "@/interfaces/product";
import CategoryCard from "@/components/CategoryCard/CategoryCard";

export default async function CategoriesList() {
  const response = await getAllCategories();
  const categories: Category[] = response?.data || [];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
      {categories.map((category) => (
        <CategoryCard key={category._id} category={category} />
      ))}
    </div>
  );
}
