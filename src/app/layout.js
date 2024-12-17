"use client";

import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "./header/page";
import Footer from "./footer/page";
import useShopStore from "@/zustand/shopStore";
import React, { useEffect } from "react";

const salsa = Space_Grotesk({ subsets: ["latin"], weight: "400" });

export default function RootLayout({ children }) {
  const fetchShops = useShopStore((state) => state.fetchShops);
  const shops = useShopStore((state) => state.shops);

  useEffect(() => {
    if (shops.length === 0) { // Fetch only if not already loaded
      fetchShops();
    }
  }, [fetchShops, shops]);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./street-pulse-logo.png" />
        <title>Street Pulse</title>
      </head>
      <body className={salsa.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
