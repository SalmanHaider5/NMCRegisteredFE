import React from 'react'
import { Field } from 'redux-form'
import { TextField, CheckboxField } from '../../utils/custom-components'
import { isRequired } from '../../constants'

const AddressForm = () => {
  return (
    <div>
      <div className="steps-header">
        <h3>Address Details</h3>
      </div>
      <Field
        name="address"
        component={TextField}
        label={'Address'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="city"
        component={TextField}
        label={'City/Town'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="county"
        component={TextField}
        label={'County'}
        size={'large'}
        type="text"
      />
      <Field
        name="postalCode"
        component={TextField}
        label={'Post Code'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="hasTransport"
        component={CheckboxField}
        label={'Has own Transport'}
        text={'Yes'}
        size={'large'}
        type="text"
        tooltipPlacement={'topRight'}
      />
    </div>
  )
}

export default AddressForm
