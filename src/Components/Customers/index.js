import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filter, contains, toLower } from 'ramda'
import { Spin } from 'antd'
import { getCustomers } from '../../actions'
import CustomersList from './CustomersList'
import './customers.css'

class Customers extends Component {
  componentDidMount(){
    const { dispatch } = this.props
    dispatch(getCustomers())
  }
  onSearch = e => {
    const { customers: { customers }, dispatch } = this.props
    const value = e.target.value 
    if(value.length === 0) { dispatch(getCustomers()) }
    const filteredCustomers = filter(customer => contains(toLower(value), toLower(customer.email)), customers)
    dispatch({
      type: 'FETCH_CUSTOMERS_SUCCESS',
      payload: filteredCustomers
    })
  }

  render() {
    const { customers: { customers, isLoading } } = this.props
    return (
      <div className="customers-container">
        <Spin spinning={isLoading} tip="Loading...">
            <CustomersList
                customers={customers}
                onSearch={this.onSearch}
            />
        </Spin>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    customers: state.customers
  }
}

export default connect(mapStateToProps)(Customers)