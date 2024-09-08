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
  return (
    <div>
{ cartItems.length === 0 ?
  
  <div className="flex-1 container mx-auto py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
          <button
            onClick={() => navigate('/home')}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Start Shopping
          </button>
        </div>
:
      <>
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
      </>
}
    </div>
  );
};

export default CartPage;
