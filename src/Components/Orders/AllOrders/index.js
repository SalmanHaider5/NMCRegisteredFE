import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Icon } from 'antd'

import { TableTitle } from '../../../utils/custom-components'

const AllOrders = (props) => {
  const { orders, onSearch } = props
  const { Column } = Table
  return(
    <div className="orders-table">
      <Table
        dataSource={orders}
        bordered={true}
        size="middle"
        rowKey={order => order.id}
        title={()=>
          <TableTitle
            title="Orders"
            onSearch={onSearch}
            searchHint="Search by Tracking Number"
          />}
        pagination={false}
      >
        <Column
          title="ID"
          dataIndex="id"
        />
        <Column
          title="Tracking No."
          dataIndex="tracking"
        />
        <Column
          title="Date"
          dataIndex="date"
        />
        <Column
          title="Status"
          dataIndex="status"
        />
        <Column
          title="Customer Name"
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
          title="Actions"
          dataIndex='id'
          key="action"
          render={ (id, order) => (
            <span>
              <Link to={`/orders/${id}/customer/${order.customerId}`}>
                <Icon type="eye"></Icon>
              </Link>
            </span>
          )}
        />
      </Table>
    </div>
  )
}

export default AllOrders