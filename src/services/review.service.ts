import { ReviewsResponse, SingleReviewResponse } from "@/interfaces/review";

const BASE_URL = process.env.BASE_URL || "https://ecommerce.routemisr.com";

export interface CreateReviewPayload {
  ratings: number;
  text: string;
}

// Get reviews for a specific product
export async function getProductReviews(productId: string): Promise<ReviewsResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/products/${productId}/reviews`, {
    next: {
      revalidate: 60 * 5,
    },
  });

  return res.json();
}

// Create review for a product
export async function createProductReview(
  productId: string,
  payload: CreateReviewPayload,
  token: string
): Promise<SingleReviewResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/products/${productId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify(payload),
  });

  return res.json();
}

// Delete review
export async function deleteProductReview(
  reviewId: string,
  token: string
): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/api/v1/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
      token,
    },
  });

  return res.json();
}
