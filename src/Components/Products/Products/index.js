import React from 'react'
import { Spin } from 'antd'

import AllProducts from './AllProducts'

const Products = (props) => {
  
  const { products, isLoading, deleteProduct, categoryId } = props
  return (
    <div className="products-container">
      <div className="categories-table">
        <Spin spinning={isLoading} tip="Loading...">
          <AllProducts
            products={products}
            deleteProduct={deleteProduct}
            categoryId={categoryId}
          />
        </Spin>
      </div>
      
    </div>
  );
};

export default Products