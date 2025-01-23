import React from 'react';
import Image from 'next/image';
import { Flex, Box } from '@chakra-ui/react';

const CartFooter = () => {
  return (
    <div>
      <Flex
        p={[4, 8]} // Smaller padding on mobile, larger on desktop
        gap={[4, 8, 10]} // Smaller gap on mobile, larger on desktop
        justifyContent="center"
        flexDirection={['column', 'row']} // Stack vertically on mobile, align horizontally on desktop
        alignItems="center" // Center items vertically
      >
        {/* Free Shipping Box */}
        <Box
          p={[4, 8]} // Smaller padding on mobile, larger on desktop
          borderRadius="lg"
          backdropFilter="blur(12px)"
          bg="rgba(255, 255, 0, 0.15)"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"
          border="1px solid rgba(255, 255, 255, 0.3)"
          width={['100%', 'auto']} // Full width on mobile, auto width on desktop
          maxW="300px" // Limit maximum width
        >
          <Flex gap={[3, 5]} justifyContent="center" alignItems="center">
            <Image src="/870130.png" alt="free shipping logo" width={50} height={50} />
            <div>
              <h3 className="font-bold text-yellow-600">Free Shipping</h3>
              <p className="text-sm sm:text-md text-yellow-600">
                When you spend more than $100
              </p>
            </div>
          </Flex>
        </Box>

        {/* Call Us Anytime Box */}
        <Box
          p={[4, 8]}
          borderRadius="lg"
          backdropFilter="blur(12px)"
          bg="rgba(255, 255, 0, 0.15)"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"
          border="1px solid rgba(255, 255, 255, 0.3)"
          width={['100%', 'auto']}
          maxW="300px"
        >
          <Flex gap={[3, 5]} justifyContent="center" alignItems="center">
            <Image src="/customer-service.png" alt="customer service logo" width={50} height={50} />
            <div>
              <h3 className="font-bold text-yellow-600">Call us anytime</h3>
              <p className="text-sm sm:text-md text-yellow-600">+34 123 456 789</p>
            </div>
          </Flex>
        </Box>

        {/* Gift Cards Box */}
        <Box
          p={[4, 8]}
          borderRadius="lg"
          backdropFilter="blur(12px)"
          bg="rgba(255, 255, 0, 0.15)"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"
          border="1px solid rgba(255, 255, 255, 0.3)"
          width={['100%', 'auto']}
          maxW="300px"
        >
          <Flex gap={[3, 5]} justifyContent="center" alignItems="center">
            <Image src="/gift-card.png" alt="gift card logo" width={50} height={50} />
            <div>
              <h3 className="font-bold text-yellow-600">Gift Cards</h3>
              <p className="text-sm sm:text-md text-yellow-600">
                For your loved ones, in any occasion
              </p>
            </div>
          </Flex>
        </Box>

        {/* Chat With Us Box */}
        <Box
          p={[4, 8]}
          borderRadius="lg"
          backdropFilter="blur(12px)"
          bg="rgba(255, 255, 0, 0.15)"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"
          border="1px solid rgba(255, 255, 255, 0.3)"
          width={['100%', 'auto']}
          maxW="300px"
        >
          <Flex gap={[3, 5]} justifyContent="center" alignItems="center">
            <Image src="/speak.png" width={50} height={50} alt="chat with us logo" />
            <div>
              <h3 className="font-bold text-yellow-600">Chat with us</h3>
              <p className="text-sm sm:text-md text-yellow-600">
                We offer 24*7 customer support
              </p>
            </div>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};

export default CartFooter;