import React from 'react'
import { defaultTo } from 'ramda'
import { Icon } from 'antd'
import { OfferForm } from './OfferForm'
import { isEmptyOrNull } from '../../../../utils/helpers'
import { ModalBox } from '../../../../utils/custom-components'

export const OfferFormModal = (props) => {

  const {
    profile,
    offerModal,
    formValues,
    hideOfferModal,
    offerFormShifts,
    submitOfferRequest
  } = props

  const { offerForm = {} } = defaultTo({}, formValues)
  const { shiftRate, shifts } = offerForm

  return (
    <ModalBox
      title={<><Icon type="form" />Send an Offer Request</>}
      visible={offerModal}
      top={20}
      size={800}
      content={<OfferForm profile={profile} offerFormShifts={offerFormShifts} />}
      submitText={<><Icon type="check" /> Send</>}
      cancelText={<><Icon type="close" /> Cancel </>}
      cancelHandler={hideOfferModal}
      submitHandler={submitOfferRequest}
      submitDisabled={isEmptyOrNull(shiftRate) || isEmptyOrNull(shifts)}
    />
  )
}
