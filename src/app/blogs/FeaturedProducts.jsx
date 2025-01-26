"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"; // Import Chakra UI icons
import { Button } from "@chakra-ui/react"; // Chakra UI button component
import Item from "../components/Item";
import useShopStore from "@/zustand/shopStore";

const FeaturedProducts = () => {
  const { shops, fetchShops, wishlist, addToWishlist, removeFromWishlist } = useShopStore();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (shops.length === 0) {
      fetchShops();
    } else {
      getRandomProducts();
    }
  }, [shops]);

  const isInWishlist = (shopId) => 
    wishlist?.some((item) => item.shopId === shopId);

  const handleWishlistClick = (shopId) => {
    if (!userId) {
      alert("Please log in to add items to your wishlist.");
      return;
    }

    if (isInWishlist(shopId)) {
      removeFromWishlist(userId, shopId);
    } else {
      addToWishlist(userId, shopId);
    }
  };

  const getRandomProducts = () => {
    const shuffledShops = shops.sort(() => Math.random() - 0.5);
    const randomShops = shuffledShops.slice(0, 15);
    setFeaturedProducts(randomShops);
  };

  // Navigate to the previous product
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredProducts.length - 1 : prevIndex - 1
    );
  };

  // Navigate to the next product
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredProducts.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full px-4 mt-8">
      <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-yellow-600 text-center sm:text-left">
        Featured Products
      </h3>

      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Featured Product */}
        {featuredProducts.length > 0 && (
          <Item
            key={featuredProducts[currentIndex].id}
            name={featuredProducts[currentIndex].name}
            price={featuredProducts[currentIndex].prices}
            image={featuredProducts[currentIndex].image}
            id={featuredProducts[currentIndex].id}
            handleWishlistClick={handleWishlistClick}
            isInWishlist={isInWishlist(featuredProducts[currentIndex].id)}
            preOffer={featuredProducts[currentIndex].preOffer}
            discount={featuredProducts[currentIndex].discount}
            rating={featuredProducts[currentIndex].rating}
            noOfRatings={featuredProducts[currentIndex].noOfRatings}
            description={featuredProducts[currentIndex].description}
          />
        )}

        {/* Arrows Below */}
        <div className="flex justify-between w-full mt-4">
          <Button
            onClick={handlePrev}
            colorScheme="yellow"
            variant="outline"
            borderRadius="full"
            size={["md", "lg"]} // Smaller on mobile, larger on desktop
            className="hover:bg-yellow-600"
          >
            <ChevronLeftIcon boxSize={[4, 6]} /> {/* Smaller on mobile, larger on desktop */}
          </Button>
          <Button
            onClick={handleNext}
            colorScheme="yellow"
            variant="outline"
            borderRadius="full"
            size={["md", "lg"]} // Smaller on mobile, larger on desktop
            className="hover:bg-yellow-600"
          >
            <ChevronRightIcon boxSize={[4, 6]} /> {/* Smaller on mobile, larger on desktop */}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;