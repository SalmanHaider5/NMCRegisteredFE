import * as actions from '../actions'
import { head } from 'ramda'

const initState = {
  isLoading: false,
  updateBasicsRequest: false,
  error: '',
  basics: {}
}

const settings = (state = initState, action) => {
  const { type, payload, error } = action
  
  switch (type) {
    case actions.FETCH_BASICS_REQUEST:
      return{
          ...state,
          isLoading: true
      }
    case actions.UPDATE_BASICS_REQUEST:
      return{
        ...state,
        updateBasicsRequest: true,
        isLoading: true
      }
    case actions.UPDATE_BASICS_SUCCESS:
      return{
        ...state,
        isLoading: false,
        updateBasicsRequest: false,
        basics: payload
      }
    case actions.FETCH_BASICS_SUCCESS:
      return{
        ...state,
        isLoading: false,
        basics: head(payload)
      }
    case actions.UPDATE_BASICS_FAILURE:
    case actions.FETCH_BASICS_FAILURE:
      return{
        ...state,
        isLoading: true,
        error: error
      }
    default:
      return state
  }
}

export default settings