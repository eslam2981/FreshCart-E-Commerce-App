import { Metadata } from "next";
import OrdersView from "@/components/Orders/OrdersView";

export const metadata: Metadata = {
  title: "My Orders - FreshCart Online Supermarket",
  description: "View your past orders, delivery status, and purchase history at FreshCart.",
};

export default function OrdersPage() {
  return <OrdersView isStripeRedirect={false} />;
}
