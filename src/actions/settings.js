import { SERVER_URL as url } from '../constants'

export const FETCH_BASICS_REQUEST = 'FETCH_BASICS_REQUEST'
export const FETCH_BASICS_FAILURE = 'FETCH_BASICS_FAILURE'
export const FETCH_BASICS_SUCCESS = 'FETCH_BASICS_SUCCESS'
export const UPDATE_BASICS_REQUEST = 'UPDATE_BASICS_REQUEST'
export const UPDATE_BASICS_SUCCESS = 'UPDATE_BASICS_SUCCESS'
export const UPDATE_BASICS_FAILURE = 'UPDATE_BASICS_FAILURE'



export const getBasics = () => dispatch => {

  dispatch({ type: FETCH_BASICS_REQUEST })

  fetch(url + 'settings').then(
    (res) => res.json()
  ).then(
    (data) => {
      dispatch({
        type: FETCH_BASICS_SUCCESS,
        payload: data
      })
    }
  ).catch(
    (error) => {
      dispatch({
        type: FETCH_BASICS_FAILURE,
        error
      })
    }
  )
}

export const updateBasics = values => dispatch => {
  console.log(values)

  dispatch({ type: UPDATE_BASICS_REQUEST })
  fetch(`${url}settings`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(values)
  })
  .then((res) => res.json())
  .then((data) => {
    dispatch({
      type: UPDATE_BASICS_SUCCESS,
      payload: values
    })
  })
  .catch((err) => {
    dispatch({ type: UPDATE_BASICS_FAILURE, error: err })
  })
}