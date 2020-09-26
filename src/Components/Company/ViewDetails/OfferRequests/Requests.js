import React from 'react'
import { Table } from 'antd'

export const Requests = ({ offers, columns }) => {
  return (
    <div>
      <Table columns={columns} dataSource={offers} size="small" pagination={{ position: 'none' }} bordered />
    </div>
  )
}
