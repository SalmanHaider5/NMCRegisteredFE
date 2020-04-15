import React from 'react'
import { Row, Col, Icon, Button } from 'antd'

const Header = ({ logout, loggedIn = true }) => {
  return (
    <div className='headers'>
      <div className='header-body'>
          <Row>
            <Col xs={19} sm={20} md={20} lg={20} xl={20}>
            <div style={{marginLeft: '9%'}} className='logo'></div>
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
