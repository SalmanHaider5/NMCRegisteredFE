import React from 'react'
import { Field } from 'redux-form'
import moment from 'moment'
import { DatePicker, Form } from 'antd'
import { TextField, SelectField } from '../../../utils/custom-components'
import { isRequired, GENDER_OPTIONS as genders, DATE_FORMAT } from '../../../constants'
import { isEmptyOrNull } from '../../../utils/helpers'

const PersonalDetailsForm = ({ formValues, dateHandler }) => {
  const { dateOfBirth } = formValues
  const FormItem = Form.Item
  return (
    <div>
      <Field
        name="status"
        component={SelectField}
        label={'Gender'}
        size={'large'}
        options={genders}
        hintText={'Gender'}
        validate={[isRequired]}
      />
      <Field
        name="fullName"
        component={TextField}
        label={'Full Name'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
      {/* <Field
        name="dateOfBirth"
        component={DatePickerField}
        defaultValue={isEmptyOrNull(dateOfBirth) ? null : moment(dateOfBirth, 'YYYY-MM-DD')}
        label={'Date of Birth'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      /> */}
      <FormItem
        label={'Date of Birth'}
        labelCol={{ span: 5, offset: 3 } }
        wrapperCol={{ span: 6, offset: 1 }}
        labelAlign='left'
        colon={false}
      >
        <DatePicker
          defaultValue={isEmptyOrNull(dateOfBirth) ? undefined : moment(dateOfBirth, DATE_FORMAT)}
          onChange={dateHandler}
          format={DATE_FORMAT}
          placeholder={'Choose Date'}
        />
      </FormItem>
    </div>
  )
}

export default PersonalDetailsForm
