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
  tooltipPlacement,
  isRequired,
  disabled,
  addonAfterText,
  id,
  data
}) => {
  const isLabelExist = label,
    labelProp = isLabelExist
      ? {
          label: (
            <span title={label}>
              {label}
              
            </span>
          )
        }
      : {}

  return (
    <div className="field-container">
      <FormItem
        validateStatus={ touched  && error ? 'error' : ''}
        {...labelProp}
        colon={false}
      >
        <Input
          name={name}
          id={id}
          placeholder={hintText}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={e => {
            onChange(e.target.value)
          }}
          disabled={disabled}
          type={type}
          readOnly={readOnly}
          value={value}
          addonAfter={addonAfterText}
        />
        <Tooltip title={error} placement="right" visible={error !== undefined && touched} />
        </FormItem>
        </div>
)}