import React from 'react'
import { Button, Icon } from 'antd'
import { isEmptyOrNull } from '../../../../utils/helpers'

export const ActionButtons = (props) => {

  const {
    skill,
    hideSearchDrawer,
    searchProfessionalsBySkills
  } = props

  return (
    <div className="search-btn">

      <Button
        shape="round"
        className="success-btn"
        disabled={isEmptyOrNull(skill)}
        onClick={searchProfessionalsBySkills}
      >
        <Icon type="search" /> Search
      </Button>

      <Button
        type="danger"
        shape="round"
        onClick={hideSearchDrawer}
      >
        <Icon type="close" /> Cancel
      </Button>

    </div>
  )
}
