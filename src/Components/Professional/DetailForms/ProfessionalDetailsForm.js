import React from 'react'
import { Field } from 'redux-form'
import { defaultTo } from 'ramda'
import { TextField, SelectField, MultilineTextField, FileInput } from '../../../utils/custom-components'
import { isRequired, QUALIFICATION_OPTIONS as qualifications, max35Hours, max200Words, isValidNMC } from '../../../constants'

const ProfessionalDetailsForm = ({ formValues, imageRemoveHandler }) => {
  const { profilePicture } = defaultTo({}, formValues)
  return (
    <div>
      <Field
        name="nmcPin"
        component={TextField}
        label={'NMC Pin'}
        size={'large'}
        hintText={'12A1234B'}
        type="text"
        specialText={`NMC Pin is required to verify professional's profile by companies`}
        validate={[isRequired, isValidNMC]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="qualification"
        component={SelectField}
        label={'Qualification'}
        size={'large'}
        options={qualifications}
        hintText={'Choose your Qualification'}
        validate={[isRequired]}
      />
      <Field
        name="crbDocument"
        component={TextField}
        label="DBS Number"
        type={'text'}
        size={'large'}
      />
      <Field
        name="cpdHours"
        component={TextField}
        label={'CPD Hours'}
        size={'large'}
        type="text"
        specialText={'Max 35 Hours'}
        validate={[max35Hours]}
        tooltipPlacement={'topRight'}
      />
      {/* <Field
        name="document"
        component={FileInput}
        label="Resume/CV"
        hintText={'Upload Document'}
        acceptedFileTypes=".doc,.docx,.pdf"
        type={'card'}
        fileAdded={document}
        onRemove={fileRemoveHandler}
        removeIcon={true}
      /> */}
      <Field
        name="profilePicture"
        component={FileInput}
        label="Photo ID"
        hintText={'Upload Image'}
        acceptedFileTypes=".jpg,.jpeg,.png"
        type={'picture'}
        specialText={'Due to security concerns, not uploading an ID Photo may restrict any shift offers.'}
        fileAdded={profilePicture}
        onRemove={imageRemoveHandler}
        removeIcon={true}
      />
      <Field
        name="experience"
        component={MultilineTextField}
        label={'Work Experience'}
        type="text"
        options={qualifications}
        rows={5}
        validate={[max200Words]}
        specialText={'Max 200 words'}
        tooltipPlacement={'topRight'}
      />
    </div>
  )
}

export default ProfessionalDetailsForm
