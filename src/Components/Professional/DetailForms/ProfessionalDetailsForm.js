import React from 'react'
import { Field } from 'redux-form'
import { TextField, SelectField, MultilineTextField } from '../../../utils/custom-components'
import { isRequired, QUALIFICATION_OPTIONS as qualifications } from '../../../constants'

const ProfessionalDetailsForm = () => {
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
        tooltipPlacement={'topRight'}
      />
      <Field
        name="experience"
        component={MultilineTextField}
        label={'Work Experience'}
        type="text"
        options={qualifications}
        rows={5}
        specialText={'Max 200 words'}
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
    </div>
  )
}

export default ProfessionalDetailsForm
