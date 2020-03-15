import * as actions from '../actions'
import { pathOr, isEmpty } from 'ramda'
import { mapIndexed, showToast } from '../utils/helpers'

const initState = {
    isLoading: false,
    addresses: []
}

const addresses = (state=initState, action) => {
    const { type, payload } = action
    switch(type){
        case actions.FETCH_POST_CODES_ADDRESSES_REQUEST:
            return{
                ...state,
                isLoading: true
            }
        case actions.FETCH_POST_CODES_ADDRESSES_SUCCESS:
            const addresses = pathOr([], ['addresses'], payload)
            if(isEmpty(addresses))
                showToast('Invalid Post Code', `Server Error: ${payload.Message}`, 'error')
            const formattedAddresses = mapIndexed((address, index)=>{ return { id: index, name: address } }, addresses)
            return{
                ...state,
                isLoading: false,
                addresses: formattedAddresses
            }
        case actions.FETCH_POST_CODES_ADDRESSES_FAILURE:
            const { error } = payload
            return{
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

export default addresses