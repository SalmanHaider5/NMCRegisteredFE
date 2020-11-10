import React from 'react'
import { map } from 'ramda'
import { Button } from 'antd'
import { isEmptyOrNull } from '../../../utils/helpers'

const Terms = ({ options, setDocumentType }) => {
  return(
    <ul>
      {
        map(option =>{
          return(
            <li key={option.id}>
              {option.text}
              {isEmptyOrNull(option.link) ? '' : <a target="_blank" rel="noopener noreferrer" href={option.link}>{option.linkText}</a>}
              {isEmptyOrNull(option.button) ? '' : <Button size="small" type="link" onClick={() => setDocumentType('TOPs')}>{option.button}</Button>}
            </li>
          )
        }, options)
      }
    </ul>
  )
}

export default Terms