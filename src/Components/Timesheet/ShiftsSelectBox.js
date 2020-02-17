import React from 'react'
import { map } from 'ramda'
import { Button } from 'antd'

const ShiftsSelectBox = ({ shifts, selectedShift, selectShift }) => {
  return (
    <>
      {
        map(shift => {
          const { id, name, time } = shift
          return(
            <Button
              block 
              key={id}
              className="select-button"
              type={selectedShift === name ? 'primary': 'default'}
              onClick={() => selectShift(shift)}
            >
              {name} {time}
            </Button>
          )
        }, shifts)
      }
      <Button
        block
        className="select-button"
        onClick={() => selectShift({name: 'custom'})}
        type={selectedShift === 'custom' ? 'primary' : 'default'}
      >
        Custom - Create your Own Time
      </Button>
    </>
  )
}

export default ShiftsSelectBox;
