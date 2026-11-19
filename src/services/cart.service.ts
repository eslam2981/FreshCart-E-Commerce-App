import { CartResponse } from "@/interfaces/cart";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BASE_URL ||
  "https://ecommerce.routemisr.com";

// Get user cart
export async function getLoggedUserCart(token: string): Promise<CartResponse> {
  const res = await fetch(`${BASE_URL}/api/v2/cart`, {
    headers: {
      token,
    },
  });

  const data: CartResponse = await res.json();
  return data;
}

// Add product to cart
export async function addProductToCart(
  productId: string,
  token: string
): Promise<CartResponse> {
  const res = await fetch(`${BASE_URL}/api/v2/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ productId }),
  });

  const data: CartResponse = await res.json();
  return data;
}

// Update item quantity
export async function updateCartProductQuantity(
  productId: string,
  count: number,
  token: string
): Promise<CartResponse> {
  const res = await fetch(`${BASE_URL}/api/v2/cart/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ count }),
  });

  const data: CartResponse = await res.json();
  return data;
}

// Remove item from cart
export async function removeProductFromCart(
  productId: string,
  token: string
): Promise<CartResponse> {
  const res = await fetch(`${BASE_URL}/api/v2/cart/${productId}`, {
    method: "DELETE",
    headers: {
      token,
    },
  });

  const data: CartResponse = await res.json();
  return data;
}

// Clear cart
export async function clearUserCart(
  token: string
): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/api/v2/cart`, {
    method: "DELETE",
    headers: {
      token,
    },
  });

  const data = await res.json();
  return data;
}

// Apply coupon to cart
export async function applyCouponToCart(
  couponName: string,
  token: string
): Promise<CartResponse> {
  const res = await fetch(`${BASE_URL}/api/v2/cart/applyCoupon`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ coupon: couponName }),
  });

  const data: CartResponse = await res.json();
  return data;
}


