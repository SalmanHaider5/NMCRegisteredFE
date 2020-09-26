import React from 'react'
import { List, Icon, Col } from 'antd'
import { splitEvery, join } from 'ramda'

const BankDetails = ({ professional: { bankDetails } }) => {
  const {
    sortCode,
    accountNumber,
    insurance
  } = bankDetails
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
export default BankDetails
