import React from 'react'
import { Field } from 'redux-form'
import { TextField } from '../../../../utils/custom-components'
import { isRequired, isMaxLengthValid, isNumericCharacterExist } from '../../../../constants'

const ChangePasswordForm = () => {
  return (
    <div>
      <Field
        name="currentPassword"
        component={TextField}
        label={'Current Password'}
        size={'large'}
        type="password"
        validate={[isRequired, isMaxLengthValid, isNumericCharacterExist]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="newPassword"
        component={TextField}
        label={'New Password'}
        size={'large'}
        type="password"
        validate={[isRequired, isMaxLengthValid, isNumericCharacterExist]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="confirmPassword"
        component={TextField}
        label={'Confirm Password'}
        size={'large'}
        type="password"
        validate={[isRequired, isMaxLengthValid, isNumericCharacterExist]}
        tooltipPlacement={'topRight'}
      />
    </div>
  )
}

export default ChangePasswordForm
