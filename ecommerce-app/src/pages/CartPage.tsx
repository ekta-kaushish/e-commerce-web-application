// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../redux/store';
// import { removeFromCart, updateQuantity } from '../redux/features/cartSlice';
// import { Link } from 'react-router-dom';

// const CartPage = () => {
//   const dispatch = useDispatch();
//   const { items, totalQuantity } = useSelector((state: RootState) => state.cart);

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>
//       {items.length > 0 ? (
//         <div>
//           {items.map((item) => (
//             <div key={item.id} className="flex justify-between items-center p-4 bg-white rounded shadow-lg mb-4">
//               <div>
//                 <h3 className="text-lg font-semibold">{item.name}</h3>
//                 <p className="text-gray-700">${item.price}</p>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="number"
//                   value={item.quantity}
//                   onChange={(e) =>
//                     dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) }))
//                   }
//                   className="border border-gray-300 rounded px-2 py-1 mr-4"
//                 />
//                 <button
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                   onClick={() => dispatch(removeFromCart(item.id))}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//           <div className="mt-8 text-right">
//             <p className="text-lg font-semibold">Total Quantity: {totalQuantity}</p>
//             <Link to="/checkout">
//               <button className="bg-green-500 text-white px-6 py-2 mt-4 rounded hover:bg-green-600">
//                 Checkout
//               </button>
//             </Link>
//           </div>
//         </div>
//       ) : (
//         <p className="text-center">Your cart is empty!</p>
//       )}
//     </div>
//   );
// };

// export default CartPage;
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { FaTrash, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { removeFromCart, updateQuantity } from '../redux/features/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md py-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1
              className="text-2xl font-bold text-blue-600 cursor-pointer"
              onClick={() => navigate('/')}
            >
              My Shop
            </h1>
            <div className="relative">
              <FaShoppingCart className="text-2xl text-blue-600 cursor-pointer" />
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </div>
          </div>
        </header>

        <div className="flex-1 container mx-auto py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Start Shopping
          </button>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6 mt-12">
          <div className="container mx-auto text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} My Shop. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => navigate('/')}
          >
            My Shop
          </h1>
          <div className="relative">
            <FaShoppingCart
              className="text-2xl text-blue-600 cursor-pointer"
              onClick={() => navigate('/cart')}
            />
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          </div>
        </div>
      </header>

      {/* Cart Content */}
      <div className="flex-1 container mx-auto py-12">
        <h2 className="text-3xl font-bold mb-8">Your Cart</h2>

        <div className="grid grid-cols-1 gap-8">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg mr-6"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                      className="bg-gray-200 px-3 py-1 rounded-l-lg"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="bg-gray-200 px-3 py-1 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 transition duration-300 mr-4"
                >
                  <FaTrash />
                </button>
                <p className="text-lg font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-4">
            <span>Total Items</span>
            <span>{cartItems.length}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Total Price</span>
            <span>${getTotalPrice()}</span>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} My Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;
