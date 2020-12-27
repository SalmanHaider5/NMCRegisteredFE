import React from 'react'
import { Button, Icon } from 'antd'

export const ScheduleActions = (props) => {

  const { skipCurrentWeek, resetWeek, hideScheduleForm, addTimesheet } = props

  return (
    <div className="schedule-action-btns">
      <div className="non-submit-btns">
        <Button type="primary" shape="round" onClick={skipCurrentWeek}>
          Skip <Icon type="right" />
        </Button>
        <Button type="primary" shape="round" onClick={resetWeek}>
          <Icon type="undo" /> Reset
        </Button>
        <Button type="primary" shape="round" onClick={hideScheduleForm}>
          <Icon type="close" /> Close
        </Button>
      </div>
      <div className="submit-btn">
        <Button size="large" type="primary" className="success-btn" shape="round" onClick={addTimesheet}>
          <Icon type="check" /> Save Timesheet
        </Button>
      </div>
    </div>
  )
}
