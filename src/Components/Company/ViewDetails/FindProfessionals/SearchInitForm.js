import React from 'react'
import { Form, Input } from 'antd'
import { SearchDrawer } from './SearchDrawer'

export const SearchInitForm = (props) => {

  const { searchInputValue, showSearchDrawer } = props

  return (
    <div className="search-form">
      <Form.Item
        wrapperCol={{ span: 12, offset: 6 }}
        style={{ paddingTop: '0px' }}
      >
        <Input.Search
          size="large"
          value={searchInputValue}
          placeholder="Search Professionals"
          onClick={showSearchDrawer}
          onSearch={showSearchDrawer}
          readOnly
          enterButton
        />
      </Form.Item>
      <SearchDrawer {...props} />
    </div>
  )
}
