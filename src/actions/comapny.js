import { change, initialize } from 'redux-form'
import Cookies from 'js-cookie'
import { pathOr, join, defaultTo, forEach } from 'ramda'
import moment from 'moment'
import { SERVER_URL as url, DATE_FORMAT } from '../constants'
import { showToast, isEmptyOrNull } from '../utils/helpers'
import { getAdresses } from './addresses'
import * as types from './'
import { getCompanyData } from '../utils/parsers'

export const getClientPaymentToken = () => dispatch => {
    dispatch({type: types.CLIENT_TOKEN_REQUEST})
    const token = pathOr('', ['authToken'], Cookies.getJSON('authToken'))
    const endpoint = `${url}company/clientSecret`
    fetch(endpoint, {
        headers: {
            authorization: token
        }
    })
    .then(res => res.json())
    .then(data => {
        const { code, secret } = data
        if(code === 'success'){
            dispatch({
                type: types.CLIENT_TOKEN_SUCCESS,
                payload: secret
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
        const company = getCompanyData(formValues)
        dispatch(initialize('company', company))
        dispatch({
            type: types.ADD_COMPANY_DETAILS_SUCCESS,
            payload: company
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
        console.log('Company', data)
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
            const searchForm = {
                skill: '',
                shift: '',
                searchDate: ''
            }
            const changePassword = {
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }
            company.contactForm = contact
            company.changePassword = changePassword
            company.searchForm = searchForm
            dispatch(initialize('company', company))
        }
        if(data.code !== 'error'){
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

const filterProfessionalsByShift = (professional, timesheet, values) => dispatch => {
    const { id } = timesheet
    const { shift, date } = values
    const token = pathOr('', ['authToken'], Cookies.getJSON('authToken'))
    const endpoint = new URL(`${url}timesheet/${id}/search`)
    endpoint.search = new URLSearchParams({
        shift,
        date
    })
    fetch(endpoint,
        {
        headers: {
            authorization: token
        }
    })
    .then(res => res.json())
    .then(response => {
        const { code } = response
        if(code === 'success'){
            const { timesheet } = response
            if(!isEmptyOrNull(timesheet)){
                const { shift, time } = timesheet
                professional.shift = shift
                professional.time = time
                dispatch({
                    type: types.ENLIST_PROFESSIONAL,
                    payload: professional
                })
            }
        }
    })
}

const filterProfessionalsByTimesheets = (values, professional) => dispatch => {
    const { userId } = professional
    const endpoint = `${url}timesheets/${userId}`
    const token = pathOr('', ['authToken'], Cookies.getJSON('authToken'))
    fetch(endpoint, {
        headers: {
            authorization: token
        }
    })
    .then(res => res.json())
    .then(response => {
        const { model: { timesheets, phone, email } } = response
        professional.phone = phone
        professional.email = email
        if(!isEmptyOrNull(timesheets)){
            forEach(timesheet => {
                dispatch(filterProfessionalsByShift(professional, timesheet, values))
            }, timesheets)
        }
    })
}

const filterProfessionalsByPostalCode = (values, professional) => dispatch => {
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
    dispatch(filterProfessionalsByTimesheets(values, professional))
}

export const searchProfessionals = (userId, values) => dispatch => {
    const { skill } = values
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
                dispatch(filterProfessionalsByPostalCode(values, professional))
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

export const makePayment = (userId, response) => dispatch => {

    if(isEmptyOrNull(response)){
        dispatch({ type: types.MAKE_PAYMENT_REQUEST })
    }else{
        if(response.error){
            const { message } = response.error
            showToast('Card Declined', message, 'error')
            dispatch({ type: types.MAKE_PAYMENT_FAILURE })
        }else{
            const { paymentIntent } = response
            const { status, amount } = paymentIntent
            if(status === 'succeeded'){
                const endpoint = `${url}company/${userId}/payment`
                const token = pathOr('', ['authToken'], Cookies.getJSON('authToken'))
                const values = {}
                values.balance = amount
                values.payDate = moment().format(DATE_FORMAT).toString()
                values.status = true
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
                    const { code } = response
                    if(code === 'success'){
                        dispatch({
                            type: types.MAKE_PAYMENT_SUCCESS
                        })
                    }
                })
                .catch(err => {

                })
            }
        }
    }
}