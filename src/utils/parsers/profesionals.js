import { initialize } from 'redux-form'
import moment from 'moment'
import { pathOr, prop } from 'ramda'
import { isEmptyOrNull } from '../helpers'

const getDateOfBirth = dateOfBirth => {
  return isEmptyOrNull(dateOfBirth) ? `` : moment(dateOfBirth).isValid() ? moment(dateOfBirth) : ``
}

const getChangePasswordFormValues = twoFactorAuthentication => {
  return {
    twoFactorAuthentication: isEmptyOrNull(twoFactorAuthentication) ? false : twoFactorAuthentication,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
}

const shiftMessage = {
  msg: ''
}

const getBankDetails = bankDetails => {
  return {
    insurance: pathOr('', ['insurance'], bankDetails),
    sortCode: pathOr('', ['sortCode'], bankDetails),
    accountNumber: pathOr('', ['accountNumber'], bankDetails)
  }
}

const getContactFormValues = response => {
  return {
    name: pathOr('', ['fullName'], response),
    email: pathOr('', ['email'], response),
    phone: pathOr('', ['phone'], response),
    subject: '',
    message: ''
  }
}

const initializeForm = (dispatch, professional) => {
  dispatch(initialize('professional', professional))
}

export const getProfessionalData = (dispatch, response) => {

  const professional =  {
    profilePicture: pathOr('', ['profilePicture'], response),
    status: pathOr('', ['status'], response),
    email: pathOr('', ['email'], response),
    isVerified: pathOr(false, ['isVerified'], response),
    document: pathOr('', ['document'], response),
    fullName: pathOr('', ['fullName'], response),
    dateOfBirth: getDateOfBirth(prop('dateOfBirth', response)),
    postCode: pathOr('', ['postCode'], response),
    address: pathOr('', ['address'], response),
    city: pathOr('', ['city'], response),
    county: pathOr('', ['county'], response),
    nmcPin: pathOr('', ['nmcPin'], response),
    phone: pathOr('', ['phone'], response),
    phoneStatus: pathOr(false, ['phoneStatus'], response),
    hasTransport: pathOr(false, ['hasTransport'], response),
    distance: pathOr(0, ['distance'], response),
    qualification: pathOr('', ['qualification'], response),
    changePassword: getChangePasswordFormValues(prop('twoFactorAuthentication', response)),
    bankDetails: getBankDetails(prop('bankDetails', response)),
    offers: pathOr([], ['offers'], response),
    contactForm: getContactFormValues(response),
    crbDocument: pathOr('', ['crbDocument'], response),
    cpdHours: pathOr(0, ['cpdHours'], response),
    shiftMessage,
    experience: pathOr('', ['experience'], response),
    createdAt: pathOr('', ['createdAt'], response),
    updatedAt: pathOr('', ['updatedAt'], response)
  }
  if(!isEmptyOrNull(professional))
    initializeForm(dispatch, professional)
  return professional
}