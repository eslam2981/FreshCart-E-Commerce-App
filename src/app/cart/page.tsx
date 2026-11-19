import { Metadata } from "next";
import CartView from "@/components/Cart/CartView";

export const metadata: Metadata = {
  title: "My Cart - FreshCart",
  description: "Review your cart items and proceed to checkout.",
};

export default function CartPage() {
  return <CartView />;
}

