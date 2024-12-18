"use client";
import React, { useState } from 'react';
import { Flex, Grid, GridItem, Text, Box, Button, Input, Stack } from '@chakra-ui/react';
import Image from 'next/image';

const CartItems = () => {
  const [coupon, setCoupon] = useState('');

  const handleApplyCoupon = () => {
    console.log('Coupon Applied:', coupon);
    // Implement coupon logic here
  };

  return (
    <div className="w-[80vw] pl-10">
      <Flex justify="start" mt={8} direction="row">
        <Grid
          templateColumns="repeat(7, 1fr)"
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
          {/* Product Headers */}
          <GridItem>
            <Text
              color="yellow.600"
              fontWeight="bold"
              fontSize="lg"
              textAlign="center"
              transition="all 0.3s"
              _hover={{ color: "yellow.500", transform: "scale(1.05)" }}
            >
              PRODUCT
            </Text>
          </GridItem>
          <GridItem>
            <Text
              color="yellow.600"
              fontWeight="bold"
              fontSize="lg"
              textAlign="center"
              transition="all 0.3s"
              _hover={{ color: "yellow.500", transform: "scale(1.05)" }}
            >
              PRODUCT NAME
            </Text>
          </GridItem>
          <GridItem>
            <Text
              color="yellow.600"
              fontWeight="bold"
              fontSize="lg"
              textAlign="center"
              transition="all 0.3s"
              _hover={{ color: "yellow.500", transform: "scale(1.05)" }}
            >
              PRICE
            </Text>
          </GridItem>
          <GridItem>
            <Text
              color="yellow.600"
              fontWeight="bold"
              fontSize="lg"
              textAlign="center"
              transition="all 0.3s"
              _hover={{ color: "yellow.500", transform: "scale(1.05)" }}
            >
              QUANTITY
            </Text>
          </GridItem>
          <GridItem>
            <Text
              color="yellow.600"
              fontWeight="bold"
              fontSize="lg"
              textAlign="center"
              transition="all 0.3s"
              _hover={{ color: "yellow.500", transform: "scale(1.05)" }}
            >
              TOTAL PRICE
            </Text>
          </GridItem>
          <GridItem>
            <Text
              color="yellow.600"
              fontWeight="bold"
              fontSize="lg"
              textAlign="center"
              transition="all 0.3s"
              _hover={{ color: "yellow.500", transform: "scale(1.05)" }}
            >
              SIZE
            </Text>
          </GridItem>
          <GridItem>
            <Text
              color="yellow.600"
              fontWeight="bold"
              fontSize="lg"
              textAlign="center"
              transition="all 0.3s"
              _hover={{ color: "yellow.500", transform: "scale(1.05)" }}
            >
              COLOR
            </Text>
          </GridItem>

          {/* Product Row */}
          <GridItem rowSpan={2} display="flex" justifyContent="center" alignItems="center">
            <Image
              src="/Shop/sneakers/shoes-1.webp"
              alt="Product Image"
              width={200}
              height={200}
              className="rounded-lg shadow-lg transition-all ease-in-out transform hover:scale-105"
            />
          </GridItem>
          <GridItem display="flex" justifyContent="center" alignItems="center" rowSpan={2}>
            <Text
              color="white"
              textAlign="center"
              fontSize="lg"
              fontWeight="semibold"
              transition="all 0.3s"
              _hover={{ color: "yellow.400", transform: "scale(1.05)" }}
            >
              NIKE AIRFORCE 1S GAGA EDITION
            </Text>
          </GridItem>
          <GridItem display="flex" justifyContent="center" alignItems="center" rowSpan={2}>
            <Text
              color="white"
              textAlign="center"
              fontSize="lg"
              fontWeight="bold"
              transition="all 0.3s"
              _hover={{ color: "yellow.400", transform: "scale(1.05)" }}
            >
              9 US
            </Text>
          </GridItem>
          <GridItem display="flex" justifyContent="center" alignItems="center" rowSpan={2}>
            <Text
              color="white"
              textAlign="center"
              fontSize="lg"
              fontWeight="bold"
              transition="all 0.3s"
              _hover={{ color: "yellow.400", transform: "scale(1.05)" }}
            >
              WHITE
            </Text>
          </GridItem>
          <GridItem display="flex" justifyContent="center" alignItems="center" rowSpan={2}>
            <Text
              color="white"
              textAlign="center"
              fontSize="lg"
              fontWeight="bold"
              transition="all 0.3s"
              _hover={{ color: "yellow.400", transform: "scale(1.05)" }}
            >
              ₹ 1200
            </Text>
          </GridItem>
          <GridItem display="flex" justifyContent="center" alignItems="center" rowSpan={2}>
            <Text
              color="white"
              textAlign="center"
              fontSize="lg"
              fontWeight="bold"
              transition="all 0.3s"
              _hover={{ color: "yellow.400", transform: "scale(1.05)" }}
            >
              1
            </Text>
          </GridItem>
          <GridItem display="flex" justifyContent="center" alignItems="center" rowSpan={2}>
            <Text
              color="white"
              textAlign="center"
              fontSize="lg"
              fontWeight="bold"
              transition="all 0.3s"
              _hover={{ color: "yellow.400", transform: "scale(1.05)" }}
            >
              ₹ 1200
            </Text>
          </GridItem>
        </Grid>
      </Flex>

      {/* Coupon Section */}
      <Flex justify="start" pl-10 mt={8}>
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
    </div>
  );
};

export default CartItems;
