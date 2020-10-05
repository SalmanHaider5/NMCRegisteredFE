import React from 'react'
import { List, Icon } from 'antd'

const PaymentCycle = ({ company }) => {
  const {
    paymentCycle
  } = company
  
  return (
    <List className="profile-list">
      <List.Item>
        <label>
          <Icon type="hourglass" />
          Payment Cycle
        </label>
        <span className="label-value">{paymentCycle}</span>
      </List.Item>
    </List>
  )
}
export default PaymentCycle
