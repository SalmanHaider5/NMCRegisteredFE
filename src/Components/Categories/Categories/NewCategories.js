import React from 'react'
import { Field } from 'redux-form'
import { Modal } from 'antd'

import { FileInput } from '../../../utils/custom-components/'

import './categories.css'

const NewCategories = (props) => {
  const { categoryModal, hideCategoryModal, addCategory } = props
  return (
    <Modal
      title="New Category"
      visible={categoryModal}
      onOk={addCategory}
      onCancel={hideCategoryModal}
      className="category-modal"
    >
      <form>
        <div className="field">
          <Field
            name="title"
            component="input"
            type="text"
            placeholder="Category Name"
            className="category-name"
          />
        </div>
        <div className="field">
          <Field
            name="img"
            component={FileInput}
            placeholder="Category Name"
          />
        </div>
      </form>
    </Modal>
  );
};

export default NewCategories