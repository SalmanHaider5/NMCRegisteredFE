import * as actions from '../actions'
import { head } from 'ramda'

const initState = {
  isLoading: false,
  error: '',
  customers: [],
  customer: {}
}

const customers = (state = initState, action) => {
  const { type, payload, error } = action
  switch (type) {
    case actions.FETCH_CUSTOMERS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.FETCH_CUSTOMERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        customers: payload
      }
    case actions.FETCH_SINGLE_CUSTOMER_REQUEST:
      return{
        ...state,
        isLoading: true
      }
    case actions.FETCH_SINGLE_CUSTOMER_SUCCESS:
      return{
        ...state,
        isLoading: false,
        customer: head(payload)
      }
    case actions.FETCH_CUSTOMERS_FAILURE:
    case actions.FETCH_SINGLE_CUSTOMER_FAILURE:
      return{
        ...state,
        isLoading: true,
        error: error
      }
    default:
      return state
  }
}

export default customers