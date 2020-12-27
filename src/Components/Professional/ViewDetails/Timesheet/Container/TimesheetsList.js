import React from 'react'
import { gt, map } from 'ramda'
import { Row, Col, Button, Icon } from 'antd'
import Timesheets from '../Timesheets'
import { isEmptyOrNull } from '../../../../../utils/helpers'
import SingleTimesheet from '../SingleTimesheet'

export const TimesheetsList = (props) => {

  const {
    showScheduleForm,
    timesheets,
    showTimesheet,
    timesheet,
    getTimesheetShiftByDay,
    deleteTimesheet,
    changeShiftAvailability,
    showEditShiftModal,
    getDayStatus
  } = props,
    limitExcedes = gt(timesheets, 4)

  return (
    <Row gutter={16} className="timesheets-row">
      <Col xs={24} sm={24} md={24} lg={10} xl={11}>
        <Row>
          <Col span={24} className="timesheet">
            <div className="timesheet-indicator">
              <Row>
                <Col xs={18} sm={20} md={19} span={21} className="title">
                  <Icon type="calendar" /> Add New Timesheet
                </Col>
                <Col xs={6} sm={4} md={5} span={3} className="navigator">
                  <Button
                    type="link"
                    onClick={showScheduleForm}
                    disabled={limitExcedes}
                  >
                    <Icon type="plus-circle" />
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
          {
            map(ts => {
              const { id } = ts
              return(<Col span={24} key={id} className="timesheet">
                <Timesheets
                  timesheet={ts}
                  showTimesheet={showTimesheet}
                />
              </Col>)
            }, timesheets)
          }
        </Row>
      </Col>
      <Col xs={24} sm={24} md={24} lg={14} xl={{ span: 12, offset: 1 }}>
          {
            isEmptyOrNull(timesheet) ? '' :
            <SingleTimesheet
              timesheet={timesheet}
              getTimesheetShiftByDay={getTimesheetShiftByDay}
              deleteTimesheet={deleteTimesheet}
              changeShiftAvailability={changeShiftAvailability}
              showEditShiftModal={showEditShiftModal}
              getDayStatus={getDayStatus}
            />
          }
      </Col>
    </Row>
  )
}
