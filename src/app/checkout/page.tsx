import { Metadata } from "next";
import CheckoutView from "@/components/Checkout/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout - FreshCart",
  description: "Complete your grocery order with secure payment options at FreshCart.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
