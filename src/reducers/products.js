import * as actions from '../actions'
import { append, findIndex, propEq, remove } from 'ramda'

const initState = {
  isLoading: false,
  products: []
}

const products = (state = initState, action) => {
  const { type, payload } = action
  const { products } = state
  switch (type) {
    case actions.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: append(payload, products)
      }
    case actions.FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: payload
      }
    case actions.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: remove(findIndex(propEq('id', parseInt(payload)))(products), 1, products)
      }
    default:
      return state
  }
}

export default products