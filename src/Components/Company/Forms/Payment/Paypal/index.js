import React from 'react'
import { defaultTo } from 'ramda'
import { Row, Button, Icon } from 'antd'
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { PAYPAL_OPTIONS as options } from '../../../../../constants'
import { PaypalButton } from './Button'


const Paypal = (props) => {

  const { skipPaymentOption, formValues } = props,
    { termsChecked } = defaultTo({}, formValues)

  return (
    <Row>
      {
        termsChecked ?
        <div className="paypal-btn-container">
          <Button
            type="danger"
            shape="round"
            className="skip-paypal"
            onClick={skipPaymentOption}
          >
            Skip <Icon type="right" />
          </Button>
          <PayPalScriptProvider options={options}>
            <PaypalButton {...props} />
          </PayPalScriptProvider>
        </div> : ''
      }
    </Row>
  )
}

export default Paypal
