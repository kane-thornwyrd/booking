import { call, put, takeLatest } from 'redux-saga/effects'

import initialState from './initialState'
import {
  CORE_GET_UNIVERSE_BEGIN,
  CORE_GET_UNIVERSE_SUCCESS,
  CORE_GET_UNIVERSE_FAILURE,
} from './constants'

import { universeToNavigatorFilter } from '../transformers'

// import { reducer as moduleReducer } from './reducers/module'

const reducers = [
  // moduleReducer
]

export default function reducer(state = initialState, action) {
  let newState

  switch (action.type) {
    // Handle cross-topic actions here

    case CORE_GET_UNIVERSE_BEGIN:
      return {
        ...state,
        getUniversePending: true,
        getUniverseError: null,
        getUniverse: null,
      }

    case CORE_GET_UNIVERSE_FAILURE:
      return {
        ...state,
        getUniversePending: false,
        getUniverseError: action.data,
        getUniverse: null,
      }

    case CORE_GET_UNIVERSE_SUCCESS:
      return {
        ...state,
        getUniversePending: false,
        getUniverseError: null,
        getUniverse: universeToNavigatorFilter(action.data),
      }

    default:
      newState = state
      break
  }
  return reducers.reduce((s, r) => r(s, action), newState)
}

export function getUniverse() {
  return {
    type: CORE_GET_UNIVERSE_BEGIN,
  }
}

export function* watchGetUniverse() {
  yield takeLatest(CORE_GET_UNIVERSE_BEGIN, doGetUniverse)
}

export function* doGetUniverse({ applicationSelectedId, reference }) {
  let res

  try {
    res = yield call(fetch, 'https://www.wecasa.fr/api/techtest/universe', {
      headers: { Accept: 'application/json' },
    })
    res = yield res.json()
  } catch (error) {
    yield put({
      type: CORE_GET_UNIVERSE_FAILURE,
      data: error,
    })
    return
  }

  yield put({
    type: CORE_GET_UNIVERSE_SUCCESS,
    data: res,
  })
}
