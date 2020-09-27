import * as actions from '../actions'
import { equals, type as dataType, defaultTo, lensProp, set, findIndex, update, propEq } from 'ramda'
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
        case actions.ADD_BANK_DETAILS_REQUEST:
        case actions.UPDATE_BANK_DETAILS_REQUEST:
        case actions.OFFER_UPDATE_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case actions.ADD_PROFESSIONAL_DETAILS_SUCCESS:
            payload.phone = state.professionalDetails.phone
            payload.email = state.professionalDetails.email
            payload.profilePicture = isEmptyOrNull(payload.profilePicture) ? '' : payload.profilePicture.name
            return{
                ...state,
                isLoading: false,
                professionalDetails: payload
            }
        case actions.ADD_BANK_DETAILS_SUCCESS:
            return{
                ...state,
                isLoading: false,
                professionalDetails: set(lensProp('bankDetails'), payload, state.professionalDetails)
            }
        case actions.UPDATE_BANK_DETAILS_SUCCESS:
            return{
                ...state,
                isLoading: false,
                professionalDetails: set(lensProp('bankDetails'), payload, state.professionalDetails)
            }
        case actions.ADD_PROFESSIONAL_PHONE_SUCCESS:
            const professionalDetails = state.professionalDetails
            professionalDetails.phone = payload.phone
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
                codeSent: isEmptyOrNull(payload.phone) || payload.phoneStatus ? false : true,
                phoneVerified: payload.phoneStatus,
                isLoading: false
            }
        case actions.PHONE_NUMBER_CHANGE_REQUEST:
            const details = state.professionalDetails
            details.phone = ''
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
        case actions.OFFER_UPDATE_SUCCESS:
            const { offers } = state.professionalDetails
            const { id } = payload
            const index = findIndex(propEq('id', id))(offers)
            const updatedOffers = update(index, payload, offers)
            const updatedDetails = state.professionalDetails
            updatedDetails.offers = updatedOffers
            return {
                ...state,
                isLoading: false,
                professionalDetails: updatedDetails
            }

        case actions.PROFESSIONAL_PROFILE_UPDATE_SUCCESS:
            const profilePicture = defaultTo('', payload.profilePicture)
            const document = defaultTo('', payload.document)
            const crbDocument = defaultTo('', payload.crbDocument)
            const updatedPicture = equals(dataType(profilePicture), 'File')  ? profilePicture.name : profilePicture
            const updatedDocument = equals(dataType(document), 'File') ? document.name : document
            const updatedCRBDocument = equals(dataType(crbDocument), 'File') ? crbDocument.name : crbDocument
            payload.profilePicture = updatedPicture
            payload.document = updatedDocument
            payload.crbDocument = updatedCRBDocument
            return{
                ...state,
                isLoading: false,
                professionalDetails: payload
            }

        case actions.FETCH_PROFESSIONAL_DETAILS_FAILURE:
        case actions.PROFESSIONAL_PROFILE_UPDATE_FAILURE:
        case actions.ADD_PROFESSIONAL_PHONE_FAILURE:
        case actions.ADD_PROFESSIONAL_DETAILS_FAILURE:
        case actions.VERIFY_PROFESSIONAL_PHONE_FAILURE:
        case actions.ADD_BANK_DETAILS_FAILURE:
        case actions.UPDATE_BANK_DETAILS_FAILURE:
        case actions.OFFER_UPDATE_FAILURE:
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