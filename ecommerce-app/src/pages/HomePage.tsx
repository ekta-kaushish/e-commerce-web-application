import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { RootState } from '../redux/store';
import { setProducts } from '../redux/features/productSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    // Fetch products from API and dispatch to store
    dispatch(setProducts(mockProducts)); // Replace with actual fetch
  }, [dispatch]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

// Mock products
const mockProducts = [
  { id: 1, name: 'Product 1', price: 10, image: 'https://via.placeholder.com/150', description: 'Description 1' },
  { id: 2, name: 'Product 2', price: 20, image: 'https://via.placeholder.com/150', description: 'Description 2' },
];

export default HomePage;
