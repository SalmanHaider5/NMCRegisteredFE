import React from 'react'
import { Field } from 'redux-form'
import { TextField } from '../../../utils/custom-components'
import { isRequired } from '../../../constants'

const PhoneForm = () => {
  return (
    <div>
      <Field
        name="phone"
        component={TextField}
        label={'Phone'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="confirmPhone"
        component={TextField}
        label={'Re-type your Phone'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
    </div>
  )
}

export default PhoneForm
