"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Product } from "@/interfaces/product";
import {
  getLoggedUserWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
} from "@/services/wishlist.service";

interface WishlistContextType {
  wishlistItems: Product[];
  wishlistIds: string[];
  wishlistCount: number;
  isLoading: boolean;
  addToWishlist: (productId: string) => Promise<boolean>;
  removeFromWishlist: (productId: string) => Promise<boolean>;
  isInWishlist: (productId: string) => boolean;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const token = session?.token;

  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch wishlist
  const fetchWishlist = useCallback(async () => {
    if (!token) {
      setWishlistItems([]);
      setWishlistIds([]);
      return;
    }

    try {
      setIsLoading(true);
      const res = await getLoggedUserWishlist(token);

      if (res.status === "success" && Array.isArray(res.data)) {
        setWishlistItems(res.data);
        setWishlistIds(res.data.map((item) => item._id || item.id));
      } else {
        setWishlistItems([]);
        setWishlistIds([]);
      }
    } catch (error) {
      console.error("Fetch Wishlist Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Sync wishlist when session changes
  useEffect(() => {
    let ignore = false;

    if (status === "authenticated" && token) {
      queueMicrotask(() => {
        if (!ignore) {
          void fetchWishlist();
        }
      });
    } else if (status === "unauthenticated") {
      queueMicrotask(() => {
        if (!ignore) {
          setWishlistItems([]);
          setWishlistIds([]);
        }
      });
    }

    return () => {
      ignore = true;
    };
  }, [status, token, fetchWishlist]);

  // Add to wishlist
  const addToWishlist = async (productId: string): Promise<boolean> => {
    if (!token) return false;

    try {
      const res = await addProductToWishlist(productId, token);
      if (res.status === "success") {
        setWishlistIds(res.data || []);
        void fetchWishlist();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Add To Wishlist Error:", error);
      return false;
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (productId: string): Promise<boolean> => {
    if (!token) return false;

    try {
      const res = await removeProductFromWishlist(productId, token);
      if (res.status === "success") {
        setWishlistIds(res.data || []);
        setWishlistItems((prev) =>
          prev.filter((item) => (item._id || item.id) !== productId)
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error("Remove From Wishlist Error:", error);
      return false;
    }
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlistIds.includes(productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistIds,
        wishlistCount: wishlistItems.length,
        isLoading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        refreshWishlist: fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
