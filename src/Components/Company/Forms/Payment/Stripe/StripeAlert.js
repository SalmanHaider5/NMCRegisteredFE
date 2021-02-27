import React from 'react'
import { STRIPE_WEB_LINK } from '../../../../../constants'

export const StripeAlert = () => {
  return (
    <>
      <a href={STRIPE_WEB_LINK}>
        <b> Stripe </b>
      </a>
      payments are Strong Customer Authentication (SCA) ready, Dynamic 3-D Secure and PCI Compliant
    </>
  )
}
