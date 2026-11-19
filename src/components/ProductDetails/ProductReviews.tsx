"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  getProductReviews,
  createProductReview,
  deleteProductReview,
} from "@/services/review.service";
import { Review } from "@/interfaces/review";
import { toast } from "@/components/ui/toast";
import {
  Star,
  MessageSquare,
  Plus,
  Trash2,
  Loader2,
  ShieldCheck,
} from "lucide-react";

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { data: session } = useSession();
  const token = session?.token;
  const currentUserId = session?.user?.id;

  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [ratings, setRatings] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [showAddReview, setShowAddReview] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getProductReviews(productId);
      if (res?.data && Array.isArray(res.data)) {
        setReviews(res.data);
      } else {
        setReviews([]);
      }
    } catch {
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    let ignore = false;
    queueMicrotask(() => {
      if (!ignore) {
        void fetchReviews();
      }
    });
    return () => {
      ignore = true;
    };
  }, [fetchReviews]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!reviewText.trim()) {
      toast.add({
        type: "error",
        description: "Please write a review comment.",
        timeout: 3000,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await createProductReview(
        productId,
        { ratings, text: reviewText.trim() },
        token
      );

      if (res.data || res.message === "success") {
        toast.add({
          type: "success",
          description: "Thank you! Your review has been submitted.",
          timeout: 3000,
        });
        setReviewText("");
        setShowAddReview(false);
        void fetchReviews();
      } else {
        toast.add({
          type: "error",
          description: res.errors?.[0]?.msg || res.message || "Failed to submit review.",
          timeout: 3000,
        });
      }
    } catch {
      toast.add({
        type: "error",
        description: "Something went wrong submitting review.",
        timeout: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!token) return;

    try {
      setDeletingId(reviewId);
      await deleteProductReview(reviewId, token);
      toast.add({
        type: "success",
        description: "Review removed.",
        timeout: 2500,
      });
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
    } catch {
      toast.add({
        type: "error",
        description: "Failed to delete review.",
        timeout: 3000,
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Customer Reviews</h2>
            <p className="text-xs text-slate-400">
              {reviews.length} verified rating{reviews.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {token ? (
          <button
            type="button"
            onClick={() => setShowAddReview(!showAddReview)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddReview ? "Cancel" : "Write a Review"}</span>
          </button>
        ) : (
          <Link
            href={`/login?callbackUrl=/products/${productId}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            Sign in to write a review
          </Link>
        )}
      </div>

      {showAddReview && (
        <form
          onSubmit={handleSubmitReview}
          className="mt-6 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6"
        >
          <h3 className="text-sm font-bold text-slate-900 mb-4">Rate & Review this product</h3>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Your Rating
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRatings(star)}
                  className="p-1 cursor-pointer transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= (hoverRating || ratings)
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-300"
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-slate-600 ml-2">
                {ratings} / 5
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Review Comment *
            </label>
            <textarea
              required
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your thoughts about this product's quality, taste, or freshness..."
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddReview(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Submit Review
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="py-12 flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
          </div>
          <p className="text-sm font-bold text-slate-800">No customer reviews yet</p>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Be the first to share your experience with this product!
          </p>
        </div>
      ) : (
        <div className="mt-6 divide-y divide-slate-100">
          {reviews.map((rev) => {
            const isOwner = rev.user?._id === currentUserId;
            const reviewerName = rev.user?.name || "Customer";
            const initial = reviewerName.charAt(0).toUpperCase();

            return (
              <div key={rev._id} className="py-5 first:pt-2 last:pb-2 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0 border border-slate-200">
                    {initial}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-slate-900">{reviewerName}</span>
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md font-semibold">
                        <ShieldCheck className="w-3 h-3" />
                        Verified
                      </span>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.round(rev.ratings)
                              ? "text-amber-400 fill-amber-400"
                              : "text-slate-200 fill-slate-100"
                          }`}
                        />
                      ))}
                      <span className="text-[11px] text-slate-400 ml-1.5 font-mono">
                        {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : ""}
                      </span>
                    </div>

                    {rev.text && (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                        {rev.text}
                      </p>
                    )}
                  </div>
                </div>

                {isOwner && (
                  <button
                    type="button"
                    onClick={() => handleDeleteReview(rev._id)}
                    disabled={deletingId === rev._id}
                    className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors cursor-pointer shrink-0"
                    title="Delete review"
                  >
                    {deletingId === rev._id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
