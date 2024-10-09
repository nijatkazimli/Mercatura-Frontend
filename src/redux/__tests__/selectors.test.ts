import {
  selectUser,
  selectProducts,
  selectCategories,
  selectProductsByIds,
  selectProductsByCategory,
  selectCarts,
  selectCartsByIds,
  selectErrorMessage,
} from '../selectors';
import { StateType } from '../reducers';
import ROLES from '../../constants/Roles';

describe('Selectors', () => {
  const state: StateType = {
    user: {
      id: '1', firstName: 'Test', lastName: 'User', userName: 'testuser', roles: [ROLES.USER],
    },
    products: {
      numberOfPages: 1,
      priceRange: {
        max: 20,
        min: 10,
      },
      products: [
        {
          id: '1', name: 'Product A', category: 'Category 1', price: 10, rating: 3,
        },
        {
          id: '2', name: 'Product B', category: 'Category 2', price: 20, rating: 4,
        },
      ],
    },
    categories: [{ id: '1', name: 'Category 1' }, { id: '2', name: 'Category 2' }],
    carts: [
      {
        userId: '1', id: '1', productIds: [], totalValue: 0, paid: false,
      },
      {
        userId: '1', id: '2', productIds: [], totalValue: 0, paid: false,
      },
    ],
    errorMessage: 'An error occurred',
  };

  test('selectUser should return the user', () => {
    expect(selectUser(state)).toEqual(state.user);
  });

  test('selectProducts should return the products', () => {
    expect(selectProducts(state)).toEqual(state.products);
  });

  test('selectCategories should return the categories', () => {
    expect(selectCategories(state)).toEqual(state.categories);
  });

  test('selectProductsByIds should return products by given IDs', () => {
    const productIds = ['1'];
    const selectedProducts = selectProductsByIds(productIds)(state);
    expect(selectedProducts).toEqual([state.products.products[0]]);
  });

  test('selectProductsByCategory should return products by category', () => {
    const selectedProducts = selectProductsByCategory('Category 1')(state);
    expect(selectedProducts).toEqual([{
      id: '1', name: 'Product A', category: 'Category 1', price: 10, rating: 3,
    }]);
  });

  test('selectProductsByCategory should return an empty array if category is not found', () => {
    const selectedProducts = selectProductsByCategory('Category 3')(state);
    expect(selectedProducts).toEqual([]);
  });

  test('selectCarts should return the carts', () => {
    expect(selectCarts(state)).toEqual(state.carts);
  });

  test('selectCartsByIds should return carts by given IDs', () => {
    const cartIds = ['1'];
    const selectedCarts = selectCartsByIds(cartIds)(state);
    expect(selectedCarts).toEqual([{
      id: '1', productIds: [], paid: false, totalValue: 0, userId: '1',
    }]);
  });

  test('selectErrorMessage should return the error message', () => {
    expect(selectErrorMessage(state)).toBe('An error occurred');
  });
});
