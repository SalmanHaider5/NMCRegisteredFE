import React from 'react'
import moment from 'moment'
import { and, equals, isEmpty, or, defaultTo } from 'ramda'
import { Drawer, Icon, Button } from 'antd'
import { TIMESHEET_SHIFTS as shifts } from '../../../../../constants'
import ShiftsSelectBox from '../ShiftsSelectBox'

export const ScheduleDrawer = (props) => {
  
  const {
    selectedDay,
    specificDate,
    hideDrawer,
    visible,
    addTimesheetDaySchedule,
    selectedShift,
    formValues,
    selectShift,
    customizedShiftError,
    addStartTime,
    addEndTime
  } = props

  const  title = `${selectedDay} (${moment(specificDate).format('ll')})`,
    { startTime, endTime } = defaultTo({}, formValues),
    isShiftSelected = isEmpty(selectedShift),
    isTimeSelected = or(isEmpty(startTime), isEmpty(endTime)),
    invalidShift = and(equals(selectedShift, 'Customized Shift'), isTimeSelected),
    invalidSchedule = or(isShiftSelected, invalidShift)

  return (
    <div className="drawer">
      <Drawer
        title={title}
        visible={visible}
        placement="right"
        closable={false}
        onClose={hideDrawer}
        getContainer={false}
        className="timesheet-drawer"
        width={'400px'}
      >
        <p>Choose your Shift</p>
        <ShiftsSelectBox
          shifts={shifts}
          selectedShift={selectedShift}
          selectShift={selectShift}
          customizedShiftError={customizedShiftError}
          addStartTime={addStartTime}
          addEndTime={addEndTime}
        />
        <Button
          block
          size="large"
          shape="round"
          className="success-btn submit-button"
          onClick={addTimesheetDaySchedule}
          disabled={invalidSchedule}
        >
          <Icon type="check" /> Save
        </Button>
      </Drawer>
    </div>
  )
}
