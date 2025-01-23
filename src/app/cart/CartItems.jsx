"use client";
import React, { useState, useEffect } from "react";
import {
  Flex,
  Grid,
  GridItem,
  Text,
  Button,
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
      await removeFromCart(userId, shopId, size, color);
      toast.success("Item removed from cart successfully!");
    } catch (error) {
      toast.error("Failed to remove item from cart");
    }
  };

  const handleQuantityChange = async (shopId, size, color, newQuantity) => {
    try {
      await updateQuantity(userId, shopId, size, color, newQuantity);
      await fetchCart(userId);
      toast.success("Quantity updated successfully!");
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-10">
      <Flex justify="start" mt={8} direction="column" overflowX="auto">
        <Grid
          templateColumns="repeat(8, 1fr)" // Always 8 columns
          gap={[2, 4, 6]} // Smaller gap on mobile
          w="max-content" // Allow horizontal scrolling
          p={[2, 4, 6]} // Smaller padding on mobile
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
            <GridItem key={index} minW="120px"> {/* Minimum width for each column */}
              <Text
                color="yellow.600"
                fontWeight="bold"
                fontSize={["xs", "sm", "md"]} // Smaller font on mobile
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
                {/* Product Image */}
                <GridItem minW="120px">
                  <Image
                    src={item.shop.image}
                    alt={item.shop.name}
                    width={80} // Smaller image on mobile
                    height={80}
                    className="rounded-lg shadow-lg transition-all ease-in-out transform hover:scale-105"
                  />
                </GridItem>

                {/* Product Name */}
                <GridItem minW="120px">
                  <Text
                    color="white"
                    textAlign="center"
                    fontSize={["xs", "sm", "md"]}
                    fontWeight="semibold"
                    transition="all 0.3s"
                    _hover={{ color: "yellow.400", transform: "scale(1.05)" }}
                  >
                    {item.shop.name}
                  </Text>
                </GridItem>

                {/* Size */}
                <GridItem minW="120px">
                  <Text
                    color="white"
                    textAlign="center"
                    fontSize={["xs", "sm", "md"]}
                    fontWeight="bold"
                    transition="all 0.3s"
                    _hover={{ color: "yellow.400", transform: "scale(1.05)" }}
                  >
                    {item.size}
                  </Text>
                </GridItem>

                {/* Color */}
                <GridItem minW="120px">
                  <Text
                    color="white"
                    textAlign="center"
                    fontSize={["xs", "sm", "md"]}
                    fontWeight="bold"
                    transition="all 0.3s"
                    _hover={{ color: "yellow.400", transform: "scale(1.05)" }}
                  >
                    {item.color}
                  </Text>
                </GridItem>

                {/* Price */}
                <GridItem minW="120px">
                  <Text
                    color="white"
                    textAlign="center"
                    fontSize={["xs", "sm", "md"]}
                    fontWeight="bold"
                    transition="all 0.3s"
                    _hover={{ color: "yellow.400", transform: "scale(1.05)" }}
                  >
                    ₹ {item.shop.prices}
                  </Text>
                </GridItem>

                {/* Quantity */}
                <GridItem minW="120px">
                  <Flex alignItems="center" justifyContent="center">
                    <Button
                      size="xs"
                      colorScheme="yellow"
                      onClick={() =>
                        handleQuantityChange(
                          item.shopId,
                          item.size,
                          item.color,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity === 1}
                    >
                      -
                    </Button>
                    <Text
                      color="white"
                      textAlign="center"
                      fontSize={["xs", "sm", "md"]}
                      fontWeight="bold"
                      mx={2}
                    >
                      {item.quantity}
                    </Text>
                    <Button
                      size="xs"
                      colorScheme="yellow"
                      onClick={() =>
                        handleQuantityChange(
                          item.shopId,
                          item.size,
                          item.color,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </Button>
                  </Flex>
                </GridItem>

                {/* Total Price */}
                <GridItem minW="120px">
                  <Text
                    color="white"
                    textAlign="center"
                    fontSize={["xs", "sm", "md"]}
                    fontWeight="bold"
                    transition="all 0.3s"
                    _hover={{ color: "yellow.400", transform: "scale(1.05)" }}
                  >
                    ₹ {item.shop.prices * item.quantity}
                  </Text>
                </GridItem>

                {/* Remove Button */}
                <GridItem minW="120px">
                  <IconButton
                    icon={<CloseIcon />}
                    colorScheme="red"
                    onClick={() =>
                      handleRemoveFromCart(item.shopId, item.size, item.color)
                    }
                    aria-label={`Remove ${item.name}`}
                    _hover={{ transform: "scale(1.1)" }}
                    size="xs"
                  />
                </GridItem>
              </React.Fragment>
            ))
          ) : (
            <GridItem colSpan={8} textAlign="center">
              <Text color="white" fontSize={["xs", "sm", "md"]} fontWeight="bold">
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