import React from 'react'
import { map, isNil, equals } from 'ramda'
import { Button, TimePicker } from 'antd'
import { TIME_FORMAT as timeFormat, TIMESHEET_SHIFTS as shifts } from '../../../../constants'

const ShiftsSelectBox = ({
  
  selectedShift,
  selectShift,
  addStartTime,
  addEndTime,
  customizedShiftError

}) => {
  
  return (
    <>
      {
        map(shift => {
          const { id, name, startTime, endTime } = shift
          return(
            <Button
              block 
              key={id}
              className="select-button"
              type={equals(selectedShift, name) ? 'primary': 'default'}
              onClick={() => selectShift(shift)}
            >
              <h4 className="shift-name">{name}</h4>
              {
                isNil(startTime) || isNil(endTime) ? '' :
                <h5 className="shift-time">{startTime}-{endTime}</h5>
              }
            </Button>
          )
        }, shifts)
      }
      {
        equals(selectedShift, 'Customized Shift') ?
        <span>
          <TimePicker
            format={timeFormat}
            minuteStep={15}
            onChange={addStartTime}
            placeholder="Starts Time"
          />
          <TimePicker
            format={timeFormat}
            minuteStep={15}
            onChange={addEndTime}
            placeholder="End Time"
          />
          <p className="error-message">
            {customizedShiftError}
          </p>
        </span> :
        ''
      }
    </>
  )
}

export default ShiftsSelectBox;
