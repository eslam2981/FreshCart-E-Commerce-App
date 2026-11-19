import { Product } from "@/interfaces/product";

const BASE_URL = process.env.BASE_URL || "https://ecommerce.routemisr.com";

export default async function getProductDetails(id: string): Promise<Product> {
  const response = await fetch(`${BASE_URL}/api/v1/products/${id}`, {
    next: {
      revalidate: 60 * 60 * 24 * 30,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }

  const result = await response.json();
  return result.data;
}