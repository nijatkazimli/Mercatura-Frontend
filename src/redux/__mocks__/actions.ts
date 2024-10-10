import {
  Actions, ADD_TO_CART, ADD_TO_NEW_CART, CREATE_CART, DELETE_CART, GET_CARTS, GET_PRODUTCS_BY_IDS, GET_USER,
  PAY_CART,
} from '../action.types';

const getUser: GET_USER = {
  type: Actions.GET_USER,
  payload: {
    id: '1',
    token: 'sample-token',
  },
};

const getProductsByIds: GET_PRODUTCS_BY_IDS = {
  type: Actions.GET_PRODUTCS_BY_IDS,
  payload: ['1'],
};

const getCarts: GET_CARTS = {
  type: Actions.GET_CARTS,
  payload: {
    id: '1',
    token: 'sample-token',
  },
};

const createCart: CREATE_CART = {
  type: Actions.CREATE_CART,
  payload: {
    id: '1',
    token: 'sample-token',
  },
};

const deleteCart: DELETE_CART = {
  type: Actions.DELETE_CART,
  payload: {
    id: '1',
    token: 'sample-token',
  },
};

const addToCart: ADD_TO_CART = {
  type: Actions.ADD_TO_CART,
  payload: {
    cartId: '2',
    productId: '1',
    productValue: 10,
    token: 'sample-token',
  },
};

const addToNewCart: ADD_TO_NEW_CART = {
  type: Actions.ADD_TO_NEW_CART,
  payload: {
    userId: '1',
    productId: '1',
    productValue: 10,
    token: 'sample-token',
  },
};

const payCart: PAY_CART = {
  type: Actions.PAY_CART,
  payload: {
    id: '2',
    token: 'sample-token',
  },
};

export default {
  getUser,
  getProductsByIds,
  getCarts,
  createCart,
  deleteCart,
  addToCart,
  addToNewCart,
  payCart,
};
