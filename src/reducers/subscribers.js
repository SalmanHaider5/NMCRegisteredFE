import * as actions from '../actions'
import { findIndex, propEq, remove } from 'ramda'

const initState = {
  isLoading: false,
  subscribers: []
}

const subscribers = (state = initState, action) => {
  const { type, payload } = action
  const { subscribers } = state
  switch (type) {
    case actions.FETCH_SUBSCRIBERS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.FETCH_SUBSCRIBERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        subscribers: payload
      }
    case actions.DELETE_SUBSCRIBERS_SUCCESS:
      return {
        ...state,
        subscribers: remove(findIndex(propEq('id', parseInt(payload)))(subscribers), 1, subscribers)
      }
    default:
      return state
  }
}

export default subscribers