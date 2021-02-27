import React from 'react'
import { Field } from 'redux-form'
import { TextField, MultilineTextField } from '../../utils/custom-components'
import { isRequired, isValidEmail } from '../../constants'

const ContactForm = () => {
  return (
    <div>
      <Field
        name="name"
        component={TextField}
        hintText={'Name'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="email"
        component={TextField}
        hintText={'Email'}
        size={'large'}
        type="text"
        validate={[isValidEmail]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="phone"
        component={TextField}
        hintText={'Phone'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="subject"
        component={TextField}
        hintText={'Subject'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="message"
        component={MultilineTextField}
        hintText={'Message...'}
        size={'large'}
        type="text"
        tooltipPlacement={'topRight'}
      />
    </div>
  )
}

export default ContactForm
