export const ENDPOINTS = {
  LOGIN: '/server/login',
  VERIFY_LOGIN: '/server/:userId/verify/login',
  SIGNUP: '/server/signup',
  VERIFY_USER: '/server/:userId/verify/:token',
  PROFESSIONAL_DETAILS: '/server/:userId/professional',
  UPDATE_PROFESSIONAL_SECURITY: '/server/:userId/professional/security/:type',
  BANK_DETAILS: '/server/:userId/professional/bank/details',
  COMPANY_DETAILS: '/server/:userId/company',
  CHANGE_PASSWORD: '/server/:userId/company/change/password',
  ADD_PHONE: '/server/:userId/add/phone',
  VERIFY_PHONE: '/server/:userId/verify/phone',
  RESET_PASSWORD: '/server/:userId/reset/password',
  TIMESHEET: '/server/:userId/timesheets',
  SINGLE_TIMESHEET: '/server/:userId/timesheet/:timesheetId',
  UPDATE_SHIFT_STATUS: '/server/:userId/shift/:shift/status',
  UPDATE_SHIFT: '/server/:userId/shift/:shiftId',
  SEND_MESSAGE_BY_USER: '/server/:userId/send/message',
  SEND_MESSAGE_BY_GUEST: '/server/guest/send/message',
  SEARCH_PROFESSIONALS_BY_SKILL: '/server/:userId/search/professional/:skill',
  SEARCH_TIMESHEETS_BY_PROFESSIONALS: '/server/:userId/timesheets/:professionalId',
  FILTER_PROFESSIONALS: '/server/:userId/timesheet/:timesheetId/filter',
  MAKE_PAYMENR: '/server/:userId/company/payment',
  STRIPE_SECRET: '/server/:userId/company/client/secret/stripe',
  PAYPAL_SECRET: '/server/:userId/company/client/secret/paypal',
  CREATE_OFFER: '/server/:userId/offer',
  UPDATE_OFFER: '/server/:userId/offer/:offerId'
}