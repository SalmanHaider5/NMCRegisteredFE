import React from 'react'
import { Input, Tooltip, Form } from 'antd'
import { isNil } from 'ramda'
import './custom-components.css'

const FormItem = Form.Item

export const TextField = ({
  input: { name, value, onChange, onBlur, onFocus },
  meta: { error, touched },
  label,
  hintText,
  type,
  size,
  readOnly,
  tooltipPlacement = "top",
  disabled,
  specialText,
  addonAfterText,
  isRequired,
  fieldData,
  id
}) => {
  return (
    <div className="field-container">
      <FormItem
        validateStatus={touched && error ? 'error' : ''}
        label={label}
        labelCol={isNil(label) ? undefined : { span: 3 } }
        wrapperCol={isNil(label) ? undefined :{ span: 8, offset: 1 }}
        labelAlign='left'
        colon={false}
        required={isRequired}
        extra={specialText}
      >
        <Tooltip title={error} placement={tooltipPlacement} visible={error !== undefined && touched}>
          <Input
            name={name}
            id={id}
            size={size}
            placeholder={hintText}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={(e) => {
              onChange(e.target.value)
            }}
            disabled={disabled}
            type={type}
            readOnly={readOnly}
            value={readOnly ? fieldData : value}
            addonAfter={addonAfterText}
          />
        </Tooltip>
      </FormItem>
    </div>
  )
}