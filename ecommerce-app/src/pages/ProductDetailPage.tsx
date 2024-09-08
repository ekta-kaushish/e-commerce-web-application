import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addToCart } from '../redux/features/cartSlice';
import { fetchRelatedProducts } from '../redux/features/productSlice';
import ProductCard from '../components/ProductCard';
const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: RootState) =>
    state.products.products.find((product) => product.id === parseInt(id!))
  );
  const relatedProducts = useSelector((state: RootState) => state.products.relatedProducts);

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    // Ensure the product exists and has a category
    if (product && typeof product.category === 'string') {
      dispatch(fetchRelatedProducts(product.category)); // Dispatch with the category as a string
    }
  }, [dispatch, product]);
  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity:quantity }));
    alert(`${product.name} added to cart with quantity: ${quantity}`);
  };

  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col lg:flex-row lg:space-x-10">
        {/* Product Image */}
        <div className="lg:w-1/2">
          <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg" />
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-xl text-gray-600 mb-4">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Quantity Selection */}
          <div className="flex items-center space-x-4 mb-6">
            <label htmlFor="quantity" className="text-gray-600">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-16 p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-500 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 fade-in">
        {relatedProducts.map((relatedProduct) => (
          <ProductCard key={relatedProduct.id} product={relatedProduct} isInCart={false} />
        ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
