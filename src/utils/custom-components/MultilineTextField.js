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
  placeholder,
  readOnly,
  rows,
  rowsMax,
  classes,
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
      >
        <TextArea
          rows={4}
          id={id}
          {...input}
          autoSize={{ minRows: rows, maxRows: rowsMax }}
          value={readOnly ? fieldData : value}
          placeholder={placeholder}
        />
      </FormItem>
    </div>
  )
}
