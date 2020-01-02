import { SERVER_URL as url } from '../constants'

export const FETCH_REVIEWS_REQUEST = 'FETCH_REVIEWS_REQUEST'
export const FETCH_REVIEWS_SUCCESS = 'FETCH_REVIEWS_SUCCESS'
export const FETCH_REVIEWS_FAILURE = 'FETCH_REVIEWS_FAILURE'
export const UPDATE_REVIEWS_REQUEST = 'UPDATE_REVIEWS_REQUEST'
export const UPDATE_REVIEWS_SUCCESS = 'UPDATE_REVIEWS_SUCCESS'
export const UPDATE_REVIEWS_FAILURE = 'UPDATE_REVIEWS_FAILURE'


export const getReviews = () => dispatch => {

  dispatch({ type: FETCH_REVIEWS_REQUEST })

  fetch(url + 'reviews').then(
    (res) => res.json()
  ).then(
    (data) => {
      dispatch({
        type: FETCH_REVIEWS_SUCCESS,
        payload: data
      })
    }
  ).catch(
    (error) => {
      dispatch({
        type: FETCH_REVIEWS_FAILURE,
        error
      })
    }
  )
}

export const updateReviewsStatus = values => dispatch => {

  dispatch({ type: UPDATE_REVIEWS_REQUEST })

  const { id } = values
  const apiUrl = `reviews/${id}`
  fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(values)
  }).then((res) => res.json())
    .then((data) => {
      dispatch({
        type: UPDATE_REVIEWS_SUCCESS,
        payload: id
      })
    })
    .catch(error => {
      dispatch({
        type: UPDATE_REVIEWS_FAILURE,
        error
      })
    })
}