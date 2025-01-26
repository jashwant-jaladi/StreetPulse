import React from "react";
import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";
import Image from "next/image";
import CartFooter from "./CartFooter";
import { Flex, Box } from "@chakra-ui/react";

const Cart = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <div className="relative h-40 sm:h-48 md:h-56 text-white font-bold grid place-content-center text-3xl sm:text-4xl md:text-5xl border-b-2 border-yellow-400">
        {/* Background Image */}
        <Image
          src="https://res.cloudinary.com/dm7ntehzl/image/upload/v1737648399/StreetPulse/HomepageImages%20and%20headers/about-2_e9hugc.avif"
          alt="Shopping Cart Background"
          fill
          style={{ objectFit: "cover", objectPosition: "right" }}
          quality={75}
          className="absolute inset-0 z-0"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-5"></div>
        {/* Content */}
        <div className="relative z-10">SHOPPING CART</div>
      </div>

      {/* Main Content */}
      <Flex
        p={[4, 6, 8, 10]} // Adjusted padding for all breakpoints
        direction={{ base: "column", md: "column", lg: "row" }} // Stack on mobile, row on iPad and larger
        gap={{ base: 6, md: 8, lg: 10 }} // Adjusted gap for different breakpoints
        align={{ base: "center", md: "center", lg: "stretch" }} // Stack on mobile, center on iPad and larger
        
       
        mx="auto" // Center the content
      >
        {/* Cart Items Section */}
        <Box
          flex="1"
          w={{ base: "100%", md: "100%", lg: "75%" }} // Adjusted width for iPad and larger
        >
          <CartItems />
        </Box>

        {/* Order Summary Section */}
        <Box
          w={{ base: "100%", md: "80%", lg: "35%" }} // Adjusted width for iPad and larger
          mt={{ base: 6, md: 0 }} // Add top margin only on mobile
        >
          <OrderSummary />
        </Box>
      </Flex>

      {/* Cart Footer Section */}
      <Flex
        justify="center"
        mt={10}
        w="100%" // Footer spans the full width
        px={[4, 6, 8, 10]} // Padding to match the main content
      >
        <Box w={{ base: "100%", md: "85%", lg: "75%" }}> {/* Ensure footer width matches content */}
          <CartFooter />
        </Box>
      </Flex>
    </div>
  );
};

export default Cart;