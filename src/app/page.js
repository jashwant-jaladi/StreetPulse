"use client"
import React from "react"
import Carousel from "./homeComponents/Carousel"
import CategoryGrid from "./homeComponents/CategoryGrid"
import Blogdisplay from "./homeComponents/Blogdisplay"
import StoreOverview from "./homeComponents/StoreOverview"


export default function Home() {
  return (
   <>
    <Carousel/>
    <CategoryGrid/>
    <StoreOverview/>
    <Blogdisplay/>
    
   </> 
  )
}
