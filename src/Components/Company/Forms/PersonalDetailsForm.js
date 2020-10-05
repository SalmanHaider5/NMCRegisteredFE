import React from 'react'
import { Field } from 'redux-form'
import { TextField } from '../../../utils/custom-components'
import { isRequired } from '../../../constants'

const PersonalDetailsForm = () => {
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
        name="tradingName"
        component={TextField}
        label={'Trading Name'}
        size={'large'}
        type="text"
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
        label={'Nature of Business'}
        size={'large'}
        type="text"
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

export default PersonalDetailsForm
