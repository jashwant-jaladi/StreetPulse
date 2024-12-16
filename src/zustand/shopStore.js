import {create} from "zustand";

const useShopStore = create((set, get) => ({
  shops: [], // Shop products
  wishlist: [], // Wishlist products
  
  // Action to set shop products
  setShops: (shops) => set({ shops }),

  // Add to wishlist
  addToWishlist: (product) => {
    const wishlist = get().wishlist;
    if (!wishlist.find((item) => item.id === product.id)) {
      set({ wishlist: [...wishlist, product] });
    }
  },

  // Remove from wishlist
  removeFromWishlist: (productId) => {
    const wishlist = get().wishlist;
    set({ wishlist: wishlist.filter((item) => item.id !== productId) });
  },
}));
export default useShopStore;
