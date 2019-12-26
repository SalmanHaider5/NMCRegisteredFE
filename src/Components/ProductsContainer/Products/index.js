import React from 'react'
import { Route } from 'react-router-dom'
import { Spin } from 'antd'

import AllProducts from './AllProducts'
import NewProduct from '../NewProduct'
import './products.css'

const Products = (props) => {
  
  const { products, isLoading, deleteProduct, categories, isExact, tabKey, handleNextTab, handlePrevTab, handleTabChange, formValues } = props
  return (
    <div className="products-container">
      {
        !isExact?
        <div className="products-form">
          <Route
            path='/products/new-product'
            render={() => 
              <NewProduct
                categories={categories}
                tabKey={tabKey}
                handleNextTab={handleNextTab}
                handlePrevTab={handlePrevTab}
                handleTabChange={handleTabChange}
                formValues={formValues}
              />
            } 
          />
        </div>:
        <div className="products-table">
          <Spin spinning={isLoading} tip="Loading...">
            <AllProducts
              products={products}
              deleteProduct={deleteProduct}
            />
          </Spin>
        </div>
      }
    </div>
  );
};

export default Products