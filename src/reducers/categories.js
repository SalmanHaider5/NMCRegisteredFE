import * as actions from '../actions'

const initState = {
  isLoading: false,
  categories: []
}

const categories = (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
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
    default:
      return state
  }
}

export default categories