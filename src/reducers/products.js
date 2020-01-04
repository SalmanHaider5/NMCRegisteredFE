import * as actions from '../actions'
import { append, findIndex, propEq, remove, head, filter, set, lensProp, update } from 'ramda'

const initState = {
  isLoading: false,
  isError: false,
  addRequest: false,
  deleteRequest: false,
  addImageRequest: false,
  updateRequest: false,
  deleteImageRequest: false,
  updateFeedbackRequest: false,
  error: '',
  products: [],
  product: {}
}

const products = (state = initState, action) => {
  const { type, payload, error } = action
  const { products } = state
  switch (type) {
    case actions.ADD_PRODUCT_REQUEST:
      return{
        ...state,
        isLoading: true,
        addRequest: true
      }
    case actions.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        addRequest: false,
        products: append(payload, products)
      }
      case actions.FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: payload
      }
    case actions.DELETE_PRODUCT_REQUEST:
      return{
        ...state,
        isLoading: true,
        deleteRequest: true
      }
    case actions.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        deleteRequest: false,
        products: remove(findIndex(propEq('id', payload))(products), 1, products)
      }
    case actions.ADD_PRODUCT_IMAGE_REQUEST:
      return{
        ...state,
        isLoading: true,
        addImageRequest: true
      }
    case actions.ADD_PRODUCT_IMAGE_SUCCESS:
      const image = { img: payload }
      const { product: { images } } = state
      const updatedImages = images
      updatedImages.push(image)
      state.product.images = updatedImages
      return{
        ...state,
        product: state.product,
        isLoading: false,
        addImageRequest: false
      }
    case actions.UPDATE_PRODUCT_REQUEST:
      return{
        ...state,
        isLoading: true,
        updateRequest: true
      }
    case actions.UPDATE_PRODUCT_SUCCESS:
      const productImages = state.product.images
      const updatedProduct = payload
      updatedProduct.images = productImages
      return{
        ...state,
        isLoading: false,
        updateRequest: false,
        product: updatedProduct
      }
    case actions.DELETE_PRODUCT_IMAGE_REQUEST:
      return{
        ...state,
        isLoading: true,
        deleteImageRequest: true
      }
    case actions.DELETE_PRODUCT_IMAGE_SUCCESS:
      const { name } = payload
      const newImages = filter(image => image.img !== name, state.product.images)
      const stateProduct = state.product
      stateProduct.images =  newImages
      return{
        ...state,
        isLoading: false,
        deleteImageRequest: false,
        product: stateProduct
      }
    case actions.DELETE_PRODUCT_IMAGE_FAILURE:
    case actions.UPDATE_PRODUCT_FAILURE:
    case actions.FETCH_SINGLE_PRODUCT_FAILURE:
    case actions.ADD_PRODUCT_FAILURE:
    case actions.ADD_PRODUCT_IMAGE_FAILURE:
    case actions.UPDATE_FEEDBACK_FAILURE:
    case actions.DELETE_PRODUCT_FAILURE:{
      return{
        ...state,
        isLoading: true,
        isError: true,
        error: `${error}`
      }
    }
    case actions.FETCH_SINGLE_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case actions.FETCH_SINGLE_PRODUCT_SUCCESS:
      return{
        ...state,
        isLoading: false,
        product: head(payload)
      }
    case actions.UPDATE_FEEDBACK_REQUEST:
      return{
        ...state,
        isLoading: true,
        updateFeedbackRequest: true
      }
    case actions.UPDATE_FEEDBACK_SUCCESS:
      const { product, product: { feedback } } = state
      const { id, status } = payload
      const updatedFeedback = set(lensProp('status'), status === 'Active' ? 'Hidden' : 'Active', payload )
      const updatedFeedbackArray = update(findIndex(propEq('id', parseInt(id)))(feedback), updatedFeedback, feedback)
      product.feedback =  updatedFeedbackArray
      return{
        ...state,
        isLoading: false,
        updateFeedbackRequest: false,
        product: product
      }
    default:
      return state
  }
}

export default products