import rootReducer, { StateType } from '../reducers';
import {
  CartsResponse,
  CategoriesResponse,
  Product,
  ProductsResponse,
  User,
} from '../../api';
import {
  setCarts, setCategories, setProducts, setUser,
} from '../actions';
import mockState from '../__mocks__/state';

describe('reducers', () => {
  it('initial state is correct when state is undefined', () => {
    const unknownAction = (payload: unknown) => ({
      type: 'UNKNOWN',
      payload,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - unknown action is not defined in action types
    const newState = rootReducer(undefined, unknownAction('test-initial'));

    const expectedInitial: StateType = {
      user: {} as User,
      products: { numberOfPages: 0, priceRange: { min: 0.0, max: 0.0 }, products: [] },
      categories: [],
      carts: [],
      errorMessage: '',
    };

    expect(newState).toEqual(expectedInitial);
  });
  it('should handle SET_USER', () => {
    const user = { firstName: 'test' } as User;
    const newState = rootReducer(mockState, setUser(user));

    expect(newState.user).toEqual(user);
    expect(newState).toEqual({ ...mockState, user });
  });
  it('should handle SET_PRODUCTS', () => {
    const product = { id: 'testId123' } as Product;
    const mockedResponse: ProductsResponse = {
      numberOfPages: 1,
      priceRange: { min: 0, max: 0 },
      products: [product],
    };
    const newState = rootReducer(mockState, setProducts(mockedResponse));

    expect(newState.products).toEqual(mockedResponse);
    expect(newState).toEqual({ ...mockState, products: mockedResponse });
  });
  it('should handle SET_CATEGORIES', () => {
    const categories: CategoriesResponse = [{ id: 'testId123', name: 'Mock' }];
    const newState = rootReducer(mockState, setCategories(categories));

    expect(newState.categories).toEqual(categories);
    expect(newState).toEqual({ ...mockState, categories });
  });
  it('should handle SET_CARTS', () => {
    const carts: CartsResponse = [
      {
        id: 'testId123',
        userId: 'testUser123',
        productIds: [],
        totalValue: 0,
        paid: false,
      },
    ];
    const newState = rootReducer(mockState, setCarts(carts));

    expect(newState.carts).toEqual(carts);
    expect(newState).toEqual({ ...mockState, carts });
  });
  it('should handle unknown actions', () => {
    const unknownAction = (payload: unknown) => ({
      type: 'UNKNOWN',
      payload,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - unknown action is not defined in action types
    const newState = rootReducer(mockState, unknownAction('garbage'));

    expect(newState).toEqual(mockState);
  });
});
