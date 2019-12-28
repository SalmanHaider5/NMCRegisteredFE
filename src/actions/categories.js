import { SERVER_URL as url } from '../constants'

export const ADD_CATEGORY_REQUEST = 'ADD_CATEGORY_REQUEST'
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS'
export const ADD_CATEGORY_FAILURE = 'ADD_CATEGORY_FAILURE'
export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST'
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE'
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS'
export const DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST'
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS'
export const DELETE_CATEGORY_FAILURE = 'DELETE_CATEGORY_FAILURE'

export const postCategory = formData => dispatch => {

  dispatch({ type: ADD_CATEGORY_REQUEST })

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
  .catch((e) => {
    dispatch({
      type: ADD_CATEGORY_FAILURE,
      error: e
    })
  })
}

export const getCategories = () => dispatch => {

  dispatch({ type: FETCH_CATEGORIES_REQUEST })

  fetch(url + 'categories').then(
    (res) => res.json()
  ).then(
    (data) => {
      if(data){
        const { isError = false } = data
        if(!isError){
          dispatch({
            type: FETCH_CATEGORIES_SUCCESS,
            payload: data
          }) 
        }else{
          const { error: { code } } = data
          dispatch({
            type: FETCH_CATEGORIES_FAILURE,
            error: code
          })
        }
      }
    }
  )
  .catch((error) => {
    dispatch({
      type: FETCH_CATEGORIES_FAILURE,
      error
    })
  })
}

export const deleteCategory = id => dispatch => {

  dispatch({ type: DELETE_CATEGORY_REQUEST })

  fetch(url+'categories/'+id, {
    method: 'DELETE'
  }).then((res) => res.json())
  .then((data) => {
    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: id
    })
  })
  .catch((error) => {
    dispatch({
      type: DELETE_CATEGORY_FAILURE,
      error
    })
  })
}