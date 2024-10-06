import {
  User, CartResponse, ProductsResponse, CategoriesResponse,
} from '../api';

export enum Actions {
  GET_USER = 'GET_USER',
  SET_USER = 'SET_USER',
  GET_PRODUTCS = 'GET_PRODUCTS',
  GET_CATEGORIES = 'GET_CATEGORIES',
  GET_PRODUTCS_BY_IDS = 'GET_PRODUCTS_BY_IDS',
  SET_PRODUTCS = 'SET_PRODUCTS',
  SET_CATEGORIES = 'SET_CATEGORIES',
  GET_CARTS = 'GET_CARTS',
  SET_CARTS = 'SET_CARTS',
  ADD_TO_CART = 'ADD_TO_CART',
  ADD_TO_NEW_CART = 'ADD_TO_NEW_CART',
  CREATE_CART = 'CREATE_CART',
  PAY_CART = 'PAY_CART',
  DELETE_CART = 'DELETE_CART',
}

export type ActionWithoutPayload<T> = {
  type: T,
};

export type ActionWithPayload<T, P> = {
  type: T,
  payload: P,
};

export type Token = {
  token: string,
}

export type AddToCartPayload = {
  cartId: string,
  productId: string,
  productValue: number,
} & Token;

export type AddToNewCartPayload = {
  userId: string,
} & Omit<AddToCartPayload, 'cartId'>;

export type IdWithToken = {
  id: string,
} & Token

export type GET_USER = ActionWithPayload<Actions.GET_USER, IdWithToken>;
export type SET_USER = ActionWithPayload<Actions.SET_USER, User>;
export type GET_PRODUCTS = ActionWithoutPayload<Actions.GET_PRODUTCS>;
export type GET_CATEGORIES = ActionWithoutPayload<Actions.GET_CATEGORIES>;
export type GET_PRODUTCS_BY_IDS = ActionWithPayload<Actions.GET_PRODUTCS_BY_IDS, Array<string>>;
export type SET_PRODUCTS = ActionWithPayload<Actions.SET_PRODUTCS, ProductsResponse>;
export type SET_CATEGORIES = ActionWithPayload<Actions.SET_CATEGORIES, CategoriesResponse>;
export type GET_CARTS = ActionWithPayload<Actions.GET_CARTS, IdWithToken>;
export type SET_CARTS = ActionWithPayload<Actions.SET_CARTS, Array<CartResponse>>;
export type ADD_TO_CART = ActionWithPayload<Actions.ADD_TO_CART, AddToCartPayload>;
export type ADD_TO_NEW_CART = ActionWithPayload<Actions.ADD_TO_NEW_CART, AddToNewCartPayload>;
export type CREATE_CART = ActionWithPayload<Actions.CREATE_CART, IdWithToken>;
export type PAY_CART = ActionWithPayload<Actions.PAY_CART, IdWithToken>;
export type DELETE_CART = ActionWithPayload<Actions.DELETE_CART, IdWithToken>;

export type REDUX_ACTIONS =
GET_USER |
SET_USER |
GET_PRODUCTS |
GET_CATEGORIES |
GET_PRODUTCS_BY_IDS |
SET_PRODUCTS |
SET_CATEGORIES |
GET_CARTS |
SET_CARTS |
ADD_TO_CART |
CREATE_CART |
PAY_CART |
DELETE_CART;
