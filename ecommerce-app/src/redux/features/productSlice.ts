// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Product } from '../../types';

// interface ProductState {
//   products: Product[];
// }

// const initialState: ProductState = {
//   products: [],
// };

// const productSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     setProducts: (state, action: PayloadAction<Product[]>) => {
//       state.products = action.payload;
//     },
//   },
// });

// export const { setProducts } = productSlice.actions;
// export default productSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
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
  },
});

export const { fetchProductsRequest, setProducts, fetchProductsFailure } = productSlice.actions;
export default productSlice.reducer;
