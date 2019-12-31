import * as actions from '../actions'
import { append, findIndex, propEq, remove } from 'ramda'

const initState = {
  isLoading: false,
  addRequest: false,
  deleteRequest: false,
  error: '',
  queries: []
}

const faqs = (state = initState, action) => {
  const { type, payload, error } = action
  const { queries } = state
  switch (type) {
    case actions.ADD_QUERY_REQUEST:
      return{
        ...state,
        addRequest: true,
        isLoading: true
      }
    case actions.ADD_QUERY_SUCCESS:
      return {
        ...state,
        addRequest: false,
        isLoading: false,
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
    case actions.DELETE_QUERY_REQUEST:
      return{
        ...state,
        deleteRequest: true,
        isLoading: true
      }
    case actions.DELETE_QUERY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteRequest: false,
        queries: remove(findIndex(propEq('id', parseInt(payload)))(queries), 1, queries)
      }
    case actions.ADD_QUERY_FAILURE:
    case actions.FETCH_QUERIES_FAILURE:
    case actions.DELETE_QUERY_FAILURE:
      return{
        isLoading: true,
        error: error
      }
    default:
      return state
  }
}

export default faqs