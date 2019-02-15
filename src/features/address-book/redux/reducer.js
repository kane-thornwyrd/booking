import update from 'immutability-helper'

import initialState from './initialState'

import { ADDRESS_BOOK_ADD_ADDRESS, ADDRESS_BOOK_REMOVE_ADDRESS } from './constants'

// import { reducer as moduleReducer } from './reducers/module'

const reducers = [
  // moduleReducer
]

export default function reducer(state = initialState, action) {
  let newState

  switch (action.type) {
    // Handle cross-topic actions here

    case ADDRESS_BOOK_ADD_ADDRESS:
      return {
        ...state,
        addresses: update(state.addresses, { $push: [action.data] }),
      }

    case ADDRESS_BOOK_REMOVE_ADDRESS:
      const index = state.addresses.indexOf(action.data)
      if (index < 0) return { ...state }
      return {
        ...state,
        addresses: update(state.addresses, { $splice: [[index, 1]] }),
      }

    default:
      newState = state
      break
  }
  return reducers.reduce((s, r) => r(s, action), newState)
}

export function addToAddressBook(data) {
  return {
    type: ADDRESS_BOOK_ADD_ADDRESS,
    data: data,
  }
}

export function removeFromAddressBook(data) {
  return {
    type: ADDRESS_BOOK_REMOVE_ADDRESS,
    data: data,
  }
}
