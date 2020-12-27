import React from 'react'
import { Row, Col, Button, Icon } from 'antd'
import { FormContainer } from './Form'
import { TITLE, LOGO_URL } from '../../../constants'

export const Main = (props) => {

  const { showLoginModal } = props
  
  return (
    <div className="main-container">
      <div className="gradient-layer">
        <Row>
          <Col span={16}>
            <div className="header">
              <div className="logo">
                <img src={LOGO_URL} alt="NMC Registered" />
              </div>
            </div>
            <div className="text-container">
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
          <Col span={8}>
            <FormContainer {...props} />
          </Col>
        </Row>
      </div>
    </div>
  )
}
