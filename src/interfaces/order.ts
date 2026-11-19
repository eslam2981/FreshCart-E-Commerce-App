export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface CheckoutSessionResponse {
  status: string;
  session?: {
    url: string;
    success_url?: string;
    cancel_url?: string;
  };
  message?: string;
}

export interface CashOrderResponse {
  status: string;
  data?: {
    _id: string;
    totalOrderPrice: number;
    paymentMethodType: "cash" | "card";
    isPaid: boolean;
    isDelivered: boolean;
    createdAt: string;
  };
  message?: string;
}

export interface OrderItem {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    ratingsAverage?: number;
    category?: { name: string };
  };
}

export interface UserOrder {
  _id: string;
  id: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  cartItems: OrderItem[];
  shippingAddress?: ShippingAddress;
}
