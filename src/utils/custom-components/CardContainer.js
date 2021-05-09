import React from 'react'
import { Icon, Card, Button } from 'antd'
import { map } from 'ramda'

export const CardContainer = (props) => {

  const {
    icon,
    title,
    name,
    wrapper,
    actions = [],
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
      <br />
      {
        map(action => {
          return <Button
            block
            type="primary"
            shape="round"
            size="large"
            className="card-footer-btn"
            onClick={() => clickHandler(action.name)}
            >
              <Icon type={action.icon} />{action.text}
            </Button>
        }, actions)
      }
    </Card>
  )
}
