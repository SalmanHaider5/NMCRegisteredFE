import React from 'react'
import { Field } from 'redux-form'
import { TextField } from '../../utils/custom-components'
import { isRequired, isValidEmail } from '../../constants'

const LoginForm = () => {
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
        specialText={'Forgot Password?'}
        validate={[isRequired]}
        tooltipPlacement={'top'}
      />
    </div>
  )
}

export default LoginForm