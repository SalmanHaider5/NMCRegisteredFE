import React from 'react'
import { defaultTo } from 'ramda'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripeCardPayment from './StripeCardPayment'
import { STRIPE_KEY } from '../../../../../constants'

export const Stripe = (props) => {

  const {
    stripeSecret,
    formValues,
    initProcess,
    finishProcess,
    makePaymentRequest,
    skipPaymentOption
  } = props,
    stripePromise = loadStripe(STRIPE_KEY),
    { termsChecked = false } = defaultTo({}, formValues)

  return (
    <Elements stripe={stripePromise}>
      <StripeCardPayment
        secret={stripeSecret}
        formValues={formValues}
        initProcess={initProcess}
        skipPaymentOption={skipPaymentOption}
        finishProcess={finishProcess}
        termsChecked={termsChecked}
        makePaymentRequest={makePaymentRequest}
      />
    </Elements>
  )
}
