import React from 'react'
import { isNil } from 'ramda'
import { Input, Form } from 'antd'

const FormItem = Form.Item,
  TextArea = Input.TextArea

export const MultilineTextField = ({
  input,
  input: { value },
  meta: { touched, error, visited },
  label,
  fullWidth,
  readOnly,
  rows,
  hintText,
  rowsMax,
  specialText,
  fieldData,
  id
}) => {
  return (
    <div className="text-area">
      <FormItem
        validateStatus={visited && error ? 'error' : ''}
        label={label}
        labelCol={isNil(label) ? undefined : { span: 5, offset: 3 } }
        wrapperCol={isNil(label) ? undefined :{ span: 12, offset: 1 }}
        colon={false}
        extra={specialText}
      >
        <TextArea
          rows={rows || 4}
          id={id}
          {...input}
          value={readOnly ? fieldData : value}
          placeholder={hintText}
        />
      </FormItem>
    </div>
  )
}
