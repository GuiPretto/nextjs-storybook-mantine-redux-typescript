/* eslint-disable import/no-anonymous-default-export */

import { applyMiddleware, createStore } from 'redux';

import { composeWithDevTools } from '@redux-devtools/extension';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import { persistStore } from 'redux-persist';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

export const store = (initialState) => {
  let __store;

  const sagaMiddleware = createSagaMiddleware();

  const isClient = typeof window !== 'undefined';

  if (isClient) {
    __store = createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(sagaMiddleware))
    );

    __store.__persistor = persistStore(__store);
  } else {
    __store = createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(sagaMiddleware))
    );
  }

  __store.sagaTask = sagaMiddleware.run(rootSaga);

  return __store;
};

const wrapper = createWrapper(store);

export default wrapper;
