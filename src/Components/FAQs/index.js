import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues } from 'redux-form'

import { getQueries, postQuery, deleteQuery } from '../../actions'
import Queries from './Queries'

class FAQs extends Component {
  constructor(props){
    super(props)
    this.state = {
      faqsModal: false
    }
  }

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(getQueries())
  }

  showFaqsModal = () => {
    this.setState({faqsModal: true})
    console.log(this.state.faqsModal)
  }

  hideFaqsModal = () => {
    this.setState({faqsModal: false})
  }

  addQuery = () => {
    const { formValues, dispatch } = this.props
    dispatch(postQuery(formValues))
    this.setState({faqsModal: false})
  }

  deleteQuery = (event) => {
    const { dispatch } = this.props
    const { target: { id } } = event
    dispatch(deleteQuery(id))
  }
  
  render() {
    const { faqsModal } = this.state
    const { queries: { isLoading, queries} } = this.props
    return (
      <div>
        <Queries
          faqsModal={faqsModal}
          showFaqsModal={this.showFaqsModal}
          hideFaqsModal={this.hideFaqsModal}
          addQuery={this.addQuery}
          deleteQuery={this.deleteQuery}
          isLoading={isLoading}
          queries={queries}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    formValues: getFormValues('faqs')(state),
    queries: state.faqs
  }
}
export default connect(mapStateToProps)(
  reduxForm({
    form: 'faqs'
  })(FAQs)
)