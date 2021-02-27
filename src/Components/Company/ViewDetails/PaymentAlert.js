import React from 'react'
import { Alert, Button } from 'antd'

export const PaymentAlert = (props) => {

  const title = 'Payment Pending: '
  const message = 'You have not paid yet, please make your payment to use all features of this application. To make payment please '
  const { showPaymentForm } = props

  return (
    <div className="error-alert">
      <Alert
        type="error"
        showIcon
        message={<>
          <strong> {title} </strong>
          {message}
          <Button
            type="link"
            className="payment-button"
            onClick={showPaymentForm}
            > Click here
            </Button>
          </>
        }
      />
    </div>
  )
}
