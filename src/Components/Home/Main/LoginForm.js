import React from 'react'
import { Field } from 'redux-form'
import { Button } from 'antd'
import { TextField } from '../../../utils/custom-components'
import { isRequired, isValidEmail } from '../../../constants'

const LoginForm = ({ showForgetPasswordForm }) => {
  return (
    <div>
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
        component={TextField}
        label={'Password'}
        size={'large'}
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
    </div>
  )
}

export default LoginForm