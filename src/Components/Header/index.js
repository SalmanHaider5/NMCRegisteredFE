import React from 'react'
import { Row, Col, Icon, Button } from 'antd'

const Header = ({ logout, loggedIn = true }) => {
  return (
    <div className='headers'>
      <div className='header-body'>
          <Row>
            <Col xs={8} sm={4} md={4} lg={4} xl={4}>
              <p className='logo'>LOGO</p>
            </Col>
            <Col xs={11} sm={16} md={16} lg={16} xl={16}>
            </Col>
            <Col xs={5} sm={4} md={4} lg={4} xl={4}>
              <Button
                ghost
                onClick={logout}
              >
                <Icon
                  type={
                    loggedIn ? `logout` : `login`
                  }
                />
                { !loggedIn ? 'Login' : 'Logout' }
              </Button>
            </Col>
          </Row>
        </div>
    </div>
  )
}

export default Header
