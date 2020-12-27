import React from 'react'
import { Input, Tooltip, Form, Icon } from 'antd'
import { isNil } from 'ramda'
import './custom-components.css'

const FormItem = Form.Item

export const PasswordField = ({
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
  maxLength,
  fieldData,
  width,
  id,
  icon,
  iconColor
}) => {
  return (
    <div className="field-container">
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
        <Tooltip title={error} placement={tooltipPlacement} visible={error !== undefined && touched}>
          <Input.Password
            name={name}
            id={id}
            size={size}
            placeholder={hintText}
            onFocus={onFocus}
            onBlur={onBlur}
            maxLength={maxLength}
            style={{ width }}
            onChange={(e) => {
              onChange(e.target.value)
            }}
            prefix={<Icon type={icon} style={{ color: iconColor }} />}
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