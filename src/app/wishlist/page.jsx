"use client";
import React, { useEffect, useState } from "react";
import useShopStore from "@/zustand/shopStore";
import { useSession } from "next-auth/react";
import Item from "../components/Item";
import { Button, Box, VStack } from "@chakra-ui/react";
import ItemDescription from "../components/ItemDescription";

const Wishlist = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const wishlist = useShopStore((state) => state.wishlist); // Get wishlist from Zustand store
  const fetchWishlist = useShopStore((state) => state.fetchWishlist); // Fetch wishlist from the API
  const removeFromWishlist = useShopStore((state) => state.removeFromWishlist); // Function to remove from Zustand store

  const [loading, setLoading] = useState(true); // Loading state to handle async fetching
  const [activeItem, setActiveItem] = useState(null); // Track the active item's modal

  const handleOpenModal = (item) => {
    setActiveItem(item); // Set the item whose modal is open
  };

  const handleCloseModal = () => {
    setActiveItem(null); // Close the modal
  };

  // Fetch wishlist data on component mount
  useEffect(() => {
    if (userId) {
      setLoading(true); // Start loading
      fetchWishlist(userId)
        .then(() => setLoading(false)) // Stop loading after fetch
        .catch((err) => {
          console.error("Failed to fetch wishlist:", err);
          setLoading(false);
        });
    } else {
      setLoading(false); // No user, no loading
    }
  }, [userId, fetchWishlist]);

  if (loading) {
    return (
      <div className="bg-black">
        <div className="bg-[url('/about-1.avif')] h-40 bg-center bg-cover text-white font-bold grid place-content-center text-3xl sm:text-4xl md:text-5xl border-b-2 border-yellow-400">
          WISHLIST SECTION
        </div>
        <p className="text-yellow-400 text-xl sm:text-2xl pb-5 bg-black text-center mt-10">
          Loading your wishlist...
        </p>
      </div>
    );
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="bg-black">
        <div className="bg-[url('/about-1.avif')] h-40 bg-center bg-cover text-white font-bold grid place-content-center text-3xl sm:text-4xl md:text-5xl border-b-2 border-yellow-400">
          WISHLIST SECTION
        </div>
        <p className="text-yellow-400 text-xl sm:text-2xl pb-5 bg-black text-center mt-10">
          Your wishlist is empty 😭
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-[url('/about-1.avif')] h-40 bg-center bg-cover text-white font-bold grid place-content-center text-3xl sm:text-4xl md:text-5xl border-b-2 border-yellow-400">
        WISHLIST SECTION
      </div>
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
                handleWishlistClick={() => removeFromWishlist(userId, item.shopId)}
                isInWishlist={true}
              />
              <Button
                onClick={() => handleOpenModal(item)}
                colorScheme="yellow"
                width="full"
                borderRadius="md"
                _hover={{ transform: "scale(1.05)" }}
                boxShadow="md"
                size={["sm", "md"]} // Smaller on mobile, medium on desktop
              >
                View Details
              </Button>
            </VStack>
          </Box>
        ))}
      </div>
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