import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './reducers';
import rootSaga from './sagas/Cart.sagas';

const sagaMiddleware = createSagaMiddleware({
  // eslint-disable-next-line no-console
  onError: (err) => console.error(err),
});

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

export default store;
