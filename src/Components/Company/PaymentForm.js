import React from 'react'
import { isNil } from 'ramda'
import { Radio } from 'antd'
import dropin from "braintree-web-drop-in"

const PaymentForm = ({ token, paymentMethod, changePaymentMethod }) => {


  if(!isNil(token) && !isNil(paymentMethod)){
    const paypalOptions = {
      authorization: token,
      container: '.paypal-container',
      card: false,
      paypal: {
        flow: 'vault',
        buttonStyle: {
          color: 'blue',
          size: 'large',
          shape: 'rect'
        }
      }
    }

    const cardOptions = {
      authorization: token,
      container: '.card-container',
      card: {
        cardholderName: true
      }
    }

    const getPaymentOptions = method => {
      return method === 'Paypal' ? paypalOptions : cardOptions
    }
    dropin.create(getPaymentOptions(paymentMethod), (err, instance) => {
      console.log(instance)
    })
  }
  return (
    <div className="payment-container">
      <div className="steps-header">
        <h3>Payment Method</h3>
      </div>
      <Radio.Group value={paymentMethod} onChange={changePaymentMethod}>
        <Radio className="radio-button" value={'Paypal'}>
          Paypal
        </Radio>
        {
          paymentMethod === 'Paypal' ?
          <div className="paypal-container"></div> :
          ''
        }
        <Radio className="radio-button" value={'Cards'}>
          Credit/Debit Cards
        </Radio>
      </Radio.Group>
      {
        paymentMethod === 'Cards' ?
        <div className="card-container"></div>:
        ''
      }
    </div>
  )
}

export default PaymentForm 
