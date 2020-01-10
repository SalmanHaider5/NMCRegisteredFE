import * as actions from '../actions'
import Cookies from 'js-cookie'
import { isNil } from 'ramda'

const initState = {
  isLoading: false,
  loginEmail: { temporaryPassword: false, password: false },
  loginPassword: { newPassword: false },
  verification: { auth: false, token: '' },
  error: ''
}

const login = (state = initState, action) => {
  const { type, payload, error } = action
  switch (type) {
    case actions.TEMP_PASSWORD_CHECK_REQUEST:
    case actions.EMAIL_CHECK_REQUEST:
    case actions.ADMIN_REGISTER_REQUEST:
    case actions.ADMIN_LOGIN_REQUEST:
      return{
        ...state,
        isLoading: true
      }
    case actions.EMAIL_CHECK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loginEmail: payload
      }
    case actions.TEMP_PASSWORD_CHECK_SUCCESS:
      return{
        ...state,
        isLoading: false,
        loginPassword: payload
      }
    case actions.ADMIN_LOGIN_SUCCESS:
    case actions.ADMIN_REGISTER_SUCCESS:
      Cookies.set('authToken', payload.token)
      return{
        ...state,
        isLoading: false,
        verification: payload
      }
    case actions.ADMIN_REGISTER_FAILURE:
    case actions.TEMP_PASSWORD_CHECK_FAILURE:
    case actions.EMAIL_CHECK_FAILURE:
    case actions.ADMIN_LOGIN_FAILURE:
      return {
        ...state,
        isLoading: true,
        error: error
      }
    case actions.LOGOUT_REQUEST:
      Cookies.remove('authToken')
      return{
        ...state,
        verification: { auth: false, token: '' }
      }
    default:
      return{
        ...state,
        verification: isNil(Cookies.get('authToken')) ? state.verification : { auth: true, token: Cookies.get('authToken') }
      }
  }
}

export default login