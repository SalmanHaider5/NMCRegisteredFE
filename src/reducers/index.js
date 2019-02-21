import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import categories from './categories'

const rootReducer = combineReducers({
    form: formReducer,
    categories
})

export default rootReducer