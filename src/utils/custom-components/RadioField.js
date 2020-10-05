import React from 'react'
import { Radio, Form } from 'antd'
import { isNil } from 'ramda'
import './custom-components.css'

const FormItem = Form.Item

export const RadioField = ({
  input: { onChange, value },
  meta: { error, touched },
  label,
  disabled,
  options,
  isRequired,
  defaultValue,
  checked,
  defaultStatus,
  size,
  text
}) => {
  console.log('Value', defaultValue)
  return (
    <div className="checkbox-container">
      <FormItem
        validateStatus={touched && error ? 'error' : ''}
        label={label}
        labelCol={isNil(label) ? undefined : { span: 5, offset: 3 } }
        wrapperCol={isNil(label) ? undefined :{ span: 12, offset: 1 }}
        labelAlign='left'
        colon={false}
        required={isRequired}
      >
        <Radio.Group onChange={onChange} options={options} value={value} defaultValue={defaultValue} />
      </FormItem>
    </div>
  )
}