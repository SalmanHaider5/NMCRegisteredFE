import * as actions from '../actions'
import { append, findIndex, propEq, remove, head } from 'ramda'

const initState = {
  isLoading: false,
  isError: false,
  addRequest: false,
  deleteRequest: false,
  error: '',
  products: [],
  product: {}
}

const products = (state = initState, action) => {
  const { type, payload, error } = action
  const { products } = state
  switch (type) {
    case actions.ADD_PRODUCT_REQUEST:
      return{
        ...state,
        isLoading: true,
        addRequest: true
      }
    case actions.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addRequest: false,
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
    case actions.DELETE_PRODUCT_REQUEST:
      return{
        ...state,
        isLoading: true,
        deleteRequest: true
      }
    case actions.DELETE_PRODUCT_SUCCESS:
      console.log(payload)
      return {
        ...state,
        isLoading: false,
        deleteRequest: false,
        products: remove(findIndex(propEq('id', payload))(products), 1, products)
      }
    case actions.FETCH_SINGLE_PRODUCT_FAILURE:
    case actions.ADD_PRODUCT_FAILURE:
    case actions.DELETE_PRODUCT_FAILURE:{
      return{
        ...state,
        isLoading: true,
        isError: true,
        error: `${error}`
      }
    }
    case actions.FETCH_SINGLE_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.FETCH_SINGLE_PRODUCT_SUCCESS:
      return{
        ...state,
        isLoading: false,
        product: head(payload)
      }
    default:
      return state
  }
}

export default products