import React from 'react'
import { List, Tag, Icon } from 'antd'
import moment from 'moment'
import { defaultTo } from 'ramda'

const PersonalDetails = (props) => {

  const { profile } = props
  const {
    // isPaid,
    firstName,
    lastName,
    email,
    isVerified,
    organization,
    // tradingName,
    phone,
    // registration,
    // website,
    // payDate,
    joinedAt
  } = defaultTo({}, profile)
  
  return (
    <List className="profile-list">
      <List.Item>
        <label>
          <Icon type="user" />
          Diector/Head of Nursing Full Name
        </label>
        <span className="label-value">{firstName} {lastName}</span>
      </List.Item>
      <List.Item>
        <label>
          <Icon type="mail" />
            Director/Head of Nursing Email <Tag color={isVerified ? `green` : `red`}>
              {isVerified ? `Verified` : `Not Verified`}
            </Tag>
        </label>
        <span className="label-value">{email}</span>
      </List.Item>
      <List.Item>
        <label>
          <Icon type="phone" />
          Contact Phone Number
        </label>
        <span className="label-value">{phone}</span>
      </List.Item>
      <List.Item>
        <label>
          <Icon type="shop" />
          NHS Trust/Foundation Name
        </label>
        <span className="label-value">
          {organization}
        </span>
      </List.Item>
      {/* <List.Item>
        <label>
          <Icon type="trademark" />
          Trading Name
        </label>
        <span className="label-value">
          {tradingName}
        </span>
      </List.Item> */}
      {/* <List.Item>
        <label>
          <Icon type="barcode" />
          Nature of Business
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
      </List.Item> */}
      {/* <List.Item>
        <label>
          <Icon type="pound" />
          License Purchased
        </label>
        <span className="label-value">
          {isPaid ? moment(payDate).format('LL') : 'Not Purchased'}
        </span>
      </List.Item> */}
      <List.Item>
        <label>
          <Icon type="calendar" />
          Joined On
        </label>
        <span className="label-value">{moment(joinedAt).format('LL')}</span>
      </List.Item>
    </List>
  )
}
export default PersonalDetails
