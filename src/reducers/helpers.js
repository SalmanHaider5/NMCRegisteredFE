import {
  set,
  lensProp,
  add,
  length,
  propEq,
  isNil,
  update,
  append,
  findIndex,
  find,
  sort,
  remove,
  not,
  defaultTo
} from 'ramda'
import moment from 'moment'
import { isEmptyOrNull } from "../utils/helpers"

export const formatPhoneData = (state, payload) => {
  const { profile } = state,
    { phone } = payload
  profile.phone = phone
  return profile
}

export const getCodeSentStatus = payload => {
  const { phone, phoneStatus } = payload,
    status = isEmptyOrNull(phone) || phoneStatus ? false : true
  return status
}

export const formatBankDetails = (state, payload) => {
  return set(lensProp('bankDetails'), payload, state.profile)
}

export const formatTimesheetDailySchedule = (state, payload) => {
  const { timesheet: { schedule }, timesheets } = state,
    { id } = payload,
    schduleFound = isNil(find(propEq('id', id))(schedule)),
    updatedSchedule = update(findIndex(propEq('id', payload.id))(schedule), payload, schedule)

  return {
    id: add(length(timesheets), 1),
    schedule: schduleFound ? append(payload, schedule) : updatedSchedule
  }
}

export const getTimesheets = (state, payload) => {
  const { timesheets } = state
  const allTimesheets = append(payload, timesheets)
  const sortByDate = (a, b) => { return moment(a.startingDay) - moment(b.startingDay) }
  return sort(sortByDate, allTimesheets)
}

export const getBasicTimesheet = () => {
  return {
    id: '',
    userId: '',
    schedule: []
  }
}

export const getFilteredList = (payload, list) => {
  const index = findIndex(propEq('id', payload))(list)
  return remove(index, 1, list)
}

export const getStatusModifiedTimesheet = (payload, state) => {
  const { timesheetId, shift } = payload,
    { timesheets, timesheet } = state,
    { schedule } = find(propEq('id', timesheetId))(timesheets),
    timesheetIndex = findIndex(propEq('id', timesheetId))(timesheets),
    currentShift = find(propEq('id', shift))(schedule),
    shiftIndex = findIndex(propEq('id', shift))(schedule),
    { status } = currentShift

  currentShift.status = not(status)
  const modifiedShift = update(shiftIndex, currentShift, schedule)

  return update(timesheetIndex, modifiedShift, timesheet)
}

export const getUpdatedTimesheet = (payload, state) => {
  const { timesheetId, shift: { id, status, time, shift } } = payload,
    { timesheets, timesheet } = state,
    { schedule } = find(propEq('id', timesheetId))(timesheets),
    timesheetIndex = findIndex(propEq('id', timesheetId))(timesheets),
    currentShift = find(propEq('id', id))(schedule),
    shiftIndex = findIndex(propEq('id', id))(schedule)

  currentShift.status = status
  currentShift.shift = shift
  currentShift.time = time
  const modifiedShift = update(shiftIndex, currentShift, schedule)

  return update(timesheetIndex, modifiedShift, timesheet)
}

export const getProfileWithModifiedOffer = (payload, state) => {
  const { profile, profile: { offers } } = state,
    { id } = payload,
    index = findIndex(propEq('id', id))(offers)

  profile.offers = update(index, payload, offers)

  return profile
}

export const getPhoneVerifiedProfile = (state, payload) => {
  const { profile, profile: { contactForm } } = state,
    { phone } = payload
  contactForm.phone = phone
  profile.phone = phone
  profile.contactForm = contactForm

  return profile

}

export const getTimsheetsList = (state, payload) => {
  const timesheets = append(payload, state.timesheets)
  const getSorted = (a, b) => moment(a.startingDay) - moment(b.startingDay)
  return sort(getSorted, timesheets)
}

export const formatCompanyDetails = (state, payload) => {

  const { profile: { email, isVerified, balance, vat } } = state

  return { ...payload, email, isVerified, balance, vat }
}

export const getAfterPaymentProfile = (state, payload) => {
  const { profile } = state,
    { status, payDate } = payload
  
  profile.isPaid = status
  profile.payDate = payDate
    
  return profile
}

export const getCompanyModifiedProfile = (state, payload) => {
  const { profile } = state
  const { contactForm = {}, changePassword = {}, email = '', isVerified = false } = defaultTo({}, profile)

  return { ...payload, contactForm, changePassword, email, isVerified }

}

export const getModifiedOffers = (state, payload) => {
  
  const { id } = payload,
    { offers } = state

  const currentIndex = findIndex(propEq('id', id))(offers)
            
  return update(currentIndex, payload, offers)
            
}

export const getModifiedList = (state, payload) => {

  const { professionals = [] } = state
  const { index, professional } = payload
  const data = isNil(professionals[index]) ? [] : professionals[index]
  const modifiedData = isEmptyOrNull(professional) ? data : append(professional, data)

  professionals[index] = modifiedData

  return professionals

}