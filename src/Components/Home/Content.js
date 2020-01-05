import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { Layout } from 'antd'

import CategoriesContainer from '../CategoriesContainer'
import ProductsContainer from '../ProductsContainer'
import FAQs from '../FAQs'
import Subscribers from '../Subscribers'
import ReviewsContainer from '../Reviews'
import Orders from '../Orders'
import Customers from '../Customers'


import './home.css'

const { Content } = Layout

class Contents extends Component {
  render() {
    return (
      <Content className="content">
        <div className="content-div">
          <Route path="/categories" component={CategoriesContainer} />
          <Route path="/products" component={ProductsContainer} />
          <Route path="/FAQs" component={FAQs} />
          <Route path="/subscribers" component={Subscribers} />
          <Route path="/reviews" component={ReviewsContainer} />
          <Route path="/orders" component={Orders} />
          <Route path="/customers" component={Customers} />
        </div>
      </Content>
    );
  }
}

export default withRouter(Contents)