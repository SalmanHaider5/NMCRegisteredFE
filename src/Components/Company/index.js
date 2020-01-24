import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'
import { getCompanyFormValues } from '../../utils/helpers'
import BasicForm from './BasicForm'

class Company extends Component {
  render() {
    return (
      <div>
        <h2>Basic Information</h2>
        <BasicForm />
        <h2>Work Experience</h2>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    formValues: getFormValues('company')(state)
  }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'company',
    initialValues: getCompanyFormValues()
  })(Company)
)