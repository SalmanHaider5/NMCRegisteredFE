import { SERVER_URL as url } from '../constants'
import { showToast } from '../utils/helpers'
import * as types from './'

export const userLogin = formValues => dispatch => {
    dispatch({ type:  types.LOGIN_REQUEST })
    const endpoint = `${url}login`
    fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        console.log(response)
        const { code, response: { title, message }, role } = response
        showToast(title, message, code)
        if(code === 'success'){
            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: response
            })
        }
        if(code === 'info' && role === 'professional'){
            dispatch({
                type: types.TWO_FACTOR_LOGIN,
                payload: response
            })
        }
    })
    .catch(error => {
        dispatch({
            type: types.LOGIN_FAILURE,
            error
        })
    })
}

export const verifyLogin = values => dispatch => {

    dispatch({ type: types.TWO_FACTOR_AUTHENTICATION_REQUEST })

    const endpoint = `${url}verifyLogin`
    fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        const { code, response: { title, message } } = response
        showToast(title, message, code)
        if(code === 'success'){
            dispatch({
                type: types.TWO_FACTOR_AUTHENTICATION_SUCCESS,
                payload: response
            })
        }
    })
    .catch(err => {
        dispatch({
            type: types.VERIFY_PROFESSIONAL_PHONE_FAILURE,
            error: err
        })
    })
}