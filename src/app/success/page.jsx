"use client";

import React from "react";
import { Box, Center, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import useCartStore from "@/zustand/cartStore";

const Success = () => {
  const router = useRouter();
    const resetCart = useCartStore((state) => state.resetCart);

  React.useEffect(() => {
    resetCart();
  }, [resetCart]);
  return (
    <Center minH="100vh" bgGradient="linear(to-br, green.300, blue.500)">
      <Box
        bg="white"
        p={8}
        rounded="lg"
        shadow="lg"
        textAlign="center"
        maxW="md"
        w="full"
      >
        <Icon as={CheckCircleIcon} w={16} h={16} color="green.400" />
        <Heading as="h1" size="lg" mt={4} color="gray.800">
          Payment Successful!
        </Heading>
        <Text color="gray.600" mt={2}>
          Thank you for your payment. Your transaction has been processed
          successfully.
        </Text>
        <Button
          mt={6}
          colorScheme="blue"
          size="lg"
          onClick={() => router.push("/")}
          _hover={{ transform: "scale(1.05)" }}
          transition="all 0.2s"
        >
          Return to Home
        </Button>
      </Box>
    </Center>
  );
};

export default Success;
