import React from 'react'
import { Field } from 'redux-form'
import { ButtonTextField, TextField } from '../../../utils/custom-components'
import { isRequired, isNumber } from '../../../constants'

const AddPhoneForm = ({
  code,
  phoneVerified,
  showVerificationModal,
  hideVerificationModal,
  verifyProfessionalPhone
}) => {
  return (
    <div>
      <Field
        name="phone"
        component={ButtonTextField}
        enterButton={'Verify'}
        onSearch={showVerificationModal}
        label={'Phone'}
        size={'large'}
        type="text"
        validate={[isRequired, isNumber]}
        tooltipPlacement={'topRight'}
        specialText={'Please add your phone to verify your account'}
      />
      <Field
        name="phoneCode"
        component={TextField}
        label={'Code'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
    </div>
  )
}

export default AddPhoneForm
