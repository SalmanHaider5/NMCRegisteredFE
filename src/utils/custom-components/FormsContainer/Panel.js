import React from 'react'
import { Card, Icon, Button } from 'antd'
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
      <div className="panel-btns">
      {
        isEmptyOrNull(panelSubmit) ? '' :
        <Button
          shape="round"
          className="success-btn next-btn right-btn"
          onClick={panelSubmit}
          disabled={panelValidation}
        >
          <Icon type="check" /> {panelSubmitText}
        </Button>
      }
      </div>
    </>
  )
}
