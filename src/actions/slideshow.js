import { SERVER_URL as url } from '../constants'
import { isNil } from 'ramda'

export const FETCH_SLIDESHOW_IMAGES_REQUEST = 'FETCH_SLIDESHOW_IMAGES_REQUEST'
export const FETCH_SLIDESHOW_IMAGES_SUCCESS = 'FETCH_SLIDESHOW_IMAGES_SUCCESS'
export const FETCH_SLIDESHOW_IMAGES_FAILURE = 'FETCH_SLIDESHOW_IMAGES_FAILURE'
export const ADD_SLIDESHOW_IMAGE_REQUEST = 'ADD_SLIDESHOW_IMAGE_REQUEST'
export const ADD_SLIDESHOW_IMAGE_SUCCESS = 'ADD_SLIDESHOW_IMAGE_SUCCESS'
export const ADD_SLIDESHOW_IMAGE_FAILURE = 'ADD_SLIDESHOW_IMAGE_FAILURE'
export const DELETE_SLIDESHOW_IMAGE_REQUEST = 'DELETE_SLIDESHOW_IMAGE_REQUEST'
export const DELETE_SLIDESHOW_IMAGE_SUCCESS = 'DELETE_SLIDESHOW_IMAGE_SUCCESS'
export const DELETE_SLIDESHOW_IMAGE_FAILURE = 'DELETE_SLIDESHOW_IMAGE_FAILURE'

const getImageName = img => {
    return isNil(img) ? '' : img.name
}

export const getSlideshowImages = () => dispatch => {

    dispatch({ type: FETCH_SLIDESHOW_IMAGES_REQUEST })

    fetch(`${url}slideshow`)
    .then(res => res.json())
    .then(data => {
        console.log('Action Data', data)
        dispatch({
            type: FETCH_SLIDESHOW_IMAGES_SUCCESS,
            payload: data
        })
    })
    .catch(error => {
        dispatch({
            type: FETCH_SLIDESHOW_IMAGES_FAILURE,
            error
        })
    })
}

export const addSlideshowImage = img => dispatch => {

    dispatch({ type: ADD_SLIDESHOW_IMAGE_REQUEST })

    const form = new FormData();
    form.append('image', img)
    form.append('img', getImageName(img))
    fetch(url + 'slideshow', {
      method: 'POST',
      body: form
    }).then((res) => res.json())
    .then((data) => { 
        const { insertId } = data
        dispatch({
            type: ADD_SLIDESHOW_IMAGE_SUCCESS,
            payload: { id: insertId, img: getImageName(img) }
        })
    })
    .catch((err) => {
      dispatch({
        type: ADD_SLIDESHOW_IMAGE_FAILURE,
        error: err
      })
    })
  }

  export const deleteSlideshowImage = id => dispatch => {

    dispatch({ type: DELETE_SLIDESHOW_IMAGE_REQUEST })
  
    const requestUrl = `${url}slideshow/${id}`
    fetch(requestUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: DELETE_SLIDESHOW_IMAGE_SUCCESS,
        payload: id
      })
    })
    .catch(err => {
      dispatch({
        type: DELETE_SLIDESHOW_IMAGE_FAILURE,
        error: err
      })
    })
  }