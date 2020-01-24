import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'
import { getCompanyFormValues } from '../../utils/helpers'
import BasicForm from './BasicForm'
import BusinessForm from './BusinessForm'

class Company extends Component {
  constructor (props){
    super(props)
    this.state = {
      charity: false,
      subsidiary: false
    }
  }

  charityStatusChange = () => {
    const { charity } = this.state
    this.setState({ charity: !charity })
  }

  subsidiaryStatusChange = () => {
    const { subsidiary } = this.state
    this.setState({ subsidiary: !subsidiary })
  }

  render() {
    const { charity, subsidiary } = this.state
    return (
      <div>
        <h2>Basic Information</h2>
        <BasicForm />
        <h2>Work Experience</h2>
        <BusinessForm
          charity={charity}
          subsidiary={subsidiary}
          charityStatusChange={this.charityStatusChange}
          subsidiaryStatusChange={this.subsidiaryStatusChange}
        />
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