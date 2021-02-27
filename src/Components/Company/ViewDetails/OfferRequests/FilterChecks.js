import React from 'react'
import { Checkbox } from 'antd'
import { OFFER_OPTIONS as options } from '../../../../constants'

export const FilterChecks = (props) => {

  const {
    indeterminate,
    changeAllRequestTypes,
    allRequests,
    requestTypes,
    changeRequestType
  } = props

  return (
    <>
      <Checkbox
        indeterminate={indeterminate}
        onChange={event => changeAllRequestTypes(event, options)}
        checked={allRequests}
      > All Requests
      </Checkbox>

      <Checkbox.Group
        options={options}
        value={requestTypes}
        onChange={value => changeRequestType(value, options)}
      />
    </>
  )
}
