import React from 'react'
import { Field } from 'redux-form'
import { defaultTo, map } from 'ramda'
import { Row, Col, Card, List, Alert, Button, Form, Drawer, Icon } from 'antd'
import moment from 'moment'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaypalBtn from 'react-paypal-checkout'
import StripeCardPayment from './StripeCardPayment'
import { TextField, RadioField, CheckboxField } from '../../../utils/custom-components'
import { SERVER_URL as url, isRequired, TERMS } from '../../../constants'
import { showToast, isEmptyOrNull } from '../../../utils/helpers'
import Terms from './Terms'

const PaymentForm = ({
  formValues,
  secret,
  makePaymentRequest,
  skipPaymentOption,
  adBlockerExists,
  makePaypalPayment,
  termsDrawer,
  showTermsDrawer,
  hideTermsDrawer
}) => {
  const { firstName, lastName, balance, vat, paymentMethod, termsChecked = false } = defaultTo({}, formValues)
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
                <img alt="Payment Methods" src={paymentMethod === 'Paypal' ? `${url}public/assets/paypal.png` : `${url}public/assets/payment.png`} />
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
                  £ {balance}.00
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
                    title="Total"
                    description="Valid Till"
                  />
                </label>
                <span>
                  <List.Item.Meta
                    className="net-balance"
                    title={`£ ${parseInt(balance) + parseInt(balance * vat / 100)}.00`}
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
                  <a href="https://stripe.com/payments"><b>Stripe</b></a> payments are Strong Customer Authentication (SCA) ready, Dynamic 3-D Secure and PCI Compliant
                </>
              }
              type={paymentMethod === 'Paypal' ? 'info' : 'success'}
              showIcon
            />
          </div>
          <Field
            name="paymentMethod"
            component={RadioField}
            label="Payment Method"
            options={['Pay with Card', 'Paypal']}
            value={'Pay with Card'}
            defaultValue={'Pay with Card'}
            validate={[isRequired]}
          />
          <Field
            name="Name"
            component={TextField}
            label={'Name'}
            fieldData={firstName +' '+ lastName}
            readOnly={true}
          />
          <Form.Item
            label="Accept Terms"
            labelCol={{ span: 5, offset: 3 }}
            wrapperCol={{ span: 12, offset: 1 }}
            style={{ margin: '0' }}
            colon={false}
          >
            <Field
              name="termsChecked"
              component={CheckboxField}
              text={
                <>
                  I agree to NMC <Button className="link-button" type="link" onClick={showTermsDrawer}> NMC Terms and Conditions </Button>
                </>
              }
              size={'large'}
              type={'password'}
              validate={[isRequired]}
              tooltipPlacement={'topRight'}
            />
          </Form.Item>
          {
            adBlockerExists ? '' :
            paymentMethod === 'Paypal' ?
            <>
              <Row>
              <Col span={17} offset={4} className="paypal-container">
                {
                  termsChecked ? 
                  <PaypalBtn 
                    env={'sandbox'} 
                    client={client} 
                    currency={'GBP'} 
                    total={parseInt(balance) + parseInt(balance * vat / 100)} 
                    locale={'en_GB'} 
                    style={style}
                    className="paypal-button"
                    onError={onError}
                    disabled
                    onSuccess={onSuccess} 
                    onCancel={onCancel}
                  /> :
                  <Button type="primary" className="paypal-button" size="large" disabled={!termsChecked}>Pay with Paypal</Button>

                }
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
                termsChecked={termsChecked}
              />
            </Elements>
          }
        </Col>
      </Row>
      <Drawer
            title={<><Icon type="paper-clip" /> NMC Terms and Conditions</>}
            placement="right"
            className="terms-drawer"
            closable={true}
            width={680}
            onClose={hideTermsDrawer}
            visible={termsDrawer}
          >
            <span>
              <h2><u>Licence Agreement Terms</u></h2>
              {
                map(term => {
                  return(
                    <span key={term.id}>
                      <h3>{term.title}</h3>
                      <p>{term.text}</p>
                      {
                        isEmptyOrNull(term.options) ? '' : <Terms options={term.options} />

                      }
                    </span>
                  )
                }, TERMS)
              }
            </span>
          </Drawer>
    </div>
  )
}

export default PaymentForm 
