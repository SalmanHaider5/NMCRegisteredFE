import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import categories from './categories'
import faqs from './faqs'
import subscribers from './subscribers'
import products from './products'
import reviews from './reviews'
import orders from './orders'
import customers from './customers'
import login from './login'
import settings from './settings'

const rootReducer = combineReducers({
    form: formReducer,
    categories,
    faqs,
    subscribers,
    products,
    reviews,
    orders,
    customers,
    login,
    settings
})

export default rootReducer