"use client";
import React, { useState, useEffect } from "react";
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
import { useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";

const CartItems = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [coupon, setCoupon] = useState("");
  const cartItems = useCartStore((state) => state.cart);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  
 

  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    }
  }, [userId, fetchCart, cartItems]);



  const handleRemoveFromCart = async (shopId, size, color) => {
    try {
      await removeFromCart(userId, shopId, size, color);s
      toast.success("Item removed from cart successfully!");
    } catch (error) {
      toast.error("Failed to remove item from cart");
    }
  };

  const handleQuantityChange = async (shopId, size, color, newQuantity) => {
    try {
      await updateQuantity(userId, shopId, size, color, newQuantity); // Call API to update the quantity
      await fetchCart(userId); // Fetch the updated cart after the mutation
      toast.success("Quantity updated successfully!");
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };
  


  return (
    <div className="w-[80vw] pl-10">
      <Flex justify="start" mt={8} direction="row">
        <Grid
          templateColumns="repeat(8, 1fr)"
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
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <React.Fragment key={`${item.shopId}-${item.size}-${item.color}`}>
                <GridItem display="flex" justifyContent="center" alignItems="center">
                  <Image
                    src={item.shop.image}
                    alt={item.shop.name}
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
                    {item.shop.name}
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
                    ₹ {item.shop.prices}
                  </Text>
                </GridItem>
                <GridItem display="flex" justifyContent="center" alignItems="center">
                  <Flex alignItems="center">
                    <Button
                      size="sm"
                      colorScheme="yellow"
                      onClick={() => handleQuantityChange(item.shopId, item.size, item.color, item.quantity - 1)}
                      disabled={item.quantity === 1}
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
                      onClick={() => handleQuantityChange(item.shopId, item.size, item.color, item.quantity + 1)}
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
                    ₹ {item.shop.prices * item.quantity}
                  </Text>
                </GridItem>
                <GridItem display="flex" justifyContent="center" alignItems="center">
                  <IconButton
                    icon={<CloseIcon />}
                    colorScheme="red"
                    onClick={() => handleRemoveFromCart(item.shopId, item.size, item.color)}
                    aria-label={`Remove ${item.name}`}
                    _hover={{ transform: "scale(1.1)" }}
                  />
                </GridItem>
              </React.Fragment>
            ))
          ) : (
            <GridItem colSpan={8} textAlign="center">
              <Text color="white" fontSize="lg" fontWeight="bold">
                Your cart is empty.
              </Text>
            </GridItem>
          )}
        </Grid>
      </Flex>
    
      
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CartItems;