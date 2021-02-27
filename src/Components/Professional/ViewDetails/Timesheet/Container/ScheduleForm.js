import React from 'react'
import moment from 'moment'
import { head, join, last } from 'ramda'
import { Divider, Row, Col } from 'antd'
import WeekdaySelectBox from './WeekdaySelectBox'
import WeekdaySelectBoxMobile from './WeekdaySelectBoxMobile'
import { ScheduleActions } from './ScheduleActions'


export const ScheduleForm = (props) => {

  const {
    weeklyDates,
    showDrawer,
    getSpecificDate,
    getScheduleByDay,
    addTimesheet,
    getDayStatus,
    skipCurrentWeek,
    resetWeek,
    hideScheduleForm
  } = props

  return (
    <Row className="weekly-row">
      <Divider>
        {join('-', [moment(head(weeklyDates)).format('ll'), moment(last(weeklyDates)).format('ll')])}
      </Divider>
      <Col xs={0} sm={0} md={0} lg={24}>
        <WeekdaySelectBox
          showDrawer={showDrawer}
          getSpecificDate={getSpecificDate}
          getScheduleByDay={getScheduleByDay}
          getDayStatus={getDayStatus}
        />
      </Col>
      <Col xs={24} sm={24} md={24} lg={0}>
        <WeekdaySelectBoxMobile
          showDrawer={showDrawer}
          getSpecificDate={getSpecificDate}
          getScheduleByDay={getScheduleByDay}
          getDayStatus={getDayStatus}
        />
      </Col>
      <>
        <ScheduleActions
          skipCurrentWeek={skipCurrentWeek}
          resetWeek={resetWeek}
          hideScheduleForm={hideScheduleForm}
          addTimesheet={addTimesheet}
        />
      </>
    </Row>
  )
}
