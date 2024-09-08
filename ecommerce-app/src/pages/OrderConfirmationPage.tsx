import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const { shippingInfo, cartItems, totalAmount } = location.state || {};

  if (!shippingInfo) {
    return <p>No order details found. Please return to the home page.</p>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">Order Confirmation</h2>
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Thank you for your order, {shippingInfo.name}!</h3>
          <p className="mb-4">A confirmation email has been sent to: {shippingInfo.email}</p>

          <h4 className="text-lg font-semibold mb-2">Shipping Address:</h4>
          <p className="mb-4">{shippingInfo.address}</p>

          <h4 className="text-lg font-semibold mb-2">Order Summary:</h4>
          <ul className="mb-4">
            {cartItems.map((item:any) => (
              <li key={item.id} className="flex justify-between mb-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-300 pt-4 flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg font-bold">${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
