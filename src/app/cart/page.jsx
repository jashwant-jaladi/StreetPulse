import React from 'react';
import CartItems from './CartItems';
import OrderSummary from './OrderSummary';
import CartFooter from './CartFooter';
import { Flex, Box } from '@chakra-ui/react';

const Cart = () => {
  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <div className="bg-[url('/about-2.avif')] h-40 bg-center bg-cover blur-sm border-b-2 border-yellow-400 relative">
        <div className="text-white font-bold grid place-content-center text-3xl sm:text-4xl md:text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-xl">
          SHOPPING CART
        </div>
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