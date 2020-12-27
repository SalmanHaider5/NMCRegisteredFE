import React from 'react'
import moment from 'moment'
import { defaultTo } from 'ramda'
import { List, Tag, Icon } from 'antd'

export const PersonalDetails = (props) => {

  const { profile, phoneVerified } = props

  const {
    fullName,
    status,
    email,
    isVerified,
    phone,
    dateOfBirth,
    createdAt
  } = defaultTo({}, profile)

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
        <span className="label-value">{status}</span>
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
          {moment(dateOfBirth).format('ll')}
        </span>
      </List.Item>
      <List.Item>
        <label>
          <Icon type="calendar" />
          Joined On
        </label>
        <span className="label-value">{moment(createdAt).format('ll')}</span>
      </List.Item>
    </List>
  )
}
