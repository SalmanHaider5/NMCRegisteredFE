import { pathOr, join, not } from "ramda"
import { initialize } from 'redux-form'
import moment from 'moment'
import { getEmptyWeekForm, isEmptyOrNull } from "../helpers"

const changePassword = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
}

const getOfferFormDta = response => {
  const address = pathOr('', ['address'], response)
  const city = pathOr('', ['city'], response)
  const county = pathOr('', ['county'], response)
  const postalCode = pathOr('', ['postalCode'], response)

  return {
    shiftRate: '',
    shifts: [],
    address: `${address}, ${city}, ${county} ${postalCode}`,
    message: ''
  }
}

const getContactFormData = response => {
  return {
    name: join(' ', [pathOr('', ['firstName'], response), pathOr('', ['lastName'], response)]),
    email: pathOr('', ['email'], response),
    phone: pathOr('', ['phone'], response),
    subject: '',
    message: ''
  }
}

const initializeForm = (dispatch, company) => {
  dispatch(initialize('company', company))
}

export const getCompanyData = (dispatch, response) => {

  const company = {
    firstName: pathOr('', ['firstName'], response),
    lastName: pathOr('', ['lastName'], response),
    organization: pathOr('', ['organization'], response),
    email: pathOr('', ['email'], response),
    isVerified: pathOr(false, ['isVerified'], response),
    tradingName: pathOr('', ['tradingName'], response),
    address: pathOr('', ['address'], response),
    city: pathOr('', ['city'], response),
    county: pathOr('', ['county'], response),
    postalCode: pathOr('', ['postalCode'], response),
    website: pathOr('', ['website'], response),
    phone: pathOr('', ['phone'], response),
    registration: pathOr('', ['registration'], response),
    isPaid: pathOr(false, ['isPaid'], response),
    balance: pathOr(0, ['balance'], response),
    vat: pathOr(0, ['vat'], response),
    charity: pathOr(false, ['charity'], response),
    charityReg: pathOr('', ['charityReg'], response),
    subsidiary: pathOr(false, ['subsidiary'], response),
    subsidiaryName: pathOr('', ['subsidiaryName'], response),
    subsidiaryAddress: pathOr('', ['subsidiaryAddress'], response),
    payDate: pathOr(moment(), ['payDate'], response),
    paymentCycle: pathOr('', ['paymentCycle'], response),
    location: pathOr(false, ['location'], response),
    joinedAt: pathOr(moment(), ['createdAt'], response),
    paymentMethod: '',
    offers: pathOr([], ['offers'], response),
    changePassword,
    searchForm: getEmptyWeekForm(),
    contactForm: getContactFormData(response),
    offerForm: getOfferFormDta(response)
  }

  if(not(isEmptyOrNull(company)))
    initializeForm(dispatch, company)
  
  return company

}