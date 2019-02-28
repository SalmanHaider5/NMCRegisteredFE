import * as actions from '../actions'
import { append, findIndex, propEq, remove } from 'ramda'

const initState = {
  isLoading: false,
  categories: []
}

const categories = (state = initState, action) => {
  const { type, payload } = action
  const { categories } = state
  switch (type) {
    case actions.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
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
    case actions.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: remove(findIndex(propEq('id', parseInt(payload)))(categories), 1, categories)
      }
    default:
      return state
  }
}

export default categories