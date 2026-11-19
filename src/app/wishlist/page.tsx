import { Metadata } from "next";
import WishlistView from "@/components/Wishlist/WishlistView";

export const metadata: Metadata = {
  title: "My Wishlist - FreshCart",
  description: "View and manage your saved favorite products on FreshCart.",
};

export default function WishlistPage() {
  return <WishlistView />;
}
