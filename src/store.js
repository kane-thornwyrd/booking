import { applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'

import rootReducers, { createStore } from './reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import { createBrowserHistory } from 'history'
export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()

const middlewares = [routerMiddleware(history), sagaMiddleware]

let composeEnhancers = compose

/* istanbul ignore if  */
if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger')

  const logger = createLogger({ collapsed: true })
  middlewares.push(logger)

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        {
          name: 'Booking',
        }
      ) : compose
}

export default function configureStore(initialState) {
  const store = createStore(rootReducers(history), initialState, composeEnhancers(applyMiddleware(...middlewares)))

  /* istanbul ignore if  */
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default // eslint-disable-line
      store.replaceReducer(nextRootReducer)
    })
  }
  sagaMiddleware.run(rootSaga)
  return store
}
