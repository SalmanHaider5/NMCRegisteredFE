import React from 'react'
import { Field } from 'redux-form'
import { defaultTo } from 'ramda'
import { Form, Button, Icon, Row, Col } from 'antd'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'

const StripeCardPayment = ({ secret, formValues, makePaymentRequest, skipPaymentOption, adBlockerExists, termsChecked }) => {
  const { firstName, lastName } = defaultTo({}, formValues)
  
  const options = {
    hidePostalCode: true,
    showIcon: true
  }
  const stripe = useStripe()
  const elements = useElements()

  const makePayment = async (e) => {
    e.preventDefault();

    makePaymentRequest({})

    if(!stripe || !elements){
      return;
    }

    const response = await stripe.confirmCardPayment(secret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: `${firstName} ${lastName}`
        }
      }
    })
    makePaymentRequest(response)
  }
  return (
    <span>
      <Form.Item
        label="Card Number"
        labelCol={{ span: 5, offset: 3 }}
        wrapperCol={{ span: 12, offset: 1 }}
        colon={false}
      >
        <Field
          name="cardNumber"
          component={CardNumberElement}
          options={options}
        />
      </Form.Item>
      <Form.Item
        label="Card Expiry"
        labelCol={{ span: 5, offset: 3 }}
        wrapperCol={{ span: 12, offset: 1 }}
        colon={false}
      >
        <Field
          name="cardExpiry"
          component={CardExpiryElement}
          options={options}
        />
      </Form.Item>
      <Form.Item
        label="CVC"
        labelCol={{ span: 5, offset: 3 }}
        wrapperCol={{ span: 12, offset: 1 }}
        colon={false}
      >
        <Field
          name="cvc"
          component={CardCvcElement}
          options={options}
        />
      </Form.Item>
      <Row>
        <Col span={12} offset={11}>
          <Button type="danger" onClick={skipPaymentOption}>
            Skip <Icon type="right" />
          </Button>
          <Button className="success-btn" style={{ marginLeft: '20px' }} disabled={!termsChecked}  onClick={makePayment}>
            <Icon type="pound" /> Make Payment
          </Button>
        </Col>
      </Row>
    </span>
  )
}
export default StripeCardPayment
