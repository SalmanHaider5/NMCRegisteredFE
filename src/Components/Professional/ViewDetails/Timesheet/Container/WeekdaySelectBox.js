import React from 'react'
import { map, isNil } from 'ramda'
import { Col, Card, Button, Icon } from 'antd'
import { TIMESHEET_DAYS as days } from '../../../../../constants'

const WeekdaySelectBox = ({ showDrawer, getScheduleByDay, getDayStatus }) => {
  return(
    <>
      {
        map(day => {
          const { id, name } = day
          const daySchedule = getScheduleByDay(id)
          return(
            <Col span={3} key={day.id} className="add-timesheet-box">
              <Card title={name} className="weekly-box-card">
                <Button
                  className={isNil(daySchedule) ? 'add-schedule-button' : 'add-schedule-button shift-add-button'}
                  onClick={() => showDrawer(day)}
                  disabled={getDayStatus(day)}
                >
                  {
                    isNil(daySchedule) ?
                    <Icon
                      type={getDayStatus(day) ? "eye-invisible" : "upload"}
                    /> :
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
    </>
  )
}

export default WeekdaySelectBox
