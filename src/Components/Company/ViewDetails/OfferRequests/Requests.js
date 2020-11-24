import React from 'react'
import { Table, Row, Descriptions } from 'antd'
import { map, split } from 'ramda'

export const Requests = ({ offers, columns }) => {
  return (
    <div className="requests-list-container">
      <Table
        bordered
        rowKey="id"
        columns={columns}
        dataSource={offers}
        size="small"
      />
    </div>
  )
}

export const SingleRequest = ({ offer }) => {
  const { id, status, professionalName, professionalNmc, shiftRate, message, shifts } = offer
  return(
    <div>
      <Row gutter={16}>
        <Descriptions bordered>
          <Descriptions.Item label="Offer ID" span={2}>{id}</Descriptions.Item>
          <Descriptions.Item label="Shift Rate" span={2}>GBP {shiftRate}/hour</Descriptions.Item>
          <Descriptions.Item label="Professional Name" span={2}>{professionalName}</Descriptions.Item>
          <Descriptions.Item label="Professional NMC Pin" span={2}>{professionalNmc}</Descriptions.Item>
          <Descriptions.Item label="Message" span={2}>{message}</Descriptions.Item>
          <Descriptions.Item label="Status" span={2} className="status-item">{status}</Descriptions.Item>
          <Descriptions.Item label="Shifts" span={4}><ul>{ map(shift=> <li key={shift}>{shift}</li>, split(',', shifts || '')) }</ul></Descriptions.Item>
        </Descriptions>
      </Row>
    </div>
  )
}
