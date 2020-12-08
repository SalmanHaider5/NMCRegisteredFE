import {
    addIndex,
    map,
    isEmpty,
    isNil,
    equals,
    drop,
    prop,
    concat,
    contains,
    split,
    join,
    is,
    defaultTo,
    pathOr,
    type
} from 'ramda'
import { change } from 'redux-form'
import Cookies from 'js-cookie'
import { notification } from 'antd'
import { GENERAL_ERROR, SERVER_URL, GET_ADDRESS_URL, GET_ADDRESS_API_KEY } from '../../constants'

const getClassName = (type)  =>{
    switch (type) {
        case 'success':
            return 'ant-notification-notice-success'
        case 'info':
            return 'ant-notification-notice-info'
         case 'warning':
            return 'ant-notification-notice-warning'
        case 'error':
            return 'ant-notification-notice-error'
        default:
            return 'ant-notification-notice'
    }
}

export const showToast = (title, message, type)  => {

    if(isEmptyOrNull(title) || isEmptyOrNull(message) || isEmptyOrNull(type)) return undefined


    notification.open({
        message: title,
        description: message,
        className: getClassName(type)
    })
}

export const showErrorToast = (title, text) => {
    
    const message = concat(title, text)

    notification.open({
        message,
        placement: 'bottomLeft',
        className: 'error-toast'
    })
}

export const mapIndexed = addIndex(map)
export const isEmptyOrNull = value => isEmpty(value) || isNil(value) || equals(value, 'null') ? true : false

export const getFormData = formValues => {
    const formData = new FormData()
    for(const key in formValues){
        if(key === 'file'){
            formData.append(key, formValues[key][0])
        }else{
            formData.append(key, formValues[key])
        }
    }
    return formData
}

export const isSuccess = type => {
    return equals(type, 'success')
}

export const isInfo = type => {
    return equals(type, 'info')
}

export const isError = type => {
    return equals(type, 'error')
}

export const getUrl = (endpoint, params={}) => {

    const endpointKeys = split('/', endpoint)

    const endpointValues = map(key => {
        if(contains(':', key)){
            const param = drop(1, key)
            const value = prop(param, params)
            return  isEmptyOrNull(value) ? param : value
        }else{
            return key
        }
    }, endpointKeys)

    const api = join('/', endpointValues)

    return concat(SERVER_URL, api)
}

export const getAddressesUrl = postCode => {

   return `${GET_ADDRESS_URL}find/${postCode}?api-key=${GET_ADDRESS_API_KEY}`
}

export const formatServerError = error => {
    if(isEmptyOrNull(error)){
        return { title: 'Error 500: ', text: GENERAL_ERROR.title }
    }else{
        const text = is(Object, error) ? pathOr('', ['name'], error) : error
        return { title: 'Error 500: ', text }
    }
}

export const formatVerificationData = data => {    
    const { auth, token, userId, role, email } = defaultTo({}, data)
    return { auth, authToken: token, role, userId, email }
}

export const getAccountBasicValues = () => {
    return {
        auth: false,
        authToken: '',
        role: '',
        userId: 0
    }
}

export const formatData =(dispatch, data) => data

export const getAuthToken = () => {
    const auth = defaultTo({}, Cookies.getJSON('authToken'))
    return pathOr('', ['authToken'], auth)
}

export const updatePhoneVerificationStatus = (dispatch, data) => {
    return true
}

const formatAdress = (id, name) => {
    return { id, name }
}

export const getAddressesList = data => {
    const addresses = pathOr([], ['addresses'], data)
    if(isEmptyOrNull(addresses)){
        return addresses
    }else{
        return mapIndexed((address, index) => formatAdress(index, address), addresses)
    }
}

export const getHeaders = (type, token) => {
    const formDataHeaders = { authorization: token },
        jsonDataHeaders = {
            'Content-Type':'application/json',
            authorization: token
        }
    
    return type === 'json' ? jsonDataHeaders :  formDataHeaders
}

export const setModifiedProfileData = (dispatch, profile) => {
    const imageFile = pathOr('', ['profilePicture'], profile),
        profilePicture = equals(type(imageFile), 'File') ? imageFile.name : imageFile
    dispatch(change('professional', 'profilePicture', profilePicture))
    profile.profilePicture = profilePicture
    return profile
} 

export const setProfessionalModifiedSecurity = (dispatch, values) => {
    const { twoFactorAuthentication } = values
    const changePassword = {
        twoFactorAuthentication,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    }
    dispatch(change('professional', 'changePassword', changePassword))
    return changePassword
}