import { defaultTo, isNil, type } from 'ramda'
import Cookies from 'js-cookie'
import { initialize, change } from 'redux-form'
import { SERVER_URL as url } from '../constants'
import * as types from './'
import { getAdresses } from './addresses'
import { getProfessionalData } from '../utils/parsers'
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
        formValues.document = type(formValues.document) === 'File' ? formValues.document.name : formValues.document
        formValues.crbDocument = type(formValues.crbDocument) === 'File' ? formValues.crbDocument.name : formValues.crbDocument
        const professional = getProfessionalData(formValues)
        dispatch(initialize('professional', professional))
        dispatch({
            type: types.ADD_PROFESSIONAL_DETAILS_SUCCESS,
            payload: professional
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
                payload: values
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
        if(code === 'success'){
            dispatch({
                type: types.VERIFY_PROFESSIONAL_PHONE_SUCCESS,
                payload: true
            })
        }
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
        console.log('Data', data)
        const { code, response: { title, message } } = data
        showToast(title, message, code)
        if(code === 'success' || code === 'info'){
            const professional = getProfessionalData(data.professional)
            const { postCode } = professional
            dispatch(getAdresses(postCode))
            dispatch(initialize('professional', professional))
            dispatch({
                type: types.FETCH_PROFESSIONAL_DETAILS_SUCCESS,
                payload: professional
            })
        }else if(code === 'error'){
            dispatch({
                type: types.ACCOUNT_LOGOUT_REQUEST
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

export const updateProfessionalProfile = (userId, values) => dispatch => {
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
        if(code === 'success' && !isEmptyOrNull(response)){
            const profilePicture = type(values.profilePicture) === 'File' ? values.profilePicture.name : values.profilePicture
            const document = type(values.document) === 'File' ? values.document.name : values.document
            const crbDocument = type(values.crbDocument) === 'File' ? values.crbDocument.name : values.crbDocument
            dispatch(change('professional', 'profilePicture', profilePicture))
            dispatch(change('professional', 'document', document))
            dispatch(change('professional', 'crbDocument', crbDocument))
            dispatch({
                type: types.PROFESSIONAL_PROFILE_UPDATE_SUCCESS,
                payload: values
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
    const changePassword = {
        twoFactorAuthentication: values.twoFactorAuthentication,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    }
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
            dispatch(change('professional', 'changePassword', changePassword))
            dispatch({
                type: types.PROFESSIONAL_SECURITY_UPDATE_SUCCESS,
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

export const changePhoneRequest = () => dispatch => {
    dispatch({ type: types.PHONE_NUMBER_CHANGE_REQUEST })
}