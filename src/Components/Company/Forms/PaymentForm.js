import React from 'react'
import { Field } from 'redux-form'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripeCardPayment from './StripeCardPayment'
import { TextField } from '../../../utils/custom-components'

const PaymentForm = ({ formValues, secret, makePaymentRequest }) => {
  const { firstName, lastName, postalCode, balance } = formValues
  const stripePromise = loadStripe("pk_test_cmqEvoYCsQr8Ur3q2AoEY5V800VuRo430P")
  return (
    <div className="payment-container">
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
      <Field
        name="balance"
        component={TextField}
        label={'Licensing Fee (GBP)'}
        fieldData={balance}
        readOnly={true}
      />
      <Elements stripe={stripePromise}>
        <StripeCardPayment
          secret={secret}
          formValues={formValues}
          makePaymentRequest={makePaymentRequest}
        />
      </Elements>
    </div>
  )
}

export default PaymentForm 
