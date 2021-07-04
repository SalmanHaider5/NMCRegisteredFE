import { forEach, length, clone, equals, isEmpty } from 'ramda'
import moment from 'moment'
import { ENDPOINTS as api } from '../constants'
import { GET_ADDRESS_URL as apiUrl, GET_ADDRESS_API_KEY as apiKey } from '../constants'
import {
    showToast,
    isEmptyOrNull,
    getWithAuth,
    getUrl,
    getAuthToken,
    postWithAuth,
    formatData,
    getAccountBasicValues,
    putWithAuth,
    getEmptyForm,
    setCompanyUpdatedPassword,
    isSuccess
} from '../utils/helpers'
import { getCompanyData } from '../utils/parsers'
import * as types from './'


export const startProcess = () => dispatch => {
    dispatch({ type: types.PROCESS_START })
}

export const endProcess = () => dispatch => {
    dispatch({ type: types.PROCESS_END })
}

export const getStripeSecret = userId => dispatch => {

    getWithAuth({
        url: getUrl(api.STRIPE_SECRET, { userId }),
        token: getAuthToken(),
        init: types.CLIENT_TOKEN_REQUEST,
        success: types.CLIENT_TOKEN_SUCCESS,
        failure: types.CLINET_TOKEN_FAILURE,
        dispatch
    })

}

export const addDetails = (userId, formValues) => dispatch => {

    postWithAuth({
        type: 'json',
        url: getUrl(api.COMPANY_DETAILS, { userId }),
        token: getAuthToken(),
        body: JSON.stringify(formValues),
        init: types.ADD_COMPANY_DETAILS_REQUEST,
        success: types.ADD_COMPANY_DETAILS_SUCCESS,
        failure: types.ADD_COMPANY_DETAILS_FAILURE,
        dispatch,
        format: formatData,
        errorException: {
            type: types.ACCOUNT_LOGOUT_REQUEST,
            payload: getAccountBasicValues()
        },
        successException: {
            type: types.ADD_COMPANY_DETAILS_SUCCESS,
            payload: getCompanyData(dispatch, formValues)
        }
    })
}

export const addLocation = (userId, values) => dispatch => {
    
    postWithAuth({
        type: 'json',
        url: getUrl(api.ADD_LOCATION, { userId }),
        token: getAuthToken(),
        body: JSON.stringify(values),
        init: types.ADD_LOCATION_REQUEST,
        success: types.ADD_LOCATION_SUCCESS,
        failure: types.ADD_LOCATION_FAILURE,
        dispatch,
        format: formatData
    })

}


export const getCompanyDetails = userId => dispatch => {

    getWithAuth({
        url: getUrl(api.COMPANY_DETAILS, { userId }),
        token: getAuthToken(),
        init: types.FETCH_COMPANY_DETAILS_REQUEST,
        success: types.FETCH_COMPANY_DETAILS_SUCCESS,
        failure: types.FETCH_COMPANY_DETAILS_FAILURE,
        dispatch,
        format: getCompanyData,
        errorException: {
            type: types.ACCOUNT_LOGOUT_REQUEST,
            payload: getAccountBasicValues()
        }
    })
}

export const updatePassword = (userId, values) => dispatch => {

    putWithAuth({
        type: 'json',
        url: getUrl(api.CHANGE_PASSWORD, { userId }),
        token: getAuthToken(),
        body: JSON.stringify(values),
        init: types.COMPANY_PASSWORD_CHANGE_REQUEST,
        success: types.COMPANY_PASSWORD_CHANGE_SUCCESS,
        failure: types.COMPANY_PASSWORD_CHANGE_FAILURE,
        dispatch,
        format: formatData,
        errorException: {},
        successException: {
            type: types.COMPANY_PASSWORD_CHANGE_SUCCESS,
            payload: setCompanyUpdatedPassword(dispatch)
        }
    })
}

export const modifyEmail = (userId, values) => dispatch => {

    putWithAuth({
        type: 'json',
        url: getUrl(api.UPDATE_EMAIL, { userId }),
        token: getAuthToken(),
        body: JSON.stringify(values),
        init: types.UPDATE_EMAIL_REQUEST,
        success: types.UPDATE_EMAIL_SUCCESS,
        failure: types.UPDATE_EMAIL_FAILURE,
        dispatch,
        format: formatData,
        errorException: {},
        successException: {
            type: types.UPDATE_EMAIL_SUCCESS,
            payload: values
        }
    })
}

