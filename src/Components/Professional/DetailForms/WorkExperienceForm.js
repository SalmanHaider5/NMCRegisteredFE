import React from 'react'
import { Field } from 'redux-form'
import { MultilineTextField, FileInput } from '../../../utils/custom-components'
import { isRequired, QUALIFICATION_OPTIONS as qualifications } from '../../../constants'

const WorkExperienceForm = () => {
  return (
    <div>
      <Field
        name="document"
        component={FileInput}
        label="Resume/CV"
        type={'picture-card'}
        // fileAdded={profilePicture}
        // onRemove={fileChangeHandler}
        removeIcon={true}
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

export default WorkExperienceForm
