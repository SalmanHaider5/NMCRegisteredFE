import Cookies from 'js-cookie'
import { defaultTo, empty } from 'ramda'
import * as actions from '../actions'

const initState = {
    isLoading: false,
    authentication: {
        auth: false,
        authToken: '',
        role: '',
        userId: 0
    },
    twoFactorAuth: false,
    error: {},
    isError: false
}

const account = (state=initState, action) => {
    const { type, error, payload } = action
    switch(type){
        case actions.SIGNUP_REQUEST:
        case actions.VERIFY_ACCOUNT_REQUEST:
        case actions.LOGIN_REQUEST:
        case actions.MESSAGE_SENDING_REQUEST:
        case actions.FORGOT_PASSWORD_LINK_REQUEST:
        case actions.PASSWORD_RESET_REQUEST:
        case actions.TWO_FACTOR_AUTHENTICATION_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actions.CLEAR_ACCOUNT_ERRORS:
            return {
                ...state,
                isError: false,
                error: empty(error)
            }
        case actions.SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                error: empty(error)
            }
        case actions.VERIFY_ACCOUNT_SUCCESS:
        case actions.LOGIN_SUCCESS:
        case actions.TWO_FACTOR_AUTHENTICATION_SUCCESS:
            Cookies.set('authToken', payload)
            return {
                ...state,
                isLoading: false,
                isError: false,
                error: empty(error),
                authentication: payload
            }
        case actions.FETCH_PROFESSIONAL_DETAILS_FAILURE:
        case actions.ACCOUNT_LOGOUT_REQUEST:
            Cookies.remove('authToken')
            return {
                ...state,
                isLoading: false,
                authentication: payload
            }
        case actions.MESSAGE_SENDING_SUCCESS:
        case actions.FORGOT_PASSWORD_LINK_SUCCESS:
        case actions.PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: empty(error)
            }
        case actions.TWO_FACTOR_LOGIN:
            
            const { twoFactorAuthentication, userId } = payload,
                { authentication } = state
            authentication.userId = userId
            
            return {
                ...state,
                isLoading: false,
                twoFactorAuth: twoFactorAuthentication,
                authentication
            }
        case actions.SIGNUP_FAULRE:
        case actions.VERIFY_ACCOUNT_FAILURE:
        case actions.LOGIN_FAILURE:
        case actions.MESSAGE_SENDING_FAILURE:
        case actions.FORGOT_PASSWORD_LINK_FAILURE:
        case actions.PASSWORD_RESET_FAILURE:
        case actions.TWO_FACTOR_AUTHENTICATION_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: error
            }
        default:
            return{
                ...state,
                authentication: defaultTo(initState.authentication, Cookies.getJSON('authToken'))
            }
    }
}

export default account