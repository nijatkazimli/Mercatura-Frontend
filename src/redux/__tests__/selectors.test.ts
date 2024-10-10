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
import mockState from '../__mocks__/state';

describe('Selectors', () => {
  test('selectUser should return the user', () => {
    expect(selectUser(mockState)).toEqual(mockState.user);
  });

  test('selectProducts should return the products', () => {
    expect(selectProducts(mockState)).toEqual(mockState.products);
  });

  test('selectCategories should return the categories', () => {
    expect(selectCategories(mockState)).toEqual(mockState.categories);
  });

  test('selectProductsByIds should return products by given IDs', () => {
    const productIds = ['1'];
    const selectedProducts = selectProductsByIds(productIds)(mockState);
    expect(selectedProducts).toEqual([mockState.products.products[0]]);
  });

  test('selectProductsByCategory should return products by category', () => {
    const selectedProducts = selectProductsByCategory('Category 1')(mockState);
    expect(selectedProducts).toEqual([mockState.products.products[0]]);
  });

  test('selectProductsByCategory should return an empty array when category is undefined', () => {
    const selectedProducts = selectProductsByCategory()(mockState);
    expect(selectedProducts).toEqual([]);
  });

  test('selectProductsByCategory should return an empty array if category is not found', () => {
    const selectedProducts = selectProductsByCategory('Category 3')(mockState);
    expect(selectedProducts).toEqual([]);
  });

  test('selectProductsByCategory should return an empty array if no products is present in the state', () => {
    const selectedProducts = selectProductsByCategory('Category 3')(
      { ...mockState, products: { numberOfPages: 0, priceRange: { min: 0, max: 0 }, products: [] } },
    );
    expect(selectedProducts).toEqual([]);
  });

  test('selectCarts should return the carts', () => {
    expect(selectCarts(mockState)).toEqual(mockState.carts);
  });

  test('selectCartsByIds should return carts by given IDs', () => {
    const cartIds = ['1'];
    const selectedCarts = selectCartsByIds(cartIds)(mockState);
    expect(selectedCarts).toEqual([{
      id: '1', productIds: [], paid: false, totalValue: 0, userId: '1',
    }]);
  });

  test('selectErrorMessage should return the error message', () => {
    expect(selectErrorMessage(mockState)).toBe('An error occurred');
  });
});
