import { ENDPOINTS as api  } from '../constants'
import { get, getUrl, post, formatVerificationData, getAccountBasicValues, postWithAuth } from '../utils/helpers'
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

    post({
        url: getUrl(api.RESET_PASSWORD_LINK, {}),
        body: JSON.stringify(values),
        init: types.FORGOT_PASSWORD_LINK_REQUEST,
        success: types.FORGOT_PASSWORD_LINK_SUCCESS,
        failure: types.FORGOT_PASSWORD_LINK_FAILURE,
        dispatch
    })
}

export const resetUserPassword = (userId, values) => dispatch => {
    const { token } = values
    
    postWithAuth({
        type: 'json',
        url: getUrl(api.RESET_PASSWORD, { userId }),
        token,
        body: JSON.stringify(values),
        init: types.PASSWORD_RESET_REQUEST,
        success: types.PASSWORD_RESET_SUCCESS,
        failure: types.PASSWORD_RESET_FAILURE,
        dispatch
    })
}