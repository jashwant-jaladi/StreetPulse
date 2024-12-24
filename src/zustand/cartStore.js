import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  cart: [],

  // Fetch the cart items from the backend
  fetchCart: async (userId) => {
    try {
      const response = await fetch(`/api/cart?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }

      const data = await response.json();
      set({ cart: data });
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  },

  // Add or update an item in the cart
  addToCart: async (userId, product) => {
    const cart = get().cart;
    const existingItem = cart.find(
      (item) =>
        item.shopId === product.shopId && 
        item.size === product.size && 
        item.color === product.color
    );

    try {
      if (existingItem) {
        // Update the quantity for the existing item in the backend
        const response = await fetch('/api/cart', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            shopId: product.shopId,
            size: product.size,
            color: product.color,
            quantity: existingItem.quantity + product.quantity,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update cart item in backend');
        }

        const updatedItem = await response.json();

        set({
          cart: cart.map((item) =>
            item.id === updatedItem.id &&
            item.size === updatedItem.size &&
            item.color === updatedItem.color
              ? updatedItem
              : item
          ),
        });
      } else {
        // Add new item to the backend
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            shopId: product.shopId,
            size: product.size,
            color: product.color,
            quantity: product.quantity,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add item to cart in backend');
        }

        const newItem = await response.json();
        set({ cart: [...cart, newItem] });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error; // Re-throw the error to be handled by the component
    }
  },

  // Remove an item from the cart
  removeFromCart: async (userId, shopId, size, color) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, shopId, size, color }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from cart in backend');
      }

      set({
        cart: get().cart.filter(
          (item) => !(item.shopId === shopId && item.size === size && item.color === color)
        ),
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  },

  // Update the quantity of an item in the cart
  updateQuantity: async (userId, shopId, size, color, newQuantity) => {
    const cart = get().cart;
    if (newQuantity <= 0) {
      await get().removeFromCart(userId, shopId, size, color);
    } else {
      try {
        const response = await fetch('/api/cart', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            shopId,
            size,
            color,
            newQuantity,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update item quantity in backend');
        }

        const updatedItem = await response.json();

        set({
          cart: cart.map((item) =>
            item.shopId === updatedItem.shopId &&
            item.size === updatedItem.size &&
            item.color === updatedItem.color
              ? updatedItem
              : item
          ),
        });
      } catch (error) {
        console.error('Error updating quantity:', error);
        throw error;
      }
    }
  },
}));

export default useCartStore;