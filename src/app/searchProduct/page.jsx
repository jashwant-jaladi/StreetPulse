"use client"
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Item from '../components/Item';
import useShopStore from '@/zustand/shopStore';
import { useSession } from 'next-auth/react';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const wishlist = useShopStore((state) => state.wishlist);
  const addToWishlist = useShopStore((state) => state.addToWishlist);
  const removeFromWishlist = useShopStore((state) => state.removeFromWishlist);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Check if product is in the wishlist
  const isInWishlist = (shopId) => 
    wishlist?.some((item) => item.shopId === shopId);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/searchProduct?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]); 
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchProducts();
  }, [query]);

  if (loading) return <p className="text-white">Loading...</p>;

  const handleWishlistClick = (shopId) => {
    if (isInWishlist(shopId)) {
      removeFromWishlist(userId, shopId); // Remove item from wishlist
    } else {
      addToWishlist(userId, shopId); // Add item to wishlist
    }
  };

  return (
    <div className="p-4 bg-black min-h-screen">
      <h1 className="text-3xl text-white font-bold my-4">
        Search Results for "{query}"
      </h1>
      {products.length === 0 ? (
        <p className="text-white">No products found.</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {products.map((product) => (
            <Item 
              key={product.id} 
              price={product.prices} 
              {...product}
              isInWishlist={isInWishlist(product.id)} // Pass the wishlist status to Item
              handleWishlistClick={handleWishlistClick} // Handle wishlist click in SearchPage as well
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
