import React from 'react'
import { Input, Tooltip, Form } from 'antd'
import './custom-components.css'

const FormItem = Form.Item

export const TextField = ({
  input: { name, value, onChange, onBlur, onFocus },
  meta: { error, touched },
  label,
  hintText,
  type,
  readOnly,
  tooltipPlacement = "top",
  isRequired,
  disabled,
  specialText,
  addonAfterText,
  fieldData,
  id
}) => {
  return (
    <div className="field-container">
      <FormItem
        validateStatus={touched && error ? 'error' : ''}
        label={label}
        colon={false}
        extra={specialText}
      >
        <Tooltip title={error} placement={tooltipPlacement} visible={error !== undefined && touched}>
          <Input
            name={name}
            id={id}
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