import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFormValues, FormSection } from 'redux-form'
import { Divider, Button, Icon, Row, Col } from 'antd'
import ChangePasswordForm from './ChangePasswordForm'
import TwoFactorAuthentication from './TwoFactorAuthentication'

class SecurityAndLogin extends Component {
  render() {
    const { formValues = {} } = this.props
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
                  <TwoFactorAuthentication formValues={formValues} />
                </div>
                <Divider>Change Password</Divider>
                <div>
                  <ChangePasswordForm />
                </div>
              </FormSection>
              <Row>
                <Col span={5} offset={3}></Col>
                <Col span={12} offset={1} className="form-align-buttons">
                  <Button className="success-btn">
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
}

const mapStateToProps = state => {
  console.log('State', state)
  return {
    formValues: getFormValues('professional')(state)
  }
}

export default connect(mapStateToProps)(SecurityAndLogin)
