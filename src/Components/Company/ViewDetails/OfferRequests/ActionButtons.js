import React from 'react'
import { Tooltip, Button, Popconfirm } from 'antd'
import { equals } from 'ramda'

export const ActionButtons = ({ id, offer, viewClickHandler, updateOfferStatus }) => {
  return (
    <>
      <Tooltip title="Check Details">
        <Button type="primary" shape="circle" icon="eye" onClick={() => viewClickHandler(id)} />
      </Tooltip>
      <Tooltip title="Approve Request">
        <Popconfirm
          title='Are you sure to approve this professional?'
          onConfirm={() => updateOfferStatus(id, 'approved')}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" shape="circle" icon="check" disabled={!equals(offer.status, 'accepted')} />
        </Popconfirm>
        </Tooltip>
        <Tooltip title="Reject Request">
          <Popconfirm
            title='Are you sure to reject this professional?'
            onConfirm={() => updateOfferStatus(id, 'rejected')}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" shape="circle" icon="close" disabled={!equals(offer.status, 'accepted')} />
          </Popconfirm>
        </Tooltip>
    </>
  )
}
