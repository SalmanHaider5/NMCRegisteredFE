import * as actions from '../actions'
import { prop } from 'ramda'

const initState = {
    isLoading: false,
    code: '',
    phoneVerified: false,
    response: {}
}

const professional = (state=initState, action) => {
    const { type, payload } = action
    switch(type){
        case actions.ADD_PROFESSIONAL_DETAILS_REQUEST:
        case actions.ADD_PROFESSIONAL_PHONE_REQUEST:
        case actions.VERIFY_PROFESSIONAL_PHONE_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case actions.ADD_PROFESSIONAL_DETAILS_SUCCESS:
            return{
                ...state,
                isLoading: false,
                code: prop('code', payload),
                response: prop('response', payload)
            }
        case actions.ADD_PROFESSIONAL_PHONE_SUCCESS:
            return{
                ...state,
                isLoading: false
            }
        case actions.VERIFY_PROFESSIONAL_PHONE_SUCCESS:
            return{
                ...state,
                isLoading: false,
                phoneVerified: true
            }
        case actions.ADD_PROFESSIONAL_PHONE_FAILURE:
        case actions.ADD_PROFESSIONAL_DETAILS_FAILURE:
        case actions.VERIFY_PROFESSIONAL_PHONE_FAILURE:
            return{
                ...state,
                isLoading: true
            }
        
        default:
            return{
                ...state
            }
    }
}

export default professional