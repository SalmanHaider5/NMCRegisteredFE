import React from 'react'
import { Button, Icon, Spin } from 'antd'

import NewCategories from './NewCategories'
import AllCategories from './AllCategories'

import './categories.css'

const Categories = (props) => {

  const {
    categoryModal,
    showCategoryModal,
    hideCategoryModal,
    addCategory,
    isLoading,
    categories
  } = props

  return (
    <div className="categories-container">
      <div className="categories-form">
        <Button type="primary" onClick={showCategoryModal}>
          <Icon type="plus" /> Add New Category
        </Button>

        <NewCategories
          hideCategoryModal={hideCategoryModal}
          categoryModal={categoryModal}
          addCategory={addCategory}
        />

      </div>
      <div className="categories-table">
        <Spin spinning={isLoading} tip="Loading...">
          <AllCategories
            categories={categories}
          />
        </Spin>
      </div>
    </div>
  );
};

export default Categories