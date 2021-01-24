import { Row, Col, Icon } from 'antd'
import React from 'react'
import { Panel } from './Panel'
import { TabsPane } from './TabsPane'

import './container.css'

export const FormContainer = (props) => {

  const { icon, tabs } = props

  return (
    <div className="addform-container">
      <Row className="addform-panel">
        <Col xs={0} sm={0} md={0} lg={7} xl={5} offset={1} className="progress-panel">
          <div className="progress-tail">
            <Icon type={icon} className="form-icon" />
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={17} xl={19} className="form-panel">
          { tabs ? <TabsPane {...props} /> : <Panel {...props} /> }
        </Col>
      </Row>
    </div>
  )
}
