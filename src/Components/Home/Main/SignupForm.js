import React, { useState } from 'react'
import { Field, FormSection } from 'redux-form'
import { pathOr } from 'ramda'
import { Radio, Icon, Button, Drawer } from 'antd'
// import { Row, Col, Button, Icon, Divider, Drawer } from 'antd'
import { isSignupFormValid } from '../../../utils/helpers'
import { PasswordField, TextFieldWithIcon } from '../../../utils/custom-components'
import { isRequired, isValidEmail, isCapitalCharacterExist, isNumericCharacterExist, isMaxLengthValid, isPasswordMatched } from '../../../constants'
import ContactForm from '../ContactForm'

const SignupForm = (props) => {

  const [contactDrawer, setContactDrawer] = useState(false)

  const { role, formValues, selectUser, registerUser, sendMessage } = props
  const passwordValidations = [isRequired, isCapitalCharacterExist, isNumericCharacterExist, isMaxLengthValid]

  const { email, password, confirmPassword } = pathOr({}, ['signup'], formValues)
  const RadioGroup = Radio.Group


  return (
    <div className="form-fields">

      <RadioGroup
        buttonStyle={'solid'}
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
        icon={'lock'}
        iconColor={'#fff'}
        tooltipPlacement={'topRight'}
      />
      <Button
        type="primary"
        className='left-btn'
        shape="round"
        onClick={() => setContactDrawer(true)}
        icon="mail"
      >
        Contact Us
      </Button>
      <Button
        type="primary"
        className='right-btn success-btn'
        shape="round"
        icon="user-add"
        onClick={registerUser}
        disabled={!isSignupFormValid(role, email, password, confirmPassword)}
      >
        Register
      </Button>
      <Drawer
        title={<><Icon type="mail" /> Contact Us </>}
        placement="right"
        className="contact-drawer"
        closable={true}
        onClose={() => setContactDrawer(false)}
        visible={contactDrawer}
        width={'40%'}
      >
        <FormSection name="contactForm">
          <ContactForm />
        </FormSection>
        <Button shape="round" className="success-btn" onClick={sendMessage}>
          <Icon type="export" /> Send us a Message
        </Button>
      </Drawer>
    </div>
  )
}

export default SignupForm