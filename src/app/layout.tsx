import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "@/components/ui/toast";
import getAllCategories from "@/services/category.service";
import { Category } from "@/interfaces/product";
import Providers from "@/shared/Providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "FreshCart - Online Grocery & Supermarket",
  description: "Shop fresh groceries, produce, and daily essentials with fast delivery at FreshCart.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let categories: Category[] = [];
  try {
    const response = await getAllCategories(6);
    categories = response?.data || [];
  } catch (error) {
    console.error("Failed to fetch categories in RootLayout:", error);
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="min-h-screen antialiased"
    >
      <body className="min-h-screen flex flex-col bg-white text-slate-800 font-sans w-full">
        <Providers>
          <Navbar categories={categories} />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
