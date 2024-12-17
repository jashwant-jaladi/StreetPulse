import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@chakra-ui/icons";

const Item = ({
  id,
  name,
  price,
  image,
  rating,
  noOfRatings,
  preOffer,
  discount,
  handleWishlistClick,
  isInWishlist,
}) => {
    
    const getRatingClass = (rating) => {
        if (!rating) return "bg-gray-500";
        if (rating <= 3) return "bg-red-600";
        if (rating <= 4) return "bg-yellow-600";
        return "bg-green-700";
      };
    

  return (
    <div
      key={id}
      className="border-2 border-yellow-700 w-[320px] p-3 rounded-xl overflow-hidden"
    >
      {/* Product Image */}
      <Image
        src={image}
        width={300}
        height={300}
        alt={name}
        className="w-[300px] h-[300px] object-center object-cover transition-transform ease-linear duration-300 hover:scale-105"
      />

      {/* Product Name and Wishlist Button */}
      <div className="flex justify-between gap-4">
        <div className="line-clamp-1 pt-3 mb-1 font-semibold text-md w-[270px] cursor-pointer">
          <Link href={`/shop/${id}`}>{name}</Link>
        </div>
        <button
          className="pt-2 flex items-center"
          onClick={() => handleWishlistClick(id)}
        >
          <Image
            src={isInWishlist ? "/heart-clicked.png" : "/heart.svg"}
            alt="Wishlist"
            width={25}
            height={25}
          />
        </button>
      </div>

      {/* Product Rating */}
      <span
        className={`inline ${getRatingClass(rating)} p-1 font-semibold`}
      >
        <span>{rating}</span>
        <StarIcon className="fill-white inline pl-1 pb-1" />
      </span>
      <span className="pl-2">({noOfRatings})</span>

      {/* Product Price and Discount */}
      <div className="flex gap-3 mt-1">
        <span className="font-semibold">₹ {price}</span>
        <span className="line-through text-slate-500">₹ {preOffer}</span>
        <span className="text-green-500">{discount}% off</span>
      </div>
    </div>
  );
};

export default Item;
