import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import productReducer from './features/productSlice';
import cartReducer from './features/cartSlice';
import authReducer from './features/authSlice';
import { saveCartToLocalStorage, loadCartFromLocalStorage, loadLoginFromLocalStorage, saveLoginToLocalStorage } from '../utils/localStorage';
import rootSaga from './sagas';

const preloadedState = {
  cart: loadCartFromLocalStorage() || { items: [], totalQuantity: 0 },
  auth: loadLoginFromLocalStorage() || { isAuthenticated: false, user: null },
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth:authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  preloadedState, // Preload cart state from localStorage
});

// Subscribe to Redux store changes and save the cart to localStorage
store.subscribe(() => {
  saveCartToLocalStorage(store.getState().cart);
  saveLoginToLocalStorage(store.getState().auth);
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
