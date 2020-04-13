import React from 'react'
import { List, Tag, Icon } from 'antd'
import moment from 'moment'
import { DATE_FORMAT as dateFormat } from '../../../../../constants'

const PersonalDetails = ({ company }) => {
  const {
    firstName,
    lastName,
    email,
    isVerified,
    organization,
    tradingName,
    phone,
    registration,
    website,
    createdAt
  } = company
  
  return (
    <List className="profile-list">
      <List.Item>
        <label>
          <Icon type="user" />
          Name
        </label>
        <span className="label-value">{firstName} {lastName}</span>
      </List.Item>
      <List.Item>
        <label>
          <Icon type="mail" />
            Email <Tag color={isVerified ? `green` : `red`}>
              {isVerified ? `Verified` : `Not Verified`}
            </Tag>
        </label>
        <span className="label-value">{email}</span>
      </List.Item>
      <List.Item>
        <label>
          <Icon type="phone" />
          Phone
        </label>
        <span className="label-value">{phone}</span>
      </List.Item>
      <List.Item>
        <label>
          <Icon type="shop" />
          Organization
        </label>
        <span className="label-value">
          {organization}
        </span>
      </List.Item>
      <List.Item>
        <label>
          <Icon type="trademark" />
          Trading Name
        </label>
        <span className="label-value">
          {tradingName}
        </span>
      </List.Item>
      <List.Item>
        <label>
          <Icon type="barcode" />
          Resgistration No.
        </label>
        <span className="label-value">
          {registration}
        </span>
      </List.Item>
      <List.Item>
        <label>
          <Icon type="link" />
          Website
        </label>
        <span className="label-value">
          {website}
        </span>
      </List.Item>
      <List.Item>
        <label>
          <Icon type="calendar" />
          Joined At
        </label>
        <span className="label-value">{moment(createdAt).format(dateFormat)}</span>
      </List.Item>
    </List>
  )
}
export default PersonalDetails
