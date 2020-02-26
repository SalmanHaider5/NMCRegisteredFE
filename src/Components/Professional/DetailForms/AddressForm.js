import React from 'react'
import { Field } from 'redux-form'
import { Spin } from 'antd'
import { TextField, CheckboxField, ButtonTextField, SelectField } from '../../../utils/custom-components'
import { isRequired } from '../../../constants'

const AddressForm = ({
  findAddresses,
  addressSelectHandler,
  addresses: {
    isLoading,
    addresses
  }
}) => {
  
  return (
     <Spin spinning={isLoading} tip="Loading..."> 
      <Field
				name="postCode"
				component={ButtonTextField}
				enterButton={'Find Address'}
				onSearch={findAddresses}
				label={'Postal Code'}
				size={'large'}
				type="text"
				validate={[isRequired]}
				tooltipPlacement={'topRight'}
			/>
      <Field
        name="addressId"
        component={SelectField}
        label={'Choose Address'}
        options={addresses}
        hintText={'Address'}
        onBlur={addressSelectHandler}
        validate={[isRequired]}
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
      <Field
        name="hasTransport"
        component={CheckboxField}
        label={'Has own Transport'}
        text={'Yes'}
        size={'large'}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="distance"
        component={TextField}
        label={'Distance (m/s)'}
        size={'large'}
        type="text"
        specialText={`You can travel`}
        tooltipPlacement={'topRight'}
      />
    </Spin>
  )
}

export default AddressForm
