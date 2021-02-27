import React from 'react'
import { isEmpty } from 'ramda'
import { Divider } from 'antd'
import { ScheduleForm } from './ScheduleForm'
import { EmptyTimesheets } from './EmptyTimesheets'
import { ScheduleDrawer } from './ScheduleDrawer'
import { TimesheetsList } from './TimesheetsList'
import { ShiftEditModal } from './ShiftEditModal'

export const Container = (props) => {

  const {
    scheduleForm,
    timesheets
  } = props

  return (
    <div className="inner-wrapper">
      <div className="steps-content">
        <div className="steps-header">
            <h3>Timesheet Management</h3>
          </div>
          {
            scheduleForm ? <ScheduleForm {...props} /> : ''
          }
          
          <Divider>Timesheets</Divider>
          {
            isEmpty(timesheets) ? <EmptyTimesheets {...props} /> : <TimesheetsList {...props} />
          }
      </div>
      <ScheduleDrawer {...props} />
      <ShiftEditModal {...props} />
    </div>
  )
}
