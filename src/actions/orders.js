import { SERVER_URL as url } from '../constants'

export const FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST'
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS'
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE'

export const getOrders = () => dispatch => {

  dispatch({ type: FETCH_ORDERS_REQUEST })

  fetch(url + 'orders').then(
    (res) => res.json()
  ).then(
    (data) => {
      dispatch({
        type: FETCH_ORDERS_SUCCESS,
        payload: data
      })
    }
  ).catch(
    (error) => {
      dispatch({
        type: FETCH_ORDERS_FAILURE,
        error
      })
    }
  )
}