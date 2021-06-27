import React from 'react'
import { defaultTo, toUpper } from 'ramda'
import { List, Icon } from 'antd'
// import { isEmptyOrNull } from '../../../../../utils/helpers'

const ProfessionalDetails = (props) => {

  const {profile} = props

  const {
    postalCode,
    address,
    city,
    county,
    // charity,
    // charityReg,
    // subsidiaryName,
    // subsidiaryAddress
  } = defaultTo({}, profile)
  
  return (
    <List className="profile-list">
      <List.Item>
        <label>
          <Icon type="tag" />
          Postal Code
        </label>
        <span className="label-value">{postalCode && toUpper(postalCode)}</span>
      </List.Item>
      <List.Item>
        <label>
          <Icon type="environment" />
          Address
        </label>
        <span className="label-value">{address}</span>
      </List.Item>
      <List.Item>
        <label>
          <Icon type="compass" />
          City/Town
        </label>
        <span className="label-value">{city}</span>
      </List.Item>
      <List.Item>
        <label>
          <Icon type="home" />
          County
        </label>
        <span className="label-value">{county}</span>
      </List.Item>
      {/* <List.Item>
        <label>
          <Icon type="car" />
          Charity Registration No.
        </label>
        <span className="label-value">{ charity ? charityReg : `N/A`  }</span>
      </List.Item>
      <List.Item>
        <label>
          <Icon type="dashboard" />
          Subsidiary
        </label>
        <span className="label-value">{isEmptyOrNull(subsidiaryName) ? 'N/A' : subsidiaryName }</span>
      </List.Item>
        <List.Item>
          <label>
            <Icon type="dashboard" />
            Subsidiary Address
          </label>
          <span className="label-value">{ isEmptyOrNull(subsidiaryAddress) ? 'N/A' : subsidiaryAddress}</span>
        </List.Item> */}
    </List>
  )
}
export default ProfessionalDetails
