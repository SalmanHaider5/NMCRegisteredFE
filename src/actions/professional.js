import { ENDPOINTS as api } from '../constants'
import * as types from './'
import { getProfessionalData } from '../utils/parsers'
import {
    getFormData,
    putWithAuth,
    getWithAuth,
    getUrl,
    getAuthToken,
    postWithAuth,
    updatePhoneVerificationStatus,
    getAccountBasicValues,
    formatData,
    setModifiedProfileData,
    setProfessionalModifiedSecurity
} from '../utils/helpers'

export const createDetails = (userId, formValues) => dispatch => {

    postWithAuth({
        type: 'form',
        url: getUrl(api.PROFESSIONAL_DETAILS, { userId }),
        token: getAuthToken(),
        body: getFormData(formValues),
        init: types.ADD_PROFESSIONAL_DETAILS_REQUEST,
        success: types.ADD_PROFESSIONAL_DETAILS_SUCCESS,
        failure: types.ADD_PROFESSIONAL_DETAILS_FAILURE,
        dispatch,
        format: formatData,
        errorException: {
            type: types.ACCOUNT_LOGOUT_REQUEST,
            payload: getAccountBasicValues()
        },
        successException: {
            type: types.ADD_PROFESSIONAL_DETAILS_SUCCESS,
            payload: getProfessionalData(dispatch, formValues)
        }
    })
}

export const addPhone = (userId, values) => dispatch => {

    postWithAuth({
        type: 'json',
        url: getUrl(api.ADD_PHONE, { userId }),
        token: getAuthToken(),
        body: JSON.stringify(values),
        init: types.ADD_PROFESSIONAL_PHONE_REQUEST,
        success: types.ADD_PROFESSIONAL_PHONE_SUCCESS,
        failure: types.ADD_PROFESSIONAL_PHONE_FAILURE,
        dispatch
    })
}

export const verifyPhone = (userId, values) => dispatch => {

    postWithAuth({
        type: 'json',
        url: getUrl(api.VERIFY_PHONE, { userId }),
        token: getAuthToken(),
        body: JSON.stringify(values),
        init: types.VERIFY_PROFESSIONAL_PHONE_REQUEST,
        success: types.VERIFY_PROFESSIONAL_PHONE_SUCCESS,
        failure: types.VERIFY_PROFESSIONAL_PHONE_FAILURE,
        dispatch,
        format: updatePhoneVerificationStatus
    })
}

export const getProfessionalDetails = userId => dispatch => {

    getWithAuth({
        url: getUrl(api.PROFESSIONAL_DETAILS, { userId }),
        token: getAuthToken(),
        init: types.FETCH_PROFESSIONAL_DETAILS_REQUEST,
        success: types.FETCH_PROFESSIONAL_DETAILS_SUCCESS,
        failure: types.FETCH_PROFESSIONAL_DETAILS_FAILURE,
        dispatch,
        format: getProfessionalData,
        errorException: {
            type: types.ACCOUNT_LOGOUT_REQUEST,
            payload: getAccountBasicValues()
        }
    })
}

export const updateProfessionalProfile = (userId, values) => dispatch => {
    
    putWithAuth({
        type: 'form',
        url: getUrl(api.PROFESSIONAL_DETAILS, { userId }),
        token: getAuthToken(),
        body: getFormData(values),
        init: types.PROFESSIONAL_PROFILE_UPDATE_REQUEST,
        success: types.PROFESSIONAL_PROFILE_UPDATE_SUCCESS,
        failure: types.PROFESSIONAL_PROFILE_UPDATE_FAILURE,
        dispatch,
        format: formatData,
        errorException: {},
        successException: {
            type: types.PROFESSIONAL_PROFILE_UPDATE_SUCCESS,
            payload: setModifiedProfileData(dispatch, values)
        }
    })
}

