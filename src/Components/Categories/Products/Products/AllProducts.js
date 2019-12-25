import React from 'react'
import { Link } from 'react-router-dom'
import { Divider, Table } from 'antd'

const { Column } = Table


const AllProducts = (props) => {
  
  const { products, categoryId } = props
  
  return (
    <div>
      <Link to={`/categories/${categoryId}/products/newProduct`}>Add</Link>
      <Divider>All Products</Divider>
        <Table dataSource={products} rowKey={product => product.id} bordered>
          <Column
            title="ID"
            dataIndex="id"
          />
          <Column
            title="Title"
            dataIndex="title"
            render={(title, product) => (<Link to={`/categories/${categoryId}/products/${product.id}`}>{title}</Link>)}
          />
          <Column
            title="Price"
            dataIndex="price"
          />
          <Column
            title="Dimensions"
            children={[
              {title: 'Open Length', dataIndex: 'openlength'},
              { title: 'Blade Length', dataIndex: 'bladelength' },
              { title: 'Handle Length', dataIndex: 'handlelength' }
            ]}
          />
        </Table>
    </div>
  );
};

export default AllProducts