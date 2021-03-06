import React from 'react'
import { Row, Col, Button, Icon } from 'antd'
import { FormContainer } from './Form'
import { TITLE, LOGO_URL, BACKGROUND_IMG as bg } from '../../../constants'

import './main.css'

const bgStyle = {
  background: `url(${bg})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}

export const Main = (props) => {

  const { showLoginModal } = props
  
  return (
    <div className="main-container" style={bgStyle}>
      <Row className="gradient-layer">
        <Col span={24} className="header">
          <div className="logo">
            <img src={LOGO_URL} alt="NMC Professionals" />
          </div>
        </Col>
        <Row className="data-container">
          <Col lg={12} xl={16} sm={24} md={24} xs={24} className="text-container">
            <div className="welcome-text">
              <h1>Welcome to {TITLE}</h1>
              <p>
                Delivering a simple solution for NHS Trusts, Care
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
