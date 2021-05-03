import React from 'react'
import { Field } from 'redux-form'
import { Alert } from 'antd'
import { defaultTo } from 'ramda'
import { RadioField, CheckboxField } from '../../../utils/custom-components'
import { isRequired, paymentCycleDescription } from '../../../constants'

const PaymentCycleForm = ({ formValues }) => {

  const { paymentCycle, locationCheck } = defaultTo({}, formValues)
  
  return (
    <div className="payment-cycle-form">
      <div className="location-check">
        <p>
          All licenses are "single site location" licenses. (Place of business)
        </p>
        <p>
          Please ensure you are on the "site location" for license use before purchase and location settings are "activated" on your device. Turning off location settings can invalidate your license.
        </p>
        <p>
          <Field
            name="locationCheck"
            component={CheckboxField}
            text={`Please check this box to give permission for your location to be registered.`}
          />
        </p>
      </div>
      {
        locationCheck ?
        <>
          <Alert
            showIcon
            className='payment-cycle-alert'
            message="Payment Cycle"
            description={paymentCycleDescription}
            type="info"
          />
          <Field
            name="paymentCycle"
            component={RadioField}
            label={'Payment Cycle'}
            options={['Weekly', 'Fortnightly', 'Monthly']}
            value={paymentCycle}
            size={'large'}
            type="text"
            validate={[isRequired]}
            tooltipPlacement={'topRight'}
          />
        </> : ''
      }
    </div>
  )
}

export default PaymentCycleForm
