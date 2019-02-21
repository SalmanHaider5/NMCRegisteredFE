import { SERVER_URL as url } from '../constants'

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
    console.log(data)
    dispatch({ type: 'SUCCESS' })
  })
  .catch((err) => {
    console.log(err)
    dispatch({ type: 'ERROR' })
  })
}

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST'
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE'
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS'

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