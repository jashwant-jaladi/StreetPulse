"use client";
import React, { useEffect } from "react";
import Carousel from "./homeComponents/Carousel";
import CategoryGrid from "./homeComponents/CategoryGrid";
import Blogdisplay from "./homeComponents/Blogdisplay";
import StoreOverview from "./homeComponents/StoreOverview";
import Testimonials from "./homeComponents/Testimonials";
import useShopStore from "@/zustand/shopStore";

export default function Home() {
  const setShops = useShopStore((state) => state.setShops);
  const shops = useShopStore((state) => state.shops);

  useEffect(() => {
    async function fetchShops() {
      const response = await fetch("/api/shops"); // Replace with your actual API route
      const data = await response.json();
      setShops(data); // Populate Zustand store
    }

    if (shops.length === 0) { // Fetch only if store is empty
      fetchShops();
    }
  }, [setShops, shops]);

  return (
    <>
      <Carousel />
      <CategoryGrid />
      <StoreOverview />
      <Blogdisplay />
      <Testimonials />
    </>
  );
}
