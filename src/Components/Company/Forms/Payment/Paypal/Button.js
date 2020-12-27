import React from 'react'
import { defaultTo, not } from 'ramda'
import{ PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { PAYPAL_BUTTON_STYLE as style } from '../../../../../constants'
import { isEmptyOrNull, showToast } from '../../../../../utils/helpers'

export const PaypalButton = (props) => {

  const { formValues, requestPaypalPayment } = props,
    { vat, balance, termsChecked } = defaultTo({}, formValues),
    netAmount = parseInt(balance) + parseInt(balance * vat / 100)

  const [{ isPending }] = usePayPalScriptReducer(),
    orderDetails = {
      description: 'NMC Registered License',
      amount: {
        currency_code: "GBP",
        value: netAmount
      }
    }

  const onInit = (data, actions) => {
    if(not(termsChecked)){
      // actions.disable()
    }else{
      actions.enable()
    }
  }

  const createOrder = (data, actions) => {
    return actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [ orderDetails ]
    })
  }

  const title = 'Payment Failed',
    message = 'Something went wrong!',
    code = 'error'

  const processOrder = (data) => {
    
    if(not(isEmptyOrNull(data)))
      requestPaypalPayment(data)
    else
      showToast(title, message, code)
  }

  const onError = () => {
    showToast(title, message, code)
  }

  const onCancel = () => {
    showToast(title, 'Payment has been cancelled by Company', code)
  }

  return (
    <>
      {
        isPending ? '' :
        <PayPalButtons
          style={style}
          onInit={onInit}
          createOrder={createOrder}
          onApprove={processOrder}
          onCancel={onCancel}
          onError={onError}
        />
      }
    </>
  )
}
