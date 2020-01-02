import * as actions from '../actions'
// import { findIndex, propEq, remove } from 'ramda'

const initState = {
  isLoading: false,
  updateRequest: false,
  error: '',
  reviews: []
}

const reviews = (state = initState, action) => {
  const { type, payload, error } = action
  switch (type) {
    case actions.FETCH_REVIEWS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reviews: payload
      }
    case actions.UPDATE_REVIEWS_REQUEST:
      return{
        ...state,
        isLoading: true,
        updateRequest: true
      }
    case actions.UPDATE_REVIEWS_SUCCESS:
      return {
        ...state,
        updateRequest: false,
        // reviews: remove(findIndex(propEq('id', parseInt(payload)))(subscribers), 1, subscribers)
      }
    case actions.UPDATE_REVIEWS_FAILURE:
    case actions.FETCH_REVIEWS_FAILURE:
      return{
        ...state,
        isLoading: true,
        updateRequest: true,
        error: error
      }
    default:
      return state
  }
}

export default reviews