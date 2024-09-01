import { CartResponse } from '../api';

export enum Actions {
  GET_CARTS = 'GET_CARTS',
  SET_CARTS = 'SET_CARTS',
  ADD_TO_CART = 'ADD_TO_CART',
  ADD_TO_NEW_CART = 'ADD_TO_NEW_CART',
  CREATE_CART = 'CREATE_CART',
  PAY_CART = 'PAY_CART',
  DELETE_CART = 'DELETE_CART',
  SET_ERROR = 'SET_ERROR',
}

export type ActionWithoutPayload<T> = {
  type: T,
};

export type ActionWithPayload<T, P> = {
  type: T,
  payload: P,
};

export type AddToCartPayload = {
  cartId: string,
  productId: string,
  productValue: number,
};

export type AddToNewCartPayload = {
  userId: string,
} & Omit<AddToCartPayload, 'cartId'>;

export type GET_CARTS = ActionWithPayload<Actions.GET_CARTS, string>;
export type SET_CARTS = ActionWithPayload<Actions.SET_CARTS, Array<CartResponse>>;
export type ADD_TO_CART = ActionWithPayload<Actions.ADD_TO_CART, AddToCartPayload>;
export type ADD_TO_NEW_CART = ActionWithPayload<Actions.ADD_TO_NEW_CART, AddToNewCartPayload>;
export type CREATE_CART = ActionWithPayload<Actions.CREATE_CART, string>;
export type PAY_CART = ActionWithPayload<Actions.PAY_CART, string>;
export type DELETE_CART = ActionWithPayload<Actions.DELETE_CART, string>;
export type SET_ERROR = ActionWithPayload<Actions.SET_ERROR, string>;

export type CART_ACTIONS = GET_CARTS | SET_CARTS | ADD_TO_CART | CREATE_CART | PAY_CART | DELETE_CART | SET_ERROR;
