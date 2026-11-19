import React from "react";
import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: number;
  className?: string;
}

export default function RatingStars({
  rating,
  size = 16,
  className = "w-4 h-4",
}: RatingStarsProps) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star
          key={i}
          size={size}
          className={`${className} fill-amber-400 text-amber-400`}
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <StarHalf
          key={i}
          size={size}
          className={`${className} fill-amber-400 text-amber-400`}
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          size={size}
          className={`${className} text-slate-200 fill-slate-100`}
        />
      );
    }
  }

  return <div className="flex items-center gap-0.5">{stars}</div>;
}
