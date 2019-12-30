import React from 'react'
import { Link } from 'react-router-dom'
import { filter, equals, prop, head } from 'ramda'
import { Table, Button, Icon, Popconfirm } from 'antd'

import { TableTitle } from '../../../utils/custom-components'

const AllProducts = (props) => {
  
  const { Column } = Table
  const { products, categories, deleteProduct, onSearch, onSelectFilter } = props
  
  return (
    <div>
      <Table
        dataSource={products}
        bordered={true}
        size="middle"
        rowKey={product => product.id}
        title={()=>
          <TableTitle
            title="Products"
            selectFilter={true}
            onSelectFilter={onSelectFilter}
            selectHint="Choose a Category"
            selectOptions={categories}
            onSearch={onSearch}
          />}
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
          render={price => `USD ${price} $`}
        />
        <Column
          title="Discount"
          dataIndex="discount"
          render={discount => `${discount} %`}
        />
        <Column
          title="Open Length"
          dataIndex="openlength"
          render={openlength => `${openlength}"`}
        />
        <Column
          title="Blade Length"
          dataIndex="bladelength"
          render={bladelength => `${bladelength}"`}
        />
        <Column
          title="Handle Length"
          dataIndex="handlelength"
          render={handlelength => `${handlelength}"`}
        />
        <Column
          title="Category"
          dataIndex="category"
          render={category => prop('name', head(filter(cat => equals(cat.id, category), categories)))}
        />
        
        <Column
          title="Actions"
          dataIndex='id'
          key="action"
          render={ id => (
            <span>
              <Popconfirm
                title={`Are you sure?`}
                onConfirm={() => deleteProduct(id)}
                okText="Yes"
                cancelText="No"
              >
                <Icon type="delete" theme="filled" />
              </Popconfirm>
              <Link to={`/products/${id}`}>
                <Icon type="eye"></Icon>
              </Link>
            </span>
          )}
        />
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