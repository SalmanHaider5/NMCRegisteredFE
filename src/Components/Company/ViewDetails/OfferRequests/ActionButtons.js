import React from 'react'
import { Button, Popconfirm } from 'antd'

export const ActionButtons = ({ offer, updateOfferStatus }) => {

  const { id } = offer

  return (
    <div className="action-buttons">
      <Popconfirm
        title='Are you sure to reject this professional?'
        onConfirm={() => updateOfferStatus(id, 'rejected')}
        okText="Yes"
        cancelText="No"
      >
        <Button
          type="danger"
          shape="round"
          icon="close"
        >
          Reject
        </Button>
      </Popconfirm>
      <Popconfirm
        title='Are you sure to approve this professional?'
        onConfirm={() => updateOfferStatus(id, 'approved')}
        okText="Yes"
        cancelText="No"
      >
        <Button
          type="primary"
          className="success-btn"
          shape="round"
          icon="check"
        >
          Approve
        </Button>
      </Popconfirm> 
    </div>
  )
}
