import React from 'react'
import { Tabs, Card, Spin } from 'antd'

import NewQuery from './NewQuery'
import AllQueries from './AllQueries'

import './query.css'

const Queries = (props) => {

  const {
    addQuery,
    deleteQuery,
    isLoading,
    queries
  } = props

  const { TabPane } = Tabs
  
  return (
    <div className="queries-container">
      <Card title="Frequently Asked Questions" className="queries-card">
        <Tabs defaultActiveKey="1">
          <TabPane tab="All Questions" key="1">
            <Spin spinning={isLoading} tip="Loading...">
              <AllQueries
                queries={queries}
                deleteQuery={deleteQuery}
              />
            </Spin>
          </TabPane>
          <TabPane tab="Add New" key="2">
            <NewQuery addQuery={addQuery} />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Queries