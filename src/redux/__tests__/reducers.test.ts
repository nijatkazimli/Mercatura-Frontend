import rootReducer, { StateType } from '../reducers';
// import { Actions } from '../action.types';
import { User } from '../../api';
import { setUser } from '../actions';

const initialState: StateType = {
  user: {} as User,
  products: { numberOfPages: 0, priceRange: { min: 0.0, max: 0.0 }, products: [] },
  carts: [],
  errorMessage: '',
};

describe('cartReducer', () => {
  it('should handle SET_USER', () => {
    const user = { firstName: 'test' } as User;
    const newState = rootReducer(initialState, setUser(user));

    expect(newState.user).toEqual(user);
    expect(newState).toEqual({ ...initialState, user });
  });
});
