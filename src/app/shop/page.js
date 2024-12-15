"use client";

import React from "react";
import ShopComponent from "./ShopComponent";
import Shopnav from "./shopnav";

const Shop = () => {
  return (
    <div>
      <Shopnav />
      <ShopComponent /> {/* ShopComponent will fetch products from Zustand */}
    </div>
  );
};

export default Shop;
