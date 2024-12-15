
import React from 'react';
import CartItems from './CartItems';
import OrderSummary from './OrderSummary';
import CartFooter from './CartFooter';
import { Flex } from '@chakra-ui/react';
const Cart = () => {
    return (
        <div className="bg-black">

            <div className="bg-[url('/about-2.avif')] h-40 bg-center bg-cover blur-sm border-b-2 border-yellow-400"></div>
            <div className="text-white font-bold grid place-content-center text-5xl absolute top-[190px] left-[610px] drop-shadow-xl">
                SHOPPING CART
            </div>
        
        <Flex p={8}>
            <CartItems/>
            <OrderSummary/>
        </Flex>
        
        <CartFooter/>
          

         
            
        </div>
    );
}

export default Cart;
