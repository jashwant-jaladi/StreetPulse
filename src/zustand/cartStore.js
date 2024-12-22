import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (product) => {
    const cart = get().cart;
    const existingItem = cart.find(
      (item) =>
        item.id === product.id && item.size === product.size && item.color === product.color
    );

    if (existingItem) {
      // Update quantity if the item with the same size and color exists
      set({
        cart: cart.map((item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        ),
      });
    } else {
      // Add new item with a different size or color to the cart
      set({ cart: [...cart, product] });
    }
  },

  removeFromCart: (productId, size, color) => {
    set({
      cart: get().cart.filter(
        (item) => !(item.id === productId && item.size === size && item.color === color)
      ),
    });
  },
  

  updateQuantity: (productId, size, color, newQuantity) => {
    const cart = get().cart;
    if (newQuantity <= 0) {
      // Remove the item if the new quantity is zero or less
      set({
        cart: cart.filter(
          (item) => !(item.id === productId && item.size === size && item.color === color)
        ),
      });
    } else {
      // Update the quantity for the item
      set({
        cart: cart.map((item) =>
          item.id === productId && item.size === size && item.color === color
            ? { ...item, quantity: newQuantity }
            : item
        ),
      });
    }
  },
}));


export  default useCartStore