import {
  getUser,
  setUser,
  getProducts,
  getCategories,
  getProductsByIds,
  setProducts,
  setCategories,
  getCarts,
  setCarts,
  addToCart,
  addToNewCart,
  createCart,
  payCart,
  deleteCart,
} from '../actions';
import {
  Actions,
  IdWithToken,
  AddToCartPayload,
  AddToNewCartPayload,
} from '../action.types';
import {
  User,
  ProductsResponse,
  CategoriesResponse,
  CartResponse,
} from '../../api';

describe('Action Creators', () => {
  test('getUser returns the correct action', () => {
    const payload: IdWithToken = { id: '1', token: 'sample-token' };
    const expectedAction = {
      type: Actions.GET_USER,
      payload,
    };
    expect(getUser(payload)).toEqual(expectedAction);
  });

  test('setUser returns the correct action', () => {
    const user: User = {
      id: '1', firstName: 'John', lastName: 'Doe', userName: 'John', roles: ['test'],
    };
    const expectedAction = {
      type: Actions.SET_USER,
      payload: user,
    };
    expect(setUser(user)).toEqual(expectedAction);
  });

  test('getProducts returns the correct action', () => {
    const expectedAction = { type: Actions.GET_PRODUTCS };
    expect(getProducts()).toEqual(expectedAction);
  });

  test('getCategories returns the correct action', () => {
    const expectedAction = { type: Actions.GET_CATEGORIES };
    expect(getCategories()).toEqual(expectedAction);
  });

  test('getProductsByIds returns the correct action', () => {
    const productIds = ['1', '2'];
    const expectedAction = {
      type: Actions.GET_PRODUTCS_BY_IDS,
      payload: productIds,
    };
    expect(getProductsByIds(productIds)).toEqual(expectedAction);
  });

  test('setProducts returns the correct action', () => {
    const products: ProductsResponse = { numberOfPages: 0, priceRange: { min: 0, max: 0 }, products: [] };
    const expectedAction = {
      type: Actions.SET_PRODUTCS,
      payload: products,
    };
    expect(setProducts(products)).toEqual(expectedAction);
  });

  test('setCategories returns the correct action', () => {
    const categories: CategoriesResponse = [{ id: '1', name: 'test' }];
    const expectedAction = {
      type: Actions.SET_CATEGORIES,
      payload: categories,
    };
    expect(setCategories(categories)).toEqual(expectedAction);
  });

  test('getCarts returns the correct action', () => {
    const payload: IdWithToken = { id: '1', token: 'sample-token' };
    const expectedAction = {
      type: Actions.GET_CARTS,
      payload,
    };
    expect(getCarts(payload)).toEqual(expectedAction);
  });

  test('setCarts returns the correct action', () => {
    const carts: Array<CartResponse> = [];
    const expectedAction = {
      type: Actions.SET_CARTS,
      payload: carts,
    };
    expect(setCarts(carts)).toEqual(expectedAction);
  });

  test('addToCart returns the correct action', () => {
    const payload: AddToCartPayload = {
      cartId: '1', productId: '2', productValue: 10, token: 'sample-token',
    };
    const expectedAction = {
      type: Actions.ADD_TO_CART,
      payload,
    };
    expect(addToCart(payload)).toEqual(expectedAction);
  });

  test('addToNewCart returns the correct action', () => {
    const payload: AddToNewCartPayload = {
      userId: '1', productId: '2', productValue: 10, token: 'sample-token',
    };
    const expectedAction = {
      type: Actions.ADD_TO_NEW_CART,
      payload,
    };
    expect(addToNewCart(payload)).toEqual(expectedAction);
  });

  test('createCart returns the correct action', () => {
    const payload: IdWithToken = { id: '1', token: 'sample-token' };
    const expectedAction = {
      type: Actions.CREATE_CART,
      payload,
    };
    expect(createCart(payload)).toEqual(expectedAction);
  });

  test('payCart returns the correct action', () => {
    const payload: IdWithToken = { id: '1', token: 'sample-token' };
    const expectedAction = {
      type: Actions.PAY_CART,
      payload,
    };
    expect(payCart(payload)).toEqual(expectedAction);
  });

  test('deleteCart returns the correct action', () => {
    const payload: IdWithToken = { id: '1', token: 'sample-token' };
    const expectedAction = {
      type: Actions.DELETE_CART,
      payload,
    };
    expect(deleteCart(payload)).toEqual(expectedAction);
  });
});
