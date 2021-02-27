import * as actions from '../actions'
import { empty } from 'ramda'

const initState = {
    isLoading: false,
    addresses: [],
    error: {}
}

const addresses = (state=initState, action) => {
    const { type, payload, error } = action
    switch(type){
        case actions.FETCH_POST_CODES_ADDRESSES_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case actions.POST_CODE_CHANGE_REQUEST:
            return{
                ...state,
                addresses: []
            }
        case actions.FETCH_POST_CODES_ADDRESSES_SUCCESS:
            return{
                ...state,
                isLoading: false,
                error: empty(error),
                addresses: payload
            }
        case actions.FETCH_POST_CODES_ADDRESSES_FAILURE:
            return{
                ...state,
                isLoading: false,
                error
            }
        case actions.ACCOUNT_LOGOUT_REQUEST:
            return{
                    isLoading: false,
                    addresses: []
                }
        default:
            return{
                ...state
            }
    }
}

export default addresses