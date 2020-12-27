import React from 'react'
import { splitEvery, join, defaultTo } from 'ramda'
import { List, Icon, Col } from 'antd'

export const BankDetails = (props) => {

  const { profile } = props,
    { bankDetails } = defaultTo({}, profile),
    { sortCode, accountNumber, insurance } = defaultTo({}, bankDetails)
  
  return (
    <>
      <Col xs={24} sm={24} md={24} lg={{ span: 11, offset: 0 }} xl={{ span: 11, offset: 0 }}>
        <List className="profile-list">
          <List.Item>
            <label>
              <Icon type="user" />
              National Insurance Number
            </label>
            <span className="label-value">{insurance}</span>
          </List.Item>
          <List.Item>
            <label>
              <Icon type="form" />
              Sort Code
            </label>
            <span className="label-value">{join('-', splitEvery(2, sortCode))}</span>
          </List.Item>
        </List>
      </Col>
      <Col xs={24} sm={24} md={24} lg={{ span: 11, offset: 2 }} xl={{ span: 11, offset: 2 }}>
        <List className="profile-list">
          <List.Item>
            <label>
              <Icon type="account-book" />
              Account Number
            </label>
            <span className="label-value">{accountNumber}</span>
          </List.Item>
        </List>
      </Col>
    </>
  )
}
