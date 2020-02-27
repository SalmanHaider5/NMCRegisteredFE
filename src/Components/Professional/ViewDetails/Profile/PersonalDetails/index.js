import React from 'react'
import { List, Tag, Icon, Avatar } from 'antd'
import moment from 'moment'

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
      <Avatar size={160} icon="user" />
      </List.Item>
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
          Status
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
        <span className="label-value">
          {dateOfBirth ? moment(dateOfBirth).format('LL') : ''}
        </span>
      </List.Item>
      <List.Item>
        <label>
          <Icon type="calendar" />
          Joined At
        </label>
        <span className="label-value">{moment(createdAt).format('LL')}</span>
      </List.Item>
    </List>
  )
}
export default PersonalDetails
