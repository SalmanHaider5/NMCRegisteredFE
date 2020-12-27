import React, { useState } from 'react'
import { Field } from 'redux-form'
import { defaultTo} from 'ramda'
import { Button, Form } from 'antd'
import { TextField, CheckboxField } from '../../../utils/custom-components'
import { isRequired } from '../../../constants'
import { TermsDrawer } from './Payment/TermsDrawer'

const PaymentForm = ({ formValues, showTermsDrawer }) => {

  const [drawerVisible, setDrawerVisible] = useState(false)
  const [docType, setDocType] = useState('terms')
  const { firstName, lastName } = defaultTo({}, formValues)

  const hideDrawer = () => {
    setDocType('terms')
    setDrawerVisible(false)
  }

  return (
    <>
      <Field
        name="Name"
        component={TextField}
        label={'Name'}
        fieldData={firstName +' '+ lastName}
        readOnly={true}
      />
      <Form.Item
        label="Accept Terms"
        labelCol={{ span: 5, offset: 3 }}
        wrapperCol={{ span: 12, offset: 1 }}
        style={{ margin: '0' }}
        colon={false}
      >
        <Field
          name="termsChecked"
          component={CheckboxField}
          text={
            <> I agree to
              <Button
                className="link-button"
                type="link"
                onClick={() => setDrawerVisible(true)}
                >
                  NMC Terms & Conditions
                </Button>
            </>
          }
          size={'large'}
          type={'password'}
          validate={[isRequired]}
          tooltipPlacement={'topRight'}
        />
      </Form.Item>
      <TermsDrawer
        docType={docType}
        drawerVisible={drawerVisible}
        setDocType={setDocType}
        hideDrawer={hideDrawer}
      />
    </>
  )
}

export default PaymentForm 
