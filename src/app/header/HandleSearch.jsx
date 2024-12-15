import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, InputGroup, InputLeftElement, Input, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const HandleSearch = ({ onClose }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    console.log('Search query:', query);
    onClose(); 
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay bg="rgba(0, 0, 0, 0.6)" />  {/* Dark background overlay */}
      <ModalContent bg="black" color="white">  {/* Black background for modal */}
        <ModalHeader color="yellow.400">Search</ModalHeader>  {/* Yellow header */}
        <ModalCloseButton color="yellow.400" _hover={{ bg: "yellow.500" }} /> {/* Yellow close button */}
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

