import React from 'react'
import { Divider, Table, Button } from 'antd'

import './subscribers.css'

const { ColumnGroup, Column } = Table

const AllSubscribers = (props) => {
  const { subscribers, deleteSubscriber } = props
  return (
    <div className="subscribers-container">
      <Divider>Subscribers</Divider>
        <Table dataSource={subscribers} rowKey={subscriber => subscriber.id}>
          <ColumnGroup>
            <Column
              title="ID"
              dataIndex="id"
            />
            <Column
              title="Email"
              dataIndex="email"
            />
            <Column
              title="Action"
              dataIndex='id'
              key="action"
              render={ id => (
                <Button type="primary" onClick={deleteSubscriber} id={id}>Block</Button>
              )}
            />
          </ColumnGroup>
        </Table>
    </div>
  );
};

export default AllSubscribers