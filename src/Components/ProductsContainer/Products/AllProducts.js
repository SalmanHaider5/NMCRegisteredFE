import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Icon } from 'antd'

import { TableTitle } from '../../../utils/custom-components'

const AllProducts = (props) => {
  
  const { Column } = Table
  const { products } = props
  
  return (
    <div>
      <Table
        dataSource={products}
        bordered={true}
        size="middle"
        rowKey={product => product.id}
        title={()=> <TableTitle title="Products" />}
        pagination={false}
      >
        <Column
          title="ID"
          dataIndex="id"
        />
        <Column
          title="Title"
          dataIndex="title"
        />
        <Column
          title="Price"
          dataIndex="price"
        />
        <Column
          title="Discount"
          dataIndex="dicount"
        />
        <Column
          title="Open Length"
          dataIndex="openlength"
        />
        <Column
          title="Blade Length"
          dataIndex="bladelength"
        />
        <Column
          title="Handle Length"
          dataIndex="handlelength"
        />
        <Column
          title="Category"
          dataIndex="category"
        />
        
        {/* <Column
          title="Action"
          dataIndex='id'
          key="action"
          render={ id => (
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => deleteCategory(id)}
              okText="Yes"
              cancelText="No"
            >
              <Icon type="delete" theme="filled" />
            </Popconfirm>
          )}
        /> */}
      </Table>
      <Link to="/products/new-product">
        <Button type="primary" size="large" className="add-button">
          <Icon type="plus" size="large" />
        </Button>
      </Link>
    </div>
  );
};

export default AllProducts