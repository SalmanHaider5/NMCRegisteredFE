import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import signup from './signup'

const rootReducer = combineReducers({
    form: formReducer,
    signup
})

export default rootReducer