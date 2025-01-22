"use client";
import React, { useState } from "react";
import { Button, Input, Box, useToast } from "@chakra-ui/react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleClick = () => {
    if (email.trim() === "" || !email.includes("@")) {
      toast({
        title: "Error",
        description: "Please enter valid email ID.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "Success",
        description: "Thank you for subscribing.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setEmail(""); // Clears input immediately
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={4} p={4}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        size="md"
        variant="outline"
        borderColor="yellow.400"
        _placeholder={{ color: "yellow.400" }}
        bg="black"
        color="yellow.400"
        focusBorderColor="yellow.500"
        aria-label="Email input"
      />
      <Button
        onClick={handleClick}
        colorScheme="yellow"
        variant="solid"
        _hover={{
          bg: "yellow.500",
          color: "black",
          fontWeight: "bold",
        }}
        aria-label="Subscribe button"
      >
        Subscribe
      </Button>
    </Box>
  );
};

export default Newsletter;
