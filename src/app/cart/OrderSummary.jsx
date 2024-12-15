import React from 'react'
import { Flex, Box, Text, Stack, Button } from '@chakra-ui/react'

const OrderSummary = () => {
  return (
    <div className='w-[15vw]'>
        <Flex justify="center" mt={8}>
    <Box
        w="100%"
        p={8}
        borderRadius="lg"
        backdropFilter="blur(12px)"
         bg="rgba(155, 155, 155, 0.2)"
        boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"
        border="1px solid rgba(255, 255, 255, 0.3)"
        alignItems="center"
    >
        <Text color="yellow.600" fontWeight="bold" fontSize="xl" mb={4} textAlign="center">
            ORDER SUMMARY
        </Text>
        <Stack spacing={4}>
            <Flex justify="space-between">
                <Text color="white" fontSize="lg">Items Total:</Text>
                <Text color="white" fontSize="lg">₹ 2400</Text>
            </Flex>
            <Flex justify="space-between">
                <Text color="white" fontSize="lg">Shipping:</Text>
                <Text color="white" fontSize="lg">₹ 100</Text>
            </Flex>
            <Flex justify="space-between">
                <Text color="white" fontSize="lg">Discount:</Text>
                <Text color="white" fontSize="lg">-₹ 200</Text>
            </Flex>
            <Flex justify="space-between" fontWeight="bold" mt={4}>
                <Text color="white" fontSize="lg">Total:</Text>
                <Text color="yellow.400" fontSize="xl">₹ 2300</Text>
            </Flex>
        </Stack>
        <Button
            w="full"
            mt={6}
            colorScheme="yellow"
            variant="solid"
            size="lg"
            _hover={{ transform: "scale(1.05)" }}
        >
            CHECKOUT
        </Button>
    </Box>
</Flex></div>
  )
}

export default OrderSummary