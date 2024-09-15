import { CartResponse, Product } from '../api';
import { Actions, REDUX_ACTIONS } from './action.types';

export type StateType = {
  products: Array<Product>,
  carts: Array<CartResponse>,
  errorMessage: string,
}

const initialState: StateType = {
  products: [],
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
  case Actions.SET_ERROR: {
    return {
      ...state,
      errorMessage: action.payload,
    };
  }
  default: {
    return {
      ...state,
    };
  }
  }
}
