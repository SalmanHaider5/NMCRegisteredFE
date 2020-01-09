import { SERVER_URL as url } from '../constants'

export const FETCH_BASICS_REQUEST = 'FETCH_BASICS_REQUEST'
export const FETCH_BASICS_FAILURE = 'FETCH_BASICS_FAILURE'
export const FETCH_BASICS_SUCCESS = 'FETCH_BASICS_SUCCESS'
export const UPDATE_BASICS_REQUEST = 'UPDATE_BASICS_REQUEST'
export const UPDATE_BASICS_SUCCESS = 'UPDATE_BASICS_SUCCESS'
export const UPDATE_BASICS_FAILURE = 'UPDATE_BASICS_FAILURE'
export const FETCH_MEMBERS_REQUEST = 'FETCH_MEMBERS_REQUEST'
export const FETCH_MEMBERS_SUCCESS = 'FETCH_MEMBERS_SUCCESS'
export const FETCH_MEMBERS_FAILURE = 'FETCH_MEMBERS_FAILURE'
export const ADD_MEMBER_REQUEST = 'ADD_MEMBER_REQUEST'
export const ADD_MEMBER_SUCCESS = 'ADD_MEMBER_SUCCESS'
export const ADD_MEMBER_FAILURE = 'ADD_MEMBER_FAILURE'
export const DELETE_MEMBER_REQUEST = 'DELETE_MEMBER_REQUEST'
export const DELETE_MEMBER_SUCCESS = 'DELETE_MEMBER_SUCCESS'
export const DELETE_MEMBER_FAILURE = 'DELETE_MEMBER_FAILURE'



export const getBasics = () => dispatch => {

  dispatch({ type: FETCH_BASICS_REQUEST })

  fetch(url + 'settings').then(
    (res) => res.json()
  ).then(
    (data) => {
      dispatch({
        type: FETCH_BASICS_SUCCESS,
        payload: data
      })
    }
  ).catch(
    (error) => {
      dispatch({
        type: FETCH_BASICS_FAILURE,
        error
      })
    }
  )
}

export const updateBasics = values => dispatch => {
  console.log(values)

  dispatch({ type: UPDATE_BASICS_REQUEST })
  fetch(`${url}settings`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(values)
  })
  .then((res) => res.json())
  .then((data) => {
    dispatch({
      type: UPDATE_BASICS_SUCCESS,
      payload: values
    })
  })
  .catch((err) => {
    dispatch({ type: UPDATE_BASICS_FAILURE, error: err })
  })
}

export const getMembers = () => dispatch => {

  dispatch({ type: FETCH_MEMBERS_REQUEST })

  fetch(url + 'members').then(
    (res) => res.json()
  ).then(
    (data) => {
      dispatch({
        type: FETCH_MEMBERS_SUCCESS,
        payload: data
      })
    }
  ).catch(
    (error) => {
      dispatch({
        type: FETCH_MEMBERS_FAILURE,
        error
      })
    }
  )
}

export const addMember = formData => dispatch => {

  dispatch({ type: ADD_MEMBER_REQUEST })

  const { name, phone, email, address, img } = formData
  const form = new FormData();
  form.append('name', name)
  form.append('phone', phone)
  form.append('email', email)
  form.append('address', address)
  form.append('img', img.name)
  form.append('image', img)
  
  fetch(url + 'member', {
    method: 'POST',
    body: form
  }).then((res) => res.json())
  .then((data) => {
    const { insertId } = data
    formData.id = insertId
    formData.name = name
    formData.phone = phone
    formData.email = email
    formData.address = address
    formData.img = img.name
    dispatch({
      type: ADD_MEMBER_SUCCESS,
      payload: formData
    })
  })
  .catch((e) => {
    dispatch({
      type: ADD_MEMBER_FAILURE,
      error: e
    })
  })
}
export const deleteMember = id => dispatch => {

  dispatch({ type: DELETE_MEMBER_REQUEST })

  fetch(url+'member/'+id, {
    method: 'DELETE'
  }).then((res) => res.json())
  .then((data) => {
    dispatch({
      type: DELETE_MEMBER_SUCCESS,
      payload: id
    })
  })
  .catch(error => {
    dispatch({
      type: DELETE_MEMBER_FAILURE,
      error
    })
  })
}