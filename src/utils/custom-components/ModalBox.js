import React from 'react'
import { Modal } from 'antd'
import { isEmptyOrNull } from '../helpers'

export const ModalBox = ({
  content,
  title,
  visible,
  submitHandler,
  cancelHandler,
  submitText,
  top,
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
      style={{ top: isEmptyOrNull(top) ? '' : `${top}px` }}
      okButtonProps={{ className: 'success-btn', disabled: submitDisabled, size: 'small' }}
      cancelButtonProps={{ type: 'primary', size: 'small' }}
      onCancel={cancelHandler}
      okText={submitText}
      cancelText={cancelText}
    >
      {content}
    </Modal>
  )
}
