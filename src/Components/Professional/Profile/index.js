import React, { Component } from 'react'
import { Card, Icon, Button, Row, Col, Avatar } from 'antd'
import './profile.css'

export default class Profile extends Component {
  render() {
    return (
      <div className="inner-wrapper">
        <div className="steps-content">
          <div className="steps-header">
            <h3>Profile</h3>
          </div>
          <div className="profile-view">
            <Card
              title={
                <span>
                  <Icon type="solution" />
                  Personal Details
                </span>
              }
              extra={
                <Button type="primary">
                  <Icon type="edit" />
                </Button>
              }
            >
              <Row className="profile-details">
                <Col span={3} offset={2}>
                  <Avatar size={150} icon="user" />
                </Col>
                <Col span={6} offset={1} className="text-label">
                  <h1>
                    <Icon type="customer-service" />
                    &nbsp;Salman Haider
                  </h1>
                  <span>March 11, 1994</span>
                </Col>
              </Row>
            </Card>
            <Card
              title={
                <span>
                  <Icon type="environment" />
                  Address Details
                </span>
              }
              extra={
                <Button type="primary">
                  <Icon type="edit" />
                </Button>
              }
            >
              Personal
            </Card>
            <Card
              title={
                <span>
                  <Icon type="appstore" theme="filled" />
                  Professional Details
                </span>
              }
              extra={
                <Button type="primary">
                  <Icon type="edit" />
                </Button>
              }
            >
              Personal
            </Card>
          </div>
        </div>
      </div>
    )
  }
}
