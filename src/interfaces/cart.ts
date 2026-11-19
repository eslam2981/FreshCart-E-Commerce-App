import { Category, Brand, Subcategory } from "./product";

export interface CartProduct {
  _id: string;
  id?: string;
  title: string;
  slug?: string;
  quantity?: number;
  imageCover: string;
  ratingsAverage?: number;
  category?: Category;
  brand?: Brand;
  subcategory?: Subcategory[];
  price?: number;
  priceAfterDiscount?: number;
}

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: CartProduct;
}

export interface Cart {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  totalCartPrice: number;
  totalPriceAfterDiscount?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface CartResponse {
  status: string;
  message?: string;
  numOfCartItems: number;
  cartId?: string;
  data: Cart;
}
