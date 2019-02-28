import React from 'react'
import { Field } from 'redux-form'
import { Modal } from 'antd'

import './query.css'

const NewQuery = (props) => {
  const { faqsModal, hideFaqsModal, addQuery } = props
  return (
    <Modal
      title="New Query"
      visible={faqsModal}
      onOk={addQuery}
      onCancel={hideFaqsModal}
      className="query-modal"
    >
      <form>
        <div className="field">
          <Field
            name="question"
            component="input"
            type="text"
            placeholder="Question"
            className="query-field"
          />
        </div>
        <div className="field">
          <Field
            name="answer"
            component="textarea"
            type="text"
            placeholder="Answer"
            className="answer-field"
          />
        </div>
      </form>
    </Modal>
  );
};

export default NewQuery