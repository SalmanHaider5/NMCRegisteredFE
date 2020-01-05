import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { filter, contains } from 'ramda'
import { Spin } from 'antd'
import { getOrders } from '../../actions'
import AllOrders from './AllOrders'
import SingleOrder from './SingleOrder'
import './orders.css'

class Orders extends Component {
  componentDidMount(){
    const { dispatch } = this.props
    dispatch(getOrders())
  }
  onSearch = e => {
    const { orders: { orders }, dispatch } = this.props
    const value = e.target.value 
    if(value.length === 0) { dispatch(getOrders()) }
    const filteredOrders = filter(order => contains(value.toString(), order.tracking.toString()), orders)
    dispatch({
      type: 'FETCH_ORDERS_SUCCESS',
      payload: filteredOrders
    })
  }

  render() {
    const { orders: { orders, isLoading }, match: { isExact } } = this.props
    return (
      <div>
        {
          isExact ?
          <Spin spinning={isLoading} tip="Loading...">
            <AllOrders
              orders={orders}
              onSearch={this.onSearch}
            />
          </Spin>:
          <Switch>
            <Route path="/orders/:id/customer/:customerId" component={SingleOrder} />
          </Switch>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    orders: state.orders
  }
}

export default connect(mapStateToProps)(Orders)