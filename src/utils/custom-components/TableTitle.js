import React from 'react'
import { map } from 'ramda'
import { Input, Select } from 'antd'
import './custom-components.css'

const { Search } = Input
const { Option } = Select

export const TableTitle = ({
  title,
  onSearch,
  onSelectFilter,
  selectOptions=[],
  selectFilter = false,
  selectHint,
  searchHint
}) =>{
  const options = map(option => {
    return <Option value={option.id} key={option.id}>{option.name}</Option>
  },selectOptions)
  return(
    <div className="table-title">
      <h2>{title}</h2>
      {
        selectFilter ?
        <Select
          className="select-filter"
          placeholder={selectHint}
          onChange={onSelectFilter}
        >
          <Option value={0}>All Products</Option>
          {options}
        </Select>:
        null
      }
      <Search
        placeholder={searchHint}
        className="search-input"
        onChange={onSearch}
      />
    </div>
  )
}