import { defaultTo, isNil } from 'ramda'
import Cookies from 'js-cookie'
import moment from 'moment'
import { initialize } from 'redux-form'
import { SERVER_URL as url } from '../constants'
import * as types from './'
import { showToast, getFormData, isEmptyOrNull } from '../utils/helpers'

export const createDetails = (userId, formValues) => dispatch => {
    if(isNil(Cookies.getJSON('authToken'))) return undefined
    const token = defaultTo('', Cookies.getJSON('authToken').authToken)
    dispatch({ type: types.ADD_PROFESSIONAL_DETAILS_REQUEST })
    
    const endpoint = `${url}${userId}/professional`
    fetch(endpoint, {
        method: 'POST',
        body: getFormData(formValues),
        headers: {
            authorization: token
        }
    })
    .then(res => res.json())
    .then(response => {
        const { code, response: { title, message } } = response
        showToast(title, message, code)
        response.professional = formValues
        const { dateOfBirth } = formValues
        response.professional.changePassword = {
            twoFactorAuthentication: response.professional.twoFactorAuthentication,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
        response.professional.dateOfBirth = isEmptyOrNull(dateOfBirth) ? '' : moment(dateOfBirth).format('L')
        dispatch(initialize('professional', response.professional))
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
        if(code === 'success'){
            dispatch({
                type: types.ADD_PROFESSIONAL_PHONE_SUCCESS,
                payload: code
            })
        }
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
        const { code, response: { title, message }, professional } = data
        const { dateOfBirth } = professional
        professional.changePassword = {
            twoFactorAuthentication: professional.twoFactorAuthentication,
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
        professional.dateOfBirth = isEmptyOrNull(dateOfBirth) ? '' : moment(dateOfBirth).format('L')
        dispatch(initialize('professional', professional))
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
        body: getFormData(values),
        headers: {
            authorization: token
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

export const changeShiftStatus = (id, status, timesheet) => dispatch => {
    dispatch({ type: types.SHIFT_STATUS_UPDATE_REQUEST })
    const token = defaultTo('', Cookies.getJSON('authToken').authToken)
    const endpoint = `${url}shiftStatusChange/${id}/${status}`
    fetch(endpoint, {
        method: 'PUT',
        headers: {
            authorization: token,
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        const { code, response: { title, message } } = response
        showToast(title, message, code)
        if(code === 'success'){
            dispatch({
                type: types.SHIFT_STATUS_UPDATE_SUCCESS,
                payload: { id, timesheetId: timesheet }
            })
        }else{
            dispatch({
                type: types.SHIFT_STATUS_UPDATE_FAILURE,
                error: response.error
            })
        }
    })
    .catch(err => {
        dispatch({
            type: types.SHIFT_STATUS_UPDATE_FAILURE,
            error: err
        })
    })
}

export const changeTimesheetShift = (values, timesheetId) => dispatch => {
    dispatch({ type: types.UPDATE_SHIFT_REQUEST })
    const { id } = values
    const token = defaultTo('', Cookies.getJSON('authToken').authToken)
    const endpoint = `${url}shift/${id}`
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
        const { code, response: { title, message } } = response
        showToast(title, message, code)
        if(code === 'success'){
            dispatch({
                type: types.UPDATE_SHIFT_SUCCESS,
                payload: {
                    shift: values,
                    id: timesheetId
                }
            })
        }else{
            dispatch({
                type: types.UPDATE_SHIFT_FAILURE,
                error: response.error
            })
        }
    })
    .catch(err => {
        dispatch({
            type: types.UPDATE_SHIFT_FAILURE,
            error: err
        })
    })
}