import React from 'react';
import Image from 'next/image';
import Rating from '../Icons/Rating';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';


const ItemDescription = ({ onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay  />
      <ModalContent>
        <ModalHeader>Product Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <div className="flex flex-row">
          <div>
            <Image src="/about-1.avif" alt="Product Image" width={200} height={200} />
          </div>
          <div>
            <h3>Product Name</h3>
            <h5>Price</h5>
            <p>Description</p>
            <div>
                <p>Size</p>
            </div>
            <div>
                <p>Color</p>
            </div>
            <p>placeholder for quantity</p>
            <Button>Add to Wishlist</Button>
            <h3>Reviews</h3>
            <Rating />  
            </div>
            

          </div>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Add to Cart</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ItemDescription;
