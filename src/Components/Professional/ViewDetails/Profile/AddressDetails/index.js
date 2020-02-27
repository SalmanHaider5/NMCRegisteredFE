import React from 'react'
import { List, Icon } from 'antd'

const AddressDetails = ({ professional }) => {
  const {
    postalCode,
    address,
    city,
    county,
    hasTransport,
    distance
  } = professional
  return (
    <List className="profile-list">
      <List.Item>
        <label>
          <Icon type="tag" />
          Postal Code
        </label>
        <span className="label-value">{postalCode}</span>
      </List.Item>
      <List.Item>
        <label>
          <Icon type="environment" />
          Addres
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
        <span className="label-value">{distance ? distance : 0} m/s</span>
      </List.Item>
    </List>
  )
}
export default AddressDetails