export const contactUs = (userId, values) => dispatch => {

    postWithAuth({
        type: 'json',
        url: getUrl(api.SEND_MESSAGE_BY_USER, { userId }),
        token: getAuthToken(),
        body: JSON.stringify(values),
        init: types.COMPANY_MESSAGE_REQUEST,
        success: types.COMPANY_MESSAGE_SUCCESS,
        failure: types.COMPANY_MESSAGE_FAILURE,
        dispatch,
        format: formatData,
        errorException: {},
        successException: {
            type: types.COMPANY_MESSAGE_SUCCESS,
            payload: getEmptyForm(dispatch, values, 'company')
        }
    })
}

export const updateProfile = (userId, values) => dispatch => {

    putWithAuth({
        type: 'json',
        url: getUrl(api.COMPANY_DETAILS, { userId }),
        token: getAuthToken(),
        body: JSON.stringify(values),
        init: types.UPDATE_COMPANY_REQUEST,
        success: types.UPDATE_COMPANY_SUCCESS,
        failure: types.UPDATE_COMPANY_FAILURE,
        dispatch,
        format: formatData,
        errorException: {},
        successException: {
            type: types.UPDATE_COMPANY_SUCCESS,
            payload: values
        }
    })
}

const setProfessionals = (index, timesheet={}, professional) => dispatch => {

    let model = clone(professional)
    model.shift = timesheet.shift
    model.time = timesheet.time

    const data = isEmptyOrNull(professional) ? {} : model

    dispatch({
        type: types.ENLIST_PROFESSIONAL,
        payload: { index, professional: data }
    })
}

const setEmptyList = data => dispatch => {

    for(let index = 0; index < length(data); index++){

        dispatch({
            type: types.ENLIST_PROFESSIONAL,
            payload: { index, professional: {} }
        })

        if(equals(index, length(data) - 1)){
            setTimeout(() => { dispatch({ type: types.FIND_PROFESSIONALS_SUCCESS }) }, 20000)
        }
    }
}

const filterListByShifts = (professional, timesheet, values) => dispatch => {

    const { data, userId } = values

    if(isEmpty(timesheet)){

        dispatch(setEmptyList(data))

    }else{

        const { id: timesheetId } = timesheet
        const endpoint = getUrl(api.FILTER_PROFESSIONALS, { userId, timesheetId })
        const url = new URL(endpoint)

        const count = length(data) - 1

        for(let index = 0; index < length(data); index++){

            const { date, shifts } = data[index]
            url.search = new URLSearchParams({
                shifts: shifts.toString(),
                date: moment(date).format('YYYY-MM-DD')
            })

            fetch(url, {
                headers: {
                    authorization: getAuthToken()
                }
            })
            .then(res => res.json())
            .then(response => {

                const {type} = response
                if(isSuccess(type)){

                    const { data } = response
                    if(isEmptyOrNull(data)){

                        dispatch({
                            type: types.ENLIST_PROFESSIONAL,
                            payload: { index, professional: {} }
                        })

                        if(equals(index, count)){
                            dispatch({ type: types.FIND_PROFESSIONALS_SUCCESS })
                        }

                    }else{

                        dispatch(setProfessionals(index, data, professional))

                        if(equals(index, count)){
                            dispatch({ type: types.FIND_PROFESSIONALS_SUCCESS })
                        }
                    }

                }else{

                    dispatch({
                        type: types.ENLIST_PROFESSIONAL,
                        payload: { index, professional: {} }
                    })

                    if(equals(index, length(data) - 1)){
                        dispatch({ type: types.FIND_PROFESSIONALS_SUCCESS })
                    }

                }

            })

        }

    }
}

