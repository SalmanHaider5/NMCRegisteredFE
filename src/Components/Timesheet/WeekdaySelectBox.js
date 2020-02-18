import React from 'react'
import { map, isNil } from 'ramda'
import { Col, Card, Button, Icon } from 'antd'

const WeekdaySelectBox = ({ days, showDrawer, getScheduleByDay, addTimesheet }) => {
  return(
    <>
      {
        map(day => {
          const { id, name } = day
          const daySchedule = getScheduleByDay(id)
          return(
            <Col span={3} key={day.id} className="add-timesheet-box">
              <Card title={name}>
                <Button className={isNil(daySchedule) ? 'add-schedule-button' : 'add-schedule-button shift-add-button'} onClick={() => showDrawer(day)}>
                  {
                    isNil(daySchedule) ?
                    <Icon type="plus-circle" /> :
                    <span className="selected-time">
                      <h5>{daySchedule.startTime}</h5>
                      <h5>to</h5>
                      <h5>{daySchedule.endTime}</h5>
                    </span>
                  }
                </Button>
              </Card>
            </Col>
          )
        }, days)
      }
      <Col span={3}>
        <Card title="Save">
          <Button type="primary" className="save-schedule-button" onClick={addTimesheet}>
            <Icon type="check" />
          </Button>
        </Card>
      </Col>
    </>
  )
}

export default WeekdaySelectBox
