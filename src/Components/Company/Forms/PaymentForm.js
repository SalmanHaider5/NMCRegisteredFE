import React from 'react'
import { Field } from 'redux-form'
import { defaultTo } from 'ramda'
import { Row, Col, Card, List, Alert } from 'antd'
import moment from 'moment'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripeCardPayment from './StripeCardPayment'
import { TextField } from '../../../utils/custom-components'
import { SERVER_URL as url } from '../../../constants'

const PaymentForm = ({ formValues, secret, makePaymentRequest, skipPaymentOption }) => {
  const { firstName, lastName, postalCode, balance, vat } = defaultTo({}, formValues)
  const stripePromise = loadStripe("pk_test_cmqEvoYCsQr8Ur3q2AoEY5V800VuRo430P")
  return (
    <div className="payment-container">
      <Row>
        <Col span={8}>
          <Card title={<>Licensing Fee </>}>
            <List>
              <div className="payment-logo-container">
                <img alt="Payment Methods" src={`${url}assets/payment.png`} />
              </div>
              <List.Item>
                <label>
                  Date
                </label>
                <span>
                  {moment().format('LL')}
                </span>
              </List.Item>
              <List.Item>
                <label>
                  <List.Item.Meta
                    title="Fee"
                    description="Annual Premium"
                  />
                </label>
                <span>
                  £ {balance}
                </span>
              </List.Item>
              <List.Item>
                <label>
                  VAT
                </label>
                <span>
                  {vat}%
                </span>
              </List.Item>
              <List.Item className="bill-row">
                <label>
                  <List.Item.Meta
                    title="Total Dues"
                    description="Valid Till"
                  />
                </label>
                <span>
                  <List.Item.Meta
                    title="$ 576"
                    description={moment().add(1, 'years').format('LL')}
                  />
                </span>
              </List.Item>
            </List>
          </Card>
        </Col>
        <Col span={16}>
          <div className="message-container">
            <Alert
              message={<><a href="https://stripe.com/payments"><b>Stripe</b></a> invest heavily in securing our infrastructure in close partnership with world-class security experts</>}
              type="info"
              showIcon
            />
          </div>
          <Field
            name="firstName"
            component={TextField}
            label={'First Name'}
            fieldData={firstName}
            readOnly={true}
          />
          <Field
            name="lastName"
            component={TextField}
            label={'Last Name'}
            fieldData={lastName}
            readOnly={true}
          />
          <Field
            name="postalCode"
            component={TextField}
            label={'Postal Code'}
            fieldData={postalCode}
            readOnly={true}
          />
          <Elements stripe={stripePromise}>
            <StripeCardPayment
              secret={secret}
              formValues={formValues}
              skipPaymentOption={skipPaymentOption}
              makePaymentRequest={makePaymentRequest}
            />
          </Elements>
        </Col>
      </Row> 
    </div>
  )
}

export default PaymentForm 
