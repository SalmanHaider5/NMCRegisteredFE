import React from 'react'
import { List, Tag, Icon } from 'antd'

const PersonalDetails = ({ professional }) => {
  const {
    fullName,
    email,
    isVerified,
    dateOfBirth,
    createdAt,
    phone: {
      phone,
      status
    }
  } = professional
  return (
    <List className="profile-list">
      <List.Item>
        <label>
          <Icon type="user" />
          Full Name
        </label>
        <span className="label-value">{fullName}</span>
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
          Phone <Tag color={status ? `green` : `red`}>
            {status ? `Verified` : `Not Verified`}
          </Tag>
        </label>
        <span className="label-value">{phone}</span>
      </List.Item>
      <List.Item>
        <label>
          <Icon type="shop" />
          Date of Birth
        </label>
        <span className="label-value">{dateOfBirth}</span>
      </List.Item>
      <List.Item>
        <label>
          <Icon type="calendar" />
          Joined At
        </label>
        <span className="label-value">{createdAt}</span>
      </List.Item>
    </List>
  )
}
export default PersonalDetails
