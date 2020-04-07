import React from 'react'
import moment from 'moment'
import { Icon, Row, Col, Button } from 'antd'
import { DATE_FORMAT as dateFormat } from '../../../../constants'

const Timesheets = ({ timesheet, showTimesheet }) => {
  const { startingDay, endingDay } = timesheet
  return (
    <div className="timesheet-indicator">
      <Row>
        <Col span={20} className="title">
          <Icon type="calendar" /> {`${moment(startingDay).format(dateFormat)} - ${moment(endingDay).format(dateFormat)}`}
        </Col>
        <Col span={4} className="navigator">
          <Button type="link" onClick={() => showTimesheet(timesheet)}>
            <Icon type="eye" />
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default Timesheets