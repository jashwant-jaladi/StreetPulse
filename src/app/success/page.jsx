"use client";

import React, { useEffect } from "react";
import { Box, Center, Heading, Text, Button, Icon, keyframes } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useCartStore from "@/zustand/cartStore";
import Link from "next/link";

// Keyframes for animations
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Success = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const resetCart = useCartStore((state) => state.resetCart);
  const setCart = useCartStore((state) => state.setCart);

 
  useEffect(() => {
    const clearCart = async () => {
      try {
        if (session?.user?.id) {
        
          await resetCart(session.user.id);

          setCart([]);
          
          if (session.user?.email) {
            await sendOrderConfirmationEmail(session.user.email);
          }
        }
      } catch (error) {
        console.error('Error clearing cart:', error);
        // Optionally show an error toast/notification here
      }
    };

    clearCart();
  }, [session, resetCart, setCart]);

  // Function to send order confirmation email
  const sendOrderConfirmationEmail = async (email) => {
    try {
      const response = await fetch('/api/order-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }
      
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      // Optionally show an error toast/notification here
    }
  };

  return (
    <Center minH="100vh" bgGradient="linear(to-br, green.300, blue.500)">
      <Box
        bg="white"
        p={8}
        rounded="lg"
        shadow="2xl"
        textAlign="center"
        maxW="md"
        w="full"
        animation={`${fadeIn} 1s ease-out`}
      >
        <Icon
          as={CheckCircleIcon}
          w={20}
          h={20}
          color="green.400"
          animation={`${bounce} 1.5s infinite`}
        />
        <Heading as="h1" size="xl" mt={6} color="gray.800" fontWeight="bold">
          Payment Successful! 🎉
        </Heading>
        <Text color="gray.600" mt={4} fontSize="lg">
          Thank you for your payment. Your transaction has been processed
          successfully.
        </Text>
        <Text color="gray.500" mt={2} fontSize="sm">
          {session?.user?.email && `A confirmation email has been sent to ${session.user.email}.`}
        </Text>
        <Button
          mt={8}
          colorScheme="blue"
          size="lg"
          onClick={() => router.push("/")}
          _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
          transition="all 0.2s"
          boxShadow="md"
        >
          Return to Home
        </Button>
        <Text color="gray.400" mt={6} fontSize="sm">
          Need help? <strong><Link href="/contact">Contact support</Link></strong>
        </Text>
      </Box>
    </Center>
  );
};

export default Success;