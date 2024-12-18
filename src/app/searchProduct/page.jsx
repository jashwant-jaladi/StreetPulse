'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Item from '../components/Item';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/searchProduct?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        console.log('Fetched Products:', data);
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
          />
        ))}
      </div>
      )}
    </div>
  );
};

export default SearchPage;
