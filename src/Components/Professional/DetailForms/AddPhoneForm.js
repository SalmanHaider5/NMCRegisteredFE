import React from 'react'
import { Field } from 'redux-form'
import { ButtonTextField, TextField } from '../../../utils/custom-components'
import { isRequired, isNumber } from '../../../constants'

const AddPhoneForm = ({
  sendVerificationCode
}) => {
  return (
    <div>
      <Field
        name="phone"
        component={ButtonTextField}
        enterButton={'Send Code'}
        onSearch={sendVerificationCode}
        label={'Phone'}
        size={'large'}
        type="text"
        validate={[isRequired, isNumber]}
        tooltipPlacement={'topRight'}
        specialText={'If not received click again on Send Code'}
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
