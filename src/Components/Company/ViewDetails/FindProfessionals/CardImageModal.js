import React from 'react'
import { defaultTo } from 'ramda'
import { Modal } from 'antd'
import { DOCUMENTS_URL as url } from '../../../../constants'

export const CardImageModal = (props) => {

  const { profile, imageModal, setImageModal } = props
  const { fullName, profilePicture } = defaultTo({}, profile)

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
