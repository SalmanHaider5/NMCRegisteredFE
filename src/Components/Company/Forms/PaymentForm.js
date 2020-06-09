import React from 'react'
import { Field } from 'redux-form'
import { defaultTo } from 'ramda'
import { Row, Col, Card, List, Alert, Button } from 'antd'
import moment from 'moment'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaypalBtn from 'react-paypal-checkout'
import StripeCardPayment from './StripeCardPayment'
import { TextField, RadioField } from '../../../utils/custom-components'
import { SERVER_URL as url, isRequired } from '../../../constants'
import { showToast } from '../../../utils/helpers'

const PaymentForm = ({ formValues, secret, makePaymentRequest, skipPaymentOption, adBlockerExists, makePaypalPayment }) => {
  const { firstName, lastName, postalCode, balance, vat, paymentMethod } = defaultTo({}, formValues)
  const stripePromise = adBlockerExists ? {} : loadStripe("pk_test_cmqEvoYCsQr8Ur3q2AoEY5V800VuRo430P")
  
  const onSuccess = (payment) => {
    const data = {}
    data.amount = parseInt(balance) + parseInt(balance * vat / 100)
    makePaypalPayment(data)
  }		

  const onCancel = (data) => {
    showToast('Payment Cancelled', 'Payment has been cancelled by Company', 'info')
  }	

  const onError = (err) => {
    console.log("Error!", err);		
  }
  const client = {
    sandbox: 'AUk28ovBXDL4THTSWlK0I5rfVzlBx6-wwmu8OH15vc7RCJjuGmK29IG-1CHuVjGpqmjYtO8VTi3C42V0',
    production: ''
  }
  let style = {
    'label':'pay', 
    'tagline': false, 
    'size':'small', 
    'shape':'rect', 
    'color':'blue'
  }
  return (
    <div className="payment-container" id="payment-container">
      <Row>
        {
          adBlockerExists ?
          <Alert
            message={<>Please disable your ad-blocker to make payment and reload the page again or <Button type="link" className="link-button" onClick={skipPaymentOption}>skip</Button> payment option</>}
            type="error"
            showIcon
          /> :
          ''
        }
        <Col span={8}>
          <Card title={<>Licensing Fee </>}>
            <List>
              <div className="payment-logo-container">
                <img alt="Payment Methods" src={paymentMethod === 'Paypal' ? `${url}assets/paypal.png` : `${url}assets/payment.png`} />
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
                    className="net-balance"
                    title={`£ ${parseInt(balance) + parseInt(balance * vat / 100)}`}
                    description={moment().add(1, 'years').format('LL')}
                  />
                </span>
              </List.Item>
            </List>
          </Card>
        </Col>
        <Col span={16} id="paypal">
          <div className="message-container">
            <Alert
              message={
                paymentMethod === 'Paypal' ?
                <>
                  <a href="https://www.paypal.com/us/webapps/mpp/paypal-safety-and-security"><b>PayPal</b></a> appears safe for buyers, as the site platform is both secure and encrypted
                </>:
                <>
                  <a href="https://stripe.com/payments"><b>Stripe</b></a> invest heavily in securing our infrastructure in close partnership with world-class security experts
                </>
              }
              type={paymentMethod === 'Paypal' ? 'info' : 'success'}
              showIcon
            />
          </div>
          <Field
            name="paymentMethod"
            component={RadioField}
            options={['Pay with Card', 'Paypal']}
            validate={[isRequired]}
            label="Payment Method"
            defaultValue={'Pay with Card'}
          />
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
          {
            adBlockerExists ? '' :
            paymentMethod === 'Paypal' ?
            <>
              <Row>
              <Col span={17} offset={4} className="paypal-container">
                <PaypalBtn 
                  env={'sandbox'} 
                  client={client} 
                  currency={'GBP'} 
                  total={parseInt(balance) + parseInt(balance * vat / 100)} 
                  locale={'en_GB'} 
                  style={style}
                  className="paypal-button"
                  onError={onError} 
                  onSuccess={onSuccess} 
                  onCancel={onCancel}
                />
                <Button type="link" onClick={skipPaymentOption}><u>Skip</u></Button>
              </Col>
            </Row>
            </>:
            <Elements stripe={stripePromise}>
              <StripeCardPayment
                secret={secret}
                formValues={formValues}
                adBlockerExists={adBlockerExists}
                skipPaymentOption={skipPaymentOption}
                makePaymentRequest={makePaymentRequest}
              />
            </Elements>
          }
        </Col>
      </Row> 
    </div>
  )
}

export default PaymentForm 
