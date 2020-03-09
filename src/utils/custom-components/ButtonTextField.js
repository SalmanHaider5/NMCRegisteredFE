import React from 'react'
import { Input, Tooltip, Form, Button } from 'antd'
import { isNil } from 'ramda'
import './custom-components.css'

const FormItem = Form.Item
const { Search } = Input

export const ButtonTextField = ({
  input: { name, value, onChange, onBlur, onFocus },
  meta: { error, touched },
  label,
  hintText,
  type,
  size,
  readOnly=false,
  tooltipPlacement = "top",
  disabled,
  specialText,
  addonAfterText,
  isRequired,
  enterButton,
  onSearch,
  id
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
          <Search
            name={name}
            id={id}
            size={size}
            enterButton={<Button disabled={error} type="primary" className="success-btn">{enterButton}</Button>}
            placeholder={hintText}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={(e) => {
              onChange(e.target.value)
            }}
            onSearch={onSearch}
            disabled={disabled}
            type={type}
            value={value}
            readOnly={readOnly}
            addonAfter={addonAfterText}
          />
        </Tooltip>
      </FormItem>
    </div>
  )
}