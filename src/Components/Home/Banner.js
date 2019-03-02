import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

import './home.css'

const { Header } = Layout,
  { Item } = Menu
  
class Banner extends Component {
  render(){
    return (
      <Header>
        <div className="logo">
          Admin Dashboard
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="horizontal" className="menu">
          <Item key="1">
            <Link to="/orders">
              <Icon type="appstore" />
              <span>Orders</span>
            </Link>
          </Item>
          <Item key="2">
            <Link to="/categories">
              <Icon type="bars" />
              <span>Products</span>
            </Link>
          </Item>
          <Item key="3">
            <Link to="/FAQs">
              <Icon type="layout" />
              <span>FAQs</span>
            </Link>
          </Item>
          <Item key="4">
            <Link to="/subscribers">
              <Icon type="user-add" />
              <span>Subscribers</span>
            </Link>
          </Item>
        </Menu>
      </Header>
    );
  }
};

export default Banner