import { ENDPOINTS as api  } from '../constants'
import { formatVerificationData, getUrl, post } from '../utils/helpers'
import * as types from './'

export const userLogin = formValues => dispatch => {

    post({
        url: getUrl(api.LOGIN),
        body: JSON.stringify(formValues),
        init: types.LOGIN_REQUEST,
        success: types.LOGIN_SUCCESS,
        failure: types.LOGIN_FAILURE,
        info: types.TWO_FACTOR_LOGIN,
        dispatch,
        format: formatVerificationData
    })
}

export const verifyLogin = (userId, values) => dispatch => {

    post({
        url: getUrl(api.VERIFY_LOGIN, { userId }),
        body: JSON.stringify(values),
        init: types.TWO_FACTOR_AUTHENTICATION_REQUEST,
        success: types.TWO_FACTOR_AUTHENTICATION_SUCCESS,
        failure: types.TWO_FACTOR_AUTHENTICATION_FAILURE,
        dispatch,
        format: formatVerificationData
    })
}

export const reachUs = values => dispatch => {

    post({
        url: getUrl(api.SEND_MESSAGE_BY_GUEST, {}),
        body: JSON.stringify(values),
        init: types.MESSAGE_SENDING_REQUEST,
        success: types.MESSAGE_SENDING_SUCCESS,
        failure: types.MESSAGE_SENDING_FAILURE,
        dispatch   
    })
    
}