import React from 'react'
import { map, isNil } from 'ramda'
import { Button } from 'antd'

const ShiftsSelectBox = ({ shifts, selectedShift, selectShift }) => {
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
              type={selectedShift === name ? 'primary': 'default'}
              onClick={() => selectShift(shift)}
            >
              <h4 className="shift-name">{name}</h4>
              {
                isNil(startTime) || isNil(endTime) ?
                '' :
                <h5 className="shift-time">{startTime}-{endTime}</h5>
              }
            </Button>
          )
        }, shifts)
      }
    </>
  )
}

export default ShiftsSelectBox;
