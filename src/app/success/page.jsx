"use client";

import React, { useEffect } from "react";
import { Box, Center, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Success = () => {
  const router = useRouter();
  const { data: session } = useSession(); // Fetch the user session to get the email


  useEffect(() => {
    if (session?.user?.email) {
      sendOrderConfirmationEmail(session.user?.email);
    }
  }, [session]);

  // Function to send order confirmation email
  const sendOrderConfirmationEmail = async (email) => {
    try {
      const response = await fetch('/api/order-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Send the email to the backend API
      });

      const result = await response.json();
      if (result.error) {
        console.error('Error sending email:', result.error);
      } else {
        console.log('Email sent successfully');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

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
