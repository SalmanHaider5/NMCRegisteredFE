import { SERVER_URL as url } from '../constants'
import { showToast } from '../utils/helpers'
import * as types from './'

export const getClientPaymentToken = userId => dispatch => {
    dispatch({type: types.CLIENT_TOKEN_REQUEST})
    const endpoint = `${url}company/clientToken/${userId}`
    fetch(endpoint)
    .then(res => res.json())
    .then(data => {
        console.log(data)
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