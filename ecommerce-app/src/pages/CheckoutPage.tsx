import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/features/cartSlice';

const CheckoutPage = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    email: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.email || !paymentMethod) {
      alert('Please fill in all the fields.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      alert('Order placed successfully!');
      navigate('/confirmation', { state: { shippingInfo, cartItems, totalAmount } });
      dispatch(clearCart()); // Clear the cart after order is placed
    }, 1000);
  };

  return (
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-4">Checkout</h2>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={shippingInfo.name}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg py-2 px-4"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-semibold mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg py-2 px-4"
                  placeholder="Enter your address"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg py-2 px-4"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Select Payment Method:</label>
                <div>
                  <input
                    type="radio"
                    id="credit"
                    name="paymentMethod"
                    value="Credit Card"
                    onChange={() => setPaymentMethod('Credit Card')}
                  />
                  <label htmlFor="credit" className="ml-2">Credit Card</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="PayPal"
                    onChange={() => setPaymentMethod('PayPal')}
                  />
                  <label htmlFor="paypal" className="ml-2">PayPal</label>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-4 flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-bold">${totalAmount.toFixed(2)}</span>
              </div>

              <button
                type="submit"
                className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Confirm and Place Order
              </button>
            </form>
          </div>
        )}
      </div>
  );
};

export default CheckoutPage;
