import React from 'react'

const ProductDetails = async({params}) => {
    const response = await fetch(`http://localhost:3000/api/shop/${params.id}`, {cache: 'no-store'}, { next: { revalidate: 3600 } })
  const product = await response.json()
  console.log(product)
  return (
    <div>{product.name}</div>
  )
}
export default ProductDetails