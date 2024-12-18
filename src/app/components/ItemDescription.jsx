import React, { useState } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import Dropdown from './Dropdown';
import QuantitySelector from './Quantity';

const ItemDescription = ({
  onClose,
  id,
  name,
  description,
  price,
  image,
  rating,
  noOfRatings,
  handleWishlistClick,
  isInWishlist,
}) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const sizeOptions = ['Small', 'Medium', 'Large', 'XL'];
  const colorOptions = ['Black', 'Yellow', 'Red', 'Blue'];
  const toast = useToast(); // Initialize the toast

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      // Show toast if size or color is not selected
      toast({
        title: 'Selection Missing',
        description: 'Please select both a size and a color before adding to cart.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      return;
    }
    // Proceed with adding to cart logic
    toast({
      title: 'Added to Cart',
      description: `Successfully added ${name} to your cart.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent
        bg="gray.800"
        color="yellow.400"
        borderRadius="lg"
        p={5}
        maxWidth="70vw"
        maxHeight="80vh"
        overflowY="auto"
      >
        <ModalHeader
          fontSize="5xl"
          fontWeight="bold"
          color="yellow.500"
          textAlign="center"
          textShadow="0 0 5px black, 0 0 5px black, 0 0 2px yellow, 0 0 2px yellow"
        >
          Product Details
        </ModalHeader>

        <ModalCloseButton color="yellow.400" />
        <ModalBody>
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-shrink-0">
              <Image
                src={image}
                alt="Product Image"
                width={400}
                height={400}
                className="rounded-lg"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-semibold mb-2">{name}</h3>
              <h5 className="text-xl mb-4">₹ {price}</h5>
              <p className="mb-4">{description}</p>

              <Dropdown
                label="Size"
                options={sizeOptions}
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              />

              <Dropdown
                label="Color"
                options={colorOptions}
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              />

              <div className="mt-4">
                <p className="text-yellow-400 font-medium">Quantity:</p>
                <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
              </div>

              <Button
                onClick={handleWishlistClick}
                bg={isInWishlist ? "yellow.400" : "gray.700"}
                color="black"
                _hover={{ bg: "yellow.500" }}
                mt={6}
              >
                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>

              <h3 className="text-xl font-semibold mt-4 mb-2">Add your Review</h3>
              <Rating rating={rating} noOfRatings={noOfRatings} />
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="yellow"
            color="black"
            mr={3}
            onClick={onClose}
            bg="yellow.400"
            _hover={{ bg: "yellow.500" }}
          >
            Close
          </Button>
          <Button
            variant="outline"
            borderColor="yellow.400"
            color="yellow.400"
            _hover={{ bg: "yellow.500", color: "black" }}
            onClick={handleAddToCart} // Call the add-to-cart handler
          >
            Add to Cart
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ItemDescription;
