"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Cart } from "@/interfaces/cart";
import {
  getLoggedUserCart,
  addProductToCart,
  updateCartProductQuantity,
  removeProductFromCart,
  clearUserCart,
  applyCouponToCart,
} from "@/services/cart.service";

interface CartContextType {
  cartData: Cart | null;
  cartCount: number;
  isLoading: boolean;
  addToCart: (productId: string) => Promise<boolean>;
  updateCount: (productId: string, count: number) => Promise<boolean>;
  removeItem: (productId: string) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  applyCoupon: (couponName: string) => Promise<{ success: boolean; message?: string }>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const token = session?.token;

  const [cartData, setCartData] = useState<Cart | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch cart data
  const fetchCart = useCallback(async () => {
    if (!token) {
      setCartData(null);
      setCartCount(0);
      return;
    }

    try {
      setIsLoading(true);
      const data = await getLoggedUserCart(token);

      if (data.status === "success") {
        setCartData(data.data);
        setCartCount(data.numOfCartItems ?? 0);
      } else {
        setCartData(null);
        setCartCount(0);
      }
    } catch (error) {
      console.error("Fetch Cart Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Sync cart when session changes
  useEffect(() => {
    let ignore = false;

    if (status === "authenticated" && token) {
      queueMicrotask(() => {
        if (!ignore) {
          void fetchCart();
        }
      });
    } else if (status === "unauthenticated") {
      queueMicrotask(() => {
        if (!ignore) {
          setCartData(null);
          setCartCount(0);
        }
      });
    }

    return () => {
      ignore = true;
    };
  }, [status, token, fetchCart]);

  // Add to cart
  const addToCart = async (productId: string): Promise<boolean> => {
    if (!token) {
      console.warn("Cannot add to cart: User token is missing. Session:", session);
      return false;
    }

    try {
      const data = await addProductToCart(productId, token);
      console.log("Add to Cart API response:", data);

      if (data.status === "success") {
        setCartData(data.data);
        setCartCount(data.numOfCartItems ?? 0);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Add To Cart Error:", error);
      return false;
    }
  };

  // Update item quantity
  const updateCount = async (productId: string, count: number): Promise<boolean> => {
    if (!token) return false;

    try {
      const data = await updateCartProductQuantity(productId, count, token);

      if (data.status === "success") {
        setCartData(data.data);
        setCartCount(data.numOfCartItems ?? 0);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Update Cart Error:", error);
      return false;
    }
  };

  // Remove item
  const removeItem = async (productId: string): Promise<boolean> => {
    if (!token) return false;

    try {
      const data = await removeProductFromCart(productId, token);

      if (data.status === "success") {
        setCartData(data.data);
        setCartCount(data.numOfCartItems ?? 0);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Remove Item Error:", error);
      return false;
    }
  };

  // Clear cart
  const clearCart = async (): Promise<boolean> => {
    if (!token) return false;

    try {
      const data = await clearUserCart(token);

      if (data.message === "success") {
        setCartData(null);
        setCartCount(0);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Clear Cart Error:", error);
      return false;
    }
  };

  // Apply coupon code
  const applyCoupon = async (
    couponName: string
  ): Promise<{ success: boolean; message?: string }> => {
    if (!token) return { success: false, message: "Please sign in first." };

    try {
      const data = await applyCouponToCart(couponName, token);
      if (data.status === "success") {
        setCartData(data.data);
        setCartCount(data.numOfCartItems ?? 0);
        return { success: true, message: "Coupon applied successfully!" };
      }
      return {
        success: false,
        message: data.message || "Invalid or expired coupon code.",
      };
    } catch {
      return { success: false, message: "Failed to apply coupon. Try again." };
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartData,
        cartCount,
        isLoading,
        addToCart,
        updateCount,
        removeItem,
        clearCart,
        applyCoupon,
        refreshCart: fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
