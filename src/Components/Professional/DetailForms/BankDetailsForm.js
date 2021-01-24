import React from 'react'
import { Field, FormSection } from 'redux-form'
import { Alert, Row, Col } from 'antd'
import { TextField, CheckboxField } from '../../../utils/custom-components'
import { isRequired, isNumber, min6CharactersRequired, min9CharactersRequired } from '../../../constants'

const BankDetailsForm = () => {
  return (
    <FormSection name="bankDetails">
      <Row className="form-alert">
        <Col>
          <Alert
            message="Permission Required"
            description="To allow payment directly to your bank account we require your permission to give these
            details to payroll"
            type="info"
            showIcon
          />
        </Col>
      </Row>
      <Field
        name="insurance"
        component={TextField}
        maxLength={9}
        label={'National Insurance Number'}
        size={'large'}
        type="text"
        validate={[isRequired, min9CharactersRequired]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="sortCode"
        component={TextField}
        maxLength={6}
        width={200}
        label={'Sort Code'}
        size={'large'}
        type="text"
        specialText={'(without dashes)'}
        validate={[isRequired, isNumber]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="accountNumber"
        component={TextField}
        maxLength={8}
        label={'Account Number'}
        size={'large'}
        type="text"
        validate={[isRequired, isNumber, min6CharactersRequired]}
        tooltipPlacement={'topRight'}
      />
      <Field
        name="permission"
        component={CheckboxField}
        label={' '}
        text={'Please tick here to confirm'}
        size={'large'}
        type="text"
        validate={[isRequired]}
        tooltipPlacement={'topRight'}
      />
    </FormSection>
  )
}

export default BankDetailsForm
