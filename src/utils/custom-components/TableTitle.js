import React from 'react'
import { Input } from 'antd'
import './custom-components.css'

const { Search } = Input

export const TableTitle = ({ title, onSearch }) => (
  <div className="table-title">
    <h2>{title}</h2>
    <Search
      placeholder={`Search by ${title} Name`}
      className="search-input"
      onChange={onSearch}
    />
  </div>
)