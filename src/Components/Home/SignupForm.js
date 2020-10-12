import React from 'react'
import { Row, Col, Button, Icon, Divider, Drawer } from 'antd'
import { Field } from 'redux-form'
import { TextField } from '../../utils/custom-components'
import { isRequired, isValidEmail, isPasswordMatched, isNumericCharacterExist, isCapitalCharacterExist, isMaxLengthValid, PRIVACY_POLICY } from '../../constants'
import { map, pathOr } from 'ramda'
import { isEmptyOrNull } from '../../utils/helpers'

const SignupForm = ({
  selected,
  selectUser,
  valid,
  registerUser,
  termsDrawer,
  showTerms,
  hideTerms,
  formValues,
  showContactFormModal,
  isSignupFormValid
}) => {
  const { email, password, confirmPassword } = pathOr({}, ['signup'], formValues)
  return (
    <div>
      <div className='form-wrapper'>
        <div>
          <Divider>Register</Divider>
        </div>
          <div>
          <form>
            <div>
              <Row className='form-radio-btn'>
                <Col xs={24} sm={11} md={11} lg={11} xl={11}>
                  <Button
                    onClick={() => selectUser('company')}
                    className='h-radio-btn1'
                    type={selected === 'company' ? 'primary' : 'default'}
                    size='large'
                    block
                  >
                    <Icon type="solution" />
                      Company
                  </Button>
                </Col>
                <Col  xs={0} sm={2} md={2} lg={2} xl={2}></Col>
                <Col  xs={24} sm={11} md={11} lg={11} xl={11}>
                  <Button
                    onClick={() => selectUser('professional')}
                    className='h-radio-btn2'
                    type={selected === 'professional' ? 'primary' : 'default'}
                    size='large'
                    block
                  >
                    <Icon type="user" /> 
                      Professional
                  </Button>
                </Col>
                </Row>
            </div>
            <div className='register-field'>
              <Field
                name="email"
                component={TextField}
                hintText={'Enter Email'}
                size={'large'}
                type="text"
                validate={[isRequired, isValidEmail]}
                tooltipPlacement={'topRight'}
              />
            </div>
            <div className='register-field'> 
              <Field
                name="password"
                component={TextField}
                hintText={'Enter New Password'}
                size={'large'}
                type={'password'}
                validate={[isRequired, isCapitalCharacterExist, isNumericCharacterExist, isMaxLengthValid]}
                tooltipPlacement={'topRight'}
              />
            </div>
            <div className='register-field'>
              <Field
                name="confirmPassword"
                component={TextField}
                hintText={'Confirm New Password'}
                size={'large'}
                type={'password'}
                validate={[isRequired, isPasswordMatched]}
                tooltipPlacement={'topRight'}
              />
            </div>
              <Button
                onClick={registerUser}
                type="primary"
                className='register-btn'
                size='large'
                block
                disabled={!isSignupFormValid(selected, email, password, confirmPassword)}
              >
                <Icon type="user-add" /> Register
              </Button>
              <Button className="success-btn privacy-btn" type="primary" size="large" onClick={showTerms} block>
                <Icon type="file-protect" />Privacy Policy
              </Button>
          </form>
          <Drawer
            title={<><Icon type="paper-clip" /> Privacy Policy</>}
            placement="right"
            className="terms-drawer"
            closable={true}
            width={680}
            onClose={hideTerms}
            visible={termsDrawer}
          >
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
          </Drawer>
        </div>
      </div>
    </div>
  )
}

export default SignupForm