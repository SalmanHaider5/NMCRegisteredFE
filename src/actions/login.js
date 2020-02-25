import { SERVER_URL as url } from '../constants'
import { showToast } from '../utils/helpers'
import * as types from './'

export const userLogin = formValues => dispatch => {
    dispatch({ type:  types.LOGIN_REQUEST })
    const endpoint = `${url}login`

    fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        console.log('resposnse', response)
        const { code, response: { title, message } } = response
        showToast(title, message, code)
        dispatch({
            type: types.LOGIN_SUCCESS,
            payload: response
        })
    })
    .catch(error => {
        dispatch({
            type: types.LOGIN_FAILURE,
            error
        })
    })
}