import React from 'react'
import { Switch, Form } from 'antd'
import { isNil } from 'ramda'
import './custom-components.css'

const FormItem = Form.Item

export const SwitchField = ({
  input: { onChange },
  meta: { error, touched },
  label,
  disabled,
  specialText,
  isRequired,
  checked,
  defaultStatus,
  size,
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
            <Switch
                checked={checked}
                defaultChecked={defaultStatus}
                disabled={disabled}
                onChange={onChange}
                size={size}
            />
            <span className="switch-post-label">
                {text}
            </span>
        </FormItem>
    </div>
  )
}