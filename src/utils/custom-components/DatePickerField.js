import React from 'react'
import { DatePicker, Tooltip, Form } from 'antd'
import { isNil } from 'ramda'
import { DATE_FORMAT } from '../../constants'
import './custom-components.css'

const FormItem = Form.Item

export const DatePickerField = ({
  input: { name, value, onChange, onBlur, onFocus },
  meta: { error, touched },
  label,
  hintText,
  size,
  readOnly,
  tooltipPlacement = "top",
  disabled,
  specialText,
  addonAfterText,
  isRequired,
  id
}) => {
  return (
    <div className="datepicker-container">
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
          <DatePicker
            size={size}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            disabled={disabled}
            readOnly={readOnly}
            format={DATE_FORMAT}
          />
        </Tooltip>
      </FormItem>
    </div>
  )
}