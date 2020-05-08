import * as actions from '../actions'
import { pathOr, append } from 'ramda'

const initState = {
    isLoading: false,
    secret: '',
    companyDetails: {},
    professionals: []
}

const company = (state=initState, action) => {
    const { type, payload } = action
    switch(type){
        case actions.CLIENT_TOKEN_REQUEST:
        case actions.UPDATE_COMPANY_REQUEST:
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
            console.log('State', state)
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
            payload.key = payload.id
            return {
                ...state,
                isLoading: false,
                professionals: append(payload, state.professionals)
            }
        case actions.FETCH_COMPANY_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                companyDetails: payload.company
            }
        case actions.FIND_PROFESSIONALS_FAILURE:
        case actions.UPDATE_SHIFT_FAILURE:
        case actions.FETCH_COMPANY_DETAILS_FAILURE:
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