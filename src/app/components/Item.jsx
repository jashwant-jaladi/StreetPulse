import React, { useState } from "react";
import Image from "next/image";

import { StarIcon } from "@chakra-ui/icons";
import ItemDescription from "./ItemDescription";

const Item = ({
  id,
  name,
  price,
  image,
  rating,
  noOfRatings,
  description,
  preOffer,
  discount,
  handleWishlistClick,
  isInWishlist,
  disableViewButton,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getRatingClass = (rating) => {
    if (!rating) return "bg-gray-500";
    if (rating <= 3) return "bg-red-600";
    if (rating <= 4) return "bg-yellow-600";
    return "bg-green-700";
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div
      key={id}
      className="border-2 border-yellow-700 w-full sm:w-[280px] p-4 rounded-xl overflow-hidden bg-gray-800"
    >
      {/* Product Image */}
      <div className="relative group h-[30vh] flex justify-center items-center overflow-hidden rounded-lg">
        <Image
          src={image}
          width={300}
          height={300}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* View Product Button */}
       {!disableViewButton && <button
          className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${disableViewButton ? "cursor-not-allowed opacity-50" : ""}`}
          onClick={ toggleModal} 
          
        >
          View Product
        </button>}
      </div>

      {/* Product Info */}
      <div className="flex justify-between items-start mt-3">
        {/* Product Name */}
        <div className="line-clamp-1 text-lg font-semibold text-gray-200 cursor-pointer flex-1 overflow-hidden">
          {name}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => handleWishlistClick(id)}
          className="flex-shrink-0 min-w-[24px]"
        >
          <Image
            src={isInWishlist ? "/heart-clicked.png" : "/heart.svg"}
            alt="Wishlist"
            width={24}
            height={24}
            className="transition-transform hover:scale-110"
          />
        </button>
      </div>

      {/* Product Rating */}
      <div className="flex items-center mt-2">
        <span
          className={`text-sm font-semibold px-2 py-1 rounded-lg text-white ${getRatingClass(
            rating
          )}`}
        >
          {rating}
          <StarIcon className="ml-1 text-white" />
        </span>
        <span className="text-gray-400 ml-2">({noOfRatings} reviews)</span>
      </div>

      {/* Product Price */}
      <div className="mt-2 text-sm flex flex-col space-y-1">
        <span className="text-gray-300 font-semibold text-lg">₹{price}</span>
        <div className="flex items-center gap-2 text-gray-400">
          <span className="line-through">₹{preOffer}</span>
          <span className="text-green-500 font-medium">{discount}% off</span>
        </div>
      </div>

      {/* Modal for Item Description */}
      {isModalOpen && (
        <ItemDescription
          onClose={toggleModal}
          description={description}
          id={id}
          name={name}
          price={price}
          image={image}
          rating={rating}
          noOfRatings={noOfRatings}
          preOffer={preOffer}
          discount={discount}
          isInWishlist={isInWishlist}
          handleWishlistClick={handleWishlistClick}
        />
      )}
    </div>
  );
};

export default Item;