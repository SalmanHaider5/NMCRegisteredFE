import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import signup from './signup'
import company from './company'
import professional from './professional'

const rootReducer = combineReducers({
    form: formReducer,
    signup,
    company,
    professional
})

export default rootReducer