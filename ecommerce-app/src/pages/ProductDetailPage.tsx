import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addToCart } from '../redux/features/cartSlice';
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: RootState) =>
    state.products.products.find((product) => product.id === parseInt(id!))
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!product) {
    return <p className="text-center text-red-500">Product not found.</p>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert('Item added to cart!');
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
                  <Header />


      {/* Back Button */}
      <button
        onClick={handleGoBack}
        className="ml-6 mt-6 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 flex items-center transition duration-300"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      {/* Product Detail Content */}
      <div className="flex-1 container mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-lg shadow-lg">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg hover:scale-105 transition transform duration-300"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-gray-600 mb-6">{product.description}</p>
              {/* <div className="flex items-center mb-6">
                
                {[...Array(5)].map((star, index) => (
                  <FaStar
                    key={index}
                    className={`text-yellow-500 ${
                      index < product.rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-3 text-gray-500">({product.rating})</span>
              </div> */}
              <p className="text-3xl font-bold text-gray-900 mb-6">
                ${product.price}
              </p>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 flex items-center justify-center transition duration-300"
            >
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
          </div>
        </div>
      </div>

      <Footer />

    </div>
  );
};

export default ProductDetailPage;

