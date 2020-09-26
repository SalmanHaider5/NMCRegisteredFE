import React from 'react'
import { Field, FormSection } from 'redux-form'
import { isNumber, isRequired } from '../../../../constants'
import { MultilineTextField, TextField } from '../../../../utils/custom-components'
import { MultiCheckField } from '../../../../utils/custom-components/MultiCheckField'

export const OfferForm = ({ company, offerFormShifts }) => {
  const { address, city, postalCode } = company
  return (
    <div className="offer-form-container">
      <FormSection name="offerForm">
        <Field
          name="shiftRate"
          component={TextField}
          label="Shift Rate"
          specialText={'per hour (GBP)'}
          validate={[isNumber, isRequired]}
        />
        <Field
          name="shifts"
          component={MultiCheckField}
          label='Select Shifts'
          options={offerFormShifts}
          validate={[isRequired]}
        />
        <Field
          name="companyAddress"
          component={MultilineTextField}
          label="Company Address"
          readOnly={true}
          fieldData={`${address}, ${city}, Postal Code ${postalCode}`}
        />
        <Field
          name="message"
          component={MultilineTextField}
          label="Customized Message"
          specialText='You can ask for different shifts through message'
        />
      </FormSection>
    </div>
  )
}
