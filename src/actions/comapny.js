import { SERVER_URL as url } from '../constants'
import { showToast } from '../utils/helpers'
import * as types from './'

export const getClientPaymentToken = userId => dispatch => {
    dispatch({type: types.CLIENT_TOKEN_REQUEST})
    const endpoint = `${url}company/clientToken/${userId}`
    fetch(endpoint)
    .then(res => res.json())
    .then(data => {
        const { code } = data
        if(code === 'success'){
            dispatch({
                type: types.CLIENT_TOKEN_SUCCESS,
                payload: data
            })
        }
    })
    .catch(error => {
        dispatch({
            type: types.CLINET_TOKEN_FAILURE,
            error
        })
    })
}

export const addDetails = (userId, formValues) => dispatch => {
    dispatch({ type: types.ADD_COMPANY_DETAILS_REQUEST })
    const endpoint = `${url}${userId}/company`
    fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        const { code, response: { title, message } } = response
        showToast(title, message, code)
        dispatch({
            type: types.ADD_COMPANY_DETAILS_SUCCESS,
            payload: formValues
        })
    })
    .catch(error => {
        dispatch({
            type: types.ADD_COMPANY_DETAILS_FAILURE,
            error
        })
    })
}