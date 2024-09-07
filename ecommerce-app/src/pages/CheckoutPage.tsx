import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const CheckoutPage = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const [shippingInfo, setShippingInfo] = useState({ address: '', paymentMethod: '' });

  const handleCheckout = () => {
    // Handle checkout logic
    console.log('Order confirmed!', shippingInfo, items);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
          <input
            type="text"
            placeholder="Address"
            value={shippingInfo.address}
            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
            className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
          />
          <select
            value={shippingInfo.paymentMethod}
            onChange={(e) => setShippingInfo({ ...shippingInfo, paymentMethod: e.target.value })}
            className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
          >
            <option value="">Select Payment Method</option>
            <option value="credit">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {items.map((item) => (
            <div key={item.id} className="mb-4">
              <p>{item.name} x {item.quantity}</p>
              <p>${item.price * item.quantity!}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        className="bg-blue-500 text-white px-6 py-3 mt-8 rounded hover:bg-blue-600"
        onClick={handleCheckout}
      >
        Confirm Order
      </button>
    </div>
  );
};

export default CheckoutPage;
