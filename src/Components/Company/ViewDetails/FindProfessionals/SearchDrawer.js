import React from 'react'
import { FormSection } from 'redux-form'
import { Drawer } from 'antd'
import SearchForm from './SearchForm'

export const SearchDrawer = (props) => {

  const { hideSearchDrawer, searchDrawer } = props

  const drawerStyle = {
    position: 'absolute'
  }

  return (
    <Drawer
      title="Search Professionals"
      placement={'top'}
      className="search-drawer"
      closable={true}
      onClose={hideSearchDrawer}
      visible={searchDrawer}
      height={550}
      getContainer={false}
      style={drawerStyle}
    >
      <FormSection name="searchForm">
        <SearchForm {...props} />
      </FormSection>
    </Drawer>
  )
}
