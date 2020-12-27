import React from 'react'
import { List, Icon } from 'antd'
import { defaultTo } from 'ramda'

const PaymentCycle = (props) => {
  
  const { profile } = props
  const { paymentCycle } = defaultTo({}, profile)
  
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
