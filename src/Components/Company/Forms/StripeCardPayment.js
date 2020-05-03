import React from 'react'
import { Field } from 'redux-form'
import { Form, Button } from 'antd'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

const StripeCardPayment = ({ secret, formValues, makePaymentRequest }) => {
  const { firstName, lastName } = formValues
  const options = {
    hidePostalCode: true,
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
        card: elements.getElement(CardElement),
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
        label="Card Details"
        labelCol={{ span: 5, offset: 3 }}
        wrapperCol={{ span: 12, offset: 1 }}
        colon={false}
      >
        <Field
          name="cardDetails"
          component={CardElement}
          options={options}
        />
      </Form.Item>
      <Button onClick={makePayment}>Make Payment</Button>
    </span>
  )
}
export default StripeCardPayment
