import React from 'react'
import { Icon } from 'antd'
import { Loader, ModalBox } from '../../../../utils/custom-components'
import { defaultTo, equals } from 'ramda'
import PersonalDetailsForm from '../../Forms/PersonalDetailsForm'
import ProfessionalDetailsForm from '../../Forms/ProfessionalDetailsForm'
import PaymentCycleForm from '../../Forms/PaymentCycleForm'
import PasswordForm from '../../Forms/PasswordForm'

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
    changePostalCode
  } = props

  const title = equals(formName, 'Password') ? 'Enter your Password' : `Edit ${formName} Details`
  const { isLoading = false } = defaultTo({}, addresses)

  const submitHandler = () => {
    if(equals(formName, 'Password')){
      updateCompany()
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
      return <PaymentCycleForm formValues={formValues} />
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
      submitDisabled={formInvalid}
      submitHandler={submitHandler}
      cancelHandler={hideEditFormModal}
    />
  )
}
