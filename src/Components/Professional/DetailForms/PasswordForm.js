import React from 'react'
import { Field } from 'redux-form'
import { PasswordField } from '../../../utils/custom-components'
import { isRequired } from '../../../constants'

const PasswordForm = () => {

  return (
    <div className="password-form">
      <Field
        name="password"
        component={PasswordField}
        label={'Password'}
        size={'large'}
        hintText={'Password'}
        validate={[isRequired]}
      />
    </div>
  )
}

export default PasswordForm
