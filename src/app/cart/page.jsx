import React from 'react';
import CartItems from './CartItems';
import OrderSummary from './OrderSummary';
import CartFooter from './CartFooter';
import { Flex, Box } from '@chakra-ui/react';

const Cart = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <div className="relative h-32 sm:h-40 bg-[url('https://res.cloudinary.com/dm7ntehzl/image/upload/v1737648399/StreetPulse/HomepageImages%20and%20headers/about-2_e9hugc.avif')] bg-right bg-cover text-white font-bold grid place-content-center text-3xl sm:text-4xl md:text-5xl border-b-2 border-yellow-400">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10">SHOPPING CART</div>
      </div>

      {/* Main Content */}
      <Flex
        p={[4, 6, 8]} // Smaller padding on mobile, larger on desktop
        direction={['column', 'column', 'row']} // Stack vertically on mobile, align horizontally on desktop
        gap={[6, 8, 10]} // Smaller gap on mobile, larger on desktop
        align="start"
      >
        {/* Cart Items Section */}
        <Box flex={1} w="100%">
          <CartItems />
        </Box>

        {/* Order Summary Section */}
        <Box w={['100%', '100%', '30%']} mt={[6, 6, 0]}>
          <OrderSummary />
        </Box>
      </Flex>

      {/* Cart Footer Section */}
      <CartFooter />
    </div>
  );
};

export default Cart;