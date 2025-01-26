"use client";
import React, { useEffect, useState } from "react";
import useShopStore from "@/zustand/shopStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Item from "../components/Item";
import { Button, Box, VStack } from "@chakra-ui/react";
import ItemDescription from "../components/ItemDescription";


const Wishlist = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const wishlist = useShopStore((state) => state.wishlist);
  const fetchWishlist = useShopStore((state) => state.fetchWishlist);
  const removeFromWishlist = useShopStore((state) => state.removeFromWishlist);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState(null);

  const handleOpenModal = (item) => {
    setActiveItem(item);
  };

  const handleCloseModal = () => {
    setActiveItem(null);
  };

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetchWishlist(userId)
        .then(() => setLoading(false))
        .catch((err) => {
          console.error("Failed to fetch wishlist:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [userId, fetchWishlist]);

  return (
    <div className="bg-black">
      {/* Constant Banner */}
      <div className="relative h-40 bg-center border-b-2 border-yellow-400">
        <Image
          src="https://res.cloudinary.com/dm7ntehzl/image/upload/v1737648401/StreetPulse/HomepageImages%20and%20headers/about-3_rdqxmh.avif"
          alt="Wishlist Section Background"
          fill
          className="object-cover"
          style={{ filter: "brightness(50%)" }}
        />
        <div className="absolute inset-0 grid place-content-center text-white font-bold text-3xl sm:text-4xl md:text-5xl text-center">
          WISHLIST SECTION
        </div>
      </div>

      {/* Conditional Rendering */}
      {loading ? (
        <p className="text-yellow-400 text-xl sm:text-2xl pb-5 bg-black text-center mt-20">
          Loading your wishlist please wait...
      </p>
      ) : !wishlist || wishlist.length === 0 ? (
        <p className="text-yellow-400 text-xl sm:text-2xl pb-5 bg-black text-center mt-20">
          Your wishlist is empty 😭
        </p>
      ) : (
        <div className="bg-black text-slate-300 p-4 sm:p-8 md:p-14 pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-14 place-items-center">
          {wishlist.map((item) => (
            <Box key={item.shopId} w="full" maxW="320px">
              <VStack spacing={4}>
                <Item
                  id={item.id}
                  name={item.shop?.name || "Unnamed Item"}
                  price={item.shop?.prices || "N/A"}
                  image={item.shop?.image || "/default-image.jpg"}
                  rating={item.shop?.rating || 0}
                  noOfRatings={item.shop?.noOfRatings || 0}
                  description={
                    item.shop?.description || "No description available."
                  }
                  preOffer={item.shop?.preOffer || 0}
                  discount={item.shop?.discount || 0}
                  handleWishlistClick={() =>
                    removeFromWishlist(userId, item.shopId)
                  }
                  isInWishlist={true}
                />
                <Button
                  onClick={() => handleOpenModal(item)}
                  colorScheme="yellow"
                  width="full"
                  borderRadius="md"
                  _hover={{ transform: "scale(1.05)" }}
                  boxShadow="md"
                  size={["sm", "md"]}
                >
                  View Details
                </Button>
              </VStack>
            </Box>
          ))}
        </div>
      )}

      {/* Modal for Item Description */}
      {activeItem && (
        <ItemDescription
          onClose={handleCloseModal}
          id={activeItem.shopId}
          name={activeItem.shop?.name}
          image={activeItem.shop?.image}
          description={activeItem.shop?.description}
          preOffer={activeItem.shop?.preOffer}
          discount={activeItem.shop?.discount}
          price={activeItem.shop?.prices}
          rating={activeItem.shop?.rating}
          noOfRatings={activeItem.shop?.noOfRatings}
          handleWishlistClick={() =>
            removeFromWishlist(userId, activeItem.shopId)
          }
          isInWishlist={true}
        />
      )}
    </div>
  );
};

export default Wishlist;