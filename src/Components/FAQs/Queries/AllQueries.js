import React from 'react'
import { map } from 'ramda'
import { Collapse, Icon, Popconfirm } from 'antd'

const { Panel } = Collapse

const AllQueries = (props) => {
  const { queries, deleteQuery } = props
  const allQueries = map(query =>
                      <Panel
                        header={query.question}
                        key={query.id}
                        extra={
                          <Popconfirm
                            title={`Are you sure?`}
                            onConfirm={() => deleteQuery(query.id)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Icon type="delete" theme="filled" />
                          </Popconfirm>}
                        >
                          {query.answer}
                        </Panel>
                    ,queries)
  return (
    <Collapse bordered={false} accordion>
      {allQueries}
    </Collapse>  
  );
};

export default AllQueries