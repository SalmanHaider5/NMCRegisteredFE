import React from 'react'
import { defaultTo, equals } from 'ramda'
import { Col, Alert, Radio, Icon, Button } from 'antd'
import { isEmptyOrNull } from '../../../../utils/helpers'
import { PaypalAlert } from './Paypal/PaypalAlert'
import { StripeAlert } from './Stripe/StripeAlert'
import PaymentForm from '../PaymentForm'
import { Stripe } from './Stripe/'
import Paypal from './Paypal/'

export const PaymentMethods = (props) => {

  const { formValues, getPaymentClientToken, skipPaymentOption } = props,
    { paymentMethod } = defaultTo({}, formValues)

  return (
    <Col span={16} id="payment-container">
      <div className="payment-methods-container">
        <h3>Choose a Payment Method</h3>
        <Radio.Group buttonStyle="solid" size="large" onChange={getPaymentClientToken}>
          <Radio className="payment-methods-radio" value="Pay with Card">
            Pay with Card
          </Radio>
          <Radio className="payment-methods-radio" value="Paypal">
            PayPal
          </Radio>
        </Radio.Group>
        {
          isEmptyOrNull(paymentMethod) ?
          <Button
            shape="round"
            size="default"
            type="danger"
            className="payment-method-skip"
            onClick={skipPaymentOption}
          >
            Skip Payment <Icon type="right" />
          </Button> : ''
        }
      </div>
      {
        isEmptyOrNull(paymentMethod) ? '' :
        <>
          <div className="message-container">
            <Alert
              message={equals(paymentMethod, 'Paypal') ? <PaypalAlert /> : <StripeAlert />}
              type={equals(paymentMethod, 'Paypal') ? 'info' : 'success'}
              showIcon
            />
          </div>
          <PaymentForm formValues={formValues} />
          {
            equals(paymentMethod, 'Paypal') ? <Paypal {...props} /> : <Stripe {...props} />
          } 
        </>
      }
    </Col>
  )
}
