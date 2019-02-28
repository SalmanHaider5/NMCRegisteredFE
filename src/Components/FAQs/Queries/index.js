import React from 'react'
import { Button, Icon, Spin } from 'antd'

import NewQuery from './NewQuery'
import AllQueries from './AllQueries'

import './query.css'

const Queries = (props) => {

  const {
    faqsModal,
    showFaqsModal,
    hideFaqsModal,
    addQuery,
    deleteQuery,
    isLoading,
    queries
  } = props
  
  return (
    <div className="categories-container">
      <div className="categories-form">
        <Button type="primary" onClick={showFaqsModal}>
          <Icon type="plus" /> Add New Query
        </Button>

        <NewQuery
          hideCategoryModal={hideFaqsModal}
          faqsModal={faqsModal}
          addQuery={addQuery}
        />

      </div>
      <div className="categories-table">
        <Spin spinning={isLoading} tip="Loading...">
          <AllQueries
            queries={queries}
            deleteQuery={deleteQuery}
          />
        </Spin>
      </div>
    </div>
  );
};

export default Queries