import { SERVER_URL as url } from '../constants'
import { isNil } from 'ramda'

export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS'
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE'
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST'
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS'
export const FETCH_SINGLE_PRODUCT_REQUEST = 'FETCH_SINGLE_PRODUCT_REQUEST'
export const FETCH_SINGLE_PRODUCT_FAILURE = 'FETCH_SINGLE_PRODUCT_FAILURE'
export const FETCH_SINGLE_PRODUCT_SUCCESS = 'FETCH_SINGLE_PRODUCT_SUCCESS'

export const postProduct = formData => dispatch => {
  
  formData.date = new Date().toJSON().slice(0, 19).replace('T', ' ')

  fetch(url + 'products', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(formData)
  }).then((res) => res.json())
  .then((data) => { 
    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: formData
    })
  })
  .catch((err) => {
    console.log(err)
    dispatch({ type: ADD_PRODUCT_FAILURE, error: 'Error' })
  })
}

export const getProducts = (id) => dispatch => {

  dispatch({ type: FETCH_PRODUCTS_REQUEST })
  
  const requestURL = isNil(id) ? `products` : `products/${id}` 
  fetch(url+requestURL).then(
    (res) => res.json()
  ).then(
    (data) => {
      dispatch({
        type: FETCH_PRODUCTS_SUCCESS,
        payload: data
      })
    }
  ).catch(
    (error) => {
      console.log(error)
      dispatch({
        type: FETCH_PRODUCTS_FAILURE
      })
    }
  )
}

export const deleteProduct = id => dispatch => {
  fetch(url+'products/'+id, {
    method: 'DELETE'
  }).then((res) => res.json())
  .then((data) => {
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: id
    })
  })
  .catch((err) => console.log(err))
}

export const getSingleProduct = id => dispatch => {

  dispatch({ type: FETCH_SINGLE_PRODUCT_REQUEST })

  fetch(url+'product/'+id)
  .then(res => res.json())
  .then(data => {
    
    dispatch({
      type: FETCH_SINGLE_PRODUCT_SUCCESS,
      payload: data
    })
  })
  .catch(err => {
    console.log(err)
  })
}