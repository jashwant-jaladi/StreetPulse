"use client";

import React from "react";
import Carousel from "./homeComponents/Carousel";
import CategoryGrid from "./homeComponents/CategoryGrid";
import Blogdisplay from "./homeComponents/Blogdisplay";
import StoreOverview from "./homeComponents/StoreOverview";
import Testimonials from "./homeComponents/Testimonials";
import useShopStore from "@/zustand/shopStore";

export default function Home() {
  const shops = useShopStore((state) => state.shops); 

  return (
    <>
      <Carousel />
      <CategoryGrid />
      <StoreOverview shops={shops} /> 
      <Blogdisplay />
      <Testimonials />
    </>
  );
}
