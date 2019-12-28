import React from 'react'
import { Select, Form } from 'antd'
import { map } from 'ramda'
import './custom-components.css'

const { Option } = Select,
  FormItem = Form.Item

export const SelectField = ({
  hintText,
  onSearch,
  label,
  input: { value, onChange },
  options = []
}) => {
  const fieldOptions = map(option => {
    return <Option key={option.id} value={option.id}>{option.name}</Option>
  }, options)
  return(
    <div className="select-field">
      <FormItem label={label}>
        <Select
          placeholder={hintText}
          style={{ width: '100%' }}
          optionFilterProp="children"
          value={value ? value : undefined}
          onChange={onChange}
          onSearch={onSearch}
        >
          {fieldOptions}
        </Select>
      </FormItem>
    </div>
  )
}