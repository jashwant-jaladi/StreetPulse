import React from 'react'
import { Flex, Grid, GridItem, Text, Box, Button, Stack } from '@chakra-ui/react'
import Image from 'next/image'

const CartItems = () => {
  return (
    <div className='w-[80vw]'>   
    <Flex justify="center" mt={8} direction={"row"}>
    <Grid
        templateColumns="repeat(7, 1fr)"
        gap={8}
        w="80%" // Adjust the width of the grid
        p={8}
        borderRadius="lg"
        backdropFilter="blur(12px)"
        bg="rgba(155, 155, 155, 0.2)"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"
        border="1px solid rgba(255, 255, 255, 0.3)"
        alignItems="center"
    >
        {/* Product Title */}
        <GridItem>
            <Text color="yellow.600" fontWeight="bold" fontSize="lg" textAlign={"center"} transition="all 0.3s" _hover={{ color: "yellow.500", transform: "scale(1.05)" }}>
                PRODUCT
            </Text>
        </GridItem>
        <GridItem>
            <Text color="yellow.600" fontWeight="bold" fontSize="lg" textAlign={"center"} transition="all 0.3s" _hover={{ color: "yellow.500", transform: "scale(1.05)" }}>
                PRODUCT NAME
            </Text>
        </GridItem>

        {/* Price Title */}
        <GridItem>
            <Text color="yellow.600" fontWeight="bold" fontSize="lg" textAlign={"center"} transition="all 0.3s" _hover={{ color: "yellow.500", transform: "scale(1.05)" }}>
                PRICE
            </Text>
        </GridItem>

        {/* Quantity Title */}
        <GridItem>
            <Text color="yellow.600" fontWeight="bold" fontSize="lg" textAlign={"center"} transition="all 0.3s" _hover={{ color: "yellow.500", transform: "scale(1.05)" }}>
                QUANTITY
            </Text>
        </GridItem>

        {/* Total Price Title */}
        <GridItem>
            <Text color="yellow.600" fontWeight="bold" fontSize="lg" textAlign={"center"} transition="all 0.3s" _hover={{ color: "yellow.500", transform: "scale(1.05)" }}>
                TOTAL PRICE
            </Text>
        </GridItem>

        {/* New Fields for Size and Color */}
        <GridItem>
            <Text color="yellow.600" fontWeight="bold" fontSize="lg" textAlign={"center"} transition="all 0.3s" _hover={{ color: "yellow.500", transform: "scale(1.05)" }}>
                SIZE
            </Text>
        </GridItem>
        <GridItem>
            <Text color="yellow.600" fontWeight="bold" fontSize="lg" textAlign={"center"} transition="all 0.3s" _hover={{ color: "yellow.500", transform: "scale(1.05)" }}>
                COLOR
            </Text>
        </GridItem>

        {/* Product Row with Dummy Content */}
        <GridItem rowSpan={2} display="flex" justifyContent="center" alignItems="center">
            <Image src="/Shop/sneakers/shoes-1.webp" alt="Product Image" width={200} height={200} className="rounded-lg shadow-lg transition-all ease-in-out transform hover:scale-105" />
        </GridItem>

        {/* Product Name */}
        <GridItem display="flex" justifyContent="center" alignItems="center" rowSpan={2}>
            <Text color="white" textAlign="center" fontSize="lg" fontWeight="semibold" transition="all 0.3s" _hover={{ color: "yellow.400", transform: "scale(1.05)" }}>
                NIKE AIRFORCE 1S GAGA EDITION
            </Text>
        </GridItem>

        {/* Product Size */}
        <GridItem display="flex" justifyContent="center" alignItems="center" rowSpan={2}>
            <Text color="white" textAlign="center" fontSize="lg" fontWeight="bold" transition="all 0.3s" _hover={{ color: "yellow.400", transform: "scale(1.05)" }}>
                9 US
            </Text>
        </GridItem>

        {/* Product Color */}
        <GridItem display="flex" justifyContent="center" alignItems="center" rowSpan={2}>
            <Text color="white" textAlign="center" fontSize="lg" fontWeight="bold" transition="all 0.3s" _hover={{ color: "yellow.400", transform: "scale(1.05)" }}>
                WHITE
            </Text>
        </GridItem>

        {/* Product Price */}
        <GridItem display="flex" justifyContent="center" alignItems="center" rowSpan={2}>
            <Text color="white" textAlign="center" fontSize="lg" fontWeight="bold" transition="all 0.3s" _hover={{ color: "yellow.400", transform: "scale(1.05)" }}>
                ₹ 1200
            </Text>
        </GridItem>

        {/* Quantity */}
        <GridItem display="flex" justifyContent="center" alignItems="center" rowSpan={2}>
            <Text color="white" textAlign="center" fontSize="lg" fontWeight="bold" transition="all 0.3s" _hover={{ color: "yellow.400", transform: "scale(1.05)" }}>
                1
            </Text>
        </GridItem>

        {/* Total Price */}
        <GridItem display="flex" justifyContent="center" alignItems="center" rowSpan={2}>
            <Text color="white" textAlign="center" fontSize="lg" fontWeight="bold" transition="all 0.3s" _hover={{ color: "yellow.400", transform: "scale(1.05)" }}>
                ₹ 1200
            </Text>
        </GridItem>
    </Grid>
</Flex>
</div>
  )
}

export default CartItems