import React from 'react'
import { isNil, isEmpty } from 'ramda'
import { Upload, message, Button, Icon, Form, Avatar } from 'antd'

const FormItem = Form.Item

export const FileInput = ({
  input: { name, value, onChange, onBlur },
  meta: { touched, error, warning },
  label,
  isRequired,
  imageAdded,
  specialText
}) => {
  
  return (
    <div className="file-input">
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
        <Avatar icon="user" size={96}  />
        <input type="file" style={{ display: 'none' }} />
      </FormItem>
    </div>
  )
}