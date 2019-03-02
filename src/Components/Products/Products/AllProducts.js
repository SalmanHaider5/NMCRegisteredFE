import React from 'react'
import { Link } from 'react-router-dom'
import { Divider, Table, Button } from 'antd'

const { Column } = Table


const AllProducts = (props) => {
  
  const { products, deleteProduct } = props
  
  return (
    <div>
      <Divider>All Products</Divider>
        <Table dataSource={products} rowKey={product => product.id} bordered>
          <Column
            title="ID"
            dataIndex="id"
          />
          <Column
            title="Title"
            dataIndex="title"
            render={(title, product) => (<Link to={`/product/${product.id}`}>{title}</Link>)}
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
          <Column
            title="Action"
            dataIndex='id'
            key="action"
            render={ id => (
              <Button type="primary" onClick={deleteProduct}  id={id}>Delete</Button>
            )}
          />
        </Table>
    </div>
  );
};

export default AllProducts