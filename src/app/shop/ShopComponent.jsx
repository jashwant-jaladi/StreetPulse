import React, { useEffect } from "react";
import Item from "../components/Item";
import useShopStore from "@/zustand/shopStore";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";  

const ShopComponent = ({ selectedFilter }) => {
  const { category } = useParams();  
  const products = useShopStore((state) => state.shops);
  const fetchShops = useShopStore((state) => state.fetchShops);
  const wishlist = useShopStore((state) => state.wishlist);
  const fetchWishlist = useShopStore((state) => state.fetchWishlist);
  const addToWishlist = useShopStore((state) => state.addToWishlist);
  const removeFromWishlist = useShopStore((state) => state.removeFromWishlist);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    const initializeData = async () => {
      if (userId) {
        try {
          await fetchShops();
          await fetchWishlist(userId); // Fetch wishlist on component load
        } catch (error) {
          console.error("Error initializing data:", error);
        }
      }
    };
 

    initializeData();
  }, [userId, fetchShops, fetchWishlist]);

  // Filter products by category and selected filter
  const filteredProducts = React.useMemo(() => {
    let filtered = products;

    if (selectedFilter) {
      switch (selectedFilter) {
        case "priceLowToHigh":
          filtered.sort((a, b) => a.prices - b.prices);
          break;
        case "priceHighToLow":
          filtered.sort((a, b) => b.prices - a.prices);
          break;
        case "discountHighToLow":
          filtered.sort((a, b) => b.discount - a.discount);
          break;
        case "ratingHighToLow":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }

    return filtered;
  }, [selectedFilter, category, products]);

  // Guard against empty data
  if (!filteredProducts || filteredProducts.length === 0) {
    return <p className="text-white text-center mt-10">No products available.</p>;
  }

  const isInWishlist = (shopId) =>
    wishlist?.some((item) => item.shopId === shopId);

  const getRatingClass = (rating) => {
    if (!rating) return "bg-gray-500";
    if (rating <= 3) return "bg-red-600";
    if (rating <= 4) return "bg-yellow-600";
    return "bg-green-700";
  };

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

  return (
    <div>
      <div className="bg-black text-slate-300 p-14 pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 place-items-center">
        {filteredProducts.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.prices}
            image={item.image}
            category={item.category}
            noOfRatings={item.noOfRatings}
            description={item.description}
            preOffer={item.preOffer}
            discount={item.discount}
            rating={item.rating}
            ratingClass={getRatingClass(item.rating)}
            handleWishlistClick={handleWishlistClick}
            isInWishlist={isInWishlist(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopComponent;
