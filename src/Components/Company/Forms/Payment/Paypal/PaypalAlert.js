import React from 'react'
import { PAYPAL_WEB_LINK } from '../../../../../constants'

export const PaypalAlert = () => {
  return (
    <>
      <a href={PAYPAL_WEB_LINK}>
        <b> PayPal </b>
      </a>
      appears safe for buyers, as the site platform is both secure and encrypted
    </>
  )
}
