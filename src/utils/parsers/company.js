import { pathOr, join } from "ramda"

const changePassword = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
}

const searchForm = {
  skill: '',
  serchDate: '',
  shift: ''
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

export const getCompanyData = (response) => {
  return {
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
    charity: pathOr(false, ['charity'], response),
    charityReg: pathOr('', ['charityReg'], response),
    subsidiary: pathOr(false, ['subsidiary'], response),
    subsidiaryName: pathOr('', ['subsidiaryName'], response),
    subsidiaryAddress: pathOr('', ['subsidiaryAddress'], response),
    changePassword,
    searchForm,
    contactForm: getContactFormData(response)
  }
}