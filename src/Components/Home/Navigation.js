import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'

import './home.css'

const  { Item, SubMenu } = Menu
  
class Navigation extends Component {
  
  render(){
    return (
      <div>
        <div className="ant-layout-header nav-title">
          Admin Panel
        </div>
        
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Item key="1">
            <Icon type="unordered-list" />
            <span>Orders</span>
          </Item>
          <Item key="2">
            <Link to='/categories'>
              <Icon type="cluster" />
              <span>Categories</span>
            </Link>
          </Item>
          <Item key="3">
            <Icon type="container" />
            <span>Products</span>
          </Item>
          <Item key="4">
            <Icon type="question-circle" />
            <span>FAQs</span>
          </Item>
          <Item key="5">
            <Icon type="pull-request" />
            <span>Subscribers</span>
          </Item>
          <Item key="6">
            <Icon type="gift" />
            <span>Reviews & Feedback</span>
          </Item>
          <Item key="7">
            <Icon type="user" />
            <span>Clients</span>
          </Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="file" />
                <span>Contact Details</span>
              </span>
            }
          >
            <Item key="8">My Details</Item>
            <Item key="9">Members</Item>
            <Item key="10">Roles</Item>
          </SubMenu>
          <Item key="11">
            <Icon type="share-alt" />
            <span>Social Media Links</span>
          </Item>
          <Item key="12">
            <Icon type="desktop" />
            <span>Slideshow</span>
          </Item>
        </Menu>
      </div>
    );
  }
};

export default Navigation