import { equals, isEmpty, not } from 'ramda'
import { ADDRESSES_ERROR_MESSAGE, ADDRESSES_ERROR_TITLE, GENERAL_ERROR } from '../../constants'
import { formatServerError, isError, showToast, formatData, isEmptyOrNull, getHeaders, isInfo } from './helpers'

export const get = ({ url, init, success, failure, dispatch, format=formatData }) =>  {
  
  dispatch({ type: init })
  
  fetch(url)
  .then(res => {
    return equals(res.status, 200) ? res.json() : ''
  })
  .then(response => {
    if(isEmpty(response)){
      dispatch({ type: failure, error: GENERAL_ERROR })
    }else{
      const { type, message = {} } = response
      const { title, text } = message
      showToast(title, text, type)
      if(isError(type)){
        const { error } = response
        dispatch({ type: failure, error: formatServerError(error) })
      }else{
        const { data } = response
        dispatch({ type: success, payload: format(data) })
      }
    }
  })
  .catch(error => {
    dispatch({ type: failure, error: formatServerError(error) })
  })

}

export const post = ({ url, body, init, success, failure, info, dispatch, format = formatData }) => {
  
  dispatch({ type: init })

  fetch(url, {
    method: 'POST',
    body,
    headers: {
        'Content-Type':'application/json'
    }
  })
  .then(res => {
    return equals(res.status, 200) ? res.json() : ''
  })
  .then(response => {
    
    if(isEmpty(response)){
      dispatch({ type: failure, error: GENERAL_ERROR })
    }else{
      const { type, message = {} } = response
      const { title, text } = message
      showToast(title, text, type)
      if(isError(type)){
        const { error } = response
        dispatch({ type: failure, error: formatServerError(error) })
      }else if(isInfo(type) && not(isEmptyOrNull(info)) ){
        const { data } = response
        dispatch({ type: info, payload: data })
      }else{
        const { data } = response
        dispatch({ type: success, payload: format(data) })
      }
    }
  })
  .catch(error => {
    dispatch({ type: failure, error: formatServerError(error) })
  })

}

export const getWithAuth = ({ url, token, init, success, failure, dispatch, format = formatData, errorException }) => {
  
  dispatch({type: init})

  fetch(url, {
    headers: {
      authorization: token
    }
  })
  .then(res => {
    return equals(res.status, 200) ? res.json() : ''
  })
  .then(response => {
    if(isEmpty(response)){
      dispatch({ type: failure, error: GENERAL_ERROR })
    }else{
      const { type, message = {} } = response
      const { title, text } = message
      showToast(title, text, type)
      if(isError(type)){
        const { error } = response
        if(isEmptyOrNull(errorException))
          dispatch({ type: failure, error: formatServerError(error) })
        else
          dispatch(errorException)
      }else{
        const { data } = response
        dispatch({ type: success, payload: format(dispatch, data) })
      }
    }
  })
  .catch(error => {
    dispatch({ type: failure, error: formatServerError(error) })
  })
}

export const postWithAuth = ({
  type,
  url,
  token,
  body,
  init,
  success,
  failure,
  dispatch,
  format=formatData,
  errorException,
  successException
}) => {

  dispatch({ type: init })

  fetch(url, {
    method: 'POST',
    body,
    headers: getHeaders(type, token)
  })
  .then(res => {
    return equals(res.status, 200) ? res.json() : ''
  })
  .then(response => {
    if(isEmpty(response)){
      dispatch({ type: failure, error: GENERAL_ERROR })
    }else{
      const { type, message = {} } = response
      const { title, text } = message
      showToast(title, text, type)
      if(isError(type)){

        if(isEmptyOrNull(errorException)){
          const { error } = response
          dispatch({ type: failure, error: formatServerError(error) })
        }else{
          dispatch(errorException)
        }

      }else{

        if(isEmptyOrNull(successException)){
          const { data } = response
          dispatch({ type: success, payload: format(dispatch, data) })
        }else{
          dispatch(successException)
        }

      }
    }
  })
  .catch(error => {
    dispatch({ type: failure, error: formatServerError(error) })
  })

}


