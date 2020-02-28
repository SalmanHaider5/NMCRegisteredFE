import React from 'react'
import { Field } from 'redux-form'
import { TextField } from '../../utils/custom-components'
import { isRequired, isMaxLengthValid, isNumericCharacterExist, isPasswordMatched, isCapitalCharacterExist } from '../../constants'

const ResetPasswordForm = () => {
  return (
    <div>
      <Field
        name="password"
        component={TextField}
        label={'New Password'}
        size={'large'}
        type="password"
        validate={[isRequired, isMaxLengthValid, isCapitalCharacterExist, isNumericCharacterExist]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="confirmPassword"
        component={TextField}
        label={'Confirm Password'}
        size={'large'}
        type="password"
        validate={[isRequired, isPasswordMatched]}
        tooltipPlacement={'topRight'}
      />
    </div>
  )
}

export default ResetPasswordForm
