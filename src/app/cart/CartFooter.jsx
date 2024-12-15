import React from 'react'
import Image from 'next/image'
import { Flex, Box } from '@chakra-ui/react'

const CartFooter = () => {
  return (
    <div>
        <Flex p={8} gap={10} justifyContent={"center"}> 
            <Box  p={8} borderRadius="lg" backdropFilter="blur(12px)" bg="rgba(255, 255, 0, 0.15)"  boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)" border="1px solid rgba(255, 255, 255, 0.3)">
                <Flex gap={5} justifyContent="center">
                <Image src="/870130.png" width={50} height={50} />
                <div>
                <h3 className='font-bold text-yellow-600'>Free Shipping</h3>
                <p className='text-md text-yellow-600'>When you spend more than $100</p>
                </div>
                </Flex>
            </Box>
            <Box  p={8} borderRadius="lg" backdropFilter="blur(12px)" bg="rgba(255, 255, 0, 0.15)"  boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)" border="1px solid rgba(255, 255, 255, 0.3)">
                <Flex gap={5} justifyContent="center">
                <Image src="/customer-service.png" width={50} height={50} />
                <div>
                <h3 className='font-bold text-yellow-600'>Call us anytime</h3>
                <p className='text-md text-yellow-600'>+34 123 456 789</p>
                </div>
                </Flex>
            </Box>
            <Box  p={8} borderRadius="lg" backdropFilter="blur(12px)" bg="rgba(255, 255, 0, 0.15)"  boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)" border="1px solid rgba(255, 255, 255, 0.3)">
                <Flex gap={5} justifyContent="center">
                <Image src="/gift-card.png" width={50} height={50} />
                <div>
                <h3 className='font-bold text-yellow-600'>Gift Cards</h3>
                <p className='text-md text-yellow-600'>For your loved ones, in any occasion</p>
                </div>
                </Flex>
            </Box>
            <Box  p={8} borderRadius="lg" backdropFilter="blur(12px)" bg="rgba(255, 255, 0, 0.15)"  boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)" border="1px solid rgba(255, 255, 255, 0.3)">
                <Flex gap={5} justifyContent="center">
                <Image src="/speak.png" width={50} height={50} />
                <div>
                <h3 className='font-bold text-yellow-600'>chat with us</h3>
                <p className='text-md text-yellow-600'>We offer 24*7 customer support</p>
                </div>
                </Flex>
            </Box>
        </Flex>
    </div>
  )
}

export default CartFooter