export const updateSecurityDetails = (userId, values, type) => dispatch => {

    putWithAuth({
        type: 'json',
        url: getUrl(api.UPDATE_PROFESSIONAL_SECURITY, { userId, type }),
        token: getAuthToken(),
        body: JSON.stringify(values),
        init: types.PROFESSIONAL_SECURITY_UPDATE_REQUEST,
        success: types.PROFESSIONAL_SECURITY_UPDATE_SUCCESS,
        failure: types.PROFESSIONAL_SECURITY_UPDATE_FAILURE,
        dispatch,
        format: formatData,
        errorException: {},
        successException: {
            type: types.PROFESSIONAL_SECURITY_UPDATE_SUCCESS,
            payload: setProfessionalModifiedSecurity(dispatch, values)
        }
    })
}

export const changeShiftStatus = (userId, shift, status, timesheetId) => dispatch => {
    putWithAuth({
        type: 'json',
        url: getUrl(api.UPDATE_SHIFT_STATUS, { userId, shift }),
        token: getAuthToken(),
        body: JSON.stringify({status}),
        init: types.SHIFT_STATUS_UPDATE_REQUEST,
        success: types.SHIFT_STATUS_UPDATE_SUCCESS,
        failure: types.SHIFT_STATUS_UPDATE_FAILURE,
        dispatch,
        format: formatData,
        errorException: {},
        successException: {
            type: types.SHIFT_STATUS_UPDATE_SUCCESS,
            payload: { shift, timesheetId }
        }
    })
}

export const changeTimesheetShift = (userId, shift, timesheetId) => dispatch => {

    const { id } = shift
    
    putWithAuth({
        type: 'json',
        url: getUrl(api.UPDATE_SHIFT, { userId, shiftId: id }),
        token: getAuthToken(),
        body: JSON.stringify(shift),
        init: types.UPDATE_SHIFT_REQUEST,
        success: types.UPDATE_SHIFT_SUCCESS,
        failure: types.UPDATE_SHIFT_FAILURE,
        dispatch,
        format: formatData,
        errorException: {},
        successException: {
            type: types.UPDATE_SHIFT_SUCCESS,
            payload: { timesheetId, shift }
        }
    })
}

export const changePhoneRequest = () => dispatch => {
    dispatch({ type: types.PHONE_NUMBER_CHANGE_REQUEST })
}

export const addBankDetails = (userId, formValues) => dispatch => {

    postWithAuth({
        type: 'json',
        url: getUrl(api.BANK_DETAILS, { userId }),
        token: getAuthToken(),
        body: JSON.stringify(formValues),
        init: types.ADD_BANK_DETAILS_REQUEST,
        success: types.ADD_BANK_DETAILS_SUCCESS,
        failure: types.ADD_BANK_DETAILS_FAILURE,
        dispatch,
        format: formatData,
        errorException: {},
        successException: dispatch({ type: types.ADD_BANK_DETAILS_SUCCESS, payload: formValues })
    })
}

export const updateBankDetails = (userId, formValues) => dispatch => {

    putWithAuth({
        type: 'json',
        url: getUrl(api.BANK_DETAILS, { userId }),
        token: getAuthToken(),
        body: JSON.stringify(formValues),
        init: types.UPDATE_BANK_DETAILS_REQUEST,
        success: types.UPDATE_BANK_DETAILS_SUCCESS,
        failure: types.UPDATE_BANK_DETAILS_FAILURE,
        dispatch,
        format: formatData,
        errorException: {},
        successException: {
            type: types.UPDATE_BANK_DETAILS_SUCCESS,
            payload: formValues
        }
    })
}

export const changeOfferStatus = (userId, values, offerId) => dispatch => {

    putWithAuth({
        type: 'json',
        url: getUrl(api.UPDATE_OFFER, { userId, offerId }),
        token: getAuthToken(),
        body: JSON.stringify(values),
        init: types.OFFER_UPDATE_REQUEST,
        success: types.OFFER_UPDATE_SUCCESS,
        failure: types.OFFER_UPDATE_FAILURE,
        dispatch,
        format: formatData,
        errorException: {},
        successException: {
            type: types.OFFER_UPDATE_SUCCESS,
            payload: values
        }
    })   
}

