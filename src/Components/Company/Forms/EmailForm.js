import React from 'react'
import { Field } from 'redux-form'
import { TextField } from '../../../utils/custom-components'
import { isRequired } from '../../../constants'

const EmailForm = () => {
  return (
    <div>
      <Field
        name="userEmail"
        component={TextField}
        label={'Email'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="confirmEmail"
        component={TextField}
        label={'Re-type your Email'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
    </div>
  )
}

export default EmailForm
