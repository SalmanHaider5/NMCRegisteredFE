import * as actions from '../actions'
import { head } from 'ramda'

const initState = {
  isLoading: false,
  updateRequest: false,
  error: '',
  orders: [],
  order: {}
}

const orders = (state = initState, action) => {
  const { type, payload, error } = action
  const { order } = state
  switch (type) {
    case actions.FETCH_ORDERS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: payload
      }
    case actions.FETCH_SINGLE_ORDER_REQUEST:
      return{
        ...state,
        isLoading: true
      }
    case actions.FETCH_SINGLE_ORDER_SUCCESS:
      return{
        ...state,
        isLoading: false,
        order: head(payload)
      }
    case actions.UPDATE_ORDER_STATUS_REQUEST:
      return{
        ...state,
        isLoading: true,
        updateRequest: true
      }
    case actions.UPDATE_ORDER_STATUS_SUCCESS:
      const { status } = payload
      const updatedOrder = order
      updatedOrder.status = status
      return{
        ...state,
        isLoading: false,
        updateRequest: false,
        order: updatedOrder
      }
    case actions.FETCH_ORDERS_FAILURE:
    case actions.FETCH_SINGLE_ORDER_FAILURE:
    case actions.UPDATE_ORDER_STATUS_FAILURE:
      return{
        ...state,
        isLoading: true,
        error: error
      }
    default:
      return state
  }
}

export default orders