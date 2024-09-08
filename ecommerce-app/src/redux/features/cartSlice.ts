import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';

interface CartItem extends Product {
  quantity: number;
  id:any;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.totalQuantity -= state.items[index].quantity;
        state.items.splice(index, 1);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        state.totalQuantity += action.payload.quantity - existingItem.quantity;
        existingItem.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = []; // Clear all items from the cart
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity ,clearCart} = cartSlice.actions;
export default cartSlice.reducer;
