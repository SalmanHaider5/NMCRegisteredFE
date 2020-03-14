import * as actions from '../actions'
import { equals, type as dataType, defaultTo } from 'ramda'
import { isEmptyOrNull } from '../utils/helpers'

const initState = {
    isLoading: false,
    phoneVerified: false,
    codeSent: false,
    professionalDetails: {
        professional: {
            phone: ''
        }
    }
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
            payload.professional.phone = state.professionalDetails.professional.phone
            payload.professional.email = state.professionalDetails.professional.email
            payload.professional.profilePicture = isEmptyOrNull(payload.professional.profilePicture) ? '' : payload.professional.profilePicture.name
            return{
                ...state,
                isLoading: false,
                professionalDetails: payload
            }
        case actions.ADD_PROFESSIONAL_PHONE_SUCCESS:
            const professionalDetails = state.professionalDetails
            professionalDetails.professional.phone = payload.phone
            return{
                ...state,
                isLoading: false,
                codeSent: true,
                professionalDetails
            }
        case actions.VERIFY_PROFESSIONAL_PHONE_SUCCESS:
            return{
                ...state,
                isLoading: false,
                phoneVerified: payload
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
                codeSent: isEmptyOrNull(payload.professional.phone) || payload.professional.phoneStatus ? false : true,
                phoneVerified: payload.professional.phoneStatus,
                isLoading: false
            }
        case actions.PHONE_NUMBER_CHANGE_REQUEST:
            const details = state.professionalDetails
            details.professional.phone = ''
            return{
                ...state,
                codeSent: false,
                professionalDetails: details
            }
        case actions.PROFESSIONAL_PROFILE_UPDATE_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case actions.PROFESSIONAL_PROFILE_UPDATE_SUCCESS:
            const profilePicture = defaultTo('', payload.professional.profilePicture)
            console.log('Picture', profilePicture.name,  dataType(profilePicture), equals(dataType(profilePicture), 'File'))
            const updatedPicture = equals(dataType(profilePicture), 'File') ? profilePicture.name : state.professionalDetails.professional.profilePicture
            payload.professional.profilePicture = updatedPicture
            
            console.log(payload)
            return{
                ...state,
                isLoading: false,
                professionalDetails: payload
            }
        case actions.PROFESSIONAL_PROFILE_UPDATE_FAILURE:
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