import React from 'react'
import { Modal, Icon } from 'antd'
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
  cancelDisabled,
  closable = true,
  size,
  titleIcon = 'user'
}) => {

  const buttonStyles = {
    minWidth: '100px',
    height: '35px',
    borderRadius: '30px'
  }

  const maskStyle = {
    backdropFilter: 'blur(3px)'
  }

  return (
    <Modal
      title={<><Icon type={titleIcon} /> {title}</>}
      visible={visible}
      closable={closable}
      maskStyle={maskStyle}
      onOk={submitHandler}
      width={size}
      style={{ top: isEmptyOrNull(top) ? '' : `${top}px` }}
      okButtonProps={{ className: 'success-btn', disabled: submitDisabled, style: buttonStyles }}
      cancelButtonProps={{ type: 'danger', disabled: cancelDisabled, style: buttonStyles }}
      onCancel={cancelHandler}
      okText={submitText}
      cancelText={cancelText}
    >
      {content}
    </Modal>
  )
}
