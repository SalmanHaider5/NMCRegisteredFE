import React from 'react'
import { Field } from 'redux-form'
import { Alert } from 'antd'
import { defaultTo } from 'ramda'
import { RadioField } from '../../../utils/custom-components'
import { isRequired, paymentCycleDescription } from '../../../constants'

const PaymentCycleForm = ({ formValues }) => {

  const { paymentCycle } = defaultTo({}, formValues)
  
  return (
    <div className="payment-cycle-form">
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
    </div>
  )
}

export default PaymentCycleForm
