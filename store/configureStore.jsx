import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware
    ),
    window.devToolsExtension ? window.devToolsExtension() : undefined
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
