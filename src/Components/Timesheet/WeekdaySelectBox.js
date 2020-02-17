import React from 'react'
import { map } from 'ramda'
import { Col, Card, Button, Icon } from 'antd'

const WeekdaySelectBox = ({ days, showDrawer }) => {
  return(
    <>
      {
        map(day => {
          const { id, name } = day
          return(
            <Col span={3} key={id}>
              <Card title={name}>
                <Button type="primary" onClick={() => showDrawer(day)}>
                  <Icon type="plus-circle" />
                </Button>
              </Card>
            </Col>
          )
        }, days)
      }
    </>
  )
}

export default WeekdaySelectBox
