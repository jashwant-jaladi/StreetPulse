import React from 'react'
import ShopComponent from './ShopComponent'
import Shopnav from './shopnav'
import { PrismaClient } from '@prisma/client'


const Shop = async() => {
const prisma= new PrismaClient()

const products = await prisma.shop.findMany()
  return (
    <div>
    <Shopnav/>
    <ShopComponent products={products}/>
    </div>
  )
}

export default Shop