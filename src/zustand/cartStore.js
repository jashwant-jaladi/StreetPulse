import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (product) => {
    const cart = get().cart;
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // Update quantity if the item is already in the cart
      set({
        cart: cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        ),
      });
    } else {
      // Add new item to the cart
      set({ cart: [...cart, product] });
    }
  },

  removeFromCart: (productId) => {
    set({
      cart: get().cart.filter((item) => item.id !== productId),
    });
  },

  updateQuantity: (productId, quantity) => {
    set({
      cart: get().cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    });
  },
}));
export default useCartStore;
