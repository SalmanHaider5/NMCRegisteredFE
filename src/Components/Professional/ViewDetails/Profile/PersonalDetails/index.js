import React from 'react'
import { List, Tag, Icon } from 'antd'
import moment from 'moment'
import { DATE_FORMAT as dateFormat } from '../../../../../constants'

const PersonalDetails = ({ professional, phoneVerified }) => {
  const {
    fullName,
    email,
    isVerified,
    dateOfBirth,
    createdAt,
    phone
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
          <Icon type="api" />
          Gender
        </label>
        <span className="label-value">{professional.status}</span>
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
          Phone <Tag color={phoneVerified ? `green` : `red`}>
            {phoneVerified ? `Verified` : `Not Verified`}
          </Tag>
        </label>
        <span className="label-value">{phone}</span>
      </List.Item>
      <List.Item>
        <label>
          <Icon type="shop" />
          Date of Birth
        </label>
        <span className="label-value">
          {moment(dateOfBirth).format(dateFormat)}
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
