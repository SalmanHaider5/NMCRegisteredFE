import React from 'react'
import { Row, Col, Icon, Button } from 'antd'

const Header = ({ loggedIn = true, clickHandler }) => {
  return (
    <div className='headers'>
      <div className='header-body'>
          <Row>
            <Col xs={16} sm={19} md={19} lg={19} xl={20}>
            <div className='logo profile-logo'></div>
            </Col>
            <Col xs={8} sm={5} md={5} lg={5} xl={4}>
              <Button
                ghost
                onClick={clickHandler}
              >
                <Icon
                  type={
                    loggedIn ? `logout` : `home`
                  }
                />
                { loggedIn ? 'Logout' : 'Back to Home' }
              </Button>
            </Col>
          </Row>
        </div>
    </div>
  )
}

export default Header
