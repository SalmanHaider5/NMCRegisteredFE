import React from 'react'
import { Card, Icon, Row, Col, Button } from 'antd'
import { isEmptyOrNull } from '../../helpers'

export const Panel = (props) => {

  const {
    panelSubmitText,
    icon,
    title,
    panelSubmit,
    wrapper,
    panelValidation
  } = props

  return (
    <>
      <Card
        bordered={false}
        title={<><Icon type={icon} /> {title}</>}
      >
        {wrapper}
      </Card>
      <Row>
        <Col span={5} offset={3}></Col>
          <Col span={12} offset={1} className="form-actions">
          {
            isEmptyOrNull(panelSubmit) ? '' :
            <Button
              shape="round"
              className="success-btn next-btn"
              onClick={panelSubmit}
              disabled={panelValidation}
            >
              <Icon type="check" /> {panelSubmitText}
            </Button>
          }
        </Col>
      </Row>
    </>
  )
}
