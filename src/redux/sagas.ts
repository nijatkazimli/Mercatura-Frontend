import {
  all,
  AllEffect,
  call, CallEffect, put, PutEffect, select, SelectEffect, takeEvery,
} from 'redux-saga/effects';
import {
  fetchData, CartResponse, postData, deleteData,
  patchData,
  IdResponse,
  Product,
  ProductsResponse,
  User,
  CategoriesResponse,
} from '../api';
import {
  Actions, ADD_TO_CART, ADD_TO_NEW_CART, CREATE_CART, DELETE_CART, GET_CARTS, GET_PRODUTCS_BY_IDS, GET_USER, PAY_CART,
} from './action.types';
import { selectCarts, selectProducts } from './selectors';
import {
  setCarts, setCategories, setProducts, setUser,
} from './actions';

function* getUserSaga(action: GET_USER): Generator<CallEffect | PutEffect, void, User> {
  const { userId, token } = action.payload;
  try {
    const user = yield call(fetchData<User>, `/user/${userId}`, undefined, token);
    yield put(setUser(user));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e ? JSON.stringify(e) : 'Error fetching products');
  }
}

function* getProductsSaga(): Generator<CallEffect | PutEffect, void, ProductsResponse> {
  try {
    const products = yield call(fetchData<ProductsResponse>, '/product');
    yield put(setProducts(products));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e ? JSON.stringify(e) : 'Error fetching products');
  }
}

function* getCategoriesSaga(): Generator<CallEffect | PutEffect, void, CategoriesResponse> {
  try {
    const categories = yield call(fetchData<CategoriesResponse>, '/category');
    yield put(setCategories([{ id: '', name: 'All Categories' }, ...categories]));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e ? JSON.stringify(e) : 'Error fetching categories');
  }
}

function* getProductsByIdsSaga(action: GET_PRODUTCS_BY_IDS):
Generator<SelectEffect | AllEffect<CallEffect<Product>> | CallEffect | PutEffect, void, ProductsResponse & Array<Product>> {
  try {
    const productIdsToFetch = action.payload;
    const existingProducts = yield select(selectProducts);
    const existingProductsIds = existingProducts.products.map((p) => p.id);

    const nonExistingProductsIds = productIdsToFetch.filter((id) => !existingProductsIds.includes(id));
    if (nonExistingProductsIds?.length) {
      const fetchedProducts: Array<Product> = yield all(
        nonExistingProductsIds.map((id) => call(fetchData<Product>, `/product/${id}`)),
      );
      yield put(setProducts({ ...existingProducts, products: [...existingProducts, ...fetchedProducts] }));
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e ? JSON.stringify(e) : 'Error fetching products by ids');
  }
}

function* getCartsSaga(action: GET_CARTS): Generator<CallEffect | PutEffect, void, Array<CartResponse>> {
  try {
    const userId = action.payload;
    const carts = yield call(fetchData<Array<CartResponse>>, `/cart?userId=${userId}`);
    yield put(setCarts(carts));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e ? JSON.stringify(e) : 'Error fetching carts');
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
    // eslint-disable-next-line no-console
    console.error(e ? JSON.stringify(e) : 'Error creating cart');
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
    // eslint-disable-next-line no-console
    console.error(e ? JSON.stringify(e) : 'Error deleting cart');
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
    // eslint-disable-next-line no-console
    console.error(e ? JSON.stringify(e) : 'Error adding to cart');
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
    // eslint-disable-next-line no-console
    console.error(e ? JSON.stringify(e) : 'Error adding to new cart');
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
    // eslint-disable-next-line no-console
    console.error(e ? JSON.stringify(e) : 'Error paying cart');
  }
}

function* cartSaga() {
  yield takeEvery(Actions.GET_USER, getUserSaga);
  yield takeEvery(Actions.GET_PRODUTCS, getProductsSaga);
  yield takeEvery(Actions.GET_CATEGORIES, getCategoriesSaga);
  yield takeEvery(Actions.GET_PRODUTCS_BY_IDS, getProductsByIdsSaga);
  yield takeEvery(Actions.GET_CARTS, getCartsSaga);
  yield takeEvery(Actions.CREATE_CART, createCartSaga);
  yield takeEvery(Actions.DELETE_CART, deleteCartSaga);
  yield takeEvery(Actions.ADD_TO_CART, addToCartSaga);
  yield takeEvery(Actions.ADD_TO_NEW_CART, addToNewCartSaga);
  yield takeEvery(Actions.PAY_CART, payCartSaga);
}

export default cartSaga;
