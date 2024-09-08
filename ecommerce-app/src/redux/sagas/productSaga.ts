import { call, put, takeEvery } from 'redux-saga/effects';
import { setProducts, fetchProductsFailure, fetchProductsRequest, setRelatedProducts, fetchRelatedProducts } from '../features/productSlice';
import { Product } from '../../types';
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';



// Worker saga: will be fired on FETCH_PRODUCTS_REQUEST actions
function* fetchProductsSaga() : Generator<any, void, any>{
  try {
    const response: Product[] = yield call(() => axios.get(API_URL).then(res => res.data));
    yield put(setProducts(response));
  } catch (error:any) {
    yield put(fetchProductsFailure(error.toString()));
  }
}

function* fetchRelatedProductsSaga(action: { type: string; payload: string }) {
  try {
    const response: Product[] = yield call(() =>
      axios.get(`${API_URL}?category=${action.payload}`).then(res => res.data)
    );
    yield put(setRelatedProducts(response));
  } catch (error) {
    console.error('Failed to fetch related products:', error);
  }
}



// Watcher saga: spawn a new fetchProductsSaga task on each FETCH_PRODUCTS_REQUEST
export function* watchFetchProducts() {
  yield takeEvery(fetchProductsRequest.type, fetchProductsSaga);
  yield takeEvery(fetchRelatedProducts.type, fetchRelatedProductsSaga);

}
