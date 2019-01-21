import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
// import moduleReducer from '../features/module/redux/reducer';
import coreReducer from './features/core/redux/reducer'

export default history =>
  combineReducers({
    router: connectRouter(history),
    // module: moduleReducer,
    core: coreReducer,
  })
