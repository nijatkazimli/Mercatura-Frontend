import { createSelector } from '@reduxjs/toolkit';
import { StateType } from './reducers';

export const selectUser = (state: StateType) => state.user;
export const selectProducts = (state: StateType) => state.products;
export const selectCategories = (state: StateType) => state.categories;
export const selectProductsByIds = (productIds: Array<string>) => createSelector(
  [selectProducts],
  (products) => products.products.filter((product) => productIds.includes(product.id)),
);
export const selectProductsByCategory = (category?: string) => createSelector(
  [selectProducts],
  (products) => (category ? (products.products.filter((product) => product.category === category)) : []),
);

export const selectCarts = (state: StateType) => state.carts;
export const selectCartsByIds = (cartIds: Array<string>) => createSelector(
  [selectCarts],
  (carts) => carts.filter((cart) => cartIds.includes(cart.id)),
);

export const selectErrorMessage = (state: StateType) => state.errorMessage;
