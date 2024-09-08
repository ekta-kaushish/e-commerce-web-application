import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useParams, useNavigate } from 'react-router-dom';

const Header = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => navigate('/home')}
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
  );
};

export default Header;
