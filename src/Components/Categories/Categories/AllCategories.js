import React from 'react'
import { Link } from 'react-router-dom'
import { Divider, Table, Button, Icon, Popconfirm } from 'antd'

import { TableTitle } from '../../../utils/custom-components'

const AllCategories = (props) => {
  const { categories, deleteCategory } = props
  const { ColumnGroup, Column } = Table
  
  return (
    <div>
        <Table
          dataSource={categories}
          bordered={true}
          size="middle"
          rowKey={category => category.id}
          title={()=> <TableTitle title="Categories" />}
          pagination={false}
        >
          <Column
            title="ID"
            dataIndex="id"
          />
          {/* <Column
            title="Display"
            dataIndex="img"
            render={img => (<div class="table-column-image"><img src={img} alt={img}/></div>)}
          /> */}
          <Column
            title="Title"
            dataIndex="name"
            render={ (name, category) => (<Link to={`/categories/${category.id}/products`} > {name} </Link>) }
          />
          {/* <Column
            title="Date"
            dataIndex="date"
          /> */}
          <Column
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
          />
        </Table>
    </div>
  );
};

export default AllCategories