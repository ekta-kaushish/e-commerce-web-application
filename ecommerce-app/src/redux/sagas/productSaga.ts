import { call, put, takeEvery } from 'redux-saga/effects';
import { setProducts, fetchProductsFailure, fetchProductsRequest } from '../features/productSlice';

// Mock API call (Fakestore API)
async function fetchProductsApi() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Worker saga: will be fired on FETCH_PRODUCTS_REQUEST actions
function* fetchProductsSaga() : Generator<any, void, any>{
  try {
    const products = yield call(fetchProductsApi); // Call the API
    yield put(setProducts(products)); // Dispatch action to store products
  } catch (error) {
    // Handle the error as a string
    if (error instanceof Error) {
      yield put(fetchProductsFailure(error.message)); // Handle errors
    } else {
      yield put(fetchProductsFailure('An unknown error occurred'));
    }
  }
}

// Watcher saga: spawn a new fetchProductsSaga task on each FETCH_PRODUCTS_REQUEST
export function* watchFetchProducts() {
  yield takeEvery(fetchProductsRequest.type, fetchProductsSaga);
}
