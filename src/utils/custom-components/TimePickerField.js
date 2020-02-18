import React from 'react'
import { TimePicker, Tooltip, Form } from 'antd'
import { isNil } from 'ramda'
import { TIME_FORMAT } from '../../constants'
import './custom-components.css'

const FormItem = Form.Item

export const TimePickerField = ({
  input: { onChange, onBlur, onFocus },
  meta: { error, touched },
  label,
  readOnly,
  hintText,
  tooltipPlacement = "top",
  disabled,
  specialText,
  isRequired,
  id
}) => {
  return (
    <div className="datepicker-container">
      <FormItem
        validateStatus={touched && error ? 'error' : ''}
        label={label}
        labelCol={isNil(label) ? undefined : { span: 5 } }
        wrapperCol={isNil(label) ? undefined :{ span: 5, offset: 9 }}
        labelAlign='left'
        colon={false}
        required={isRequired}
        extra={specialText}
      >
        <Tooltip title={error} placement={tooltipPlacement} visible={error !== undefined && touched}>
          <TimePicker
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={onChange}
            placeholder={hintText}
            disabled={disabled}
            inputReadOnly={readOnly}
            format={TIME_FORMAT}
            use12Hours
          />
        </Tooltip>
      </FormItem>
    </div>
  )
}