import * as actions from '../actions'
import { pathOr, append } from 'ramda'

const initState = {
    isLoading: false,
    clientToken: '',
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
            const { token } = payload
            return{
                ...state,
                isLoading: false,
                clientToken: token
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
        case actions.ENLIST_PROFESSIONAL:
            payload.key = payload.id
            return {
                ...state,
                isLoading: true,
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