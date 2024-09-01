import { StateType } from './reducers';

export const selectCarts = (state: StateType) => state.carts;
export const selectErrorMessage = (state: StateType) => state.errorMessage;
