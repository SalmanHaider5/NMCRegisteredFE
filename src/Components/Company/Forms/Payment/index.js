import React from 'react'
import { Row, Col, Alert } from 'antd'
import { PaymentReceipt } from './PaymentReceipt'
import { ADBLOCKER_MESSAGE } from '../../../../constants'
import { PaymentMethods } from './PaymentMethods'

export const PaymentContainer = (props) => {

  const { adBlockerExists, formValues } = props

  return (
    <div className="payment-container" id="payment-container">
      <Row>
        { 
          adBlockerExists ?
          <Alert
            message={ADBLOCKER_MESSAGE}
            type="error"
            showIcon
          /> : ''
        }
        <Col span={8} xs={24} sm={24} md={24} lg={24} xl={8}>
          <PaymentReceipt formValues={formValues} />
        </Col>
        {
          adBlockerExists ? '' : <PaymentMethods {...props} />
        }
      </Row>
    </div>
  )
}
