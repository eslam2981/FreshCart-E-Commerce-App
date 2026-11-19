export interface ReviewUser {
  _id: string;
  name: string;
  email?: string;
}

export interface Review {
  _id: string;
  text?: string;
  ratings: number;
  user: ReviewUser;
  product: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ReviewsResponse {
  results?: number;
  metadata?: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  data: Review[];
}

export interface SingleReviewResponse {
  message?: string;
  data: Review;
  errors?: {
    msg: string;
    param: string;
  }[];
}
