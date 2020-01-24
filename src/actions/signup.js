import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAULRE } from './'
import { SERVER_URL as url } from '../constants'
import { showToast } from '../utils/helpers'

export const register = formValues => dispatch => {
    dispatch({ type:  SIGNUP_REQUEST })
    const endpoint = `${url}signup`
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
            type: SIGNUP_SUCCESS,
            payload: response
        })
    })
    .catch(error => {
        dispatch({
            type: SIGNUP_FAULRE,
            error
        })
    })
}