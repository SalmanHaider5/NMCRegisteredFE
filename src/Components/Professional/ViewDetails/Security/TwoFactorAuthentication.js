import React from 'react'
import { Field } from 'redux-form'
import { prop } from 'ramda'
import { SwitchField } from '../../../../utils/custom-components'

const TwoFactorAuthentication = ({ formValues }) => {
  const twoFactorAuthentication = prop('twoFactorAuthentication', prop('changePassword', formValues))
  return (
    <div>
      <Field
        name="twoFactorAuthentication"
        component={SwitchField}
        size="large"
        label="2F Auth"
        defaultStatus={false}
        checked={twoFactorAuthentication}
        text={twoFactorAuthentication ? `Enabled` : `Disabled`}
      />
    </div>
  )
}
export default TwoFactorAuthentication
