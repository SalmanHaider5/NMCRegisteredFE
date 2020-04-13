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

const getContactFormValues = response => {
  return {
    name: response.fullName,
    email: response.email,
    phone: response.phone,
    subject: '',
    message: ''
  }
}

export const getProfessionalData = response => {
  return {
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
    contactForm: getContactFormValues(response),
    crbDocument: pathOr('', ['crbDocument'], response),
    cpdHours: pathOr('', ['cpdHours'], response),
    experience: pathOr('', ['experience'], response),
    createdAt: pathOr('', ['createdAt'], response),
    updatedAt: pathOr('', ['document'], response)
  }
}