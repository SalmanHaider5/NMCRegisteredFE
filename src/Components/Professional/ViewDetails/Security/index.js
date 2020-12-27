import React from 'react'
import { FormSection } from 'redux-form'
import { equals, defaultTo, not } from 'ramda'
import { Divider, Button, Icon } from 'antd'
import ChangePasswordForm from './ChangePasswordForm'
import TwoFactorAuthentication from './TwoFactorAuthentication'
import { isEmptyOrNull } from '../../../../utils/helpers'

const SecurityAndLogin = (props) => {

  const { updateSecurityandLoginDetails, formValues } = props,
    { changePassword } = defaultTo({}, formValues),
    { newPassword, confirmPassword } = defaultTo({}, changePassword),
    formInavlid = isEmptyOrNull(newPassword) ? false : not(equals(newPassword, confirmPassword))

  return (
    <div>
      <div className="inner-wrapper">
        <div className="steps-content">
          <div className="steps-header">
            <h3>Security and Login</h3>
          </div>
          <div>
            <FormSection name="changePassword">
              <Divider>Security</Divider>
              <div>
                <TwoFactorAuthentication
                  formValues={formValues}
                />
              </div>
              <Divider>Change Password</Divider>
              <div className='change-password-div'>
                <ChangePasswordForm />
              </div>
            </FormSection>
            <Button
              shape="round"
              className="success-btn content-submit-btn"
              onClick={updateSecurityandLoginDetails}
              disabled={formInavlid}
            >
              <Icon type="check" /> Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecurityAndLogin
