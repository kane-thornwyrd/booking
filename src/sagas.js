import { all } from 'redux-saga/effects'
//import * as moduleSagas from '../features/module/redux/sagas';

const featureSagas = [
  //  moduleSagas,
]

const sagas = featureSagas
  .reduce((prev, curr) => [...prev, ...Object.keys(curr).map(k => curr[k])], [])
  // a saga should be function, below filter avoids error if redux/sagas.js is empty;
  .filter(s => typeof s === 'function')

function* rootSaga() {
  yield all(sagas.map(saga => saga()))
}

export default rootSaga
