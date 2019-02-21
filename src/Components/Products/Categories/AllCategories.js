import React from 'react'
import { Divider, Table } from 'antd'
import { categoryColumns as columns } from '../../../constants'

const AllCategories = (props) => {
  const { categories } = props
  return (
    <div>
      <Divider>All Categories</Divider>
        <Table columns={columns} dataSource={categories} rowKey={category => category.id} />
    </div>
  );
};

export default AllCategories