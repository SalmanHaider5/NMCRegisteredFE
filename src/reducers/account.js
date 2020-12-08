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
                authentication: payload
            }
        case actions.SIGNUP_FAULRE:
        case actions.VERIFY_ACCOUNT_FAILURE:
        case actions.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
                error: error
            }
        // case actions.SIGNUP_FAULRE:
        //     return{
        //         ...state,
        //         isLoading: false
        //     }
        // case actions.VERIFY_ACCOUNT_REQUEST:
        //     return{
        //         ...state,
        //         isLoading: true,
        //     }
        // case actions.TWO_FACTOR_LOGIN:
        //     let user = state.authentication
        //     user.userId = payload.userId
        //     return{
        //         ...state,
        //         isLoading: false,
        //         twoFactorAuth: payload.twoFactorAuthenticationEnabled,
        //         authentication: user
        //     }
        // case actions.TWO_FACTOR_AUTHENTICATION_REQUEST:
        //     return{
        //         ...state,
        //         isLoading: true
        //     }
        // case actions.VERIFY_ACCOUNT_SUCCESS:
        // case actions.LOGIN_SUCCESS:
        // case actions.TWO_FACTOR_AUTHENTICATION_SUCCESS:
        //     const authentication = {}
            // authentication.auth = true
            // authentication.authToken = payload.token
            // authentication.role = payload.role
            // authentication.userId = payload.userId
            // Cookies.set('authToken', authentication)
        //     return{
        //         ...state,
        //         isLoading: false,
        //         twoFactorAuth: false,
        //         authentication
        //     }
        // case actions.ACCOUNT_LOGOUT_REQUEST:
        //     Cookies.remove('authToken')
        //     return{
        //         isLoading: false,
        //         authentication: {
        //             auth: false,
        //             authToken: '',
        //             role: '',
        //             userId: 0
        //         }
        //     }
        // case actions.TWO_FACTOR_AUTHENTICATION_FAILURE:
        // case actions.VERIFY_ACCOUNT_FAILURE:
        //     return{
        //         ...state,
        //         isLoading: false
        //     }
        // case actions.LOGIN_FAILURE:
        //     return{
        //         ...state,
        //         isLoading: false
        //     }
        default:
            return{
                ...state,
                authentication: defaultTo(initState.authentication, Cookies.getJSON('authToken'))
            }
    }
}

export default account