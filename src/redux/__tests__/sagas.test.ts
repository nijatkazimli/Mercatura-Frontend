/* eslint-disable consistent-return */
import { call, put } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { getUserSaga } from '../sagas';
import { fetchData } from '../../api';
import { setUser } from '../actions';
import { Actions, GET_USER } from '../action.types';
import ROLES from '../../constants/Roles';

describe('getUserSaga', () => {
  const action: GET_USER = {
    type: Actions.GET_USER,
    payload: {
      id: '1',
      token: 'sample-token',
    },
  };

  const user = {
    id: '1', firstName: 'Test', lastName: 'User', userName: 'testuser', roles: [ROLES.USER],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches the user and dispatches setUser', () => expectSaga(getUserSaga, action)
    .provide([
      [call(fetchData, `/user/${action.payload.id}`, undefined, action.payload.token), user],
    ])
    .put(setUser(user))
    .run());

  it('logs an error if fetch fails', async () => {
    const error = new Error('Failed to fetch');
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });

    await expectSaga(getUserSaga, action)
      .provide([
        [call(fetchData, `/user/${action.payload.id}`, undefined, action.payload.token), Promise.reject(error)],
      ])
      .run();

    expect(consoleErrorSpy).toHaveBeenCalledWith(JSON.stringify(error));
    consoleErrorSpy.mockRestore();
  });
});
