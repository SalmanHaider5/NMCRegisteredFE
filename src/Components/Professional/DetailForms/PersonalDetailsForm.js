import React from 'react'
import { Field } from 'redux-form'
import moment from 'moment'
import { isNil } from 'ramda'
import { TextField, SelectField, DatePickerField, ImageInput } from '../../../utils/custom-components'
import { isRequired, GENDER_OPTIONS as genders, DATE_FORMAT as format } from '../../../constants'

const PersonalDetailsForm = ({ dateOfBirth, formValues, fileChangeHandler }) => {
  const { profilePicture } = formValues
  return (
    <div>
      <Field
        name="profilePicture"
        component={ImageInput}
        label="Profile Picture"
        type={'picture-card'}
        fileAdded={profilePicture}
        onRemove={fileChangeHandler}
        removeIcon={true}
      />
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
