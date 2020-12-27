import React, { useState } from 'react'
import { Field } from 'redux-form'
import { pathOr } from 'ramda'
import { Radio, Icon, Button, Drawer } from 'antd'
// import { Row, Col, Button, Icon, Divider, Drawer } from 'antd'
import { isSignupFormValid } from '../../../utils/helpers'
import { PasswordField, TextFieldWithIcon } from '../../../utils/custom-components'
import { isRequired, isValidEmail, isCapitalCharacterExist, isNumericCharacterExist, isMaxLengthValid, isPasswordMatched } from '../../../constants'
import { PrivacyPolicy } from './PrivacyPolicy'

const SignupForm = (props
  // selected,
  // selectUser,
  // valid,
  // registerUser,
  // termsDrawer,
  // showTerms,
  // hideTerms,
  // formValues,
  // showContactFormModal,
  // isSignupFormValid
) => {

  const [privacyDrawer, setPrivacyDrawer] = useState(false)
  const { role, formValues, selectUser, registerUser } = props
  const passwordValidations = [isRequired, isCapitalCharacterExist, isNumericCharacterExist, isMaxLengthValid]

  const { email, password, confirmPassword } = pathOr({}, ['signup'], formValues)
  const RadioGroup = Radio.Group


  return (
    <div className="form-fields">

      <RadioGroup
        buttonStyle={'solid'}
        size="large"
        value={role}
        onChange={e => selectUser(e.target.value)}
      >

        <Radio.Button value="professional">
          <Icon type="user" /> Professional
        </Radio.Button>
        <Radio.Button value="company">
          <Icon type="solution" /> Company
        </Radio.Button>

      </RadioGroup>
      <Field
        name="email"
        component={TextFieldWithIcon}
        size={'large'}
        type="text"
        validate={[isRequired, isValidEmail]}
        icon={'user'}
        hintText={'Enter your Email'}
        iconColor={'#fff'}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="password"
        component={PasswordField}
        size={'large'}
        type="text"
        hintText={'Password'}
        validate={passwordValidations}
        icon={'lock'}
        iconColor={'#fff'}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="confirmPassword"
        component={PasswordField}
        size={'large'}
        type="text"
        hintText={'Confirm Password'}
        validate={[isRequired, isPasswordMatched]}
        specialText={'Type your Password'}
        icon={'lock'}
        iconColor={'#fff'}
        tooltipPlacement={'topRight'}
      />
      <Button
        type="primary"
        className='privacy-button'
        shape="round"
        size="large"
        onClick={() => setPrivacyDrawer(true)}
        icon="file-protect"
      >
        Privacy Policy
      </Button>
      <Button
        type="danger"
        className='signup-button success-btn'
        shape="round"
        size="large"
        icon="user-add"
        onClick={registerUser}
        disabled={!isSignupFormValid(role, email, password, confirmPassword)}
      >
        Register
      </Button>
      <Drawer
        title={<><Icon type="paper-clip" /> Privacy Policy</>}
        placement="right"
        className="terms-drawer"
        maskStyle={{ backdropFilter: 'blur(3px)' }}
        closable={true}
        width={680}
        onClose={() => setPrivacyDrawer()}
        visible={privacyDrawer}
      >
        <PrivacyPolicy />
      </Drawer>
      {/* <div className='form-wrapper'>
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
      </div> */}
    </div>
  )
}

export default SignupForm