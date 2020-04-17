import React from 'react'
import { FormSection } from 'redux-form'
import { equals } from 'ramda'
import { Divider, Button, Icon, Row, Col } from 'antd'
import ChangePasswordForm from './ChangePasswordForm'
import TwoFactorAuthentication from './TwoFactorAuthentication'
import { isEmptyOrNull } from '../../../../utils/helpers'

const SecurityAndLogin = ({
  updateSecurityandLoginDetails,
  formValues
}) => {
  const { changePassword: { newPassword, confirmPassword } } = formValues
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
            <Row>
              <Col span={5} offset={3}></Col>
              <Col span={12} offset={1} className="form-align-buttons">
                <Button
                  className="success-btn"
                  onClick={updateSecurityandLoginDetails}
                  disabled={isEmptyOrNull(newPassword) ? false : !equals(newPassword, confirmPassword)}
                >
                  <Icon type="check" />
                  Save
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecurityAndLogin
