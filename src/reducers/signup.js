import Cookies from 'js-cookie'
import { defaultTo } from 'ramda'
import * as actions from '../actions'

const initState = {
    isLoading: false,
    authentication: {
        auth: false,
        authToken: '',
        role: '',
        userId: 0
    },
    error: ''
}

const signup = (state=initState, action) => {
    const { type, payload } = action
    switch(type){
        case actions.SIGNUP_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case actions.SIGNUP_SUCCESS:
            return{
                ...state,
                isLoading: false
            }
        case actions.SIGNUP_FAULRE:
            return{
                ...state,
                isLoading: false
            }
        case actions.VERIFY_ACCOUNT_REQUEST:
            return{
                ...state,
                isLoading: true,
            }
        case actions.VERIFY_ACCOUNT_SUCCESS:
            const authentication = {}
            authentication.auth = true
            authentication.authToken = payload.token
            authentication.role = payload.role
            authentication.userId = payload.userId
            Cookies.set('authToken', authentication)
            return{
                ...state,
                isLoading: false,
                authentication
            }
        case actions.ACCOUNT_LOGOUT_REQUEST:
            Cookies.remove('authToken')
            return{
                authentication: {
                    auth: false,
                    authToken: '',
                    role: '',
                    userId: 0
                }
            }
        case actions.VERIFY_ACCOUNT_FAILURE:
            return{
                ...state,
                isLoading: false
            }
        default:
            return{
                ...state,
                authentication: defaultTo(initState.authentication, Cookies.getJSON('authToken'))
            }
    }
}

export default signup