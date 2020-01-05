import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import './home.css'

const  { Item, SubMenu } = Menu
  
class Navigation extends Component {
  
  render(){
    return (
      <div className="nav-panel">
        <div className="ant-layout-header nav-title">
          Admin Panel
        </div>
        
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Item key="1">
            <Link to="/orders">
              <Icon type="unordered-list" />
              <span>Orders</span>
            </Link>
          </Item>
          <Item key="2">
            <Link to='/categories'>
              <Icon type="cluster" />
              <span>Categories</span>
            </Link>
          </Item>
          <Item key="3">
            <Link to='/products'>
              <Icon type="container" />
              <span>Products</span>
            </Link>
          </Item>
          <Item key="4">
            <Link to ="/FAQs">
              <Icon type="question-circle" />
              <span>FAQs</span>
            </Link>
          </Item>
          <Item key="5">
            <Link to="/subscribers">
              <Icon type="pull-request" />
              <span>Subscribers</span>
            </Link>
          </Item>
          <Item key="6">
            <Link to="/reviews">
              <Icon type="gift" />
              <span>Reviews & Feedback</span>
            </Link>
          </Item>
          <Item key="7">
            <Link to="/customers">
              <Icon type="user" />
              <span>Customers</span>
            </Link>
          </Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="radius-setting" />
                <span>System Configuration</span>
              </span>
            }
          >
            <Item key="8">Geberal Details</Item>
            <Item key="9">Members</Item>
            <Item key="10">Social Media Links</Item>
            <Item key="11">Slideshow Pictures</Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
};

export default Navigation