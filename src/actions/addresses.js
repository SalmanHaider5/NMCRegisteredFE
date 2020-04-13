import { GET_ADDRESS_URL as url, GET_ADDRESS_API_KEY as key  } from '../constants'
import * as types from './'


export const getAdresses = postCode => dispatch => {
    dispatch({ type: types.FETCH_POST_CODES_ADDRESSES_REQUEST })
    const endpoint = `${url}find/${postCode}?api-key=${key}`
    fetch(endpoint)
    .then(res => res.json())
    .then(data => {
        dispatch({
            type: types.FETCH_POST_CODES_ADDRESSES_SUCCESS,
            payload: data
        })
    })
    .catch(error => {
        dispatch({
            type: types.FETCH_PROFESSIONAL_DETAILS_FAILURE,
            error
        })
    })
}


export const clearAddresses = () => dispatch => {
    dispatch({ type: types.POST_CODE_CHANGE_REQUEST })
}