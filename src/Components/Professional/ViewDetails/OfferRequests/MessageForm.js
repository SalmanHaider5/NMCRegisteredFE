import React from 'react'
import { Field } from 'redux-form'
import { MultilineTextField } from '../../../../utils/custom-components'
import { QUALIFICATION_OPTIONS as qualifications } from '../../../../constants'

const MessageForm = () => {
  return (
    <div style={{ width: '100%' }}>
      <Field
        name="msg"
        component={MultilineTextField}
        type="text"
        options={qualifications}
        rows={5}
        hintText={'Type your Message...'}
        specialText={'Send message to Company'}
        tooltipPlacement={'topRight'}
      />
    </div>
  )
}

export default MessageForm
