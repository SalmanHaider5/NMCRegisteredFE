import React from 'react'
import { Field } from 'redux-form'
import { TextField, SelectField, MultilineTextField, FileInput } from '../../../utils/custom-components'
import { isRequired, QUALIFICATION_OPTIONS as qualifications, max35Hours, max200Words } from '../../../constants'

const ProfessionalDetailsForm = ({ formValues }) => {
  const { document } = formValues
  return (
    <div>
      <Field
        name="nmcPin"
        component={TextField}
        label={'NMC Pin'}
        size={'large'}
        type="text"
        validate={[isRequired]}
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
        name="cpdHours"
        component={TextField}
        label={'CPD Hours'}
        size={'large'}
        type="text"
        specialText={'Max 35 Hours'}
        validate={[max35Hours]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="document"
        component={FileInput}
        label="Resume/CV"
        type={'card'}
        fileAdded={document}
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
