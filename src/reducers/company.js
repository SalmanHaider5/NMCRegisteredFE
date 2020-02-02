import * as actions from '../actions'

const initState = {
    isLoading: false,
    clientToken: '',
    companyDetails: {}
}

const company = (state=initState, action) => {
    const { type, payload } = action
    switch(type){
        case actions.CLIENT_TOKEN_REQUEST:
            return{
                ...state,
                isLoading: true
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
        case actions.FETCH_COMPANY_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actions.FETCH_COMPANY_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                companyDetails: payload
            }
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