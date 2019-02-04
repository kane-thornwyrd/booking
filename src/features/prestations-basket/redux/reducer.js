import update from 'immutability-helper'

import initialState from './initialState'

import { BASKET_ADD_PRESTATION, BASKET_REMOVE_PRESTATION } from './constants'

// import { reducer as moduleReducer } from './reducers/module'

const reducers = [
  // moduleReducer
]

export default function reducer(state = initialState, action) {
  let newState

  switch (action.type) {
    // Handle cross-topic actions here

    case BASKET_ADD_PRESTATION:
      return {
        ...state,
        prestations: update(state.prestations, { $push: [action.data.prestation] }),
      }

    case BASKET_REMOVE_PRESTATION:
      return {
        ...state,
        prestations: update(state.prestations, { $splice: [[action.data.index, 1]] }),
      }

    default:
      newState = state
      break
  }
  return reducers.reduce((s, r) => r(s, action), newState)
}

export function addToPrestationBasket(data) {
  return {
    type: BASKET_ADD_PRESTATION,
    data: data,
  }
}

export function removeFromPrestationBasket(data) {
  return {
    type: BASKET_REMOVE_PRESTATION,
    data: data,
  }
}
