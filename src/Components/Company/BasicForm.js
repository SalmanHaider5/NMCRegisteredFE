import React from 'react'
import { Field } from 'redux-form'
import { TextField } from '../../utils/custom-components'
import { isRequired } from '../../constants'

function BasicForm() {
  return (
    <div>
      <Field
        name="firstName"
        component={TextField}
        label={'First Name'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="lastName"
        component={TextField}
        label={'Last Name'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="organization"
        component={TextField}
        label={'Organization'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="phone"
        component={TextField}
        label={'Business Phone'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="registration"
        component={TextField}
        label={'Registration Number'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="website"
        component={TextField}
        label={'Website'}
        size={'large'}
        type="text"
        tooltipPlacement={'topRight'}
      />
    </div>
  )
}

export default BasicForm