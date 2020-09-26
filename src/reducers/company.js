import * as actions from '../actions'
import { pathOr, append, isNil } from 'ramda'
import { isEmptyOrNull } from '../utils/helpers'

const initState = {
    isLoading: false,
    secret: '',
    companyDetails: {},
    offers:[],
    professionals: [],
    paypalToken: ''
}

const company = (state=initState, action) => {
    const { type, payload } = action
    switch(type){
        case actions.CLIENT_TOKEN_REQUEST:
        case actions.UPDATE_COMPANY_REQUEST:
        case actions.FETCH_PAYPAL_TOKEN_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case actions.FIND_PROFESSIONALS_REQUEST:
            return{
                ...state,
                isLoading: true,
                professionals: []
            }
        case actions.CLIENT_TOKEN_SUCCESS:
            return{
                ...state,
                isLoading: false,
                secret: payload
            }
        case actions.FETCH_PAYPAL_TOKEN_SUCCESS:
            return{
                ...state,
                isLoading: false,
                paypalToken: payload
            }
        case actions.CLINET_TOKEN_FAILURE:
            return{
                ...state,
                isLoading: false
            }
        case actions.ADD_COMPANY_DETAILS_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case actions.ADD_COMPANY_DETAILS_SUCCESS:
            payload.email = state.companyDetails.email
            payload.isVerified = state.companyDetails.isVerified
            payload.balance = state.companyDetails.balance
            payload.vat = state.companyDetails.vat
            return{
                ...state,
                isLoading: false,
                companyDetails: payload
            }
        case actions.UPDATE_COMPANY_SUCCESS:
            const updatedDetails = payload
            updatedDetails.contactForm = pathOr({}, ['companyDetails', 'contactForm'], state)
            updatedDetails.changePassword = pathOr({}, ['companyDetails', 'changePassword'], state)
            updatedDetails.email = pathOr('', ['companyDetails', 'email'], state)
            updatedDetails.isVerified = pathOr('', ['companyDetails', 'isVerified'], state)
            return {
                ...state,
                isLoading: false,
                companyDetails: updatedDetails
            }
        case actions.FIND_PROFESSIONALS_SUCCESS:
            return {
                ...state,
                isLoading: false
            }
        case actions.FETCH_COMPANY_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actions.MAKE_PAYMENT_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case actions.MAKE_PAYMENT_SUCCESS:
            const companyDetails = state.companyDetails
            companyDetails.isPaid = payload.status
            companyDetails.payDate = payload.payDate
            return{
                ...state,
                isLoading: false,
                companyDetails
            }
        case actions.MAKE_PAYMENT_FAILURE:
            return{
                ...state,
                isLoading: false
            }
        case actions.ENLIST_PROFESSIONAL:
            const professionalsData = state.professionals
            const specificIndex = isNil(state.professionals[payload.index]) ? [] : state.professionals[payload.index]
            const updatedIndex = isEmptyOrNull(payload.professional) ? specificIndex : append(payload.professional, specificIndex)
            professionalsData[payload.index] = updatedIndex
            return {
                ...state,
                isLoading: true,
                professionals: professionalsData
            }
        case actions.NO_PROFESSIONALS_FOUND:
            return{
                ...state,
                isLoading: false,
                professionals: []
            }
        case actions.FETCH_COMPANY_DETAILS_SUCCESS:
            const { company: { offers } } = payload
            return {
                ...state,
                isLoading: false,
                companyDetails: payload.company,
                offers
            }
        case actions.FIND_PROFESSIONALS_FAILURE:
        case actions.UPDATE_SHIFT_FAILURE:
        case actions.FETCH_COMPANY_DETAILS_FAILURE:
        case actions.FETCH_PAYPAL_TOKEN_FAILURE:
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

export default company