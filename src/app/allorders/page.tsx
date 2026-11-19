import { Metadata } from "next";
import OrdersView from "@/components/Orders/OrdersView";

export const metadata: Metadata = {
  title: "Order Placed - FreshCart Online Supermarket",
  description: "Thank you for your purchase at FreshCart.",
};

export default function AllOrdersPage() {
  return <OrdersView isStripeRedirect={true} />;
}
