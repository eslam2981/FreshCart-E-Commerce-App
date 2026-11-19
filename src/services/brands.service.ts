import { Brand } from "@/interfaces/product";

const BASE_URL = process.env.BASE_URL || "https://ecommerce.routemisr.com";

export interface BrandsResponse {
  results: number;
  metadata?: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  data: Brand[];
}

export default async function getAllBrands(limit: number = 40): Promise<BrandsResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/brands?limit=${limit}`, {
    next: {
      revalidate: 60 * 60 * 24,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch brands");
  }

  return res.json();
}

export async function getSingleBrand(id: string): Promise<Brand> {
  const res = await fetch(`${BASE_URL}/api/v1/brands/${id}`, {
    next: {
      revalidate: 60 * 60 * 24,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch brand details");
  }

  const result = await res.json();
  return result.data;
}
