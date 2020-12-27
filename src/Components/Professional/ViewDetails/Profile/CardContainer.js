import React from 'react'
import { Icon, Card, Button } from 'antd'

export const CardContainer = (props) => {

  const { icon, title, name, showEditFormModal, wrapper } = props

  return (
    <Card
      title={<><Icon type={icon} /> {title}</>}
      extra={
        <Button
          type={"link"}
          onClick={() => showEditFormModal(name)}>
          <Icon type={"edit"} />
        </Button>
      }
    >
      {wrapper}
    </Card>
  )
}
