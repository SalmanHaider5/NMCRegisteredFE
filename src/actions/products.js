import { SERVER_URL as url } from '../constants'
import { isNil } from 'ramda'

export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST'
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS'
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE'
export const ADD_PRODUCT_IMAGE_REQUEST = 'ADD_PRODUCT_IMAGE_REQUEST'
export const ADD_PRODUCT_IMAGE_SUCCESS = 'ADD_PRODUCT_IMAGE_SUCCESS'
export const ADD_PRODUCT_IMAGE_FAILURE = 'ADD_PRODUCT_IMAGE_FAILURE'
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST'
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE'
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS'
export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST'
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS'
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE'
export const FETCH_SINGLE_PRODUCT_REQUEST = 'FETCH_SINGLE_PRODUCT_REQUEST'
export const FETCH_SINGLE_PRODUCT_FAILURE = 'FETCH_SINGLE_PRODUCT_FAILURE'
export const FETCH_SINGLE_PRODUCT_SUCCESS = 'FETCH_SINGLE_PRODUCT_SUCCESS'
export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST'
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS'
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE'
export const DELETE_PRODUCT_IMAGE_REQUEST = 'DELETE_PRODUCT_IMAGE_REQUEST'
export const DELETE_PRODUCT_IMAGE_SUCCESS = 'DELETE_PRODUCT_IMAGE_SUCCESS'
export const DELETE_PRODUCT_IMAGE_FAILURE = 'DELETE_PRODUCT_IMAGE_FAILURE'

const getImageName = img => {
  return isNil(img) ? '' : img.name
}

export const postProduct = formData => dispatch => {

  dispatch({ type: ADD_PRODUCT_REQUEST })

  const {
    category,
    id,
    title,
    openlength,
    bladelength,
    handlelength,
    price,
    discount,
    shipping,
    stock,
    description,
    tips,
    img
  } = formData
  const form = new FormData();
  form.append('category', category)
  form.append('id', id)
  form.append('title', title)
  form.append('price', price)
  form.append('discount', discount)
  form.append('openlength', openlength)
  form.append('bladelength', bladelength)
  form.append('handlelength', handlelength)
  form.append('shipping', shipping)
  form.append('stock', stock)
  form.append('description', description)
  form.append('tips', tips)
  form.append('image',img)
  form.append('img', getImageName(img))
  form.append('date', new Date().toJSON().slice(0, 19).replace('T', ' '))
  formData.date = new Date().toJSON().slice(0, 19).replace('T', ' ')
  fetch(url + 'products', {
    method: 'POST',
    body: form
  }).then((res) => res.json())
  .then((data) => { 
    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: formData
    })
  })
  .catch((err) => {
    dispatch({
      type: ADD_PRODUCT_FAILURE,
      error: err
    })
  })
}

export const addProductImage = values => dispatch => {

  dispatch({ type: ADD_PRODUCT_IMAGE_REQUEST })
  const { img, id } = values
  const form = new FormData();
  form.append('id', id)
  form.append('image', img)
  form.append('img', getImageName(img))
  fetch(url + 'product/addImage', {
    method: 'POST',
    body: form
  }).then((res) => res.json())
  .then((data) => { 
    dispatch({
      type: ADD_PRODUCT_IMAGE_SUCCESS,
      payload: getImageName(img)
    })
  })
  .catch((err) => {
    dispatch({
      type: ADD_PRODUCT_IMAGE_FAILURE,
      error: err
    })
  })
} 

export const getProducts = (id) => dispatch => {

  dispatch({ type: FETCH_PRODUCTS_REQUEST })
  
  const requestURL = isNil(id) || id === 0 ? `products` : `products/${id}` 
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

  dispatch({ type: DELETE_PRODUCT_REQUEST })
  
  fetch(url+'products/'+id, {
    method: 'DELETE'
  }).then((res) => res.json())
  .then((data) => {
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: id
    })
  })
  .catch((err) => {
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      error: err
    })
  })
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
    dispatch({
      type: FETCH_SINGLE_PRODUCT_FAILURE,
      error: err
    })
  })
}

export const updateProduct = values => dispatch => {

  dispatch({ type: UPDATE_PRODUCT_REQUEST })
  const { id } = values
  fetch(`${url}products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(values)
  })
  .then((res) => res.json())
  .then((data) => {
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: values
    })
  })
  .catch((err) => {
    dispatch({ type: UPDATE_PRODUCT_FAILURE, error: 'Error' })
  })
}

export const deleteProductImage = (id, name) => dispatch => {

  dispatch({ type: DELETE_PRODUCT_IMAGE_REQUEST })

  dispatch({
    type: DELETE_PRODUCT_IMAGE_SUCCESS,
    payload: { id, name }
  })

  // const requestUrl = `${url}${id}/deleteImage/${name}`
  // fetch(requestUrl, {
  //   method: 'DELETE',
  //   headers: {
  //     'Content-Type':'application/json'
  //   }
  // })
  // .then(res => res.json())
  // .then(data => {
  //   console.log('Response', data)
  //   dispatch({
  //     type: DELETE_PRODUCT_IMAGE_SUCCESS,
  //     payload: { id, name }
  //   })
  // })
  // .catch(err => {
  //   dispatch({
  //     type: DELETE_PRODUCT_IMAGE_FAILURE,
  //     error: err
  //   })
  // })

}