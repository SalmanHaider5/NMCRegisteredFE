import React from 'react'
import { Field } from 'redux-form'
import moment from 'moment'
import { isNil } from 'ramda'
import { TextField, SelectField, DatePickerField } from '../../../utils/custom-components'
import { isRequired, GENDER_OPTIONS as genders, DATE_FORMAT as format } from '../../../constants'

const PersonalDetailsForm = ({ dateOfBirth }) => {
  console.log('DOB', dateOfBirth)
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
        defaultValue={isNil(dateOfBirth) ? null : moment(dateOfBirth, format)}
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
