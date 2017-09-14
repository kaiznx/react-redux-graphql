import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import apolloClient from '../graphql/apolloClient';

const isDeveloping = process.env.NODE_ENV !== 'production';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, apolloClient.middleware()),
      /**
       * Conditionally add the Redux DevTools extension enhancer
       * if it is installed.
       */
      (isDeveloping && window.devToolsExtension) ? window.devToolsExtension() : f => f
    )
  )
}
