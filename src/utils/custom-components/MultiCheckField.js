import React from 'react'
import { Checkbox, Form } from 'antd'
import { isNil } from 'ramda'
import './custom-components.css'

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

export const MultiCheckField = ({
  input: { name, value, onChange, onBlur, onFocus },
  meta: { error, touched },
  label,
  readOnly,
  disabled,
  specialText,
  isRequired,
  defaultValue,
  options,
  text
}) => {
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
        extra={specialText}
      >
        <CheckboxGroup
          onChange={onChange}
          disabled={disabled}
          defaultValue={defaultValue}
          options={options}
          value={value || []}
        >
          {text}
        </CheckboxGroup>
      </FormItem>
  </div>
  )
}