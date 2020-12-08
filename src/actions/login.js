import { change } from 'redux-form'
import { ENDPOINTS as api  } from '../constants'
import { SERVER_URL as url } from '../constants'
import { formatVerificationData, getUrl, post, showToast } from '../utils/helpers'
import * as types from './'

export const userLogin = formValues => dispatch => {

    post({
        url: getUrl(api.LOGIN),
        body: JSON.stringify(formValues),
        init: types.LOGIN_REQUEST,
        success: types.LOGIN_SUCCESS,
        failure: types.LOGIN_FAILURE,
        dispatch,
        format: formatVerificationData
    })

    // dispatch({ type:  types.LOGIN_REQUEST })
    // const endpoint = `${url}login`
    // fetch(endpoint, {
    //     method: 'POST',
    //     body: JSON.stringify(formValues),
    //     headers: {
    //         'Content-Type':'application/json'
    //     }
    // })
    // .then(res => res.json())
    // .then(response => {
    //     const { code, response: { title, message }, role } = response
    //     showToast(title, message, code)
    //     dispatch(change('users', 'login.password', ''))
    //     if(code === 'success'){
    //         dispatch(reset('users'))
    //         dispatch({
    //             type: types.LOGIN_SUCCESS,
    //             payload: response
    //         })
    //     }
    //     if(code === 'info' && role === 'professional'){
    //         dispatch({
    //             type: types.TWO_FACTOR_LOGIN,
    //             payload: response
    //         })
    //     }
    //     if(code === 'error'){
    //         dispatch({ type: types.LOGIN_FAILURE })
    //     }
    // })
    // .catch(error => {
    //     dispatch({
    //         type: types.LOGIN_FAILURE,
    //         error
    //     })
    // })
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

export const reachUs = values => dispatch => {
    const endpoint = `${url}guest/sendMessage`
    fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(values)
    })
    .then(res=> res.json())
    .then(response => {
        const { code, response: { title, message } } = response
        values.name = ''
        values.phone = ''
        values.email = ''
        values.message = ''
        values.subject = ''
        dispatch(change('users', 'contactForm', values))
        showToast(title, message, code)
    })
}