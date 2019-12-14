import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { Layout } from 'antd'

import Orders from '../Orders'
import CategoriesContainer from '../Categories'
import FAQs from '../FAQs'
import Subscribers from '../Subscribers'
import Products from '../Products'
import SingleProduct from '../Products/SingleProduct'


import './home.css'

const { Content } = Layout

class Contents extends Component {
  render() {
    return (
      <Content className="content">
        <div className="content-div">
          <Route path="/orders" component={Orders} />
          <Route path="/categories" component={CategoriesContainer} />
          <Route path="/category/:id/products" component={Products} />
          <Route path="/category/:categoryId/product/:id" component={SingleProduct} />
          <Route path="/FAQs" component={FAQs} />
          <Route path="/subscribers" component={Subscribers} />
        </div>
      </Content>
    );
  }
}

export default withRouter(Contents)