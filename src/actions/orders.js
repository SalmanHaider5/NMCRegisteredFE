import { SERVER_URL as url } from '../constants'

export const FETCH_ORDERS_REQUEST = 'FETCH_ORDERS_REQUEST'
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS'
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE'
export const FETCH_SINGLE_ORDER_REQUEST = 'FETCH_SINGLE_ORDER_REQUEST'
export const FETCH_SINGLE_ORDER_SUCCESS = 'FETCH_SINGLE_ORDER_SUCCESS'
export const FETCH_SINGLE_ORDER_FAILURE = 'FETCH_SINGLE_ORDER_FAILURE'
export const UPDATE_ORDER_STATUS_REQUEST = 'UPDATE_ORDER_STATUS_REQUEST'
export const UPDATE_ORDER_STATUS_SUCCESS = 'UPDATE_ORDER_STATUS_SUCCESS'
export const UPDATE_ORDER_STATUS_FAILURE = 'UPDATE_ORDER_STATUS_FAILURE'

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

export const getSingleOrder = id => dispatch => {

  dispatch({ type: FETCH_SINGLE_ORDER_REQUEST })

  fetch(`${url}orders/${id}`)
  .then(res => res.json())
  .then(data => {
    dispatch({
      type: FETCH_SINGLE_ORDER_SUCCESS,
      payload: data
    })
  })
  .catch(error => {
    dispatch({
      type: FETCH_SINGLE_ORDER_FAILURE,
      error
    })
  })
}

export const updateOrderStatus = values => dispatch =>{

  dispatch({ type: UPDATE_ORDER_STATUS_REQUEST })

  const { id } = values
  fetch(`${url}orders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(values)
  })
  .then((res) => res.json())
  .then((data) => {
    dispatch({
      type: UPDATE_ORDER_STATUS_SUCCESS,
      payload: values
    })
  })
  .catch((err) => {
    dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, error: err })
  })
}