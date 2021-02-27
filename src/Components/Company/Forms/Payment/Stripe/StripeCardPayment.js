import React from 'react'
import { Field } from 'redux-form'
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js'
import { defaultTo, has, join, not, replace } from 'ramda'
import { Form, Button, Icon, Row, Col } from 'antd'
import { isEmptyOrNull, showToast } from '../../../../../utils/helpers'

const StripeCardPayment = (props) => {
  
  const {
    secret,
    formValues,
    makePaymentRequest,
    skipPaymentOption,
    termsChecked,
    initProcess,
    finishProcess
  } = props,
    { firstName, lastName } = defaultTo({}, formValues)
  
  const options = {
    hidePostalCode: true,
    showIcon: true
  }
  const stripe = useStripe()
  const elements = useElements()

  const makePayment = async (e) => {
    e.preventDefault();

    initProcess()

    if(!stripe || !elements){
      return;
    }

    const response = await stripe.confirmCardPayment(secret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: join(' ', [firstName, lastName])
        }
      }
    })

    const hasError = has('error')

    if(not(isEmptyOrNull(response))){
      finishProcess()
    }

    if(hasError(response)){
      const {
        error: { code, message }
      } = response,
        title = replace('_', ' ', code).replace(/\b\w/g, l => l.toUpperCase())

      showToast(title, message, 'error')

    }else{
      await makePaymentRequest(response)
    }
  }
  return (
    <>
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
          <Button
            type="danger"
            shape="round"
            onClick={skipPaymentOption}
          >
            Skip <Icon type="right" />
          </Button>
          <Button
            shape="round"
            className="success-btn"
            style={{ marginLeft: '20px' }}
            disabled={!termsChecked} 
            onClick={makePayment}
          >
            <Icon type="check" /> Make Payment
          </Button>
        </Col>
      </Row>
    </>
  )
}
export default StripeCardPayment
