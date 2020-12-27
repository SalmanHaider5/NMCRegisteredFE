import React from 'react'
import { map } from 'ramda'
import { Button } from 'antd'
import { isEmptyOrNull } from '../../../utils/helpers'
import { PRIVACY_POLICY } from '../../../constants'

export const PrivacyPolicy = ({ showContactFormModal }) => {
  return (
    <span>
      <h2><u>Privacy Policy</u></h2>
      {
        map(policy => {
          return(
            <span key={policy.id}>
              <h3>{policy.title}</h3>
              <p>
                {policy.text}{ isEmptyOrNull(policy.buttonText) ? '' : <Button type="link" className="link-button" onClick={showContactFormModal} >{policy.buttonText}</Button> }.
              </p>
            </span>
          )
        }, PRIVACY_POLICY)
      }
    </span>
  )
}
