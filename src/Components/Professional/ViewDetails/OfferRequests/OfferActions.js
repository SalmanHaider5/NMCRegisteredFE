import React from 'react'
import { Popconfirm, Button, Icon } from 'antd'

export const OfferActions = (props) => {

  const { selectedOffer, updateOfferStatus } = props,
    { id } = selectedOffer

  return (
    <div className="action-buttons">
      <Popconfirm
        title="Are you sure to decline this offer?"
        okText="Yes"
        onConfirm={() => updateOfferStatus(id, 'declined')}
        cancelText="No"
      >
        <Button type="danger" shape="round">
          <Icon type="close" /> Decline
        </Button>
      </Popconfirm>
      <Popconfirm
        title="Are you sure to accept this offer?"
        okText="Yes"
        onConfirm={() => updateOfferStatus(id, 'accepted')}
        cancelText="No"
      >
        <Button shape="round" className="success-btn">
          <Icon type="check" /> Accept
        </Button>
      </Popconfirm>
    </div>
  )
}
