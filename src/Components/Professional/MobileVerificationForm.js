import React from 'react'
import { Field } from 'redux-form'
import { TextField } from '../../utils/custom-components'
import { isRequired } from '../../constants'

const MobileVerificationForm = () => {
  return (
    <div>
      <p>If you have not received your code, please click on Resend button</p>
      <Field
        name="phoneCode"
        component={TextField}
        label={'Code'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
    </div>
  )
}

export default MobileVerificationForm;
