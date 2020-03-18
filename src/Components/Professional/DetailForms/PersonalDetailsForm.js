import React from 'react'
import { Field } from 'redux-form'
import moment from 'moment'
import { TextField, SelectField, DatePickerField, ImageInput } from '../../../utils/custom-components'
import { isRequired, GENDER_OPTIONS as genders } from '../../../constants'
import { isEmptyOrNull } from '../../../utils/helpers'

const PersonalDetailsForm = ({ formValues, imageRemoveHandler }) => {
  const { profilePicture, dateOfBirth } = formValues
  return (
    <div>
      <Field
        name="profilePicture"
        component={ImageInput}
        label="ID Picture"
        previewType={'picture-card'}
        fileAdded={profilePicture}
        onRemove={imageRemoveHandler}
        removeIcon={true}
      />
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
        defaultValue={isEmptyOrNull(dateOfBirth) ? null : moment(dateOfBirth)}
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
