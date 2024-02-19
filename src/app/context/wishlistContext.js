"use client"
import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (productId) => {
    setWishlist((prevWishlist) => [...prevWishlist, productId]);
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((id) => id !== productId));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

const useWishlist = () => {
  return useContext(WishlistContext);
};

export { WishlistProvider, useWishlist };
