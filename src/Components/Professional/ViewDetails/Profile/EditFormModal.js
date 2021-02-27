import React from 'react'
import { defaultTo, equals } from 'ramda'
import { Icon } from 'antd'
import { Loader, ModalBox } from '../../../../utils/custom-components'
import PersonalDetailsForm from '../../DetailForms/PersonalDetailsForm'
import AddressForm from '../../DetailForms/AddressForm'
import ProfessionalDetailsForm from '../../DetailForms/ProfessionalDetailsForm'
import BankDetailsForm from '../../DetailForms/BankDetailsForm'

export const EditFormModal = (props) => {

  const {
    formName,
    formModal,
    profile,
    formValues,
    dateHandler,
    addresses,
    formInvalid,
    findAddresses,
    addressSelectHandler,
    changePostalCode,
    imageRemoveHandler,
    modifyBankDetails,
    hideEditFormModal,
    updateProfessionalDetails
  } = props

  const title = `Edit ${formName} Details`,
    modalSize = equals(formName, 'Personal') ? 600 : equals(formName, 'Bank') ? 1050 : 850,
    { dateOfBirth } = defaultTo({}, profile),
    { isLoading } = defaultTo({}, addresses)

  const getModalContent = formName => {

    if(equals(formName, 'Personal')){
      return <PersonalDetailsForm
        dateOfBirth={dateOfBirth}
        formValues={formValues}
        dateHandler={dateHandler}
      />
    }

    else if(equals(formName, 'Address'))
      return<Loader
        size="large"
        isLoading={isLoading}
        loadingText="Loading Addresses..."
        wrapper={
          <AddressForm
            formValues={formValues}
            addresses={addresses}
            findAddresses={findAddresses}
            addressSelectHandler={addressSelectHandler}
            changePostalCode={changePostalCode}
          />
        }
      />

    else if(equals(formName, 'Professional'))
      return <ProfessionalDetailsForm
        formValues={formValues}
        imageRemoveHandler={imageRemoveHandler}
      />

    else if(equals(formName, 'Bank'))
      return <BankDetailsForm />

  }

  return (
    <ModalBox
      title={<><Icon type="edit" /> {title}</>}
      visible={formModal}
      size={modalSize}
      content={getModalContent(formName)}
      submitText={<><Icon type="check" /> Save</>}
      cancelText={<><Icon type="close" /> Cancel</>}
      submitDisabled={formInvalid}
      submitHandler={equals(formName, 'Bank') ? modifyBankDetails : updateProfessionalDetails}
      cancelHandler={hideEditFormModal}
    />
  )
}
