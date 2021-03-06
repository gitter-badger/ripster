import {createHistory} from 'history';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {reduxReactRouter} from 'redux-react-router';

import routes from './routes';
import reducers from './reducers';

export default function createAppStore(initialState) {
  let finalCreateStore = createStore;

  if (process.env.NODE_ENV !== 'production') {
    const {devTools, persistState} = require('redux-devtools');

    finalCreateStore = compose(
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(finalCreateStore);
  }

  finalCreateStore = compose(
    applyMiddleware(
      thunkMiddleware
    ),
    reduxReactRouter({
      routes,
      createHistory,
    }),
  )(finalCreateStore);

  return finalCreateStore(combineReducers(reducers), initialState);
}
