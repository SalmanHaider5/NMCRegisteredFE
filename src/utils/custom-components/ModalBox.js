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
  submitDisabled,
  size
}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={submitHandler}
      width={size}
      okButtonProps={{ className: 'success-btn', disabled: submitDisabled }}
      cancelButtonProps={{type: 'primary'}}
      onCancel={cancelHandler}
      okText={submitText}
      cancelText={cancelText}
    >
      {content}
    </Modal>
  )
}
