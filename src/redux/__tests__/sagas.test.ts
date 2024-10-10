/* eslint-disable consistent-return */
import {
  all, call, select,
} from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import rootSaga, {
  addToCartSaga,
  addToNewCartSaga,
  createCartSaga,
  deleteCartSaga,
  getCartsSaga,
  getCategoriesSaga, getProductsByIdsSaga, getProductsSaga, getUserSaga,
  payCartSaga,
} from '../sagas';
import {
  deleteData, fetchData, patchData, postData, Product,
} from '../../api';
import {
  setCarts, setCategories, setProducts, setUser,
} from '../actions';
import mockState from '../__mocks__/state';
import actions from '../__mocks__/actions';
import { selectCarts, selectProducts } from '../selectors';
import { Actions } from '../action.types';

jest.mock('../../api');

describe('sagas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetchData as jest.Mock).mockReset();
    (postData as jest.Mock).mockReset();
    (deleteData as jest.Mock).mockReset();
    (patchData as jest.Mock).mockReset();
  });

  describe('getUserSaga', () => {
    it('fetches the user and dispatches setUser', () => {
      (fetchData as jest.Mock).mockResolvedValue(mockState.user);

      return expectSaga(getUserSaga, actions.getUser)
        .provide([
          [call(fetchData, `/user/${actions.getUser.payload.id}`, undefined, actions.getUser.payload.token), mockState.user],
        ])
        .put(setUser(mockState.user))
        .run();
    });

    it('logs an error if fetch fails', async () => {
      const error = new Error('Failed to fetch');
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

      (fetchData as jest.Mock).mockRejectedValue(error);

      await expectSaga(getUserSaga, actions.getUser)
        .run();

      expect(consoleErrorSpy).toHaveBeenCalledWith(JSON.stringify(error));
      consoleErrorSpy.mockRestore();
    });

    it('logs a default error if error undefined', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

      (fetchData as jest.Mock).mockRejectedValue(undefined);

      await expectSaga(getUserSaga, actions.getUser)
        .run();

      expect(consoleErrorSpy).toHaveBeenCalledWith(('Error fetching user'));
      consoleErrorSpy.mockRestore();
    });
  });

  describe('getProducts', () => {
    it('fetches the products and dispatches setProducts', () => {
      (fetchData as jest.Mock).mockResolvedValue(mockState.products);

      return expectSaga(getProductsSaga)
        .provide([
          [call(fetchData, '/product'), mockState.products],
        ])
        .put(setProducts(mockState.products))
        .run();
    });

    it('logs an error if fetch fails', async () => {
      const error = new Error('Failed to fetch');
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

      (fetchData as jest.Mock).mockRejectedValue(error);

      await expectSaga(getProductsSaga)
        .run();

      expect(consoleErrorSpy).toHaveBeenCalledWith(JSON.stringify(error));
      consoleErrorSpy.mockRestore();
    });

    it('logs a default error if error undefined', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

      (fetchData as jest.Mock).mockRejectedValue(undefined);

      await expectSaga(getProductsSaga)
        .run();

      expect(consoleErrorSpy).toHaveBeenCalledWith(('Error fetching products'));
      consoleErrorSpy.mockRestore();
    });
  });

  describe('getCategories', () => {
    it('fetches the categories and dispatches setCategories together with default all categories', () => {
      (fetchData as jest.Mock).mockResolvedValue(mockState.categories);

      return expectSaga(getCategoriesSaga)
        .provide([
          [call(fetchData, '/category'), mockState.categories],
        ])
        .put(setCategories([{ id: '', name: 'All Categories' }, ...mockState.categories]))
        .run();
    });

    it('logs an error if fetch fails', async () => {
      const error = new Error('Failed to fetch');
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

      (fetchData as jest.Mock).mockRejectedValue(error);

      await expectSaga(getCategoriesSaga)
        .run();

      expect(consoleErrorSpy).toHaveBeenCalledWith(JSON.stringify(error));
      consoleErrorSpy.mockRestore();
    });

    it('logs a default error if error undefined', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

      (fetchData as jest.Mock).mockRejectedValue(undefined);

      await expectSaga(getCategoriesSaga)
        .run();

      expect(consoleErrorSpy).toHaveBeenCalledWith(('Error fetching categories'));
      consoleErrorSpy.mockRestore();
    });
  });

  describe('getProductsByIds', () => {
    describe('getProductsByIds', () => {
      it('fetches all the products if they do not exist and dispatches setProducts', () => {
        const product1: Product = {
          id: '1', name: 'Product 1', rating: 3, price: 10, category: '0',
        };
        const product2: Product = {
          id: '2', name: 'Product 2', rating: 4, price: 15, category: '0',
        };

        (fetchData as jest.Mock)
          .mockResolvedValueOnce(product1)
          .mockResolvedValueOnce(product2);

        return expectSaga(getProductsByIdsSaga, { ...actions.getProductsByIds, payload: ['1', '2'] })
          .provide([
            [select(selectProducts), { numberOfPages: 0, priceRange: { min: 0, max: 0 }, products: [] }],
            [all([
              call(fetchData, '/product/1'),
              call(fetchData, '/product/2'),
            ]), [product1, product2]],
          ])
          .put(setProducts({
            numberOfPages: 0,
            priceRange: {
              min: 0,
              max: 0,
            },
            products: [product1, product2],
          }))
          .run();
      });

      it('if product already exists, does nothing', () => {
        const product1: Product = {
          id: '1', name: 'Product 1', rating: 3, price: 10, category: '0',
        };
        const product2: Product = {
          id: '2', name: 'Product 2', rating: 4, price: 15, category: '0',
        };

        (fetchData as jest.Mock)
          .mockResolvedValueOnce(mockState.products.products[0])
          .mockResolvedValueOnce(mockState.products.products[1]);

        return expectSaga(getProductsByIdsSaga, { ...actions.getProductsByIds, payload: ['1', '2'] })
          .provide([
            [select(selectProducts), mockState.products],
            [all([
              call(fetchData, '/product/1'),
              call(fetchData, '/product/2'),
            ]), [product1, product2]],
          ])
          .not.put(setProducts({
            numberOfPages: 0,
            priceRange: {
              min: 0,
              max: 0,
            },
            products: [product1, product2],
          }))
          .run();
      });

      it('logs an error if fetch fails', async () => {
        const error = new Error('Failed to fetch');
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

        (fetchData as jest.Mock).mockRejectedValue(error);

        await expectSaga(getProductsByIdsSaga, { ...actions.getProductsByIds, payload: ['1', '2'] })
          .provide([
            [select(selectProducts), { products: [{ id: '1', name: 'Existing Product' }] }],
            // eslint-disable-next-line prefer-promise-reject-errors
            [call(fetchData, '/product/2'), Promise.reject(error)],
          ])
          .run();

        expect(consoleErrorSpy).toHaveBeenCalledWith(JSON.stringify(error));
        consoleErrorSpy.mockRestore();
      });

      it('logs a default error if error is undefined', async () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* do nothing */ });

        (fetchData as jest.Mock).mockRejectedValue(undefined);

        await expectSaga(getProductsByIdsSaga, { ...actions.getProductsByIds, payload: ['1', '2'] })
          .provide([
            [select(selectProducts), { products: [{ id: '1', name: 'Existing Product' }] }],
            // eslint-disable-next-line prefer-promise-reject-errors
            [call(fetchData, '/product/2'), Promise.reject(undefined)],
          ])
          .run();

        expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching products by ids');
        consoleErrorSpy.mockRestore();
      });
    });
  });

  describe('getCarts', () => {
    it('fetches the carts and dispatches setCarts', () => {
      (fetchData as jest.Mock).mockResolvedValue(mockState.carts);

      return expectSaga(getCartsSaga, actions.getCarts)
        .provide([
          [call(fetchData, '/cart?userId=1'), mockState.carts],
        ])
        .put(setCarts(mockState.carts))
        .run();
    });

    it('logs an error if fetch fails', async () => {
      const error = new Error('Failed to fetch');
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

      (fetchData as jest.Mock).mockRejectedValue(error);

      await expectSaga(getCartsSaga, actions.getCarts)
        .run();

      expect(consoleErrorSpy).toHaveBeenCalledWith(JSON.stringify(error));
      consoleErrorSpy.mockRestore();
    });

    it('logs a default error if error undefined', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

      (fetchData as jest.Mock).mockRejectedValue(undefined);

      await expectSaga(getCartsSaga, actions.getCarts)
        .run();

      expect(consoleErrorSpy).toHaveBeenCalledWith(('Error fetching carts'));
      consoleErrorSpy.mockRestore();
    });
  });

  describe('create cart', () => {
    it('creates a cart and dispatches setCarts including the new cart', () => {
      (postData as jest.Mock).mockResolvedValue({ id: '3' });

      return expectSaga(createCartSaga, actions.createCart)
        .provide([
          [call(postData, '/cart?userId=1'), { id: 3 }],
          [select(selectCarts), mockState.carts],
        ])
        .put(setCarts([...mockState.carts, {
          id: '3', userId: '1', productIds: [], paid: false, totalValue: 0,
        }]))
        .run();
    });

    it('logs an error if post fails', async () => {
      const error = new Error('Failed to post');
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

      (postData as jest.Mock).mockRejectedValue(error);

      await expectSaga(createCartSaga, actions.createCart)
        .run();

      expect(consoleErrorSpy).toHaveBeenCalledWith(JSON.stringify(error));
      consoleErrorSpy.mockRestore();
    });

    it('logs a default error if error undefined', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

      (postData as jest.Mock).mockRejectedValue(undefined);

      await expectSaga(createCartSaga, actions.createCart)
        .run();

      expect(consoleErrorSpy).toHaveBeenCalledWith(('Error creating cart'));
      consoleErrorSpy.mockRestore();
    });
  });

  describe('delete cart', () => {
    it('deletes the cart and dispatches setCarts excluding the deleted cart', () => {
      (deleteData as jest.Mock).mockImplementationOnce(jest.fn(() => Promise.resolve()));

      return expectSaga(deleteCartSaga, actions.deleteCart)
        .provide([
          [select(selectCarts), mockState.carts],
        ])
        .call(deleteData, '/cart/1', undefined, undefined, 'sample-token')
        .put(setCarts(mockState.carts.filter((cart) => cart.id !== '1')))
        .run();
    });

    it('logs an error if delete fails', async () => {
      const error = new Error('Failed to delete');
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

      (deleteData as jest.Mock).mockRejectedValue(error);

      await expectSaga(deleteCartSaga, actions.deleteCart)
        .run();

      expect(consoleErrorSpy).toHaveBeenCalledWith(JSON.stringify(error));
      consoleErrorSpy.mockRestore();
    });

    it('logs a default error if error undefined', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

      (deleteData as jest.Mock).mockRejectedValue(undefined);

      await expectSaga(deleteCartSaga, actions.deleteCart)
        .run();

      expect(consoleErrorSpy).toHaveBeenCalledWith(('Error deleting cart'));
      consoleErrorSpy.mockRestore();
    });
  });

  describe('add to cart', () => {
    it('adds the given product to the cart and dispatches setCarts including the cart with a changed content', () => {
      (patchData as jest.Mock).mockImplementationOnce(jest.fn(() => Promise.resolve()));

      return expectSaga(addToCartSaga, actions.addToCart)
        .provide([
          [select(selectCarts), mockState.carts],
        ])
        .call(patchData, '/cart/2/add?productId=1', undefined, undefined, 'sample-token')
        .put(setCarts([mockState.carts[0], { ...mockState.carts[1], productIds: ['1'], totalValue: 10 }]))
        .run();
    });

    it('logs an error if patch fails', async () => {
      const error = new Error('Failed to patch');
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

      (patchData as jest.Mock).mockRejectedValue(error);

      await expectSaga(addToCartSaga, actions.addToCart)
        .run();

      expect(consoleErrorSpy).toHaveBeenCalledWith(JSON.stringify(error));
      consoleErrorSpy.mockRestore();
    });

    it('logs a default error if error undefined', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

      (patchData as jest.Mock).mockRejectedValue(undefined);

      await expectSaga(addToCartSaga, actions.addToCart)
        .run();

      expect(consoleErrorSpy).toHaveBeenCalledWith(('Error adding to cart'));
      consoleErrorSpy.mockRestore();
    });
  });

  describe('add to new cart', () => {
    it('creates a new cart adds the given product to it and dispatches setCarts including the new cart', () => {
      (postData as jest.Mock).mockResolvedValue({ id: '1' });
      (patchData as jest.Mock).mockImplementationOnce(jest.fn(() => Promise.resolve()));

      return expectSaga(addToNewCartSaga, actions.addToNewCart)
        .provide([
          [postData('/cart?userId=1', undefined, undefined, 'sample-token'), { id: '1' }],
          [select(selectCarts), []],
        ])
        .call(postData, '/cart?userId=1', undefined, undefined, 'sample-token')
        .call(patchData, '/cart/1/add?productId=1', undefined, undefined, 'sample-token')
        .put(setCarts([{ ...mockState.carts[0], productIds: ['1'], totalValue: 10 }]))
        .run();
    });

    it('logs an error if adding fails', async () => {
      const error = new Error('Failed to add');
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

      (postData as jest.Mock).mockRejectedValue(error);

      await expectSaga(addToNewCartSaga, actions.addToNewCart)
        .run();

      expect(consoleErrorSpy).toHaveBeenCalledWith(JSON.stringify(error));
      consoleErrorSpy.mockRestore();
    });

    it('logs a default error if error undefined', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

      (postData as jest.Mock).mockRejectedValue(undefined);

      await expectSaga(addToNewCartSaga, actions.addToNewCart)
        .run();

      expect(consoleErrorSpy).toHaveBeenCalledWith(('Error adding to new cart'));
      consoleErrorSpy.mockRestore();
    });
  });

  describe('pay cart', () => {
    it('pays the given cart and dispatches setCarts with the paid cart', () => {
      (patchData as jest.Mock).mockImplementationOnce(jest.fn(() => Promise.resolve()));

      return expectSaga(payCartSaga, actions.payCart)
        .provide([
          [select(selectCarts), mockState.carts],
        ])
        .call(patchData, '/cart/2/pay', undefined, undefined, 'sample-token')
        .put(setCarts([mockState.carts[0], { ...mockState.carts[1], paid: true }]))
        .run();
    });

    it('logs an error if paying fails', async () => {
      const error = new Error('Failed to pay');
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

      (patchData as jest.Mock).mockRejectedValue(error);

      await expectSaga(payCartSaga, actions.payCart)
        .run();

      expect(consoleErrorSpy).toHaveBeenCalledWith(JSON.stringify(error));
      consoleErrorSpy.mockRestore();
    });

    it('logs a default error if error undefined', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

      (patchData as jest.Mock).mockRejectedValue(undefined);

      await expectSaga(payCartSaga, actions.payCart)
        .run();

      expect(consoleErrorSpy).toHaveBeenCalledWith(('Error paying cart'));
      consoleErrorSpy.mockRestore();
    });
  });

  it('watches for all actions and triggers the correct sagas', () => expectSaga(rootSaga)
    .take(Actions.GET_USER)
    .take(Actions.GET_PRODUTCS)
    .take(Actions.GET_CATEGORIES)
    .take(Actions.GET_PRODUTCS_BY_IDS)
    .take(Actions.GET_CARTS)
    .take(Actions.CREATE_CART)
    .take(Actions.DELETE_CART)
    .take(Actions.ADD_TO_CART)
    .take(Actions.ADD_TO_NEW_CART)
    .take(Actions.PAY_CART)
    .silentRun());
});
