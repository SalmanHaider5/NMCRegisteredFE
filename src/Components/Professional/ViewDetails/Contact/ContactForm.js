import React from 'react'
import { Field } from 'redux-form'
import { TextField, MultilineTextField } from '../../../../utils/custom-components'
import { isRequired, isValidEmail } from '../../../../constants'

const ContactForm = () => {
  return (
    <div>
      <Field
        name="name"
        component={TextField}
        label={'Name'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="email"
        component={TextField}
        label={'Email'}
        size={'large'}
        type="text"
        validate={[isValidEmail]}
        tooltipPlacement={'topRight'}
      />
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
        name="subject"
        component={TextField}
        label={'Subject'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="message"
        component={MultilineTextField}
        label={'Message'}
        size={'large'}
        type="text"
        tooltipPlacement={'topRight'}
      />
    </div>
  )
}

export default ContactForm
