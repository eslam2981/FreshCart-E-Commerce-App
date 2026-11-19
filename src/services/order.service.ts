import {
  ShippingAddress,
  CheckoutSessionResponse,
  CashOrderResponse,
  UserOrder,
} from "@/interfaces/order";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.BASE_URL ||
  "https://ecommerce.routemisr.com";

// Create Stripe checkout session
export async function createCheckoutSession(
  cartId: string,
  shippingAddress: ShippingAddress,
  token: string,
  returnUrl: string
): Promise<CheckoutSessionResponse> {
  const res = await fetch(
    `${BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${encodeURIComponent(returnUrl)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({ shippingAddress }),
    }
  );

  return res.json();
}

// Create cash on delivery order
export async function createCashOrder(
  cartId: string,
  shippingAddress: ShippingAddress,
  token: string
): Promise<CashOrderResponse> {
  const res = await fetch(`${BASE_URL}/api/v1/orders/${cartId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token,
    },
    body: JSON.stringify({ shippingAddress }),
  });

  return res.json();
}

// Get user orders
export async function getUserOrders(userId: string): Promise<UserOrder[]> {
  const res = await fetch(`${BASE_URL}/api/v1/orders/user/${userId}`);
  return res.json();
}
