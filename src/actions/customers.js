import { SERVER_URL as url } from '../constants'

export const FETCH_CUSTOMERS_REQUEST = 'FETCH_CUSTOMERS_REQUEST'
export const FETCH_CUSTOMERS_SUCCESS = 'FETCH_CUSTOMERS_SUCCESS'
export const FETCH_CUSTOMERS_FAILURE = 'FETCH_CUSTOMERS_FAILURE'
export const FETCH_SINGLE_CUSTOMER_REQUEST = 'FETCH_SINGLE_CUSTOMER_REQUEST'
export const FETCH_SINGLE_CUSTOMER_SUCCESS = 'FETCH_SINGLE_CUSTOMER_SUCCESS'
export const FETCH_SINGLE_CUSTOMER_FAILURE = 'FETCH_SINGLE_CUSTOMER_FAILURE'

export const getCustomers = () => dispatch => {

  dispatch({ type: FETCH_CUSTOMERS_REQUEST })

  fetch(url + 'customers').then(
    (res) => res.json()
  ).then(
    (data) => {
      dispatch({
        type: FETCH_CUSTOMERS_SUCCESS,
        payload: data
      })
    }
  ).catch(
    (error) => {
      dispatch({
        type: FETCH_CUSTOMERS_FAILURE,
        error
      })
    }
  )
}

export const getSingleCustomer = id => dispatch => {

  dispatch({ type: FETCH_SINGLE_CUSTOMER_REQUEST })

  fetch(`${url}customers/${id}`)
  .then(res => res.json())
  .then(data => {
    dispatch({
      type: FETCH_SINGLE_CUSTOMER_SUCCESS,
      payload: data
    })
  })
  .catch(error => {
    dispatch({
      type: FETCH_SINGLE_CUSTOMER_FAILURE,
      error
    })
  })
}