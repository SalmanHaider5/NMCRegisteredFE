import React from 'react'
import { Checkbox } from 'antd'
import { OFFER_OPTIONS as options } from '../../../../constants'

export const OfferFilterChecks = (props) => {

  const {
    indeterminate,
    changeAllTypes,
    allTypes,
    changeRequestType,
    requestTypes
  } = props

  return (
    <div className="requests-checkbox">
      <Checkbox
        indeterminate={indeterminate}
        onChange={(event) => changeAllTypes(event)}
        checked={allTypes}
      >
        All Requests
      </Checkbox>
      <Checkbox.Group
        options={options}
        value={requestTypes}
        onChange={value => changeRequestType(value, options)}
      />
    </div>
  )
}
