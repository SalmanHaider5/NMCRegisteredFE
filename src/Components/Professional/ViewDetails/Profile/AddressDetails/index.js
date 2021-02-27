import React from 'react'
import { defaultTo, toUpper } from 'ramda'
import { List, Icon } from 'antd'

export const AddressDetails = (props) => {

  const { profile } = props

  const {
    postCode,
    address,
    city,
    county,
    hasTransport,
    distance
  } = defaultTo({}, profile)
  
  return (
    <List className="profile-list">
      <List.Item>
        <label>
          <Icon type="tag" />
          Postal Code
        </label>
        <span className="label-value">{postCode && toUpper(postCode)}</span>
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
      <List.Item>
        <label>
          <Icon type="car" />
          Transport
        </label>
        <span className="label-value">{hasTransport ? `Available` : `Not Available`}</span>
      </List.Item>
      <List.Item>
        <label>
          <Icon type="dashboard" />
          Distance (can travel)
        </label>
        <span className="label-value">{distance ? distance : 0} miles</span>
      </List.Item>
    </List>
  )
}
