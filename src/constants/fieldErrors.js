import { equals } from 'ramda'

export const isRequired = value => value ? undefined : 'Value Required'
export const isNumber = value => value && isNaN(Number(value)) ? 'Must be a Number' : undefined
export const isValidEmail = value => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? undefined : 'Invalid Email'
export const isPasswordMatched = (value, form) => equals(value, form.password) ? undefined : `Password didn't match`
export const isMaxLengthValid = value => value.length < 8 ? 'Minimum 8 characters required' : undefined
export const isCapitalCharacterExist = value => /[A-Z]/.test(value) ? undefined : 'At least 1 capital character required'
export const isNumericCharacterExist = value => /[0-9]/.test(value) ? undefined : 'At least 1 numeric character required'