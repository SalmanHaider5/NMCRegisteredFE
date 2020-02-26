import React from 'react'
import { Modal } from 'antd'

export const ModalBox = ({
  content,
  title,
  visible,
  submitHandler,
  cancelHandler,
  submitText,
  cancelText,
  size
}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={submitHandler}
      width={size}
      okButtonProps={{ className: 'success-btn' }}
      cancelButtonProps={{type: 'primary'}}
      onCancel={cancelHandler}
      okText={submitText}
      cancelText={cancelText}
    >
      {content}
    </Modal>
  )
}
