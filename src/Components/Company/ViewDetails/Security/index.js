import React from 'react'
import { FormSection } from 'redux-form'
import { defaultTo, equals, length, not } from 'ramda'
import { Divider, Button, Icon } from 'antd'
import ChangePasswordForm from './ChangePasswordForm'
import { isEmptyOrNull } from '../../../../utils/helpers'

const ChangePassword = ({ changePassword, formValues }) => {

  const {
    changePassword: {
      newPassword,
      confirmPassword,
      currentPassword
    }
  } = defaultTo({}, formValues)

  const currentPasswordNotFound = isEmptyOrNull(currentPassword)
  const passwordNotMatched = not(equals(newPassword, confirmPassword))
  const inavlidPasswordLength = length(newPassword) < 8
  const capitalCharNotFound = not(/[A-Z]/.test(newPassword))
  const numericCharNotFound = not(/[0-9]/.test(newPassword))

  const invalidForm = currentPasswordNotFound ||
                      passwordNotMatched ||
                      inavlidPasswordLength ||
                      capitalCharNotFound ||
                      numericCharNotFound

  return (
    <div>
      <div className="inner-wrapper">
        <div className="steps-content">
          <div className="steps-header">
            <h3>Security</h3>
          </div>
          <div>
            <FormSection name="changePassword">
              <Divider>Change Password</Divider>
              <div className='change-password-div'>
                <ChangePasswordForm />
              </div>
            </FormSection>
          </div>
          <Button
            className="success-btn content-submit-btn"
            onClick={changePassword}
            shape="round"
            disabled={invalidForm}
          >
            <Icon type="check" />
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
