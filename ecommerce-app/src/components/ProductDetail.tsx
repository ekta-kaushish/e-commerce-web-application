import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addToCart } from '../redux/features/cartSlice';
import { Product } from '../types';

const ProductDetailPage: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);

  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id, 10) : NaN;  // Convert id to number or fallback to NaN
  console.log(products ,"dsds")
  const product = useSelector((state: RootState) =>
    state.products.products.find((product) => product.id === productId)
  );
  const dispatch = useDispatch();

  if (isNaN(productId)) {
    return <div>Invalid product ID!</div>;
  }

  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">${product.price}</p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
