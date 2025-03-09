import React, { useState } from 'react';
import Image from 'next/image';
import Review from './Review';
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
  Flex,
  Text,
} from '@chakra-ui/react';
import Dropdown from './Dropdown';
import QuantitySelector from './Quantity';
import useShopStore from '@/zustand/shopStore';
import { useSession } from 'next-auth/react';
import useCartStore from '@/zustand/cartStore';

const ItemDescription = ({
  onClose,
  id,
  name,
  description,
  price,
  image,
  rating,
  noOfRatings,
}) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);
  const toast = useToast();
  const wishlist = useShopStore((state) => state.wishlist);
  const addToWishlist = useShopStore((state) => state.addToWishlist);
  const removeFromWishlist = useShopStore((state) => state.removeFromWishlist);
  const addToCart = useCartStore((state) => state.addToCart);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const sizeOptions = ['Small', 'Medium', 'Large', 'XL'];
  const colorOptions = ['Black', 'Yellow', 'Red', 'Blue'];

  const isInWishlist = wishlist?.some((item) => item.shopId === id);

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
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

    if (!session) {
      toast({
        title: 'Not Logged In',
        description: 'You need to be logged in to add items to the cart.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    const product = {
      shopId: id,
      quantity,
      size: selectedSize,
      color: selectedColor,
    };

    setIsAddingToCart(true);

    try {
      await addToCart(userId, product);
      toast({
        title: 'Added to Cart',
        description: `Successfully added ${name} to your cart.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Item already in cart please update the quantity in cart page.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistClick = async () => {
    if (!session) {
      toast({
        title: 'Not Logged In',
        description: 'You need to be logged in to manage your wishlist.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    setIsUpdatingWishlist(true);
    
    try {
      if (isInWishlist) {
        await removeFromWishlist(userId, id);
        toast({
          title: 'Removed from Wishlist',
          description: `${name} has been removed from your wishlist.`,
          status: 'info',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      } else {
        await addToWishlist(userId, id);
        toast({
          title: 'Added to Wishlist',
          description: `${name} has been added to your wishlist.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update wishlist. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } finally {
      setIsUpdatingWishlist(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} size={['full', 'lg']}>
      <ModalOverlay />
      <ModalContent
        bg="gray.800"
        color="yellow.400"
        borderRadius="lg"
        p={[4, 5]}
        maxWidth={['100vw', '70vw']}
        maxHeight={['100vh', '80vh']}
        overflowY="auto"
      >
        <ModalHeader
          fontSize={['3xl', '5xl']}
          fontWeight="bold"
          color="yellow.500"
          textAlign="center"
          textShadow="0 0 5px black, 0 0 5px black, 0 0 2px yellow, 0 0 2px yellow"
        >
          Product Details
        </ModalHeader>

        <ModalCloseButton color="yellow.400" />
        <ModalBody>
          <div className="flex flex-col 2xl:flex-row items-center gap-6">
            {/* Image Section */}
            <div className="w-full 2xl:w-[400px]">
              <Image
                src={image}
                alt="Product Image"
                width={400}
                height={400}
                className="rounded-lg w-full object-cover"
              />
            </div>

            {/* Details Section */}
            <div className="w-full">
              <Flex direction="column" gap={4}>
                <Flex direction="column" gap={2}>
                  <Text fontSize={['xl', '2xl']} fontWeight="semibold">
                    {name}
                  </Text>
                  <Text fontSize={['md', 'lg']}>
                    {rating} stars ({noOfRatings} ratings)
                  </Text>
                </Flex>

                <Text fontSize={['lg', 'xl']}>₹ {price}</Text>

                <Text fontSize="md">{description}</Text>

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

                <div>
                  <Text color="yellow.400" fontWeight="medium" mb={2}>
                    Quantity:
                  </Text>
                  <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                </div>

                <Button
                  onClick={handleWishlistClick}
                  bg={isInWishlist ? 'yellow.400' : 'gray.700'}
                  color="black"
                  _hover={{ bg: 'yellow.500' }}
                  width="full"
                  isLoading={isUpdatingWishlist}
                  loadingText={isInWishlist ? "Removing..." : "Adding..."}
                  isDisabled={isAddingToCart}
                >
                  {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>

                <Review userId={userId} shopId={id} />
              </Flex>
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
            _hover={{ bg: 'yellow.500' }}
          >
            Close
          </Button>
          <Button
            variant="outline"
            borderColor="yellow.400"
            color="yellow.400"
            _hover={{ bg: 'yellow.500', color: 'black' }}
            onClick={handleAddToCart}
            isLoading={isAddingToCart}
            loadingText="Adding..."
            isDisabled={isUpdatingWishlist}
          >
            Add to Cart
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ItemDescription;