"use client";
import React, { useState } from "react";
import {
  Flex,
  Grid,
  GridItem,
  Text,
  Box,
  Button,
  Input,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import Image from "next/image";
import useCartStore from "@/zustand/cartStore";
import { ToastContainer, toast } from "react-toastify";

const CartItems = () => {
  const [coupon, setCoupon] = useState("");
  const cartItems = useCartStore((state) => state.cart); // Get cart items from cartStore
  const removeFromCart = useCartStore((state) => state.removeFromCart); // Remove item functionality
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const handleApplyCoupon = () => {
    if(coupon === "streetpulse5" || coupon === "streetpulse10"){

      toast.success("Coupon applied successfully!");
      setCoupon("");
    }
    else{
      toast.error("Invalid coupon code.");
      setCoupon("");
    }
  };

  const handleQuantityChange = (id, size, color, newQuantity) => {
    updateQuantity(id, size, color, newQuantity); // Update the quantity in the cart
  }; 
  return (
    <div className="w-[80vw] pl-10">
      <Flex justify="start" mt={8} direction="row">
        <Grid
          templateColumns="repeat(8, 1fr)" // Added an extra column for the remove icon
          gap={8}
          w="90%"
          p={8}
          borderRadius="lg"
          backdropFilter="blur(12px)"
          bg="rgba(155, 155, 155, 0.2)"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"
          border="1px solid rgba(255, 255, 255, 0.3)"
          alignItems="center"
        >
          {/* Header Row */}
          {[
            "PRODUCT",
            "PRODUCT NAME",
            "SIZE",
            "COLOR",
            "PRICE",
            "QUANTITY",
            "TOTAL PRICE",
            "",
          ].map((header, index) => (
            <GridItem key={index}>
              <Text
                color="yellow.600"
                fontWeight="bold"
                fontSize="lg"
                textAlign="center"
                transition="all 0.3s"
                _hover={{ color: "yellow.500", transform: "scale(1.05)" }}
              >
                {header}
              </Text>
            </GridItem>
          ))}

          {/* Cart Items */}
          {cartItems.map((item, index) => (
            <React.Fragment key={`${item.id}-${item.size}-${item.color}`}>
              <GridItem display="flex" justifyContent="center" alignItems="center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="rounded-lg shadow-lg transition-all ease-in-out transform hover:scale-105"
                />
              </GridItem>
              <GridItem display="flex" justifyContent="center" alignItems="center">
                <Text
                  color="white"
                  textAlign="center"
                  fontSize="lg"
                  fontWeight="semibold"
                  transition="all 0.3s"
                  _hover={{ color: "yellow.400", transform: "scale(1.05)" }}
                >
                  {item.name}
                </Text>
              </GridItem>
              <GridItem display="flex" justifyContent="center" alignItems="center">
                <Text
                  color="white"
                  textAlign="center"
                  fontSize="lg"
                  fontWeight="bold"
                  transition="all 0.3s"
                  _hover={{ color: "yellow.400", transform: "scale(1.05)" }}
                >
                  {item.size}
                </Text>
              </GridItem>
              <GridItem display="flex" justifyContent="center" alignItems="center">
                <Text
                  color="white"
                  textAlign="center"
                  fontSize="lg"
                  fontWeight="bold"
                  transition="all 0.3s"
                  _hover={{ color: "yellow.400", transform: "scale(1.05)" }}
                >
                  {item.color}
                </Text>
              </GridItem>
              <GridItem display="flex" justifyContent="center" alignItems="center">
                <Text
                  color="white"
                  textAlign="center"
                  fontSize="lg"
                  fontWeight="bold"
                  transition="all 0.3s"
                  _hover={{ color: "yellow.400", transform: "scale(1.05)" }}
                >
                  ₹ {item.price}
                </Text>
              </GridItem>
              <GridItem display="flex" justifyContent="center" alignItems="center">
  <Flex alignItems="center">
    <Button
      size="sm"
      colorScheme="yellow"
      onClick={() => handleQuantityChange(item.id, item.size, item.color, item.quantity - 1)}
      disabled={item.quantity === 1} // Disable decrement button if quantity is 1
    >
      -
    </Button>
    <Text
      color="white"
      textAlign="center"
      fontSize="lg"
      fontWeight="bold"
      mx={2}
    >
      {item.quantity}
    </Text>
    <Button
      size="sm"
      colorScheme="yellow"
      onClick={() => handleQuantityChange(item.id, item.size, item.color, item.quantity + 1)}
    >
      +
    </Button>
  </Flex>
</GridItem>

              <GridItem display="flex" justifyContent="center" alignItems="center">
                <Text
                  color="white"
                  textAlign="center"
                  fontSize="lg"
                  fontWeight="bold"
                  transition="all 0.3s"
                  _hover={{ color: "yellow.400", transform: "scale(1.05)" }}
                >
                  ₹ {item.price * item.quantity}
                </Text>
              </GridItem>
              <GridItem display="flex" justifyContent="center" alignItems="center">
              <IconButton
  icon={<CloseIcon />}
  colorScheme="red"
  onClick={() => removeFromCart(item.id, item.size, item.color)} // Pass all attributes
  aria-label={`Remove ${item.name}`}
  _hover={{ transform: "scale(1.1)" }}
/>

              </GridItem>
            </React.Fragment>
          ))}
        </Grid>
      </Flex>

      {/* Coupon Section */}
      <Flex justify="start" pl={10} mt={8}>
        <Box
          w="25%"
          p={6}
          borderRadius="lg"
          backdropFilter="blur(12px)"
          bg="rgba(155, 155, 155, 0.2)"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"
          border="1px solid rgba(255, 255, 255, 0.3)"
          textAlign="center"
        >
          <Stack spacing={4}>
            <Text color="yellow.600" fontWeight="bold" fontSize="lg">
              APPLY COUPON
            </Text>
            <Input
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              bg="gray.800"
              color="white"
              borderRadius="md"
              _focus={{ borderColor: "yellow.400" }}
            />
            <Button
              onClick={handleApplyCoupon}
              colorScheme="yellow"
              size="lg"
              _hover={{ transform: "scale(1.05)" }}
            >
              APPLY
            </Button>
          </Stack>
        </Box>
      </Flex>
      <ToastContainer />
    </div>
  );
};

export default CartItems;
