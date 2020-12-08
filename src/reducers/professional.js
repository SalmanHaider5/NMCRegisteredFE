import * as actions from '../actions'
import { empty } from 'ramda'
import {
    formatBankDetails,
    formatPhoneData,
    getCodeSentStatus,
    getProfileWithModifiedOffer
} from './helpers'

const initState = {
    isLoading: false,
    phoneVerified: false,
    codeSent: false,
    profile: {},
    error: {}
}

const professional = (state=initState, action) => {
    const { type, payload, error } = action
    switch(type){
        case actions.FETCH_PROFESSIONAL_DETAILS_REQUEST:
        case actions.ADD_PROFESSIONAL_PHONE_REQUEST:
        case actions.VERIFY_PROFESSIONAL_PHONE_REQUEST:
        case actions.ADD_PROFESSIONAL_DETAILS_REQUEST:
        case actions.ADD_BANK_DETAILS_REQUEST:
        case actions.PROFESSIONAL_PROFILE_UPDATE_REQUEST:
        case actions.PROFESSIONAL_SECURITY_UPDATE_REQUEST:
        case actions.UPDATE_BANK_DETAILS_REQUEST:
        case actions.OFFER_UPDATE_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actions.FETCH_PROFESSIONAL_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                profile: payload,
                phoneVerified: payload.phoneStatus,
                error: empty(error),
                codeSent: getCodeSentStatus(payload)
            }
        case actions.ADD_PROFESSIONAL_PHONE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                codeSent: true,
                error: empty(error),
                profile: formatPhoneData(state, payload)
            }
        case actions.VERIFY_PROFESSIONAL_PHONE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: empty(error),
                phoneVerified: true
            }
        case actions.ADD_PROFESSIONAL_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: empty(error),
                profile: payload
            }
        case actions.ADD_BANK_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: empty(error),
                profile: formatBankDetails(state, payload)
            }
        case actions.PROFESSIONAL_PROFILE_UPDATE_SUCCESS:
            return{
                ...state,
                isLoading: false,
                error: empty(error),
                profile: payload
            }
        case actions.PROFESSIONAL_SECURITY_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: empty(error)
            }
        case actions.UPDATE_BANK_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: empty(error),
                profile: formatBankDetails(state, payload)
            }
        case actions.OFFER_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: empty(error),
                profile: getProfileWithModifiedOffer(payload, state)
            }
        case actions.ADD_PROFESSIONAL_DETAILS_FAILURE:    
        case actions.ADD_PROFESSIONAL_PHONE_FAILURE:
        case actions.FETCH_PROFESSIONAL_DETAILS_FAILURE:
        case actions.VERIFY_PROFESSIONAL_PHONE_FAILURE:
        case actions.ADD_BANK_DETAILS_FAILURE:
        case actions.PROFESSIONAL_PROFILE_UPDATE_FAILURE:
        case actions.PROFESSIONAL_SECURITY_UPDATE_FAILURE:
        case actions.UPDATE_BANK_DETAILS_FAILURE:
        case actions.OFFER_UPDATE_FAILURE:
            return {
                ...state,
                isLoading: false,
                error
            }    
        default:
            return{
                ...state
            }
    }
}

export default professional