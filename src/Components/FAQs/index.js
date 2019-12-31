import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues, reset } from 'redux-form'
import { notification } from 'antd'

import { getQueries, postQuery, deleteQuery } from '../../actions'
import Queries from './Queries'

class FAQs extends Component {
  
  componentWillReceiveProps(nextProps){
    if(this.props.queries.addRequest !== nextProps.queries.addRequest){
      if(!nextProps.queries.addRequest){
        notification.success({
          message: 'Add Success',
          description: 'Query is successfully added.',
          placement: 'bottomLeft',
          style: {
            backgroundColor: 'rgb(77, 141, 45)',
            color: '#fff'
          }
        })
      }
    }
    if(this.props.queries.deleteRequest !== nextProps.queries.deleteRequest){
      if(!nextProps.queries.deleteRequest){
        notification.success({
          message: 'Delete Success',
          description: 'Query is successfully deleted.',
          placement: 'bottomLeft',
          style: {
            backgroundColor: 'rgb(77, 141, 45)',
            color: '#fff'
          }
        })
      }
    }
  }

  componentDidMount(){
    const { dispatch } = this.props
    dispatch(getQueries())
  }


  addQuery = () => {
    const { formValues, dispatch } = this.props
    dispatch(postQuery(formValues))
    dispatch(reset('faqs'))
  }

  deleteQuery = (id) => {
    const { dispatch } = this.props
    dispatch(deleteQuery(id))
  }
  
  render() {
    console.log(this.props)
    const { queries: { isLoading, queries} } = this.props
    return (
      <div>
        <Queries
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