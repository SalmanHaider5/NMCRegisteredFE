import React, { useState } from 'react'
import { Field, FormSection } from 'redux-form'
import { equals, map, pathOr } from 'ramda'
import { Radio, Icon, Button, Drawer } from 'antd'
import { isSignupFormValid } from '../../../utils/helpers'
import { COMPANY_READINGS, PROFESSIONAL_READINGS } from '../../../constants'
import { PasswordField, TextFieldWithIcon } from '../../../utils/custom-components'
import { isRequired, isValidEmail, isCapitalCharacterExist, isNumericCharacterExist, isMaxLengthValid, isPasswordMatched } from '../../../constants'
import ContactForm from '../ContactForm'

const SignupForm = (props) => {

  const [contactDrawer, setContactDrawer] = useState(false)
  const [readingsDrawer, setReadingsDrawer] = useState(false)

  const { role, formValues, selectUser, registerUser, sendMessage } = props
  const passwordValidations = [isRequired, isCapitalCharacterExist, isNumericCharacterExist, isMaxLengthValid]

  const { email, password, confirmPassword } = pathOr({}, ['signup'], formValues)
  const RadioGroup = Radio.Group


  return (
    <div className="form-fields">
      <FormSection name="signup">
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
        {
          equals(role, 'professional') ?
          <Button
            block
            type="primary"
            shape="round"
            className="full-row-btn success-btn"
            onClick={() => setReadingsDrawer(true)}
          >
            Essential Professional Reading <Icon type="user" />
          </Button> :
          equals(role, 'company') ?
          <Button
            block
            type="primary"
            shape="round"
            className="full-row-btn success-btn"
            onClick={() => setReadingsDrawer(true)}
          >
            Essential Company Reading <Icon type="solution" />
          </Button> : ''
        }
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
      </FormSection>
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
      <Drawer
        title={<><Icon type="document" /> {`Essential ${role} reading`} </>}
        placement="right"
        className="contact-drawer"
        closable={true}
        onClose={() => setReadingsDrawer(false)}
        visible={readingsDrawer}
        width={'40%'}
      >
        {
          equals(role, 'company') ?

          map(option => {
            return <p>{option.text}</p>
          }, COMPANY_READINGS) : 

          map(option => {
            return <>
              <p>{option.text}</p>
              <ul>
              {
                map(li => {
                  return <li>{li.text}</li>
                }, option.options || [])
              }
              </ul>
            </>
          }, PROFESSIONAL_READINGS)

        }
      </Drawer>
    </div>
  )
}

export default SignupForm