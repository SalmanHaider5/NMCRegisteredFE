import React from 'react'
import { Field } from 'redux-form'
import { Button } from 'antd'
import { TextField } from '../../utils/custom-components'
import { isRequired, isValidEmail } from '../../constants'

const ForgetPasswordForm = ({ showLoginForm }) => {
  return (
    <div>
      <Field
        name="email"
        component={TextField}
        label={'Email'}
        size={'large'}
        type="text"
        specialText={
            <Button
                type="link"
                className="link-button"
                onClick={showLoginForm}
            >
                Login?
            </Button>
        }
        validate={[isRequired, isValidEmail]}
        tooltipPlacement={'top'}
      />
    </div>
  )
}

export default ForgetPasswordForm