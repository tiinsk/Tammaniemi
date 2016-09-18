import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducers';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, applyMiddleware(promiseMiddleware, thunkMiddleware));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
