import { SERVER_URL as url } from '../constants'

export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS'
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE'
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST'
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS'

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
    dispatch({ type: ADD_PRODUCT_FAILURE, error: 'Error' })
  })
}

export const getProducts = (id) => dispatch => {

  dispatch({ type: FETCH_PRODUCTS_REQUEST })

  fetch(url + 'products/'+id).then(
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