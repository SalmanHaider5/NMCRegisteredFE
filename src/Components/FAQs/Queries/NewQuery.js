import React from 'react'
import { Field } from 'redux-form'
import { Button, Icon } from 'antd'
import { TextField, MultilineTextField } from '../../../utils/custom-components/'
import { isRequired } from '../../../constants'
import './query.css'

const NewQuery = (props) => {
  const { addQuery } = props
  return (
    <div className="form">
      <div className="form-fields">
        <div className="field">
          <Field
            name="question"
            label="Add Question"
            component={TextField}
            hintText="Enter Question"
            validate={[isRequired]}
          />
        </div>
      </div>
      <div className="form-fields">
        <div className="field">
          <Field
            name="answer"
            label="Add Answer"
            component={MultilineTextField}
            rows={4}
            rowsMax={7}
            placeholder="Enter Description..."
          />
        </div>
      </div>
      <div className="form-buttons">
        <Button onClick={addQuery} type="primary">
          <Icon type="check" /> Save
        </Button>
      </div>
    </div>
  );
};

export default NewQuery