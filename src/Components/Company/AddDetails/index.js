import React from 'react'
import { defaultTo, isEmpty, or } from 'ramda'
import PersonalDetailsForm from '../Forms/PersonalDetailsForm'
import { PaymentContainer } from '../Forms/Payment'
import ProfessionalDetailsForm from '../Forms/ProfessionalDetailsForm'
import PaymentCycleForm from '../Forms/PaymentCycleForm'
import { FormContainer, Loader } from '../../../utils/custom-components'
import { isEmptyOrNull } from '../../../utils/helpers'

const AddDetails = (props) => {

  const {
    profile,
    formInvalid,
    formValues,
    addresses,
    findAddresses,
    saveDetails,
    stripeSecret,
    initProcess,
    finishProcess,
    adBlockerExists,
    addressSelectHandler,
    changePostalCode,
    skipPaymentOption,
    charityStatusChange,
    makePaymentRequest,
    requestPaypalPayment,
    getPaymentClientToken,
    subsidiaryStatusChange
  } = props

  const { isLoading } = defaultTo({}, addresses)

  const tabs = [
    {
      key: '1',
      icon: "user",
      label: "Personal Details",
      wrapper: <PersonalDetailsForm />,
      validation: formInvalid
    },
    {
      key: 2,
      icon: 'history',
      label: "Payment Cycle",
      wrapper: <PaymentCycleForm formValues={formValues} />,
      validation: formInvalid
    },
    {
      key: 3,
      icon: 'highlight',
      label: 'Company Details',
      wrapper: <Loader
        size="large"
        isLoading={isLoading}
        loadingText={'Loading Addresses...'}
        wrapper={
          <ProfessionalDetailsForm
            formValues={formValues}
            addresses={addresses}
            findAddresses={findAddresses}
            addressSelectHandler={addressSelectHandler}
            changePostalCode={changePostalCode}
            subsidiaryStatusChange={subsidiaryStatusChange}
            charityStatusChange={charityStatusChange}
          />
        }
      />,
      validation:  or(formInvalid, isEmpty(addresses.addresses))
    }
  ]

  const { firstName } = defaultTo({}, profile)
  
  return (
    <>
      <FormContainer
        icon="bank"
        tabs={isEmptyOrNull(firstName)}
        tabsData={tabs}
        tabsSubmit={saveDetails}
        title={"Payment Process"}
        wrapper={
          <PaymentContainer
            formValues={formValues}
            initProcess={initProcess}
            stripeSecret={stripeSecret}
            finishProcess={finishProcess}
            skipPaymentOption={skipPaymentOption}
            adBlockerExists={adBlockerExists}
            requestPaypalPayment={requestPaypalPayment}
            getPaymentClientToken={getPaymentClientToken}
            makePaymentRequest={makePaymentRequest}
          />
        }
      />
    </>
  )
}
export default AddDetails