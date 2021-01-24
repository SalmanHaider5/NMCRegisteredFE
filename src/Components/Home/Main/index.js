import React from 'react'
import { Row, Col, Button, Icon } from 'antd'
import { FormContainer } from './Form'
import { TITLE, LOGO_URL } from '../../../constants'

import './main.css'

export const Main = (props) => {

  const { showLoginModal } = props
  
  return (
    <div className="main-container">
      <Row className="gradient-layer">
        <Col span={24} className="header">
          <div className="logo">
            <img src={LOGO_URL} alt="NMC Registered" />
          </div>
        </Col>
        <Row className="data-container">
          <Col lg={12} xl={16} sm={24} md={24} xs={24} className="text-container">
            <div className="welcome-text">
              <h1>Welcome to {TITLE}</h1>
              <p>
                Delivering a simplistic solution for NHS Trusts, Care
                Homes and Professionals to link together.
              </p>
              <p>
                Our seamless system allows simple and straight forward connection between
                Professionals, Care Homes and NHS Trusts without any agency fees or charges
                per shift.
              </p>
              <Button
                size="large"
                type="primary"
                shape="round"
                className="contact-button"
                onClick={() => showLoginModal()}
              >
                Log In <Icon type="login" />
              </Button>
            </div>
          </Col>
          <Col lg={12} xl={8} sm={24} md={24} xs={24} className="form-container">
            <FormContainer {...props} />
          </Col>
        </Row>
      </Row>
    </div>
  )
}
