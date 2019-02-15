import { connectRouter } from 'connected-react-router'
import reduxRemember from 'redux-remember'

// import moduleReducer from '../features/module/redux/reducer';
import coreReducer from './features/core/redux/reducer'
import prestationsBasketReducer from './features/prestations-basket/redux/reducer'
import addressBookReducer from './features/address-book/redux/reducer'

export const { createStore, combineReducers } = reduxRemember(window.localStorage)

export default history =>
  combineReducers(
    {
      // Persistable
      addressBook: addressBookReducer,
      basket: prestationsBasketReducer,
    },
    {
      // Forgettable
      router: connectRouter(history),
      // module: moduleReducer,
      core: coreReducer,
    }
  )
