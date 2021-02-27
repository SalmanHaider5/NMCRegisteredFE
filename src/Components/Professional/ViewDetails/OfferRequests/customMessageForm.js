import React from 'react'
import { Field } from 'redux-form'
import { MultilineTextField } from '../../../../utils/custom-components'

export const CustomMessageForm = () => {
  return (
    <Field
      name="customMessage"
      component={MultilineTextField}
      label="Custom Message"
      specialText="(optional)"
      rows={7}
    />
  )
}
