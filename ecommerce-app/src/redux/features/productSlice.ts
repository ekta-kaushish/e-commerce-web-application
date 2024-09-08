import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  relatedProducts: Product[];
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  relatedProducts: []
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.loading = false;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setRelatedProducts: (state, action: PayloadAction<Product[]>) => {
      state.relatedProducts = action.payload;
    },
    fetchRelatedProducts: (state, action: PayloadAction<string>) => {},
  },
});

export const { fetchProductsRequest, setProducts, fetchProductsFailure ,setRelatedProducts ,fetchRelatedProducts} = productSlice.actions;
export default productSlice.reducer;
