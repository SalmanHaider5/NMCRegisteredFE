import React from 'react'
import { Select, Form } from 'antd'
import { map, isNil } from 'ramda'
import './custom-components.css'

const { Option } = Select,
  FormItem = Form.Item

export const SelectField = ({
  hintText,
  onSearch,
  label,
  size,
  input: { value, onChange, onBlur },
  disabled,
  options = []
}) => {
  const fieldOptions = map(option => {
    return <Option key={option.id} value={option.id}>{option.name}</Option>
  }, options)
  return(
    <div className="select-field">
      <FormItem
        label={label}
        labelCol={isNil(label) ? undefined : { span: 5, offset: 3 } }
        wrapperCol={isNil(label) ? undefined :{ span: 12, offset: 1 }}
        labelAlign='left'
        colon={false}
      >
        <Select
          placeholder={hintText}
          style={{ width: '100%' }}
          optionFilterProp="children"
          value={value ? value : undefined}
          onChange={value => onChange(value)}
          onBlur={onBlur}
          size={size}
          disabled={disabled}
          onSearch={onSearch}
        >
          {fieldOptions}
        </Select>
      </FormItem>
    </div>
  )
}