import React from 'react'
import { Field } from 'redux-form'
import { defaultTo, not } from 'ramda'
import { Button} from 'antd'
import { ButtonTextField, TextField } from '../../../utils/custom-components'
import { isRequired, isNumber } from '../../../constants'

const AddPhoneForm = ({
  codeSent,
  formValues,
  editPhoneNumber,
  sendVerificationCode
}) => {
  const { phone } = defaultTo({}, formValues)
  return (
    <>
      <Field
        name="phone"
        component={ButtonTextField}
        enterButton={'Send Code'}
        onSearch={sendVerificationCode}
        label={'Phone'}
        size={'large'}
        type="text"
        validate={[isRequired, isNumber]}
        readOnly={codeSent}
        autoFocus={not(codeSent)}
        fieldData={phone || ''}
        tooltipPlacement={'topRight'}
        specialText={
          codeSent ?
          <Button
            type="link"
            onClick={editPhoneNumber}
          >
            Wrong number/Code expired?
          </Button> :
          ''
        }
      />
      <Field
        name="phoneCode"
        component={TextField}
        label={'Code'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        specialText={codeSent ? 'If code not received please click again on Send Code.' : ''}
        tooltipPlacement={'topRight'}
      />
    </>
  )
}

export default AddPhoneForm
