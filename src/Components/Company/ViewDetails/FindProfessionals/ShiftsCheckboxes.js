import React from 'react'
import { WeekCheckboxes } from './WeekCheckboxes'
import { isEmptyOrNull, mapIndexed } from '../../../../utils/helpers'

export const ShiftsCheckboxes = (props) => {

  const { shifts } = props

  return (
    <>
      {
        mapIndexed((shift, index) => {
          return <span key={index}>
            {
              isEmptyOrNull(shift.name) ?
              <div className="shift-name"></div> :
              <div className="shift-name">{shift.name}</div>
            }
            <WeekCheckboxes {...props} shiftIndex={index} />
            <br />
          </span>
        }, shifts)
      }
    </>
  )
}
