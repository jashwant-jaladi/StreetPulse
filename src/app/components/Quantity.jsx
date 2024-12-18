import React from 'react';
import { Button, Input, HStack } from '@chakra-ui/react';

const QuantitySelector = ({ quantity, setQuantity }) => {
  const increment = () => setQuantity((prev) => Math.min(prev + 1, 10)); // Max 10
  const decrement = () => setQuantity((prev) => Math.max(prev - 1, 1));  // Min 1

  return (
    <HStack spacing={3} mt={4}>
      <Button
        onClick={decrement}
        bg="gray.700"
        color="yellow.400"
        _hover={{ bg: "gray.600" }}
        size="sm"
      >
        -
      </Button>
      <Input
        value={quantity}
        readOnly
        textAlign="center"
        bg="gray.800"
        color="yellow.400"
        width="50px"
        size="sm"
      />
      <Button
        onClick={increment}
        bg="gray.700"
        color="yellow.400"
        _hover={{ bg: "gray.600" }}
        size="sm"
      >
        +
      </Button>
    </HStack>
  );
};

export default QuantitySelector;
