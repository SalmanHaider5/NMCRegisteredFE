import * as actions from '../actions'
import { empty } from 'ramda'
import {
    formatBankDetails,
    formatPhoneData,
    getCodeSentStatus,
    getPhoneVerifiedProfile,
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
        case actions.UPDATE_PROFESSIONAL_EMAIL_REQUEST:
        case actions.UPDATE_PHONE_REQUEST:
        case actions.PROFESSIONAL_MESSAGE_REQUEST:
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
                phoneVerified: true,
                profile: getPhoneVerifiedProfile(state, payload)
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
        case actions.UPDATE_PROFESSIONAL_EMAIL_SUCCESS:
            const profile = state.profile
            profile.email = payload.email
            return {
                ...state,
                isLoading: false,
                error: empty(error),
                profile
            }
        
        case actions.UPDATE_PHONE_SUCCESS:
            const phoneProfile = state.profile
            phoneProfile.phone = payload.phone
            return {
                ...state,
                isLoading: false,
                error: empty(error),
                profile: phoneProfile
            }    
        
        case actions.PROFESSIONAL_SECURITY_UPDATE_SUCCESS:
        case actions.PROFESSIONAL_MESSAGE_SUCCESS:
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
        case actions.PHONE_NUMBER_CHANGE_REQUEST:
            return {
                ...state,
                codeSent: false
            }
        case actions.ACCOUNT_LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: false
            }
        case actions.ADD_PROFESSIONAL_DETAILS_FAILURE:    
        case actions.ADD_PROFESSIONAL_PHONE_FAILURE:
        case actions.FETCH_PROFESSIONAL_DETAILS_FAILURE:
        case actions.ADD_BANK_DETAILS_FAILURE:
        case actions.PROFESSIONAL_MESSAGE_FAILURE:
        case actions.PROFESSIONAL_PROFILE_UPDATE_FAILURE:
        case actions.VERIFY_PROFESSIONAL_PHONE_FAILURE:
        case actions.PROFESSIONAL_SECURITY_UPDATE_FAILURE:
        case actions.UPDATE_BANK_DETAILS_FAILURE:
        case actions.UPDATE_PHONE_FAILURE:
        case actions.UPDATE_PROFESSIONAL_EMAIL_FAILURE:
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