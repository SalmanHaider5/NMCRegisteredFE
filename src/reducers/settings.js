import * as actions from '../actions'
import { head, append, filter } from 'ramda'

const initState = {
  isLoading: false,
  updateBasicsRequest: false,
  addMemberRequest: false,
  deleteMemberRequest: false,
  addSlideshowImageRequest: false,
  deleteSlideshowImageRequest: false,
  error: '',
  basics: {},
  members: [],
  slideshowImages: []
}

const settings = (state = initState, action) => {
  const { type, payload, error } = action
  const { members, slideshowImages } = state
  switch (type) {
    case actions.FETCH_BASICS_REQUEST:
    case actions.FETCH_MEMBERS_REQUEST:
    case actions.FETCH_SLIDESHOW_IMAGES_REQUEST:
      return{
          ...state,
          isLoading: true
      }
    case actions.UPDATE_BASICS_REQUEST:
      return{
        ...state,
        updateBasicsRequest: true,
        isLoading: true
      }
    case actions.ADD_SLIDESHOW_IMAGE_REQUEST:
      return{
        ...state,
        isLoading: true,
        addSlideshowImageRequest: true
      }
    case actions.DELETE_SLIDESHOW_IMAGE_REQUEST:
      return{
        ...state,
        isLoading: true,
        deleteSlideshowImageRequest: true
      }
    case actions.DELETE_SLIDESHOW_IMAGE_SUCCESS:
      const newImages = filter(image => image.id !== payload, slideshowImages)
      return{
        ...state,
        isLoading: false,
        deleteSlideshowImageRequest: false,
        slideshowImages: newImages
      }
    case actions.ADD_SLIDESHOW_IMAGE_SUCCESS:
      return{
        ...state,
        isLoading: false,
        addSlideshowImageRequest: false,
        slideshowImages: append(payload, slideshowImages)
      }
    case actions.ADD_MEMBER_REQUEST:
      return{
        ...state,
        addMemberRequest: true,
        isLoading: true
      }
    case actions.DELETE_MEMBER_REQUEST:
      return{
        ...state,
        deleteMemberRequest: true,
        isLoading: true
      }
    case actions.DELETE_MEMBER_SUCCESS:
      const newMembers = filter(member => member.id !== payload, members)
      return{
        ...state,
        deleteMemberRequest: false,
        isLoading: false,
        members: newMembers
      }
    case actions.ADD_MEMBER_SUCCESS:
      return{
        ...state,
        addMemberRequest: false,
        isLoading: false,
        members: append(payload, members)
      }
    case actions.UPDATE_BASICS_SUCCESS:
      return{
        ...state,
        isLoading: false,
        updateBasicsRequest: false,
        basics: payload
      }
    case actions.FETCH_MEMBERS_SUCCESS:
      return{
        ...state,
        isLoading: false,
        members: payload
      }
    case actions.FETCH_BASICS_SUCCESS:
      return{
        ...state,
        isLoading: false,
        basics: head(payload)
      }
    case actions.FETCH_SLIDESHOW_IMAGES_SUCCESS:
      return{
        ...state,
        isLoading: false,
        slideshowImages: payload
      }
    case actions.FETCH_MEMBERS_FAILURE:
    case actions.UPDATE_BASICS_FAILURE:
    case actions.FETCH_BASICS_FAILURE:
    case actions.ADD_MEMBER_FAILURE:
    case actions.FETCH_SLIDESHOW_IMAGES_FAILURE:
    case actions.ADD_SLIDESHOW_IMAGE_FAILURE:
    case actions.DELETE_SLIDESHOW_IMAGE_FAILURE:
    case actions.DELETE_MEMBER_FAILURE:
      return{
        ...state,
        isLoading: true,
        error: error
      }
    default:
      return state
  }
}

export default settings