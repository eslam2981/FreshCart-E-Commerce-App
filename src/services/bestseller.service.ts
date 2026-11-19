import { ProductsResponse } from "@/interfaces/product";
const BASE_URL = process.env.BASE_URL || "https://ecommerce.routemisr.com";

export default async function getBestSellerProducts(limit: number): Promise<ProductsResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/products?limit=${limit}&sort=-sold`,
      {
        next: {
          revalidate: 60 * 60 * 24 * 30,
        },
      }
    );

    if (!response.ok) {
      return { results: 0, metadata: { currentPage: 1, numberOfPages: 1, limit }, data: [] };
    }

    return response.json();
  } catch {
    return { results: 0, metadata: { currentPage: 1, numberOfPages: 1, limit }, data: [] };
  }
}

