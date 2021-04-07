import React, { useState } from 'react'
import { Field } from 'redux-form'
import { and, defaultTo, equals, or } from 'ramda'
import Geolocation  from 'react-geolocation'
import { Alert, Button } from 'antd'
import { PasswordField, RadioField, TextField } from '../../../utils/custom-components'
import { isRequired, isValidEmail } from '../../../constants'

const LoginForm = ({ showForgetPasswordForm, formValues, setPosition }) => {

  const [locationCaptured, setLocationCaptured] = useState(false)
  
  const { login: { role = 'Professional' } } = defaultTo({}, formValues)

  return (
    <div className="login-form">
      <Geolocation 
        lazy
        onSuccess={position => {
          const { coords = { } } = defaultTo({}, position)
          const { longitude, latitude } = coords
          const values = {}
          values.longitude = longitude.toFixed(3)
          values.latitude = latitude.toFixed(3)
          setPosition(values)
          setLocationCaptured(true)
        }}
        render={props => {
          const { getCurrentPosition } = props
          return(
            <Field
              name="role"
              component={RadioField}
              options={['Company', 'Professional']}
              label={'Role'}
              onChange={event => {
                const { target: { value } } = event
                if(equals(value, 'Company')){
                  getCurrentPosition()
                }
              }}
            />
          )
        }}
      />
      {
        equals(role, 'Company') ?
        <>
          <Alert
            style={{ marginBottom: '20px' }}
            showIcon
            type="warning"
            message="Permission Required"
            description="Please allow browser to access your location"
          />
          
        </>: ''
      }
      {
        or(equals(role, 'Professional'), and(equals(role, 'Company'), locationCaptured)) ?
        <>
          <Field
            name="email"
            component={TextField}
            label={'Email'}
            size={'large'}
            type="text"
            validate={[isRequired, isValidEmail]}
            tooltipPlacement={'top'}
          />
          <Field
            name="password"
            component={PasswordField}
            label={'Password'}
            size={'large'}
            className="password-field"
            type="password"
            specialText={
              <Button
                type="link"
                className="link-button"
                onClick={showForgetPasswordForm}
              >
                Forget Password?
              </Button>
            }
            validate={[isRequired]}
            tooltipPlacement={'top'}
          />
        </> : ''
      }
    </div>
  )
}

export default LoginForm