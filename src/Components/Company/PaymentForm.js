import React from 'react'
import { isNil } from 'ramda'
import { create } from 'braintree-web/client'
import { Radio, Icon } from 'antd'

const PaymentForm = ({ token, paymentMethod, changePaymentMethod }) => {


  if(!isNil(token) && !isNil(paymentMethod)){
    create({
      authorization: token
    }, (err, client) => {
      if(err) console.log('Error', err)
      else {
        console.log(client)
      }
    })
  }
  return (
    <div className="payment-container">
      <Radio.Group value={paymentMethod} onChange={changePaymentMethod}>
        <Radio className="radio-button" value={'Paypal'}>
          <Icon/> Paypal
        </Radio>
        {
          paymentMethod === 'Paypal' ?
          <p>Paypal</p> :
          ''
        }
        <Radio className="radio-button" value={'Cards'}>
          <Icon/> Credit/Debit Cards
        </Radio>
        {
          paymentMethod === 'Cards' ?
          <p>
            <form action="/" id="my-sample-form">
              <input type="hidden" name="payment_method_nonce"/>
              <label for="card-number">Card Number</label>
              <div id="card-number"></div>

              <label for="cvv">CVV</label>
              <div id="cvv"></div>

              <label for="expiration-date">Expiration Date</label>
              <div id="expiration-date"></div>

              <input id="my-submit" type="submit" value="Pay" disabled/>
            </form>
          </p> :
          ''
        }
      </Radio.Group>
    </div>
  )
}

export default PaymentForm 
