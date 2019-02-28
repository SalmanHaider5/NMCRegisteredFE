import { SERVER_URL as url } from '../constants'

export const FETCH_SUBSCRIBERS_REQUEST = 'FETCH_SUBSCRIBERS_REQUEST'
export const FETCH_SUBSCRIBERS_FAILURE = 'FETCH_SUBSCRIBERS_FAILURE'
export const FETCH_SUBSCRIBERS_SUCCESS = 'FETCH_SUBSCRIBERS_SUCCESS'
export const DELETE_SUBSCRIBERS_SUCCESS = 'DELETE_SUBSCRIBERS_SUCCESS'


export const getSubscribers = () => dispatch => {

  dispatch({ type: FETCH_SUBSCRIBERS_REQUEST })

  fetch(url + 'subscribers').then(
    (res) => res.json()
  ).then(
    (data) => {
      dispatch({
        type: FETCH_SUBSCRIBERS_SUCCESS,
        payload: data
      })
    }
  ).catch(
    (error) => {
      dispatch({
        type: FETCH_SUBSCRIBERS_FAILURE
      })
    }
  )
}

export const deleteSubscriber = id => dispatch => {
  fetch(url+'subscribers/'+id, {
    method: 'DELETE'
  }).then((res) => res.json())
  .then((data) => {
    dispatch({
      type: DELETE_SUBSCRIBERS_SUCCESS,
      payload: id
    })
  })
}