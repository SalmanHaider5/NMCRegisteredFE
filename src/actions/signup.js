import { ENDPOINTS as api  } from '../constants'
import { get, getUrl, post, formatVerificationData, getAccountBasicValues } from '../utils/helpers'
import * as types from './'

export const register = formValues => dispatch => {
    
    post({
        url: getUrl(api.SIGNUP),
        body: JSON.stringify(formValues),
        init: types.SIGNUP_REQUEST,
        success: types.SIGNUP_SUCCESS,
        failure: types.SIGNUP_FAULRE,
        dispatch
    })
}

export const verifyAccount = formValues => dispatch => {

    const { userId, token } = formValues

    get({
        url: getUrl(api.VERIFY_USER, { userId, token }),
        init: types.VERIFY_ACCOUNT_REQUEST,
        success: types.VERIFY_ACCOUNT_SUCCESS,
        failure: types.VERIFY_ACCOUNT_FAILURE,
        dispatch,
        format: formatVerificationData
    })
}

export const clearErrors = () => dispatch => {
    dispatch({ type: types.CLEAR_ACCOUNT_ERRORS })
}

export const logoutUser = () => dispatch => {

    dispatch({
        type: types.ACCOUNT_LOGOUT_REQUEST,
        payload: getAccountBasicValues()
    })
}

export const generatePasswordResetLink = values => dispatch => {

    // const endpoint = `${url}reset`
    // fetch(endpoint, {
    //     method: 'POST',
    //     body: JSON.stringify(values),
    //     headers: {
    //         'Content-Type':'application/json'
    //     }
    // })
    // .then(res => res.json())
    // .then(response => {
    //     const { code, response: { title, message } } = response
    //     showToast(title, message, code)
    // })

}

export const resetUserPassword = (id, values) => dispatch => {
    // const endpoint = `${url}resetPassword/${id}`
    // const headers = new Headers()
    // headers.append('Content-Type', 'application/json')
    // headers.append('authorization', values.token)
    // fetch(endpoint, {
    //     method: 'POST',
    //     body: JSON.stringify(values),
    //     headers
    // })
    // .then(res => res.json())
    // .then(response => {
    //     const { code, response: { title, message } } = response
    //     showToast(title, message, code)
    // })
}