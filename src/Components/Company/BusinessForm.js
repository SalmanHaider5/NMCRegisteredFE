import React from 'react'
import { Field } from 'redux-form'
import { Checkbox, Form, Spin } from 'antd'
import { TextField, ButtonTextField, SelectField } from '../../utils/custom-components'
import { isRequired } from '../../constants'

const BusinessForm = ({
  charity,
  subsidiary,
  charityStatusChange,
  subsidiaryStatusChange,
  addresses: { isLoading, addresses },
  findAddresses,
  addressSelectHandler
}) => {
  return (
    <Spin spinning={isLoading} tip="Loading...">
      <div className="steps-header">
        <h3>Address Details</h3>
      </div>
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
        name="businessAdressLineOne"
        component={TextField}
        label={'Adress Line 1'}
        size={'large'}
        type="text"
      />
      <Field
        name="businessAdressLineTwo"
        component={TextField}
        label={'Address Line 2'}
        size={'large'}
        type="text"
      />
      <Field
        name="city"
        component={TextField}
        label={'Town/City'}
        size={'large'}
        type="text"
      />
      <Field
        name="county"
        component={TextField}
        label={'County'}
        size={'large'}
        type="text"
      />
      <Form.Item
        label='Charity'
        labelAlign='left'
        labelCol={{ span: 5, offset: 3 }}
        wrapperCol={{ span: 12, offset: 1 }}
        colon={false}
        className='form-checkbox'
      >
        <Checkbox onChange={charityStatusChange} />
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
      <Form.Item
        label='Subsidiary'
        labelAlign='left'
        labelCol={{ span: 5, offset: 3 }}
        wrapperCol={{ span: 12, offset: 1 }}
        colon={false}
        className='form-checkbox'
      >
        <Checkbox onChange={subsidiaryStatusChange} />
      </Form.Item>
      {
        subsidiary ?
        <>
          <Field
            name="subsidiaryName"
            component={TextField}
            label={'Subsidiary Name'}
            size={'large'}
            type="text"
            tooltipPlacement={'topRight'}
          />
          <Field
            name="subsidiaryAddress"
            component={TextField}
            label={'Subsidiary Address'}
            size={'large'}
            type="text"
            tooltipPlacement={'topRight'}
          />
        </>:
        null
      }
    </Spin>
  )
}

export default BusinessForm
