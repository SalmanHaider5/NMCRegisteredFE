import React from 'react'
import { Button, Icon, Spin } from 'antd'

import NewProduct from './NewProduct'
import AllProducts from './AllProducts'

const Products = (props) => {
  
  const { productModal, showProductModal, hideProductModal, products, addProduct, isLoading, deleteProduct, categoryId } = props
  return (
    <div className="products-container">
      <div className="products-form">
        <Button type="primary" onClick={showProductModal}>
          <Icon type="plus" /> Add New Product
        </Button>

        <NewProduct
          hideProductModal={hideProductModal}
          productModal={productModal}
          addProduct={addProduct}
        />

      </div>
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