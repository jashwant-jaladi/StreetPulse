"use client";
import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
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
  const isMobile = useBreakpointValue({ base: true, lg: false });

  useEffect(() => {
    if (userId) {
      fetchCart(userId);
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

  if (isLoading) {
    return <Text color="white">Loading cart items...</Text>;
  }

  return (
    <Box w="full" px={{ base: 4, md: 6, lg: 8 }}>
      <Flex justify="start" mt={8} direction="column" overflowX="auto">
        {isMobile ? (
          // Mobile Layout: Stacked Cards
          <Stack spacing={6}>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <Box
                  key={`${item.shopId}-${item.size}-${item.color}`}
                  p={4}
                  borderRadius="xl"
                  backdropFilter="blur(12px)"
                  bg="rgba(155, 155, 155, 0.2)"
                  boxShadow="0 4px 12px rgba(0, 0, 0, 0.3)"
                  border="1px solid rgba(255, 255, 255, 0.3)"
                >
                  <Flex align="center" justify="space-between">
                    <Image
                      src={item.shop?.image}
                      alt={item.shop?.name}
                      width={100}
                      height={100}
                      className="rounded-lg shadow-lg"
                    />
                    <Box flex={1} ml={4}>
                      <Text fontSize="md" fontWeight="bold" color="white">
                        {item.shop?.name}
                      </Text>
                      <Text fontSize="sm" color="rgba(255, 255, 255, 0.8)">
                        Size: {item?.size}, Color: {item?.color}
                      </Text>
                      <Text fontSize="md" fontWeight="bold" color="white">
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
                      size="sm"
                      variant="ghost"
                    />
                  </Flex>
                  <Flex align="center" justify="space-between" mt={4}>
                    <Text fontSize="sm" color="rgba(255, 255, 255, 0.8)">
                      Quantity:
                    </Text>
                    <Flex align="center">
                      <Button
                        size="sm"
                        colorScheme="yellow"
                        variant="outline"
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
                      <Text mx={3} color="white" fontSize="md" fontWeight="bold">
                        {item.quantity}
                      </Text>
                      <Button
                        size="sm"
                        colorScheme="yellow"
                        variant="outline"
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
                  <Text mt={4} fontSize="md" fontWeight="bold" color="white" textAlign="right">
                    Total: ₹ {item.shop?.prices * item?.quantity}
                  </Text>
                </Box>
              ))
            ) : (
              <Text color="white" fontSize="md" fontWeight="bold" textAlign="center" py={8}>
                Your cart is empty.
              </Text>
            )}
          </Stack>
        ) : (
          // Desktop Layout: Grid Table
          <Grid
            templateColumns="repeat(8, 1fr)"
            gap={{ base: 2, md: 4, lg: 6 }}
            w="full"
            p={{ base: 2, md: 4, lg: 6 }}
            borderRadius="xl"
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
                  fontSize={{ base: "xs", md: "sm", lg: "md" }}
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
                      width={150}
                      height={150}
                      className="rounded-lg shadow-lg transition-all ease-in-out transform hover:scale-105"
                    />
                  </GridItem>

                  {/* Product Name */}
                  <GridItem minW="120px">
                    <Text
                      color="white"
                      textAlign="center"
                      fontSize={{ base: "xs", md: "sm", lg: "md" }}
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
                      fontSize={{ base: "xs", md: "sm", lg: "md" }}
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
                      fontSize={{ base: "xs", md: "sm", lg: "md" }}
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
                      fontSize={{ base: "xs", md: "sm", lg: "md" }}
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
                        fontSize={{ base: "xs", md: "sm", lg: "md" }}
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
                      fontSize={{ base: "xs", md: "sm", lg: "md" }}
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
                <Text color="white" fontSize={{ base: "xs", md: "sm", lg: "md" }} fontWeight="bold">
                  Your cart is empty.
                </Text>
              </GridItem>
            )}
          </Grid>
        )}
      </Flex>
    </Box>
  );
};

export default CartItems;