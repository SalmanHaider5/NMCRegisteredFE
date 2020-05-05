import React from 'react'
import { map, isNil } from 'ramda'
import { Row, Col, Button, Icon } from 'antd'

const WeekdaySelectBoxMobile = ({ days, showDrawer, getScheduleByDay, addTimesheet, getDayStatus }) => {
  return(
    <>
      {
        map(day => {
          const { id, name } = day
          const daySchedule = getScheduleByDay(id)
          return(
            <Row key={id}>
              <div className='timesheet-list-add'>
              <Col span={16} style={{padding: 0}}><p className='timesheet-list-add-p'>{name}</p></Col>
              <Col span={8} style={{padding: 0}}>
              <Button
                  className={isNil(daySchedule) ? 'timesheet-btn' : 'timesheet-btn shift-add-buttonlist'}
                  onClick={() => showDrawer(day)}
                  disabled={getDayStatus(day)}
                block>
                  {
                    isNil(daySchedule) ?
                    <Icon
                      type={getDayStatus(day) ? "eye-invisible" : "upload"}
                    /> :
                    <span className="selected-time">
                      <h5>{daySchedule.startTime}</h5> <h5>-</h5> <h5>{daySchedule.endTime}</h5>
                    </span>
                  }
                </Button>
                </Col>
              </div>
            </Row>
          )
        }, days)
      }
      <Col span={24}>
          <Button className="save-schedule-button-mob success-btn" onClick={addTimesheet}>
            <Icon type="check-circle" /> Save
          </Button>
      </Col>
    </>
  )
}

export default WeekdaySelectBoxMobile
