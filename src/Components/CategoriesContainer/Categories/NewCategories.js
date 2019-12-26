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
      <form>
        <div className="field">
          <Field
            name="title"
            component={TextField}
            type="text"
            label="Category Name"
            validate={[isRequired, isTitleDuplicated]}
          />
        </div>
        <div className="field">
          <Field
            name="img"
            component={FileInput}
            label="Attach an Image"
            validate={[isRequired]}
          />
        </div>
      </form>
      <br/><br/>
    </Modal>
  );
};

export default NewCategories