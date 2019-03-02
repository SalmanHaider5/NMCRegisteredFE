import React from 'react'
import { Field } from 'redux-form'
import { Modal } from 'antd'

import './products.css'

const NewProduct = (props) => {
  const { productModal, hideProductModal, addProduct } = props
  return (
    <Modal
      title="New Product"
      visible={productModal}
      onOk={addProduct}
      onCancel={hideProductModal}
      className="product-modal"
    >
      <form>
        <div>
          <h3 className="form-header-title">Product Information</h3>
          <Field
            name="id"
            component="input"
            type="text"
            placeholder="Product ID"
            className="product-info"
          />
          <Field
            name="title"
            component="input"
            type="text"
            placeholder="Product Name"
            className="product-info"
          />
        </div>
        <div className="price-container">
          <h3 className="form-header-title">Price</h3>
          <Field
            name="price"
            component="input"
            type="text"
            placeholder="Price (USD)"
            className="price"
          />
          <Field
            name="discount"
            component="input"
            type="text"
            placeholder="Discount (%)"
            className="price"
          />
        </div>
        <div className="dimensions-container">
          <h3 className="form-header-title">Dimensions</h3>
          <Field
            name="openlength"
            component="input"
            type="text"
            placeholder="Open Length"
            className="dimensions"
          />
          <Field
            name="bladelength"
            component="input"
            type="text"
            placeholder="Blade Length"
            className="dimensions"
          />
          <Field
            name="handlelength"
            component="input"
            type="text"
            placeholder="Handle Length"
            className="dimensions"
          />
        </div>
        {/* <div className="field">
          <Field
            name="title"
            component="input"
            type="text"
            placeholder="Category Name"
            className="category-name"
          />
        </div> */}
      </form>
    </Modal>
  );
};

export default NewProduct