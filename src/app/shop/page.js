import React from 'react'
import ShopComponent from './ShopComponent'
import Shopnav from './shopnav'
import prisma from '@/libs/db'


const Shop = async() => {


const products = await prisma.shop.findMany()
  return (
    <div>
    <Shopnav/>
    <ShopComponent products={products}/>
    </div>
  )
}

export default Shop