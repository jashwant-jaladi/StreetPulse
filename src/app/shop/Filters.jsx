"use client";

import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

const Filters = ({ isOpen, onClose }) => {
  const [selectedFilter, setSelectedFilter] = useState("");

  const applyFilters = () => {
    console.log("Selected Filter:", selectedFilter);
    // Perform filtering logic here, e.g., update state or call a function
    onClose(); // Close the modal after applying filters
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bg="gray.800"
        color="yellow.400"
        borderRadius="lg"
        boxShadow="lg"
      >
        <ModalHeader fontWeight="bold">Filters</ModalHeader>
        <ModalCloseButton color="yellow.400" />
        <ModalBody>
          <Stack spacing={4}>
            <p className="font-semibold">Select a filter option:</p>
            <RadioGroup
              value={selectedFilter}
              onChange={setSelectedFilter}
              colorScheme="yellow"
            >
              <Stack direction="column" spacing={3}>
                <Radio value="priceLowToHigh">Price: Low to High</Radio>
                <Radio value="priceHighToLow">Price: High to Low</Radio>
                <Radio value="discountHighToLow">Discount: High to Low</Radio>
                <Radio value="ratingHighToLow">Rating: High to Low</Radio>
              </Stack>
            </RadioGroup>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="outline"
            colorScheme="yellow"
            onClick={onClose}
            _hover={{ bg: "yellow.600", color: "black" }}
            mr={3}
          >
            Close
          </Button>
          <Button
            bg="yellow.400"
            color="black"
            _hover={{ bg: "yellow.600" }}
            onClick={applyFilters}
          >
            Apply Filters
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Filters;
