import Cookies from 'js-cookie'
import * as actions from '../actions'

const initState = {
    isLoading: false,
    auth: false,
    role: '',
    authToken: '',
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
        case actions.VERIFY_ACCOUNT_SUCCESS:{
            Cookies.set('authToken', payload.token)
            return{
                ...state,
                isLoading: false,
                auth: true,
                authToken: payload.token,
                role: payload.role,
                userId: payload.userId
            }
        }
        default:
            return{
                ...state,
                authToken: Cookies.get('authToken')
            }
    }
}

export default signup