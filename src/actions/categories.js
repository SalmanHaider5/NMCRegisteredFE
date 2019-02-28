import { SERVER_URL as url } from '../constants'

export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS'
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE'
export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST'
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE'
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS'
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS'

export const postCategory = formData => dispatch => {
  const { title, img, img: { name } } = formData
  const form = new FormData();
  form.append('name', title)
  form.append('img', name)
  form.append('date', new Date().toJSON().slice(0, 19).replace('T', ' '))
  form.append('image', img)

  fetch(url + 'categories', {
    method: 'POST',
    body: form
  }).then((res) => res.json())
  .then((data) => {
    const { insertId } = data
    formData.id = insertId
    formData.name = title
    formData.img = name
    formData.date = new Date().toJSON().slice(0, 19).replace('T', ' ')
    dispatch({
      type: ADD_CATEGORY_SUCCESS,
      payload: formData
    })
  })
  .catch((err) => {
    dispatch({ type: ADD_CATEGORY_FAILURE, error: 'Error' })
  })
}

export const getCategories = () => dispatch => {

  dispatch({ type: FETCH_CATEGORIES_REQUEST })

  fetch(url + 'categories').then(
    (res) => res.json()
  ).then(
    (data) => {
      dispatch({
        type: FETCH_CATEGORIES_SUCCESS,
        payload: data
      })
    }
  ).catch(
    (error) => {
      dispatch({
        type: FETCH_CATEGORIES_FAILURE
      })
    }
  )
}

export const deleteCategory = id => dispatch => {
  fetch(url+'categories/'+id, {
    method: 'DELETE'
  }).then((res) => res.json())
  .then((data) => {
    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: id
    })
  })
}