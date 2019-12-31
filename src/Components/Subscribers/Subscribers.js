import React from 'react'
import { Table, Icon, Popconfirm } from 'antd'
import { TableTitle } from '../../utils/custom-components'
import './subscribers.css'

const { Column } = Table

const AllSubscribers = (props) => {
  const { subscribers, deleteSubscriber, onSearch } = props
  return (
    <div className="subscribers-table">
      <Table
        dataSource={subscribers}
        bordered={true}
        size="middle"
        title={()=>
          <TableTitle
            title="Subscribers"
            onSearch={onSearch}
            searchHint="Search by Email"
          />
        }
        pagination={false}
        rowKey={subscriber => subscriber.id}
      >
        <Column
            title="ID"
            dataIndex="id"
          />
          <Column
            title="Email"
            dataIndex="email"
          />
          <Column
            title="Status"
            dataIndex="status"
          />
          <Column
            title="Date"
            dataIndex="date"
          />
          <Column
            title="Action"
            dataIndex='id'
            key="action"
            render={ id => (
              <Popconfirm
                title={`Are you sure?`}
                onConfirm={() => deleteSubscriber(id)}
                okText="Yes"
                cancelText="No"
              >
                <Icon type="close"/>
              </Popconfirm>
            )}
          />
      </Table>
    </div>
  );
};

export default AllSubscribers