import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchProductsRequest } from '../redux/features/productSlice';
import ProductCard from '../components/ProductCard';
const HomePage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state: RootState) => state.products);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    // Trigger saga to fetch products
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  return (
    <div >
      <section className="relative bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center py-20">
        <div className="container mx-auto">
          <h1 className="text-5xl font-extrabold mb-4">Welcome to Our Shop</h1>
          <p className="text-xl mb-6">
            Discover the best products at unbeatable prices!
          </p>
          <button className="bg-white text-blue-500 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition duration-300">
            Shop Now
          </button>
        </div>
      </section>

      {/* All Products Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10">Shop All Products</h2>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error: {error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
               {products.map((product) => {
          const isInCart = cartItems.some((item) => item.id === product.id); // Check if product is in the cart
          return <ProductCard key={product.id} product={product} isInCart={isInCart} />;
        })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default HomePage;
