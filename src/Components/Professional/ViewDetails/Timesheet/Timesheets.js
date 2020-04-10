import React from 'react'
import moment from 'moment'
import { Icon, Row, Col, Button } from 'antd'
import { DATE_FORMAT as dateFormat } from '../../../../constants'

const Timesheets = ({ timesheet, showTimesheet }) => {
  const { startingDay, endingDay } = timesheet
  return (
    <div className="timesheet-indicator">
      <Row>
        <Col xs={18} sm={20} md={19} span={21} className="title">
          <Icon type="calendar" /> {`${moment(startingDay).format(dateFormat)} - ${moment(endingDay).format(dateFormat)}`}
        </Col>
        <Col xs={6} sm={4} md={5} span={3} className="navigator">
          <Button type="link" onClick={() => showTimesheet(timesheet)}>
            <Icon type="eye" />
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default Timesheets