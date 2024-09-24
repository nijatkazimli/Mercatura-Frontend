import { CartResponse, ProductsResponse, User } from '../api';
import { Actions, REDUX_ACTIONS } from './action.types';

export type StateType = {
  user: User,
  products: ProductsResponse,
  carts: Array<CartResponse>,
  errorMessage: string,
}

const initialState: StateType = {
  user: {} as User,
  products: { numberOfPages: 0, priceRange: { min: 0.0, max: 0.0 }, products: [] },
  carts: [],
  errorMessage: '',
};

// eslint-disable-next-line default-param-last
export default function cartReducer(state: StateType = initialState, action: REDUX_ACTIONS) {
  switch (action.type) {
  case Actions.SET_USER: {
    return {
      ...state,
      user: action.payload,
    };
  }
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
