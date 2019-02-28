import React from 'react'
import { Divider, Table, Button } from 'antd'

const { ColumnGroup, Column } = Table

const AllCategories = (props) => {
  const { categories, deleteCategory } = props
  return (
    <div>
      <Divider>All Categories</Divider>
        <Table dataSource={categories} rowKey={category => category.id}>
          <ColumnGroup>
            <Column
              title="ID"
              dataIndex="id"
            />
            <Column
              title="Display"
              dataIndex="img"
              render={img => (<img src={img} alt={img}/>)}
            />
            <Column
              title="Title"
              dataIndex="name"
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
                <Button type="primary" onClick={deleteCategory} id={id}>Delete</Button>
              )}
            />
          </ColumnGroup>
        </Table>
    </div>
  );
};

export default AllCategories