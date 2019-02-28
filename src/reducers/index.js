import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import categories from './categories'
import faqs from './faqs'
import subscribers from './subscribers'

const rootReducer = combineReducers({
    form: formReducer,
    categories,
    faqs,
    subscribers
})

export default rootReducer