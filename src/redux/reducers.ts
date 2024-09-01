import { CartResponse } from '../api';
import { Actions, CART_ACTIONS } from './action.types';

export type StateType = {
  carts: Array<CartResponse>,
  errorMessage: string,
}

const initialState: StateType = {
  carts: [],
  errorMessage: '',
};

// eslint-disable-next-line default-param-last
export default function cartReducer(state: StateType = initialState, action: CART_ACTIONS) {
  switch (action.type) {
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