export const put = ({ url, body, init, success, failure, dispatch }) => {
  
  dispatch({ type: init })
  
  fetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type':'application/json'
    }
  })
  .then(res => {
    return equals(res.status, 200) ? res.json() : ''
  })
  .then(response => {
    if(isEmpty(response)){
      dispatch({ type: failure, error: GENERAL_ERROR })
    }else{
      const { type, message = {} } = response
      const { title, text } = message
      showToast(title, text, type)
      if(isError(type)){
        const { error } = response
        dispatch({ type: failure, error: formatServerError(error) })
      }else{
        const { data } = response
        dispatch({ type: success, payload: data })
      }
    }
  })
  .catch(error => {
    dispatch({ type: failure, error: formatServerError(error) })
  })
  
}

export const putWithAuth = ({
  type,
  url,
  token,
  body,
  init,
  success,
  failure,
  dispatch,
  format=formatData,
  errorException,
  successException
}) => {
  
  dispatch({ type: init })

  fetch(url, {
    method: 'PUT',
    body,
    headers: getHeaders(type, token)
  })
  .then(res => {
    return equals(res.status, 200) ? res.json() : ''
  })
  .then(response => {
    if(isEmpty(response)){
      dispatch({ type: failure, error: GENERAL_ERROR })
    }else{
      const { type, message = {} } = response
      const { title, text } = message
      showToast(title, text, type)
      if(isError(type)){

        if(isEmptyOrNull(errorException)){
          const { error } = response
          dispatch({ type: failure, error: formatServerError(error) })
        }else{
          dispatch(errorException)
        }

      }else{

        if(isEmptyOrNull(successException)){
          const { data } = response
          dispatch({ type: success, payload: format(dispatch, data) })
        }else{
          dispatch(successException)
        }

      }
    }
  })
  .catch(error => {
    dispatch({ type: failure, error: formatServerError(error) })
  })

}

export const destroy = (url, init, success, failure, dispatch) => {
  
  dispatch({ type: init })
  
  fetch(url, {
    method: 'DELETE'
  })
  .then(res => {
    return equals(res.status, 200) ? res.json() : ''
  })
  .then(response => {
    if(isEmpty(response)){
      dispatch({ type: failure, error: GENERAL_ERROR })
    }else{
      const { type, message = {} } = response
      const { title, text } = message
      showToast(title, text, type)
      if(isError(type)){
        const { error } = response
        dispatch({ type: failure, error: formatServerError(error) })
      }else{
        const { data } = response
        dispatch({ type: success, payload: data })
      }
    }
  })
  .catch(error => {
    dispatch({ type: failure, error: formatServerError(error) })
  })
  
}

export const destroyWithAuth = ({ url, token, init, success, failure, dispatch, payload }) => {
  
  dispatch({ type: init })
  
  fetch(url, {
    method: 'DELETE',
    headers: {
        authorization: token
    }
  })
  .then(res => {
    return equals(res.status, 200) ? res.json() : ''
  })
  .then(response => {
    if(isEmpty(response)){
      dispatch({ type: failure, error: GENERAL_ERROR })
    }else{
      const { type, message = {} } = response
      const { title, text } = message
      showToast(title, text, type)
      if(isError(type)){
        const { error } = response
        dispatch({ type: failure, error: formatServerError(error) })
      }else{
        dispatch({ type: success, payload })
      }
    }
  })
  .catch(error => {
    dispatch({ type: failure, error: formatServerError(error) })
  })
  
}

export const getAddressesWithCustomRequest = ({ url, init, success, failure, dispatch, format=formatData }) =>  {
  
  dispatch({ type: init })
  
  fetch(url)
  .then(res => {
    return equals(res.status, 200) ? res.json() : ''
  })
  .then(response => {
    if(isEmpty(response)){
      dispatch({ type: failure, error: GENERAL_ERROR })
    }else{
      const { addresses } = response
      if(isEmptyOrNull(addresses)){
        showToast(ADDRESSES_ERROR_TITLE, ADDRESSES_ERROR_MESSAGE, 'error')
        dispatch({ type: failure, error: GENERAL_ERROR })
      }else{
        dispatch({ type: success, payload: format(response) })
      }

    }
  })
  .catch(error => {
    dispatch({ type: failure, error: formatServerError(error) })
  })

}