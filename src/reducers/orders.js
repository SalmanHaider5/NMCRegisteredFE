import * as actions from '../actions'

const initState = {
  isLoading: false,
  updateRequest: false,
  error: '',
  orders: []
}

const reviews = (state = initState, action) => {
  const { type, payload, error } = action
//   const { orders } = state
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
    case actions.FETCH_ORDERS_FAILURE:
      return{
        ...state,
        isLoading: true,
        error: error
      }
    default:
      return state
  }
}

export default reviews