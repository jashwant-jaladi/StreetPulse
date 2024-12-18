'use client';

import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';

const HandleSearch = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const router = useRouter(); // Hook from Next.js App Router

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (query.trim() === '') {
      alert('Please enter a search query.');
      return;
    }
    router.push(`/searchProduct?query=${encodeURIComponent(query)}`);
// Note the added forward slash at the beginning
    onClose(); // Close the modal
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />
      <ModalContent bg="black" color="white">
        <ModalHeader color="yellow.400">Search</ModalHeader>
        <ModalCloseButton color="yellow.400" _hover={{ bg: "yellow.500" }} />
        <ModalBody>
          <InputGroup size="lg">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="yellow.400" />}
            />
            <Input
              value={query}
              onChange={handleSearchChange}
              type="text"
              placeholder="Search for products, brands..."
              borderRadius="full"
              bg="gray.800"
              color="white"
              _focus={{
                borderColor: 'yellow.400',
                boxShadow: '0 0 0 2px rgba(255, 204, 0, 0.5)',
              }}
            />
          </InputGroup>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" color="yellow.400" onClick={onClose} _hover={{ bg: "yellow.500" }}>
            Cancel
          </Button>
          <Button colorScheme="yellow" onClick={handleSearchSubmit}>
            Search
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HandleSearch;
