import * as actions from '../actions'
import { append, findIndex, propEq, remove } from 'ramda'

const initState = {
  isLoading: false,
  queries: []
}

const faqs = (state = initState, action) => {
  const { type, payload } = action
  const { queries } = state
  switch (type) {
    case actions.ADD_QUERY_SUCCESS:
      return {
        ...state,
        queries: append(payload, queries)
      }
    case actions.FETCH_QUERIES_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.FETCH_QUERIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        queries: payload
      }
    case actions.DELETE_QUERY_SUCCESS:
      return {
        ...state,
        queries: remove(findIndex(propEq('id', parseInt(payload)))(queries), 1, queries)
      }
    default:
      return state
  }
}

export default faqs