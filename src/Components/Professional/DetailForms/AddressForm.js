import React from 'react'
import { Field } from 'redux-form'
import { Spin, Button } from 'antd'
import { length } from 'ramda'
import { TextField, CheckboxField, ButtonTextField, SelectField } from '../../../utils/custom-components'
import { isRequired, max30Miles, isNumber } from '../../../constants'

const AddressForm = ({
  findAddresses,
  addressSelectHandler,
  addresses: {
    isLoading,
    addresses
  },
  changePostalCode,
  addForm = false
}) => {
  
  return (
     <Spin spinning={isLoading} tip="Loading..."> 
      <Field
				name="postCode"
				component={ButtonTextField}
				enterButton={'Find Address'}
				onSearch={findAddresses}
        label={'Postal Code'}
        readOnly={length(addresses) > 0}
        specialText={
          length(addresses) > 0 ?
          <Button type="link" onClick={changePostalCode}>
            Change Post Code?
          </Button>:
          'Enter post code to find your home address'
        }
				size={'large'}
				type="text"
				validate={[isRequired]}
				tooltipPlacement={'topRight'}
			/>
      { !addForm || (addForm && length(addresses) > 0) ?
        <span>
          <Field
            name="addressId"
            component={SelectField}
            label={'Choose Address'}
            size="large"
            options={addresses}
            hintText={'Address'}
            onBlur={addressSelectHandler}
          />
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
        </span>:
        ''
      }
      <Field
        name="hasTransport"
        component={CheckboxField}
        defaultValue={false}
        label={'Has own Transport'}
        text={'Yes'}
        size={'large'}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="distance"
        component={TextField}
        label={'Distance (miles)'}
        size={'large'}
        type="text"
        validate={[max30Miles, isNumber]}
        specialText={`You can travel (max 30 miles)`}
        tooltipPlacement={'topRight'}
      />
    </Spin>
  )
}

export default AddressForm
