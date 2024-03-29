import { equals, has, path, prop, split, defaultTo } from 'ramda'

export const isRequired = value => value ? undefined : 'Value Required'
export const isNumber = value => value && isNaN(Number(value)) ? 'Must be a Number' : undefined
export const isValidEmail = value => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? undefined : 'Invalid Email'
export const isPasswordMatched = (value, form) => {
  let password = ''
  if(has('signup', form)){
    password = path(['signup', 'password'], form)
  }else{
    if(has('password', form))
      password = prop('password', form)
    else
      password = prop('newPassword', form.changePassword)
  }
  return equals(value, password) ? undefined : `Password didn't match`
}
export const isMaxLengthValid = value => value.length < 8 ? 'Minimum 8 characters required' : undefined
export const isCapitalCharacterExist = value => /[A-Z]/.test(value) ? undefined : 'At least 1 capital character required'
export const isNumericCharacterExist = value => /[0-9]/.test(value) ? undefined : 'At least 1 numeric character required'
export const max35Hours = value => value > 35 ? `Max 35 hours` : undefined
export const max200Words = value => split(' ', defaultTo('',value)).length > 200 ? 'Max 200 words allowed' : undefined
export const isValidNMC = value => /^[0-9]{2}[a-zA-Z]{1}[0-9]{4}[a-zA-Z]{1}$/i.test(value) ? undefined : 'Invalid NMC Pin Format'
export const max30Miles = value => value > 30 ? `Max 30 miles allowed` : undefined
export const min6CharactersRequired = value => value.length < 6 ? 'Minimum 6 characters required' : ''
export const min9CharactersRequired = value => value.length < 9 ? 'Minimum 9 characters required' : ''