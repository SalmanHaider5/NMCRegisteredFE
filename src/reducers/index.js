import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import categories from './categories'
import faqs from './faqs'
import subscribers from './subscribers'
import products from './products'
import reviews from './reviews'

const rootReducer = combineReducers({
    form: formReducer,
    categories,
    faqs,
    subscribers,
    products,
    reviews
})

export default rootReducer