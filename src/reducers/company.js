import { append, defaultTo, empty } from 'ramda'
import * as actions from '../actions'
import {
    formatCompanyDetails,
    getAfterPaymentProfile,
    getCompanyModifiedProfile,
    getModifiedOffers,
    getModifiedList
} from './helpers'

const initState = {
    isLoading: false,
    stripeSecret: '',
    profile: {},
    offers:[],
    professionals: [],
    professionalList: [],
    paypalSecret: '',
    error: {}
}

const company = (state=initState, action) => {
    const { type, payload, error } = action
    const { professionals } = state
    switch(type){
        case actions.FETCH_COMPANY_DETAILS_REQUEST:
        case actions.ADD_COMPANY_DETAILS_REQUEST:
        case actions.CLIENT_TOKEN_REQUEST:
        case actions.MAKE_PAYMENT_REQUEST:
        case actions.PROCESS_START:
        case actions.OFFER_REQUEST_INIT:
        case actions.COMPANY_OFFER_UPDATE_REQUEST:
        case actions.COMPANY_PASSWORD_CHANGE_REQUEST:
        case actions.COMPANY_MESSAGE_REQUEST:
        case actions.UPDATE_COMPANY_REQUEST:
        case actions.UPDATE_EMAIL_REQUEST:
        case actions.ADD_LOCATION_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actions.ADD_PROFESSIONALS_LIST_BY_DISTANCE:
            return {
                ...state,
                professionalList: append(payload, state.professionalList)
            }
        case actions.FIND_PROFESSIONALS_REQUEST:
            return {
                ...state,
                isLoading: true,
                professionals: []
            }
        case actions.ADD_COMPANY_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: empty(error),
                profile: formatCompanyDetails(state, payload)
            }

        case actions.ADD_LOCATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: empty(error),
                profile: {...state.profile, location: true}
            }
        case actions.FETCH_COMPANY_DETAILS_SUCCESS:

            const { offers = [] } = defaultTo({}, payload)
                
            return {
                ...state,
                isLoading: false,
                error: empty(error),
                profile: payload,
                offers
            }
        case actions.CLIENT_TOKEN_SUCCESS:
            const { stripeSecret = '', paypalSecret = '' } = payload
            return {
                ...state,
                isLoading: false,
                error: empty(error),
                stripeSecret,
                paypalSecret
            }
        case actions.MAKE_PAYMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                erorr: empty(error),
                profile: getAfterPaymentProfile(state, payload)
            }
        case actions.COMPANY_MESSAGE_SUCCESS:
        case actions.FIND_PROFESSIONALS_SUCCESS:
        case actions.COMPANY_PASSWORD_CHANGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: empty(error)
            }
        case actions.NO_PROFESSIONALS_FOUND:
            return {
                ...state,
                isLoading: false,
                professionals: empty(professionals)
            }
        case actions.UPDATE_EMAIL_SUCCESS:
            const profile = state.profile
            profile.email = payload.email
            return{
                ...state,
                isLoading: false,
                error: empty(error),
                profile
            }
        case actions.ENLIST_PROFESSIONAL:
            return {
                ...state,
                professionals: getModifiedList(state, payload)
            }
        case actions.UPDATE_COMPANY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: empty(error),
                profile: getCompanyModifiedProfile(state, payload)
            }
        case actions.COMPANY_OFFER_UPDATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: empty(error),
                offers: getModifiedOffers(state, payload)
            }
        case actions.OFFER_REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: empty(error),
                offers: append(payload, state.offers)
            }
        case actions.ACCOUNT_LOGOUT_REQUEST:
        case actions.PROCESS_END:
            return {
                ...state,
                isLoading: false
            }
        case actions.CLINET_TOKEN_FAILURE:
        case actions.ADD_COMPANY_DETAILS_FAILURE:
        case actions.MAKE_PAYMENT_FAILURE:
        case actions.COMPANY_MESSAGE_FAILURE:
        case actions.UPDATE_COMPANY_FAILURE:
        case actions.OFFER_REQUEST_FAILURE:
        case actions.ADD_LOCATION_FAILURE:
        case actions.UPDATE_EMAIL_FAILURE:
        case actions.FIND_PROFESSIONALS_FAILURE:
        case actions.COMPANY_OFFER_UPDATE_FAILURE:
        case actions.COMPANY_PASSWORD_CHANGE_FAILURE:
        case actions.FETCH_COMPANY_DETAILS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error
            }
        // case actions.CLIENT_TOKEN_REQUEST:
        // case actions.UPDATE_COMPANY_REQUEST:
        // case actions.FETCH_PAYPAL_TOKEN_REQUEST:
        // case actions.OFFER_REQUEST_INIT:
        // case actions.COMPANY_OFFER_UPDATE_REQUEST:
        //     return{
        //         ...state,
        //         isLoading: true
        //     }
        // case actions.FIND_PROFESSIONALS_REQUEST:
        //     return{
        //         ...state,
        //         isLoading: true,
        //         professionals: []
        //     }
        // case actions.CLIENT_TOKEN_SUCCESS:
        //     return{
        //         ...state,
        //         isLoading: false,
        //         secret: payload
        //     }
        // case actions.FETCH_PAYPAL_TOKEN_SUCCESS:
        //     return{
        //         ...state,
        //         isLoading: false,
        //         paypalToken: payload
        //     }
        // case actions.OFFER_REQUEST_SUCCESS:
        //     const newOffers = append(payload, state.offers)
        //     return {
        //         ...state,
        //         isLoading: false,
        //         offers: newOffers
        //     }
        // case actions.COMPANY_OFFER_UPDATE_SUCCESS:
            // const { id } = payload
            // const index = findIndex(propEq('id', id))(state.offers)
            // const updatedOffers = update(index, payload, state.offers)
            // return{
            //     ...state,
            //     isLoading: false,
            //     offers: updatedOffers
            // }
        // case actions.CLINET_TOKEN_FAILURE:
        //     return{
        //         ...state,
        //         isLoading: false
        //     }
        // case actions.ADD_COMPANY_DETAILS_REQUEST:
        //     return{
        //         ...state,
        //         isLoading: true
        //     }
        // case actions.ADD_COMPANY_DETAILS_SUCCESS:
            // payload.email = state.companyDetails.email
            // payload.isVerified = state.companyDetails.isVerified
            // payload.balance = state.companyDetails.balance
            // payload.vat = state.companyDetails.vat
        //     return{
        //         ...state,
        //         isLoading: false,
        //         companyDetails: payload
        //     }
        // case actions.UPDATE_COMPANY_SUCCESS:
            // const updatedDetails = payload
            // updatedDetails.contactForm = pathOr({}, ['companyDetails', 'contactForm'], state)
            // updatedDetails.changePassword = pathOr({}, ['companyDetails', 'changePassword'], state)
            // updatedDetails.email = pathOr('', ['companyDetails', 'email'], state)
            // updatedDetails.isVerified = pathOr('', ['companyDetails', 'isVerified'], state)
            // return {
            //     ...state,
            //     isLoading: false,
            //     companyDetails: updatedDetails
            // }
        // case actions.FIND_PROFESSIONALS_SUCCESS:
        //     return {
        //         ...state,
        //         isLoading: false
        //     }
        // case actions.FETCH_COMPANY_DETAILS_REQUEST:
        //     return {
        //         ...state,
        //         isLoading: true
        //     }
        // case actions.MAKE_PAYMENT_REQUEST:
        //     return{
        //         ...state,
        //         isLoading: true
        //     }
        // case actions.MAKE_PAYMENT_SUCCESS:
        //     const companyDetails = state.companyDetails
        //     companyDetails.isPaid = payload.status
        //     companyDetails.payDate = payload.payDate
        //     return{
        //         ...state,
        //         isLoading: false,
        //         companyDetails
        //     }
        // case actions.MAKE_PAYMENT_FAILURE:
        //     return{
        //         ...state,
        //         isLoading: false
        //     }
        // case actions.ENLIST_PROFESSIONAL:
        //     const professionalsData = state.professionals
        //     const specificIndex = isNil(state.professionals[payload.index]) ? [] : state.professionals[payload.index]
        //     const updatedIndex = isEmptyOrNull(payload.professional) ? specificIndex : append(payload.professional, specificIndex)
        //     professionalsData[payload.index] = updatedIndex
        //     return {
        //         ...state,
        //         isLoading: true,
        //         professionals: professionalsData
        //     }
        // case actions.NO_PROFESSIONALS_FOUND:
        //     return{
        //         ...state,
        //         isLoading: false,
        //         professionals: []
        //     }
        // case actions.FETCH_COMPANY_DETAILS_SUCCESS:
        //     const { company: { offers = [] } } = payload
        //     return {
        //         ...state,
        //         isLoading: false,
        //         companyDetails: payload.company,
        //         offers
        //     }
        // case actions.FIND_PROFESSIONALS_FAILURE:
        // case actions.UPDATE_SHIFT_FAILURE:
        // case actions.FETCH_COMPANY_DETAILS_FAILURE:
        // case actions.FETCH_PAYPAL_TOKEN_FAILURE:
        // case actions.OFFER_REQUEST_FAILURE:
        // case actions.COMPANY_OFFER_UPDATE_FAILURE:
        // case actions.ADD_COMPANY_DETAILS_FAILURE:
        //     return{
        //         ...state,
        //         isLoading: false
        //     }
        // case actions.ACCOUNT_LOGOUT_REQUEST:
        //     return{
        //         isLoading: false,
        //         secret: '',
        //         companyDetails: {},
        //         offers:[],
        //         professionals: [],
        //         paypalToken: ''
        //     }
        default:
            return{
                ...state
            }
    }
}

export default company