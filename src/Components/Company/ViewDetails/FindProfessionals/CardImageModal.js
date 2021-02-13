import React from 'react'
import { defaultTo } from 'ramda'
import { Modal } from 'antd'
import { DOCUMENTS_URL as url } from '../../../../constants'

export const CardImageModal = (props) => {

  const { professional, imageModal, setImageModal } = props
  const { fullName, profilePicture } = defaultTo({}, professional)

  const imageStyle = {
    width: '100%'
  }

  return (
    <Modal
      visible={imageModal}
      onCancel={() => setImageModal(false)}
      footer={null}
      bodyStyle={{
        padding: 0
      }}
    >
      <div className="professionals-card modal-image">
        <img
          alt={fullName}
          src={`${url}${profilePicture}`}
          style={imageStyle}
        />
      </div>
    </Modal>
  )
}
