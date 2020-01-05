import React from 'react'
import { Table } from 'antd'

import { TableTitle } from '../../../utils/custom-components'

const CustomersList = (props) => {
  const { customers, onSearch } = props
  const { Column } = Table
  return(
    <div className="customers-table">
      <Table
        dataSource={customers}
        bordered={true}
        size="middle"
        rowKey={customer => customer.id}
        title={()=>
          <TableTitle
            title="Customers"
            onSearch={onSearch}
            searchHint="Search by Customer's Email"
          />}
        pagination={false}
      >
        <Column
          title="ID"
          dataIndex="id"
        />
        <Column
          title="Name"
          dataIndex="name"
        />
        <Column
          title="Email"
          dataIndex="email"
        />
        <Column
          title="Phone"
          dataIndex="phone"
        />
        <Column
          title="Address"
          dataIndex="address"
        />
      </Table>
    </div>
  )
}

export default CustomersList