import React from 'react'
import { Button, Icon, Spin, Alert } from 'antd'

import NewCategories from './NewCategories'
import AllCategories from './AllCategories'

import './categories.css'

const Categories = (props) => {

  const {
    categoryModal,
    showCategoryModal,
    hideCategoryModal,
    addCategory,
    deleteCategory,
    isLoading,
    categories,
    isError,
    isTitleDuplicated,
    error
  } = props

  return (
    <div className="categories-container">
      <NewCategories
        hideCategoryModal={hideCategoryModal}
        categoryModal={categoryModal}
        addCategory={addCategory}
        isTitleDuplicated={isTitleDuplicated}
      />
      <div className="categories-table">
        {
          isError ? 
          <Alert
            className="error-alert"
            message="Error"
            description={error}
            type="error"
            showIcon
          /> :
          null
        }
        
        <Spin spinning={isLoading} tip="Loading...">
          <AllCategories
            categories={categories}
            deleteCategory={deleteCategory}
          />
        </Spin>
      </div>
      <Button type="primary" size="large" className="add-button" onClick={showCategoryModal}>
        <Icon type="plus" size="large" />
      </Button>
    </div>
  );
};

export default Categories