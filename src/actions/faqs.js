import { SERVER_URL as url } from '../constants'

export const ADD_QUERY_SUCCESS = 'ADD_QUERY_SUCCESS'
export const ADD_QUERY_FAILURE = 'ADD_QUERY_FAILURE'
export const FETCH_QUERIES_REQUEST = 'FETCH_QUERIES_REQUEST'
export const FETCH_QUERIES_FAILURE = 'FETCH_QUERIES_FAILURE'
export const FETCH_QUERIES_SUCCESS = 'FETCH_QUERIES_SUCCESS'
export const DELETE_QUERY_SUCCESS = 'DELETE_QUERY_SUCCESS'

export const postQuery = formData => dispatch => {
  console.log(formData)
  
  fetch(url + 'faqs', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(formData)
  }).then((res) => res.json())
  .then((data) => {
    dispatch({
      type: ADD_QUERY_SUCCESS,
      payload: formData
    })
  })
  .catch((err) => {
    dispatch({ type: ADD_QUERY_FAILURE, error: 'Error' })
  })
}

export const getQueries = () => dispatch => {

  dispatch({ type: FETCH_QUERIES_REQUEST })

  fetch(url + 'faqs').then(
    (res) => res.json()
  ).then(
    (data) => {
      dispatch({
        type: FETCH_QUERIES_SUCCESS,
        payload: data
      })
    }
  ).catch(
    (error) => {
      dispatch({
        type: FETCH_QUERIES_FAILURE
      })
    }
  )
}

export const deleteQuery = id => dispatch => {
  fetch(url+'faqs/'+id, {
    method: 'DELETE'
  }).then((res) => res.json())
  .then((data) => {
    dispatch({
      type: DELETE_QUERY_SUCCESS,
      payload: id
    })
  })
}