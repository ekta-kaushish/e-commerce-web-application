// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../redux/features/cartSlice';
// import { Product } from '../types';
// import { FaShoppingCart } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const dispatch = useDispatch();
//   const [showAlert, setShowAlert] = useState(false);

//   const handleAddToCart = () => {
//     dispatch(addToCart(product));
//     setShowAlert(true);
//     setTimeout(() => setShowAlert(false), 2000); // Hide alert after 2 seconds
//   };

//   return (
//     <div className="border border-gray-200 rounded-lg p-4 relative">
//       {showAlert && (
//         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-10">
//           Item added to cart!
//         </div>
//       )}
//       <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
//       <h2 className="text-xl font-bold mb-2">{product.name}</h2>
//       <p className="text-gray-700 mb-2">${product.price}</p>
//       <div className="mt-4 flex justify-between">
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
//         onClick={handleAddToCart}
//       >
//         <FaShoppingCart className="mr-2" />
//         Add to Cart
//       </button>
//       <Link to={`/product/${product.id}`} className="text-blue-500 hover:underline">
//            View Details
//         </Link>
//       </div>
      
//     </div>
//   );
// };

// export default ProductCard;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/features/cartSlice';
import { Product } from '../types';
import { FaCheck, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  isInCart: boolean; // New prop to indicate if the product is already in the cart

}

const ProductCard: React.FC<ProductCardProps> = ({ product ,isInCart }) => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000); // Hide alert after 2 seconds
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 relative hover:shadow-lg transition-transform transform hover:scale-105">
            {showAlert && (
         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-10">
           Item added to cart!
         </div>
       )}
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-2">${product.price}</p>
      {isInCart && (
          <div className="flex items-center text-green-600 font-bold">
            <FaCheck className="mr-2" />
            Added to Cart
          </div>)}
      <div className="mt-4 flex justify-between">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
        onClick={handleAddToCart}
      >
        <FaShoppingCart className="mr-2" />
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
