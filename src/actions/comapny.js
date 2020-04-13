import { change, initialize } from 'redux-form'
import Cookies from 'js-cookie'
import { pathOr, join, defaultTo, forEach } from 'ramda'
import { SERVER_URL as url, GET_ADDRESS_URL as apiUrl, GET_ADDRESS_API_KEY as apiKey } from '../constants'
import { showToast, isEmptyOrNull } from '../utils/helpers'
import { getAdresses } from './addresses'
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
        response.company = formValues
        dispatch({
            type: types.ADD_COMPANY_DETAILS_SUCCESS,
            payload: response
        })
    })
    .catch(error => {
        dispatch({
            type: types.ADD_COMPANY_DETAILS_FAILURE,
            error
        })
    })
}

export const getCompanyDetails = userId => dispatch => {
    dispatch({ type: types.FETCH_COMPANY_DETAILS_REQUEST })
    const token = pathOr('', ['authToken'], Cookies.getJSON('authToken'))
    const endpoint = `${url}${userId}/company`
    fetch(endpoint, {
        headers: {
            authorization: token
        }
    })
    .then(res => res.json())
    .then(data => {
        if(data.code === 'success'){
            const { company } = data
            const { firstName, lastName, email, phone, postalCode } = company
            // dispatch(getAdresses(postalCode))
            const contact = {
                name: join(' ', [firstName, lastName]),
                email,
                phone: phone,
                subject: '',
                message: ''
            }
            const changePassword = {
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }
            company.contactForm = contact
            company.changePassword = changePassword
            dispatch(initialize('company', company))
            dispatch({
                type: types.FETCH_COMPANY_DETAILS_SUCCESS,
                payload: data
            })
        }else{
            const { code, response: { title, message } } = data
            showToast(title, message, code)
            if(title === 'Authorization Failed'){
                dispatch({ type: types.ACCOUNT_LOGOUT_REQUEST })
            }
        }
    })
}

export const updatePassword = (userId, values) => dispatch => {
    dispatch({ type: types.COMPANY_PASSWORD_CHANGE_REQUEST })
    const endpoint = `${url}${userId}/company/changePassword`
    const token = defaultTo('', Cookies.getJSON('authToken').authToken)
    const changePassword = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    }
    fetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
            authorization: token,
            'Content-Type':'application/json'
        }
    })
    .then(res=> res.json())
    .then(response => {
        const { code, response: { title, message }, error = '' } = response
        showToast(title, message, code)
        if(code === 'success'){
            dispatch(change('company', 'changePassword', changePassword))
            dispatch({
                type: types.COMPANY_PASSWORD_CHANGE_SUCCESS
            })
        }else{
            dispatch({
                type: types.COMPANY_PASSWORD_CHANGE_FAILURE,
                error
            })
        }
    })
    .catch(err => {
        dispatch({
            type: types.COMPANY_PASSWORD_CHANGE_FAILURE,
            error: err
        })
    })
} 

export const contactUs = values => dispatch => {
    const endpoint = `${url}user/sendMessage`
    const token = defaultTo('', Cookies.getJSON('authToken').authToken)
    fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            authorization: token,
            'Content-Type':'application/json'
        }
    })
    .then(res=> res.json())
    .then(response => {
        const { code, response: { title, message } } = response
        values.message = ''
        values.subject = ''
        dispatch(change('company', 'contactForm', values))
        dispatch(change('professional', 'contactForm', values))
        showToast(title, message, code)
    })
}

export const updateProfile = (userId, values) => dispatch => {
    dispatch({ type: types.UPDATE_COMPANY_REQUEST })
    const endpoint = `${url}${userId}/company`
    const token = defaultTo('', Cookies.getJSON('authToken').authToken)
    fetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
            authorization: token,
            'Content-Type':'application/json'
        }
    })
    .then(res=> res.json())
    .then(response=> {
        const { code, response: { title, message } } = response
        showToast(title, message, code)
        if(code === 'success'){
            dispatch({
                type: types.UPDATE_COMPANY_SUCCESS,
                payload: values
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

const filterProfessionalsByPostalCode = (postCode, professional) => dispatch => {
    // const professionalCode = pathOr('', ['postCode'], professional)
    // if(isEmptyOrNull(professionalCode)){
    //     const endpoint = `${apiUrl}distance/${postCode}/${professionalCode}?api-key=${apiKey}`
    //     fetch(endpoint)
    //     .then(res => res.json())
    //     .then(response => {
    //         const { metres } = response
    //         const miles = parseFloat(metres) / 1609
    //         if(parseInt(miles) < 26){
    //             console.log(professional)
    //         } 
    //     })
    // }
    dispatch({
        type: types.ENLIST_PROFESSIONAL,
        payload: professional
    })

}

export const searchProfessionals = (userId, postalCode, skill) => dispatch => {
    dispatch({ type: types.FIND_PROFESSIONALS_REQUEST })
    const token = pathOr('', ['authToken'], Cookies.getJSON('authToken'))
    const endpoint = `${url}${userId}/search/${skill}`
    fetch(endpoint, {
        headers: {
            authorization: token
        }
    })
    .then(res => res.json())
    .then(response => {
        if(response.code === 'success'){
            const { professionals } = response
            forEach(professional=> {
                dispatch(filterProfessionalsByPostalCode(postalCode, professional))
            }, professionals)
            dispatch({
                type: types.FIND_PROFESSIONALS_SUCCESS
            })
        }else{
            const { code, response: { title, message } } = response
            showToast(title, message, code)
        }
    })
}