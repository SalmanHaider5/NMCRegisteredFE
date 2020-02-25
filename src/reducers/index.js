import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import account from './account'
import company from './company'
import professional from './professional'
import addresses from './addresses'
import timesheet from './timesheet'

const rootReducer = combineReducers({
    form: formReducer,
    account,
    company,
    professional,
    addresses,
    timesheet
})

export default rootReducer