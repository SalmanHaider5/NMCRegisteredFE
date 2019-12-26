import React from 'react'
import { Table, Icon, Popconfirm } from 'antd'

import { TableTitle } from '../../../utils/custom-components'

const AllCategories = (props) => {
  const { categories, deleteCategory, onSearch } = props
  const { Column } = Table
  
  return (
    <div>
      <Table
        dataSource={categories}
        bordered={true}
        size="middle"
        rowKey={category => category.id}
        title={()=> <TableTitle title="Categories" onSearch={onSearch} />}
        pagination={false}
      >
        <Column
          title="ID"
          dataIndex="id"
        />
        <Column
          title="Display"
          dataIndex="img"
          render={(img, data) => (
            <div>
              <div className="table-column-image">
                <img src={data.img} alt={data.img}/>
              </div>
              <span className="table-column-image-title">
              {data.name}
              </span>
            </div>
          )}
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