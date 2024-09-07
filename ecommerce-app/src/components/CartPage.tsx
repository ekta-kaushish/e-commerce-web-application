import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart, updateQuantity } from '../redux/features/cartSlice';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity } = useSelector((state: RootState) => state.cart);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>
      {items.length > 0 ? (
        <div>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-4 bg-white rounded shadow-lg mb-4">
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-700">${item.price}</p>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(updateQuantity({ id: item.id, quantity: parseInt(e.target.value) }))
                  }
                  className="border border-gray-300 rounded px-2 py-1 mr-4"
                />
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-8 text-right">
            <p className="text-lg font-semibold">Total Quantity: {totalQuantity}</p>
            <Link to="/checkout">
              <button className="bg-green-500 text-white px-6 py-2 mt-4 rounded hover:bg-green-600">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center">Your cart is empty!</p>
      )}
    </div>
  );
};

export default CartPage;
