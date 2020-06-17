import React from 'react'
import { map } from 'ramda'
import { isEmptyOrNull } from '../../../utils/helpers'

const Terms = ({ options }) => {
  return(
    <ul>
      {
        map(option =>{
          return(
            <li key={option.id}>
              {option.text}
              {isEmptyOrNull(option.link) ? '' : <a target="_blank" rel="noopener noreferrer" href={option.link}>{option.linkText}</a>}.
            </li>
          )
        }, options)
      }
    </ul>
  )
}

export default Terms