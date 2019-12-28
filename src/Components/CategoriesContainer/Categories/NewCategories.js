import React from 'react'
import { Field } from 'redux-form'
import { Modal } from 'antd'

import { FileInput, TextField } from '../../../utils/custom-components/'
import { isRequired } from '../../../constants'

import './categories.css'

const NewCategories = (props) => {
  const { categoryModal, hideCategoryModal, addCategory, isTitleDuplicated } = props
  return (
    <Modal
      title="New Category"
      visible={categoryModal}
      onOk={addCategory}
      onCancel={hideCategoryModal}
      className="category-modal"
    >
      <div className="form">
        <div className="form-fields">
          <div className="field">
            <Field
              name="title"
              component={TextField}
              type="text"
              label="Category Name"
              tooltipPlacement="right"
              validate={[isRequired, isTitleDuplicated]}
            />
          </div>
        </div>
        <div className="form-fields">  
          <div className="field">
            <Field
              name="img"
              component={FileInput}
              label="Attach an Image"
              validate={[isRequired]}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NewCategories