import {
  CartResponse, CategoriesResponse, ProductsResponse, User,
} from '../api';
import {
  Actions,
  GET_PRODUCTS,
  GET_PRODUTCS_BY_IDS,
  SET_PRODUCTS,
  AddToCartPayload,
  ADD_TO_CART,
  CREATE_CART,
  DELETE_CART,
  GET_CARTS,
  SET_CARTS,
  PAY_CART,
  AddToNewCartPayload,
  ADD_TO_NEW_CART,
  GET_USER,
  SET_USER,
  GetUserPayload,
  GET_CATEGORIES,
  SET_CATEGORIES,
} from './action.types';

export const getUser = (payload: GetUserPayload): GET_USER => ({
  type: Actions.GET_USER,
  payload,
});

export const setUser = (user: User): SET_USER => ({
  type: Actions.SET_USER,
  payload: user,
});

export const getProducts = (): GET_PRODUCTS => ({
  type: Actions.GET_PRODUTCS,
});

export const getCategories = (): GET_CATEGORIES => ({
  type: Actions.GET_CATEGORIES,
});

export const getProductsByIds = (productIds: Array<string>): GET_PRODUTCS_BY_IDS => ({
  type: Actions.GET_PRODUTCS_BY_IDS,
  payload: productIds,
});

export const setProducts = (products: ProductsResponse): SET_PRODUCTS => ({
  type: Actions.SET_PRODUTCS,
  payload: products,
});

export const setCategories = (categories: CategoriesResponse): SET_CATEGORIES => ({
  type: Actions.SET_CATEGORIES,
  payload: categories,
});

export const getCarts = (userId: string): GET_CARTS => ({
  type: Actions.GET_CARTS,
  payload: userId,
});

export const setCarts = (carts: Array<CartResponse>): SET_CARTS => ({
  type: Actions.SET_CARTS,
  payload: carts,
});

export const addToCart = (payload: AddToCartPayload): ADD_TO_CART => ({
  type: Actions.ADD_TO_CART,
  payload,
});

export const addToNewCart = (payload: AddToNewCartPayload): ADD_TO_NEW_CART => ({
  type: Actions.ADD_TO_NEW_CART,
  payload,
});

export const createCart = (userId: string): CREATE_CART => ({
  type: Actions.CREATE_CART,
  payload: userId,
});

export const payCart = (cartId: string): PAY_CART => ({
  type: Actions.PAY_CART,
  payload: cartId,
});

export const deleteCart = (cartId: string): DELETE_CART => ({
  type: Actions.DELETE_CART,
  payload: cartId,
});
