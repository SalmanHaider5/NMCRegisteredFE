import * as actions from '../actions'
import { equals } from 'ramda'

const initState = {
    isLoading: false,
    code: '',
    phoneVerified: false,
    professionalDetails: {}
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
                professionalDetails: payload
            }
        case actions.ADD_PROFESSIONAL_PHONE_SUCCESS:
            return{
                ...state,
                isLoading: false,
                code: payload
            }
        case actions.VERIFY_PROFESSIONAL_PHONE_SUCCESS:
            return{
                ...state,
                isLoading: false,
                code: payload,
                phoneVerified: equals(payload, 'success') ? true : false,

            }
        case actions.FETCH_PROFESSIONAL_DETAILS_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case actions.FETCH_PROFESSIONAL_DETAILS_SUCCESS:
            return{
                ...state,
                professionalDetails: payload,
                isLoading: false
            }
        case actions.ADD_PROFESSIONAL_PHONE_FAILURE:
        case actions.ADD_PROFESSIONAL_DETAILS_FAILURE:
        case actions.VERIFY_PROFESSIONAL_PHONE_FAILURE:
        case actions.FETCH_PROFESSIONAL_DETAILS_FAILURE:
            return{
                ...state,
                isLoading: false
            }
        
        default:
            return{
                ...state
            }
    }
}

export default professional