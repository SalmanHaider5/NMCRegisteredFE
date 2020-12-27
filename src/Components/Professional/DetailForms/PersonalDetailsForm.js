import React from 'react'
import { Field } from 'redux-form'
import moment from 'moment'
import { defaultTo } from 'ramda'
import { TextField, SelectField, DatePickerField } from '../../../utils/custom-components'
import { isRequired, GENDER_OPTIONS as genders } from '../../../constants'
import { isEmptyOrNull } from '../../../utils/helpers'

const PersonalDetailsForm = ({ formValues, dateHandler }) => {
  const { dateOfBirth } = defaultTo({}, formValues)
  return (
    <div>
      <Field
        name="status"
        component={SelectField}
        label={'Gender'}
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
        defaultValue={isEmptyOrNull(dateOfBirth) ? null : moment(dateOfBirth, 'YYYY-MM-DD')}
        label={'Date of Birth'}
        size={'large'}
        onChange={dateHandler}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
    </div>
  )
}

export default PersonalDetailsForm
