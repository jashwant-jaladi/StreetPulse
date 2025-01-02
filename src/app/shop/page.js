"use client";

import React from "react";
import { useState } from "react";
import ShopComponent from "./ShopComponent";
import Shopnav from "./shopnav";

const Shop = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  }
  return (
    <div>
      <Shopnav onFilterChange={handleFilterChange} />
      <ShopComponent selectedFilter={selectedFilter} /> 
    </div>
  );
};

export default Shop;
