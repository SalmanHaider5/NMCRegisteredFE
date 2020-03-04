import { defaultTo, isNil } from 'ramda'
import Cookies from 'js-cookie'
import { SERVER_URL as url } from '../constants'
import * as types from './'
import { showToast } from '../utils/helpers'

export const createDetails = (userId, formValues) => dispatch => {
    dispatch({ type: types.ADD_PROFESSIONAL_DETAILS_REQUEST })
    const endpoint = `${url}${userId}/professional`
    fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        response.professional = formValues
        dispatch({
            type: types.ADD_PROFESSIONAL_DETAILS_SUCCESS,
            payload: response
        })
    })
    .catch(error => {
        dispatch({
            type: types.ADD_PROFESSIONAL_DETAILS_FAILURE,
            error
        })
    })
}

export const addPhone = (userId, values) => dispatch => {
    dispatch({ type: types.ADD_PROFESSIONAL_PHONE_REQUEST })
    const endpoint = `${url}${userId}/addPhone`
    fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        const { code, response: { title, message } } = response
        showToast(title, message, code)
        dispatch({
            type: types.ADD_PROFESSIONAL_PHONE_SUCCESS,
            payload: code
        })
    })
    .catch(error => {
        dispatch({
            type: types.ADD_PROFESSIONAL_PHONE_FAILURE,
            error
        })
    })
}

export const verifyPhone = (userId, values) => dispatch => {
    dispatch({ type: types.VERIFY_PROFESSIONAL_PHONE_REQUEST })
    const endpoint = `${url}${userId}/verifyPhone`
    fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        const { code, response: { title, message } } = response
        showToast(title, message, code)
        dispatch({
            type: types.VERIFY_PROFESSIONAL_PHONE_SUCCESS,
            payload: code
        })
    })
    .catch(error => {
        dispatch({
            type: types.VERIFY_PROFESSIONAL_PHONE_FAILURE,
            error
        })
    })
}

export const getProfessionalDetails = userId => dispatch => {
    if(isNil(Cookies.getJSON('authToken'))) return undefined
    const token = defaultTo('', Cookies.getJSON('authToken').authToken)
    dispatch({ type: types.FETCH_PROFESSIONAL_DETAILS_REQUEST })
    const endpoint = `${url}${userId}/professional`
    fetch(endpoint, {
        headers: {
            authorization: token
        }
    })
    .then(res => res.json())
    .then(data => {
        const { code, response: { title, message } } = data
        showToast(title, message, code)
        if(code === 'success' || code === 'info'){
            dispatch({
                type: types.FETCH_PROFESSIONAL_DETAILS_SUCCESS,
                payload: data
            })
        }else{
            dispatch({
                type: types.FETCH_PROFESSIONAL_DETAILS_FAILURE
            })
        }
    })
    .catch(error => {
        dispatch({
            type: types.FETCH_PROFESSIONAL_DETAILS_FAILURE,
            error
        })
    })
}

export const updateProfile = (userId, values) => dispatch => {
    dispatch({ type: types.PROFESSIONAL_PROFILE_UPDATE_REQUEST })
    const token = defaultTo('', Cookies.getJSON('authToken').authToken)
    const endpoint = `${url}${userId}/professional`
    fetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
            authorization: token,
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        const { code, response: { title, message }, error = '' } = response
        showToast(title, message, code)
        if(code === 'success'){
            response.professional = values
            dispatch({
                type: types.PROFESSIONAL_PROFILE_UPDATE_SUCCESS,
                payload: response
            })
        }else{
            dispatch({
                type: types.PROFESSIONAL_PROFILE_UPDATE_FAILURE,
                error
            })
        }
    })
    .catch(err => {
        dispatch({
            type: types.PROFESSIONAL_PROFILE_UPDATE_FAILURE,
            error: err
        })
    })
}

export const updateSecurityDetails = (userId, values) => dispatch => {
    dispatch({ type: types.PROFESSIONAL_SECURITY_UPDATE_REQUEST })
    const token = defaultTo('', Cookies.getJSON('authToken').authToken)
    const endpoint = `${url}${userId}/professional/security`
    fetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
            authorization: token,
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        const { code, response: { title, message }, error = '' } = response
        showToast(title, message, code)
        if(code === 'success'){
            response.professional = values
            dispatch({
                type: types.PROFESSIONAL_SECURITY_UPDATE_FAILURE,
                payload: response
            })
        }else{
            dispatch({
                type: types.PROFESSIONAL_SECURITY_UPDATE_FAILURE,
                error
            })
        }
    })
    .catch(err => {
        dispatch({
            type: types.PROFESSIONAL_SECURITY_UPDATE_FAILURE,
            error: err
        })
    })
}