import { SERVER_URL as url } from '../constants'
import { showToast } from '../utils/helpers'
import * as types from './'

export const register = formValues => dispatch => {
    dispatch({ type:  types.SIGNUP_REQUEST })
    const endpoint = `${url}signup`
    fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        const { code, response: { title, message } } = response
        showToast(title, message, code)
        dispatch({
            type: types.SIGNUP_SUCCESS,
            payload: response
        })
    })
    .catch(error => {
        dispatch({
            type: types.SIGNUP_FAULRE,
            error
        })
    })
}

export const verifyAccount = formValues => dispatch => {
    dispatch({ type: types.VERIFY_ACCOUNT_REQUEST })
    const { userId, token } = formValues
    const endpoint = `${url}${userId}/verify/${token}`
    fetch(endpoint)
    .then(res => res.json())
    .then(data => {
        const { code, response: { title, message } } = data
        if(code !== 'success'){
            showToast(title, message, code)  
        }
        data.userId = userId
        dispatch({
            type: types.VERIFY_ACCOUNT_SUCCESS,
            payload: data
        })
    })
    .catch(error => {
        dispatch({
            type: types.VERIFY_ACCOUNT_FAILURE,
            error
        })
    })
}

export const logoutUser = () => dispatch => {
    dispatch({ type: types.ACCOUNT_LOGOUT_REQUEST })
}