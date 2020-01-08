import React from 'react'
import { Field } from 'redux-form'
import { Button, Icon } from 'antd'
import { TextField, MultilineTextField } from '../../../utils/custom-components/'
import { isRequired } from '../../../constants'

export const Basics = ({
  basics: { primaryemail, secondaryemail, phone, whatsapp, address, paypal },
  basicsReadOnly,
  editBasicsForm,
  saveBasicsForm
}) => {
  return (
    <div className="form">
      <h2>Basic Details</h2>
      <Button
        type="primary"
        className="basics-edit-button"
        onClick={basicsReadOnly ? editBasicsForm : saveBasicsForm}
      >
        <Icon type={basicsReadOnly ? 'edit' : 'save'} />
      </Button>
      <div className="form-fields">
        <div className="field">
          <Field
            name="primaryemail"
            label="Primary Email"
            component={TextField}
            type="text"
            fieldData={primaryemail}
            validate={[isRequired]}
            specialText="You can't edit this field"
            readOnly={true}
          />
        </div>
        <div className="field">
          <Field
            name="secondaryemail"
            label="Secondary Email"
            component={TextField}
            type="text"
            fieldData={secondaryemail}
            readOnly={basicsReadOnly}
          />
        </div>
      </div>
      <div className="form-fields">
        <div className="field">
          <Field
            name="phone"
            label="Phone"
            component={TextField}
            type="text"
            fieldData={phone}
            readOnly={basicsReadOnly}
          />
        </div>
        <div className="field">
          <Field
            name="whatsapp"
            label="WhatsApp"
            component={TextField}
            type="text"
            fieldData={whatsapp}
            readOnly={basicsReadOnly}
          />
        </div>
      </div>
      <div className="form-fields">
        <div className="field">
          <Field
            name="paypal"
            label="Paypal Account"
            component={TextField}
            type="text"
            fieldData={paypal}
            readOnly={basicsReadOnly}
          />
        </div>
      </div>
      <div className="form-fields">
        <div className="field">
          <Field
            name="address"
            label="Address"
            fieldData={address}
            component={MultilineTextField}
            rows={4}
            rowsMax={7}
            placeholder="Enter Address..."
            readOnly={basicsReadOnly}
          />
        </div>
      </div>
    </div>
  )
}