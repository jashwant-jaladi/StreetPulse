import { create } from "zustand";
import { persist } from "zustand/middleware";

const useShopStore = create(
  persist(
    (set, get) => ({
      shops: [], 
      wishlist: [],

      // Set shops data
      setShops: (shops) => set({ shops }),

      // Fetch shops from API
      fetchShops: async () => {
        try {
          const response = await fetch("/api/shops");
          if (!response.ok) {
            throw new Error("Failed to fetch shops");
          }
          const data = await response.json();
          set({ shops: data });
        } catch (error) {
          console.error("Error fetching shops:", error);
        }
      },
      updateShopRating: (shopId, newRating, noOfRatings) => {
        set((state) => ({
          shops: state.shops.map((shop) =>
            shop.id === shopId
              ? { ...shop, rating: newRating, noOfRatings }
              : shop
          ),
        }));
      },

      // Fetch wishlist from the server
      fetchWishlist: async (userId) => {
        try {
          const response = await fetch(`/api/wishlist?userId=${userId}`, {
            method: 'GET', // Explicitly setting the GET method
          });
      
          if (!response.ok) {
            throw new Error("Failed to fetch wishlist");
          }
      
          const data = await response.json();
          set({ wishlist: data });
          return data;
        } catch (error) {
          console.error("Error fetching wishlist:", error);
          return [];
        }
      },
      
      // Add an item to the wishlist via the API
      addToWishlist: async (userId, shopId) => {
        try {
          const response = await fetch("/api/wishlist", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ shopId, userId }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to add product to wishlist");
          }

          const newItem = await response.json();
          
          // Update local state and persist
          set((state) => {
            const updatedWishlist = [...state.wishlist, newItem];
            return { wishlist: updatedWishlist };
          });

          return newItem;
        } catch (error) {
          console.error("Error adding product to wishlist:", error);
          throw error;
        }
      },
      updateShopRating: (shopId, newRating, noOfRatings) => {
        set((state) => ({
          shops: state.shops.map((shop) =>
            shop.id === shopId
              ? { ...shop, rating: newRating, noOfRatings }
              : shop
          ),
        }));
      },

      // Remove an item from the wishlist via the API
      removeFromWishlist: async (userId, shopId) => {
        try {
          const response = await fetch("/api/wishlist", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ shopId, userId }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to remove product from wishlist");
          }

          // Update local state by filtering out the removed item
          set((state) => ({
            wishlist: state.wishlist.filter((item) => 
              !(item.shopId === shopId && item.userId === userId)
            )
          }));
        } catch (error) {
          console.error("Error removing product from wishlist:", error);
          throw error;
        }
      },
    }),
    {
      name: "shop-storage", // name of the item in localStorage
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      partialize: (state) => ({
        wishlist: state.wishlist, // Only persist wishlist
      }),
    }
  )
);

export default useShopStore;