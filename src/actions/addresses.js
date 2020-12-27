import { getAddressesList, getAddressesUrl, getAddressesWithCustomRequest } from '../utils/helpers'
import * as types from './'

export const getAdresses = postCode => dispatch => {

    getAddressesWithCustomRequest({
        url: getAddressesUrl(postCode),
        init: types.FETCH_POST_CODES_ADDRESSES_REQUEST,
        success: types.FETCH_POST_CODES_ADDRESSES_SUCCESS,
        failure: types.FETCH_POST_CODES_ADDRESSES_FAILURE,
        dispatch,
        format: getAddressesList
    })
}

export const clearAddresses = () => dispatch => {
    dispatch({ type: types.POST_CODE_CHANGE_REQUEST })
}