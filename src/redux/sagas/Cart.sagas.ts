import {
  call, CallEffect, put, PutEffect, select, SelectEffect, takeEvery,
} from 'redux-saga/effects';
import {
  fetchData, CartResponse, postData, deleteData,
  patchData,
  IdResponse,
} from '../../api';
import {
  Actions, ADD_TO_CART, ADD_TO_NEW_CART, CREATE_CART, DELETE_CART, GET_CARTS, PAY_CART,
} from '../action.types';
import { selectCarts } from '../selectors';
import { setCarts, setError } from '../actions';

function* getCartsSaga(action: GET_CARTS): Generator<CallEffect | PutEffect, void, Array<CartResponse>> {
  try {
    const userId = action.payload;
    const carts = yield call(fetchData<Array<CartResponse>>, `/cart?userId=${userId}`);
    yield put(setCarts(carts));
  } catch (e) {
    yield put(setError(e ? JSON.stringify(e) : 'Error fetching carts'));
  }
}

function* createCartSaga(action: CREATE_CART): Generator<CallEffect | SelectEffect | PutEffect, void, IdResponse & Array<CartResponse>> {
  try {
    const userId = action.payload;
    const newCartId: IdResponse = yield call(postData, `/cart?userId=${userId}`);
    const newCart: CartResponse = {
      ...newCartId, userId, productIds: [], paid: false, totalValue: 0,
    };
    const existingCarts: Array<CartResponse> = yield select(selectCarts);
    yield put(setCarts([...existingCarts, newCart]));
  } catch (e) {
    yield put(setError(e ? JSON.stringify(e) : 'Error creating cart'));
  }
}

function* deleteCartSaga(action: DELETE_CART): Generator<CallEffect | SelectEffect | PutEffect, void, Array<CartResponse>> {
  try {
    const cartId = action.payload;
    yield call(deleteData, `/cart/${cartId}`);
    const existingCarts = yield select(selectCarts);
    const filteredCarts = existingCarts.filter((cart) => cart.id !== cartId);
    yield put(setCarts(filteredCarts));
  } catch (e) {
    yield put(setError(e ? JSON.stringify(e) : 'Error deleting cart'));
  }
}

function* addToCartSaga(action: ADD_TO_CART): Generator<CallEffect | SelectEffect | PutEffect, void, Array<CartResponse>> {
  try {
    const { cartId, productId, productValue } = action.payload;
    yield call(patchData, `/cart/${cartId}/add?productId=${productId}`);
    const existingCarts = yield select(selectCarts);
    const cartsToPut = existingCarts.map((cart) => {
      if (cart.id !== cartId) { return cart; }
      return {
        ...cart,
        productIds: [...cart.productIds, productId],
        totalValue: cart.totalValue + productValue,
      };
    });
    yield put(setCarts(cartsToPut));
  } catch (e) {
    yield put(setError(e ? JSON.stringify(e) : 'Error adding to cart'));
  }
}

function* addToNewCartSaga(action: ADD_TO_NEW_CART): Generator<CallEffect | SelectEffect | PutEffect, void, IdResponse & Array<CartResponse>> {
  try {
    const { userId, productId, productValue } = action.payload;
    const newCartId: IdResponse = yield call(postData, `/cart?userId=${userId}`);
    yield call(patchData, `/cart/${newCartId.id}/add?productId=${productId}`);
    const newCart: CartResponse = {
      ...newCartId, userId, productIds: [productId], paid: false, totalValue: productValue,
    };
    const existingCarts: Array<CartResponse> = yield select(selectCarts);
    yield put(setCarts([...existingCarts, newCart]));
  } catch (e) {
    yield put(setError(e ? JSON.stringify(e) : 'Error adding to new cart'));
  }
}

function* payCartSaga(action: PAY_CART): Generator<CallEffect | SelectEffect | PutEffect, void, Array<CartResponse>> {
  try {
    const cartId = action.payload;
    yield call(patchData, `/cart/${cartId}/pay`);
    const existingCarts = yield select(selectCarts);
    const cartsToPut = existingCarts.map((cart) => {
      if (cart.id !== cartId) { return cart; }
      return {
        ...cart,
        paid: true,
      };
    });
    yield put(setCarts(cartsToPut));
  } catch (e) {
    yield put(setError(e ? JSON.stringify(e) : 'Error paying cart'));
  }
}

function* cartSaga() {
  yield takeEvery(Actions.GET_CARTS, getCartsSaga);
  yield takeEvery(Actions.CREATE_CART, createCartSaga);
  yield takeEvery(Actions.DELETE_CART, deleteCartSaga);
  yield takeEvery(Actions.ADD_TO_CART, addToCartSaga);
  yield takeEvery(Actions.ADD_TO_NEW_CART, addToNewCartSaga);
  yield takeEvery(Actions.PAY_CART, payCartSaga);
}

export default cartSaga;
