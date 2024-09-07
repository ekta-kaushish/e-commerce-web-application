import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-t-lg" />
      <h2 className="text-xl font-bold mt-4">{product.name}</h2>
      <p className="text-gray-700">${product.price}</p>
      <div className="mt-4 flex justify-between">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add to Cart
        </button>
        <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
