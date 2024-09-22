import { CartResponse, ProductsResponse } from '../api';
import { Actions, REDUX_ACTIONS } from './action.types';

export type StateType = {
  products: ProductsResponse,
  carts: Array<CartResponse>,
  errorMessage: string,
}

const initialState: StateType = {
  products: { numberOfPages: 0, priceRange: { min: 0.0, max: 0.0 }, products: [] },
  carts: [],
  errorMessage: '',
};

// eslint-disable-next-line default-param-last
export default function cartReducer(state: StateType = initialState, action: REDUX_ACTIONS) {
  switch (action.type) {
  case Actions.SET_PRODUTCS: {
    return {
      ...state,
      products: action.payload,
    };
  }
  case Actions.SET_CARTS: {
    return {
      ...state,
      carts: action.payload,
    };
  }
  default: {
    return {
      ...state,
    };
  }
  }
}
