import * as actions from '../actions'
import { append, findIndex, propEq, remove } from 'ramda'

const initState = {
  isLoading: false,
  isError: false,
  addRequest: false,
  deleteRequest: false,
  error: '',
  categories: []
}

const categories = (state = initState, action) => {
  const { type, payload, error } = action
  const { categories } = state
  switch (type) {
    case actions.ADD_CATEGORY_REQUEST:
      return {
        ...state,
        isLoading: true,
        addRequest: true,
      }
    case actions.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addRequest: false,
        categories: append(payload, categories)
      }
    case actions.FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: payload
      }
    case actions.DELETE_CATEGORY_REQUEST:
      return{
        ...state,
        isLoadng: true,
        deleteRequest: true
      }
    case actions.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteRequest: false,
        categories: remove(findIndex(propEq('id', parseInt(payload)))(categories), 1, categories)
      }
      case actions.ADD_CATEGORY_FAILURE:
      case actions.FETCH_CATEGORIES_FAILURE:
      case actions.DELETE_CATEGORY_FAILURE:
        return{
          ...state,
          isLoading: true,
          isError: true,
          error: `${error}`
        }
    default:
      return state
  }
}

export default categories