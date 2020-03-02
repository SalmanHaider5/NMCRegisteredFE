import React from 'react'
import { Field } from 'redux-form'
import { TextField } from '../../utils/custom-components'
import { isRequired } from '../../constants'

const TwoFactorAuthForm = () => {
  return (
    <div>
      <Field
        name="code"
        component={TextField}
        label={'Code'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'top'}
      />
    </div>
  )
}

export default TwoFactorAuthForm