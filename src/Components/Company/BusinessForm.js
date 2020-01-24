import React from 'react'
import { Field } from 'redux-form'
import { Checkbox, Form } from 'antd'
import { TextField } from '../../utils/custom-components'
import { isRequired } from '../../constants'

const BusinessForm = ({
    charity,
    subsidiary,
    charityStatusChange,
    subsidiaryStatusChange
}) => {
  return (
    <div>
      <Field
        name="businessAdressLineOne"
        component={TextField}
        label={'Adress Line 1'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="businessAdressLineOne"
        component={TextField}
        label={'Address Line 2'}
        size={'large'}
        type="text"
        tooltipPlacement={'topRight'}
      />
      <Field
        name="city"
        component={TextField}
        label={'Town/City'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="country"
        component={TextField}
        label={'Country'}
        size={'large'}
        type="text"
        tooltipPlacement={'topRight'}
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
        <Form.Item label='Charity'>
            <Checkbox onChange={charityStatusChange}>Checkbox</Checkbox>
        </Form.Item>
        {
            charity ?
            <Field
                name="charity"
                component={TextField}
                label={'Charity Registration No.'}
                size={'large'}
                type="text"
                tooltipPlacement={'topRight'}
            /> :
            null
        }
      <Checkbox onChange={subsidiaryStatusChange}>Checkbox</Checkbox>
      {
        subsidiary ?
        <Field
            name="subsidiaryName"
            component={TextField}
            label={'Subsidiary Name'}
            size={'large'}
            type="text"
            tooltipPlacement={'topRight'}
        /> :
        null
      }
    </div>
  )
}

export default BusinessForm