const filterListWithTimesheets = (values, professional) => dispatch => {

    const { userId } = values
    const { userId: professionalId } = professional

    if(isEmpty(professional)) dispatch(filterListByShifts({}, {}, values))
    else{

        const url = getUrl(api.SEARCH_TIMESHEETS_BY_PROFESSIONALS, { userId, professionalId })
        fetch(url, {
            headers: {
                authorization: getAuthToken()
            }
        })
        .then(res => res.json())
        .then(response => {

            const { type } = response
            if(isSuccess(type)){

                const { data } = response

                if(length(data) > 0){
                    forEach(timesheet => {
                        dispatch(filterListByShifts(professional, timesheet, values))
                    }, data)
                }else{
                    dispatch(filterListByShifts({}, {}, values))
                }


            }else{

                const { message: { title, text } } = response
                showToast(title, text, type)
                dispatch(filterListByShifts({}, {}, values))
            }
        })
    }
}

const filterListByAddress = (values, professional) => dispatch => {
    
    const { postCode } = professional
    const { postalCode } = values

    const url = `${apiUrl}distance/${postalCode}/${postCode}?api-key=${apiKey}`

    fetch(url)
    .then(res => res.json())
    .then(response => {
        const { metres } = response
        const miles = parseInt(parseFloat(metres) / 1609)
        const professionalObj = miles < 40 ? professional : {}
        dispatch(filterListWithTimesheets(values, professionalObj))
    })

}

export const addSearchedProfessionals = (index, professional) => dispatch => {
    dispatch({
        type: types.ADD_PROFESSIONALS_LIST_BY_DISTANCE,
        payload: { professional, index }
    })
}

export const searchProfessionals = (userId, values) => dispatch => {

    const { skill } = values
    const  url = getUrl(api.SEARCH_PROFESSIONALS_BY_SKILL, { userId, skill })
    const token = getAuthToken()

    dispatch({ type: types.FIND_PROFESSIONALS_REQUEST })

    fetch(url, {
        headers: {
            authorization: token
        }
    })
    .then(res => res.json())
    .then(response => {

        const { type } = response
        if(isSuccess(type)){

            const { data } = response
            if(length(data) > 0){
                forEach(professional => {
                    dispatch(filterListByAddress(values, professional))
                }, data)
            }else{
                dispatch({ type: types.NO_PROFESSIONALS_FOUND })
            }

        }else{

            const { message: { title, text } } = response
            showToast(title, text, type)
            dispatch({ type: types.NO_PROFESSIONALS_FOUND })

        }
    })
}

export const makePayment = (userId, values, type) => dispatch => {

    const stripeUrl = getUrl(api.MAKE_STRIPE_PAYMENT, { userId })
    const paypalUrl = getUrl(api.MAKE_PAYPAL_PAYMENT, { userId })

    postWithAuth({
        type: 'json',
        url: equals(type, 'Paypal') ? paypalUrl : stripeUrl,
        token: getAuthToken(),
        body: JSON.stringify(values),
        init: types.MAKE_PAYMENT_REQUEST,
        success: types.MAKE_PAYMENT_SUCCESS,
        failure: types.MAKE_PAYMENT_FAILURE,
        dispatch,
        format: formatData,
        errorException: {},
        successException: {
            type: types.MAKE_PAYMENT_SUCCESS,
            payload: values
        }
    })
}

export const sendOfferRequest = (userId, values) => dispatch => {

    postWithAuth({
        type: 'json',
        url: getUrl(api.CREATE_OFFER, { userId }),
        token: getAuthToken(),
        body: JSON.stringify(values),
        init: types.OFFER_REQUEST_INIT,
        success: types.OFFER_REQUEST_SUCCESS,
        failure: types.OFFER_REQUEST_FAILURE,
        dispatch
    })
    
}

export const updateOffer = (values, offerId) => dispatch => {

    const { company } = values

    putWithAuth({
        type: 'json',
        url: getUrl(api.UPDATE_OFFER, { userId: company, offerId }),
        token: getAuthToken(),
        body: JSON.stringify(values),
        init: types.COMPANY_OFFER_UPDATE_REQUEST,
        success: types.COMPANY_OFFER_UPDATE_SUCCESS,
        failure: types.COMPANY_OFFER_UPDATE_FAILURE,
        dispatch,
        format: formatData,
        errorException: {},
        successException: {
            type: types.COMPANY_OFFER_UPDATE_SUCCESS,
            payload: values
        }
    }) 
}
