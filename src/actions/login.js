import { SERVER_URL as url } from '../constants'

export const EMAIL_CHECK_REQUEST = 'EMAIL_CHECK_REQUEST'
export const EMAIL_CHECK_SUCCESS = 'EMAIL_CHECK_SUCCESS'
export const EMAIL_CHECK_FAILURE = 'EMAIL_CHECK_FAILURE'
export const TEMP_PASSWORD_CHECK_REQUEST = 'TEMP_PASSWORD_CHECK_REQUEST'
export const TEMP_PASSWORD_CHECK_SUCCESS = 'TEMP_PASSWORD_CHECK_SUCCESS'
export const TEMP_PASSWORD_CHECK_FAILURE = 'TEMP_PASSWORD_CHECK_FAILURE'
export const ADMIN_REGISTER_REQUEST = 'ADMIN_REGISTER_REQUEST'
export const ADMIN_REGISTER_SUCCESS = 'ADMIN_REGISTER_SUCCESS'
export const ADMIN_REGISTER_FAILURE = 'ADMIN_REGISTER_FAILURE'
export const ADMIN_LOGIN_REQUEST = 'ADMIN_LOGIN_REQUEST'
export const ADMIN_LOGIN_SUCCESS = 'ADMIN_LOGIN_SUCCESS'
export const ADMIN_LOGIN_FAILURE = 'ADMIN_LOGIN_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'

export const checkEmail = email => dispatch => {

  dispatch({ type: EMAIL_CHECK_REQUEST })

  fetch(`${url}checkEmail/${email}`).then(
    (res) => res.json()
  ).then(
    (data) => {
      dispatch({
        type: EMAIL_CHECK_SUCCESS,
        payload: data
      })
    }
  ).catch(
    (error) => {
      dispatch({
        type: EMAIL_CHECK_FAILURE,
        error
      })
    }
  )
}

export const verifyTemporaryPassword = values => dispatch => {
    dispatch({ type: TEMP_PASSWORD_CHECK_REQUEST })
    fetch(url + 'checkPassword', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(values)
      })
      .then((res) => res.json())
      .then((data) => {
            dispatch({
            type: TEMP_PASSWORD_CHECK_SUCCESS,
            payload: data
            })
        })
      .catch((err) => {
            dispatch({
                type: TEMP_PASSWORD_CHECK_FAILURE,
                error: err
            })
        })
}

export const registerAdmin = values => dispatch => {
    dispatch({ type:  ADMIN_REGISTER_REQUEST })

    fetch(url + 'register', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(values)
      })
      .then((res) => res.json())
      .then((data) => {
            dispatch({
            type: ADMIN_REGISTER_SUCCESS,
            payload: data
            })
        })
      .catch((err) => {
            dispatch({
                type: ADMIN_REGISTER_FAILURE,
                error: err
            })
        })
}

export const login = values => dispatch => {
  dispatch({ type: ADMIN_LOGIN_REQUEST })
  
  fetch(url + 'login', {
    method: 'POST',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(values)
  })
  .then((res) => res.json())
  .then((data) => {
        dispatch({
        type: ADMIN_LOGIN_SUCCESS,
        payload: data
        })
    })
  .catch((err) => {
        dispatch({
            type: ADMIN_LOGIN_FAILURE,
            error: err
        })
    })

}

export const logout = () => dispatch => {
  
  dispatch({ type: LOGOUT_REQUEST })
  
}