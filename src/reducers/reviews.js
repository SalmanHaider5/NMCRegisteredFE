import * as actions from '../actions'
import { set, lensProp, update, findIndex, propEq } from 'ramda'

const initState = {
  isLoading: false,
  updateRequest: false,
  error: '',
  reviews: []
}

const reviews = (state = initState, action) => {
  const { type, payload, error } = action
  const { reviews } = state
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
      const { id, status } = payload
      const updatedReview = set(lensProp('status'), status === 'Active' ? 'Hidden' : 'Active', payload )
      return {
        ...state,
        updateRequest: false,
        isLoading: false,
        reviews: update(findIndex(propEq('id', parseInt(id)))(reviews), updatedReview, reviews)
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