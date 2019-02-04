import { connectRouter } from 'connected-react-router'
import reduxRemember from 'redux-remember'

// import moduleReducer from '../features/module/redux/reducer';
import coreReducer from './features/core/redux/reducer'
import prestationsBasketReducer from './features/prestations-basket/redux/reducer'

export const { createStore, combineReducers } = reduxRemember(window.localStorage)

export default history =>
  combineReducers(
    {
      // Persistable
      basket: prestationsBasketReducer,
    },
    {
      // Forgettable
      router: connectRouter(history),
      // module: moduleReducer,
      core: coreReducer,
    }
  )
