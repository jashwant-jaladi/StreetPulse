"use client";
import React, {  useEffect } from "react";
import {
  Flex,
  Grid,
  GridItem,
  Text,
  Button,
  IconButton,
  useToast,
  Stack,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react"; // Import useBreakpointValue
import { CloseIcon } from "@chakra-ui/icons";
import Image from "next/image";
import useCartStore from "@/zustand/cartStore";
import { useSession } from "next-auth/react";

const CartItems = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const cartItems = useCartStore((state) => state.cart);
  const fetchCart = useCartStore((state) => state.fetchCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const toast = useToast();
  const isLoading = useCartStore((state) => state.isLoading);

  // Responsive layout adjustments
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    if (userId) {
      fetchCart(userId).then(() => {
        console.log("Cart fetched successfully");
      });
    }
  }, [userId, fetchCart]);

  const handleRemoveFromCart = async (shopId, size, color) => {
    try {
      await removeFromCart(userId, shopId, size, color);
      toast({
        title: "Item removed from cart successfully!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to remove item from cart",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  if (isLoading) {
    return <Text color="white">Loading cart items...</Text>;
  }

  const handleQuantityChange = async (shopId, size, color, newQuantity) => {
    try {
      if (newQuantity === 0) {
        await removeFromCart(userId, shopId, size, color);
        toast({
          title: "Item removed from cart successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        await updateQuantity(userId, shopId, size, color, newQuantity);
        toast({
          title: "Quantity updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      await fetchCart(userId); // Refresh the cart after any change
    } catch (error) {
      toast({
        title: "Failed to update quantity",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-10">
      <Flex justify="start" mt={8} direction="column" overflowX="auto">
        {isMobile ? (
          // Mobile Layout: Stacked Cards
          <Stack spacing={4}>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <Box
                  key={`${item.shopId}-${item.size}-${item.color}`}
                  p={4}
                  borderRadius="lg"
                  backdropFilter="blur(12px)"
                  bg="rgba(155, 155, 155, 0.2)"
                  boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"
                  border="1px solid rgba(255, 255, 255, 0.3)"
                >
                  <Flex align="center" justify="space-between">
                    <Image
                      src={item.shop?.image}
                      alt={item.shop?.name}
                      width={60}
                      height={60}
                      className="rounded-lg shadow-lg"
                    />
                    <Box flex={1} ml={4}>
                      <Text fontSize="sm" fontWeight="bold" color="white">
                        {item.shop?.name}
                      </Text>
                      <Text fontSize="xs" color="white">
                        Size: {item?.size}, Color: {item?.color}
                      </Text>
                      <Text fontSize="sm" color="white">
                        ₹ {item.shop?.prices}
                      </Text>
                    </Box>
                    <IconButton
                      icon={<CloseIcon />}
                      colorScheme="red"
                      onClick={() =>
                        handleRemoveFromCart(item.shopId, item.size, item.color)
                      }
                      aria-label={`Remove ${item.name}`}
                      size="xs"
                    />
                  </Flex>
                  <Flex align="center" justify="space-between" mt={2}>
                    <Text fontSize="sm" color="white">
                      Quantity:
                    </Text>
                    <Flex align="center">
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
                        isDisabled={item.quantity === 1}
                      >
                        -
                      </Button>
                      <Text mx={2} color="white" fontSize="sm">
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
                  </Flex>
                  <Text mt={2} fontSize="sm" color="white" textAlign="right">
                    Total: ₹ {item.shop?.prices * item?.quantity}
                  </Text>
                </Box>
              ))
            ) : (
              <Text color="white" fontSize="sm" fontWeight="bold" textAlign="center">
                Your cart is empty.
              </Text>
            )}
          </Stack>
        ) : (
          // Desktop Layout: Grid Table
          <Grid
            templateColumns="repeat(8, 1fr)"
            gap={[2, 4, 6]}
            w="max-content"
            p={[2, 4, 6]}
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
              <GridItem key={index} minW="120px">
                <Text
                  color="yellow.600"
                  fontWeight="bold"
                  fontSize={["xs", "sm", "md"]}
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
                      width={80}
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
                        isDisabled={item.quantity === 1}
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
        )}
      </Flex>
    </div>
  );
};

export default CartItems;