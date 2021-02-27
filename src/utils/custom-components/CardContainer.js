import React from 'react'
import { Icon, Card, Button } from 'antd'

export const CardContainer = (props) => {

  const {
    icon,
    title,
    name,
    wrapper,
    clickHandler
  } = props

  return (
    <Card
      title={<><Icon type={icon} /> {title}</>}
      extra={
        <Button
          type={"link"}
          onClick={() => clickHandler(name)}>
          <Icon type={"edit"} />
        </Button>
      }
    >
      {wrapper}
    </Card>
  )
}
