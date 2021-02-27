import React from 'react'
import { Result, Button, Icon } from 'antd'

export const EmptyTimesheets = (props) => {

  const { showScheduleForm } = props

  return (
    <Result
      title="No Timesheets Added"
      subTitle="You have not added any timesheet yet"
      extra={
        <Button
          type="primary"
          shape="round"
          size="large"
          className="new-timesheet-btn"
          onClick={showScheduleForm}
        >
          <Icon type="plus" /> Add new Timesheet
        </Button>
      }
    />
  )
}
