import React, { useState } from 'react'
import { defaultTo, equals, not } from 'ramda'
import { Icon } from 'antd'
import { Loader, ModalBox } from '../../../../utils/custom-components'
import PersonalDetailsForm from '../../DetailForms/PersonalDetailsForm'
import AddressForm from '../../DetailForms/AddressForm'
import ProfessionalDetailsForm from '../../DetailForms/ProfessionalDetailsForm'
import BankDetailsForm from '../../DetailForms/BankDetailsForm'
import PasswordForm from '../../DetailForms/PasswordForm'
import EmailForm from '../../DetailForms/EmailForm'
import PhoneForm from '../../DetailForms/PhoneForm'

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
    showEditFormModal,
    emailForm,
    phoneForm,
    updatePhone,
    modifyBankDetails,
    hideEditFormModal,
    updateEmail,
    updateProfessionalDetails
  } = props

  console.log('F', emailForm, phoneForm)

  const [editForm, setEditForm] = useState('')

  const { phone = '', confirmPhone = '', email = '', confirmEmail = '' } = defaultTo({}, formValues)

  const title = equals(formName, 'Password') ? 'Enter your Password' : `Edit ${formName} Details`,
    modalSize = equals(formName, 'Personal') || equals(formName, 'Password') ? 600 : equals(formName, 'Bank') ? 1050 : 850,
    { dateOfBirth } = defaultTo({}, profile),
    { isLoading } = defaultTo({}, addresses)

  const getDisabledButton = () => {
    if(emailForm){
      return formInvalid || not(equals(email, confirmEmail))
    }else if(phoneForm){
      return formInvalid || not(equals(phone, confirmPhone))
    }else{
      return formInvalid
    }
  }
  
  const showPasswordForm = () => {
    if(equals(formName, 'Password')){
      if(equals(editForm, 'Bank')){
        modifyBankDetails()
      }else{
        if(emailForm){
          updateEmail()
        }else if(phoneForm){
          updatePhone()
        }else{
          updateProfessionalDetails()
        }
      }
    }else{
      setEditForm(formName)
      showEditFormModal('Password')
    }
  }

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
    
    else if(equals(formName, 'Email'))
        return <EmailForm />
    
    else if(equals(formName, 'Phone'))
        return <PhoneForm />

    else if(equals(formName, 'Password'))
        return <PasswordForm />

  }

  return (
    <>
      <ModalBox
        title={title}
        titleIcon={'edit'}
        visible={formModal}
        size={modalSize}
        content={getModalContent(formName)}
        submitText={<><Icon type="check" /> Save</>}
        cancelText={<><Icon type="close" /> Cancel</>}
        submitDisabled={getDisabledButton()}
        submitHandler={showPasswordForm}
        cancelHandler={hideEditFormModal}
      />
    </>
  )
}
