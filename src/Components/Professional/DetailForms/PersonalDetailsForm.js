import React from 'react'
import { Field } from 'redux-form'
import { TextField, SelectField, DatePickerField } from '../../../utils/custom-components'
import { isRequired, GENDER_OPTIONS as genders } from '../../../constants'

const PersonalDetailsForm = () => {
  return (
    <div>
      <Field
        name="status"
        component={SelectField}
        label={'Status'}
        size={'large'}
        options={genders}
        hintText={'Gender'}
        validate={[isRequired]}
      />
      <Field
        name="fullName"
        component={TextField}
        label={'Full Name'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="dateOfBirth"
        component={DatePickerField}
        label={'Date of Birth'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
    </div>
  )
}

export default PersonalDetailsForm
