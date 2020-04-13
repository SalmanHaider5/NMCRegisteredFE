import React from 'react'
import { Table } from 'antd'
import { PROFESSIONAL_COLUMNS as columns } from '../../../../constants'

const ProfessionalsList = ({ professionals }) => {
  return (
    <Table
      bordered
      columns={columns}
      dataSource={professionals}
      size="small"
      title={() => <b>Professionals List</b>}
    />
  )
}
export default ProfessionalsList
