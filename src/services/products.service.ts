import { ProductsResponse } from "@/interfaces/product";

export interface GetProductsParams {
  page?: number;
  limit?: number;
  sort?: string;
  category?: string;
  brand?: string;
  keyword?: string;
}

export default async function getAllProducts(params: GetProductsParams = {}): Promise<ProductsResponse> {
  const query = new URLSearchParams();
  const BASE_URL = process.env.BASE_URL || "https://ecommerce.routemisr.com";
  if (params.page) query.set("page", params.page.toString());
  if (params.limit) query.set("limit", params.limit.toString());
  if (params.sort) query.set("sort", params.sort);
  if (params.category) query.set("category[in]", params.category);
  if (params.brand) query.set("brand", params.brand);
  if (params.keyword) query.set("keyword", params.keyword);

  const queryString = query.toString() ? `?${query.toString()}` : "";

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/products${queryString}`,
      {
        next: {
          revalidate: 60 * 15,
        },
      }
    );

    if (!response.ok) {
      return {
        results: 0,
        metadata: { currentPage: 1, numberOfPages: 1, limit: params.limit || 10 },
        data: [],
      };
    }

    return response.json();
  } catch {
    return {
      results: 0,
      metadata: { currentPage: 1, numberOfPages: 1, limit: params.limit || 10 },
      data: [],
    };
  }
}