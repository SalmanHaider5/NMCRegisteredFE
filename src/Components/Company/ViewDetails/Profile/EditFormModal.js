import React from 'react'
import { Icon } from 'antd'
import { Loader, ModalBox } from '../../../../utils/custom-components'
import { defaultTo, equals, not } from 'ramda'
import PersonalDetailsForm from '../../Forms/PersonalDetailsForm'
import ProfessionalDetailsForm from '../../Forms/ProfessionalDetailsForm'
import PaymentCycleForm from '../../Forms/PaymentCycleForm'
import PasswordForm from '../../Forms/PasswordForm'
import EmailForm from '../../Forms/EmailForm'

export const EditFormModal = (props) => {

  const {
    formModal,
    formValues,
    formName,
    addresses,
    formInvalid,
    updateCompany,
    hideEditFormModal,
    charityStatusChange,
    subsidiaryStatusChange,
    findAddresses,
    showEditFormModal,
    addressSelectHandler,
    changePostalCode,
    emailForm,
    updateEmail
  } = props

  const title = equals(formName, 'Password') ? 'Enter your Password' : `Edit ${formName} Details`
  const { isLoading = false } = defaultTo({}, addresses)
  const { userEmail = '', confirmEmail = '' } = defaultTo({}, formValues)

  const submitHandler = () => {
    if(equals(formName, 'Password')){
      if(emailForm){
        updateEmail()
      }else{
        updateCompany()
      }
    }else{
      showEditFormModal('Password')
    }
  }

  const getModalForm = form => {

    if(equals(form, 'Personal')){
      return <PersonalDetailsForm />

    }else if(equals(form, 'Company')){
      return <Loader
        size="large"
        isLoading={isLoading}
        loadingText="Loading Addresses..."
        wrapper={
          <ProfessionalDetailsForm
            formValues={formValues}
            charityStatusChange={charityStatusChange}
            subsidiaryStatusChange={subsidiaryStatusChange}
            addresses={addresses}
            findAddresses={findAddresses}
            addressSelectHandler={addressSelectHandler}
            changePostalCode={changePostalCode}
          />
        }
      />

    }else if(equals(form, 'Cycle')){
      return <PaymentCycleForm editForm={formModal} formValues={formValues} />
    }else if(equals(form, 'Email')){
      return <EmailForm />
    }else if(equals(form, 'Password')){
      return <PasswordForm />
    }
  }

  return (
    <ModalBox
      title={title}
      titleIcon={'edit'}
      visible={formModal}
      size={800}
      content={getModalForm(formName)}
      submitText={<><Icon type="check" /> Save</>}
      cancelText={<><Icon type="close" /> Cancel</>}
      submitDisabled={emailForm ? formInvalid || not(equals(userEmail, confirmEmail)) : formInvalid}
      submitHandler={submitHandler}
      cancelHandler={hideEditFormModal}
    />
  )
}
