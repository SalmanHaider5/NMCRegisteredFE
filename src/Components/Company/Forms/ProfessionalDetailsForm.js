import React from 'react'
import { Field } from 'redux-form'
import { defaultTo, length } from 'ramda'
import { Checkbox, Form, Spin, Button } from 'antd'
import { TextField, ButtonTextField, SelectField } from '../../../utils/custom-components'
import { isRequired } from '../../../constants'

const ProfessionalDetailsForm = ({
  charityStatusChange,
  subsidiaryStatusChange,
  addresses: { isLoading, addresses },
  findAddresses,
  addressSelectHandler,
  formValues,
  changePostalCode
}) => {
  const { charity, subsidiary } = defaultTo({}, formValues)
  return (
    <Spin spinning={isLoading} tip="Loading...">
      <Field
				name="postalCode"
				component={ButtonTextField}
				enterButton={'Find Address'}
				onSearch={findAddresses}
				label={'Postal Code'}
        size={'large'}
        readOnly={length(addresses) > 0}
        specialText={
          length(addresses) > 0 ?
          <Button type="link" onClick={changePostalCode}>
            Change Post Code?
          </Button>:
          'Enter post code to find your home address'
        }
				type="text"
				validate={[isRequired]}
				tooltipPlacement={'topRight'}
			/>
      <Field
        name="addressId"
        component={SelectField}
        label={'Choose Address'}
        options={addresses}
        size={`large`}
        hintText={'Address'}
        onChange={addressSelectHandler}
        validate={[isRequired]}
      />
      <Field
        name="address"
        component={TextField}
        label={'Adress'}
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
        <Checkbox defaultChecked={charity} onChange={charityStatusChange} />
      </Form.Item>
      {
        charity ?
        <Field
          name="charityReg"
          component={TextField}
          label={'Charity Reg. No.'}
          size={'large'}
          type="text"
          tooltipPlacement={'topRight'}
          validate={[isRequired]}
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
        <Checkbox checked={subsidiary} onChange={subsidiaryStatusChange} />
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
            validate={[isRequired]}
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

export default ProfessionalDetailsForm
