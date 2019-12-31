import * as actions from '../actions'
import { findIndex, propEq, remove } from 'ramda'

const initState = {
  isLoading: false,
  deleteRequest: false,
  error: '',
  subscribers: []
}

const subscribers = (state = initState, action) => {
  const { type, payload, error } = action
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
    case actions.DELETE_SUBSCRIBERS_REQUEST:
      return{
        ...state,
        isLoading: true,
        deleteRequest: true
      }
    case actions.DELETE_SUBSCRIBERS_SUCCESS:
      return {
        ...state,
        deleteRequest: false,
        subscribers: remove(findIndex(propEq('id', parseInt(payload)))(subscribers), 1, subscribers)
      }
    case actions.DELETE_SUBSCRIBERS_FAILURE:
    case actions.FETCH_SUBSCRIBERS_FAILURE:
      return{
        ...state,
        isLoading: true,
        deleteRequest: true,
        error: error
      }
    default:
      return state
  }
}

export default subscribers