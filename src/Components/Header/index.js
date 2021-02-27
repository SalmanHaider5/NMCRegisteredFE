import React from 'react'
import { Row, Icon, Button } from 'antd'
import { LOGO_URL as logo } from '../../constants'

import './header.css'

const logoStyle = {
  backgroungImage: `url(${logo})`
}

const Header = ({ loggedIn = true, clickHandler, perfectProfile }) => {
  return (
    <div className='headers'>
      <div className='header-body'>
          <Row>
            <div
              style={logoStyle}
              className={perfectProfile ? `logo profile-logo hide` : `logo profile-logo`}
            ></div>
            <Button
                ghost
                onClick={clickHandler}
                className="right-btn"
              >
                <Icon
                  type={
                    loggedIn ? `logout` : `home`
                  }
                />
                { loggedIn ? 'Logout' : 'Back to Home' }
              </Button>
          </Row>
        </div>
    </div>
  )
}

export default Header
