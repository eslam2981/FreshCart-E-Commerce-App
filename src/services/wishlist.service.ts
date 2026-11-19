import { Product } from "@/interfaces/product";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BASE_URL ||
  "https://ecommerce.routemisr.com";

export interface WishlistResponse {
  status: string;
  count?: number;
  message?: string;
  data: Product[];
}

export interface WishlistActionResponse {
  status: string;
  message: string;
  data: string[];
}

// Get user wishlist
export async function getLoggedUserWishlist(token: string): Promise<WishlistResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/wishlist`, {
    headers: {
      token,
    },
  });

  return res.json();
}

// Add product to wishlist
export async function addProductToWishlist(
  productId: string,
  token: string
): Promise<WishlistActionResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ productId }),
  });

  return res.json();
}

// Remove product from wishlist
export async function removeProductFromWishlist(
  productId: string,
  token: string
): Promise<WishlistActionResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      token,
    },
  });

  return res.json();
}
